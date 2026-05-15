
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const QRCode = require('qrcode');
const pool = require('./db/connection');
const authMiddleware = require('./middleware/auth');
const { detectSeason } = require('./utils/season');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ===== PUBLIC ROUTES =====

app.post('/api/scan/:qrCode', async (req, res) => {
  const { qrCode } = req.params;
  const { fcmToken } = req.body;

  try {
    const [qrRows] = await pool.query('SELECT * FROM qr_codes WHERE code = ? AND is_active = true', [qrCode]);
    if (qrRows.length === 0) {
      return res.status(404).json({ error: 'QR Code not found or inactive' });
    }
    const qr = qrRows[0];

    const currentMonth = new Date().getMonth() + 1;
    const season = detectSeason(currentMonth);

    let dayZero = qr.day_zero;
    let seasonDetected = qr.season_detected;

    if (!qr.scanned_at) {
      dayZero = new Date();
      seasonDetected = season;
      await pool.query(
        'UPDATE qr_codes SET scanned_at = NOW(), day_zero = NOW(), season_detected = ?, fcm_token = ? WHERE code = ?',
        [season, fcmToken || null, qrCode]
      );
    } else if (fcmToken && fcmToken !== qr.fcm_token) {
      await pool.query('UPDATE qr_codes SET fcm_token = ? WHERE code = ?', [fcmToken, qrCode]);
    }

    const [speciesRows] = await pool.query('SELECT * FROM species WHERE id = ?', [qr.species_id]);
    const [batchRows] = await pool.query('SELECT * FROM batches WHERE id = ?', [qr.batch_id]);
    
    const daysElapsed = dayZero ? Math.floor((new Date() - new Date(dayZero)) / (1000 * 60 * 60 * 24)) : 0;
    
    const [scheduleRows] = await pool.query(
      'SELECT * FROM care_schedules WHERE species_id = ? AND season = ? AND day_offset >= ? ORDER BY day_offset ASC LIMIT 7',
      [qr.species_id, seasonDetected || season, daysElapsed]
    );

    res.json({
      species: speciesRows[0],
      batch: batchRows[0],
      dayZero: dayZero,
      season: seasonDetected || season,
      daysElapsed,
      schedulePreview: scheduleRows
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/articles', (req, res) => {
  const articles = [
    { id: 1, title: 'Mastering Monsoon Watering', excerpt: 'How to avoid root rot during heavy rains.', category: 'watering', readTime: '5 min', imageUrl: 'https://placehold.co/600x400/1B4332/F5F0E8?text=Watering' },
    { id: 2, title: 'Organic Pest Control', excerpt: 'Natural remedies for common aphids and mites.', category: 'pests', readTime: '7 min', imageUrl: 'https://placehold.co/600x400/1B4332/F5F0E8?text=Pests' },
    { id: 3, title: 'Preparing Soil for Winter', excerpt: 'Essential nutrients your soil needs before the dry season.', category: 'soil', readTime: '6 min', imageUrl: 'https://placehold.co/600x400/1B4332/F5F0E8?text=Soil' },
    { id: 4, title: 'When to Fertilise', excerpt: 'Timing your feeding for maximum growth.', category: 'fertilising', readTime: '4 min', imageUrl: 'https://placehold.co/600x400/1B4332/F5F0E8?text=Fertilising' },
    { id: 5, title: 'Understanding Bangladesh Seasons', excerpt: 'How the 4 micro-seasons affect your plants.', category: 'seasons', readTime: '8 min', imageUrl: 'https://placehold.co/600x400/1B4332/F5F0E8?text=Seasons' },
    { id: 6, title: 'Perfect Harvesting Signs', excerpt: 'How to know exactly when to pick your produce.', category: 'harvesting', readTime: '5 min', imageUrl: 'https://placehold.co/600x400/1B4332/F5F0E8?text=Harvesting' },
  ];
  res.json(articles);
});

app.get('/api/schedule/:qrCode', async (req, res) => {
  try {
    const [qrRows] = await pool.query('SELECT * FROM qr_codes WHERE code = ?', [req.params.qrCode]);
    if (qrRows.length === 0) return res.status(404).json({ error: 'QR Code not found' });
    
    const qr = qrRows[0];
    const season = qr.season_detected || detectSeason(new Date().getMonth() + 1);
    
    const [schedules] = await pool.query(
      'SELECT * FROM care_schedules WHERE species_id = ? AND season = ? ORDER BY day_offset ASC',
      [qr.species_id, season]
    );
    
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ===== ADMIN ROUTES =====

app.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const [users] = await pool.query('SELECT * FROM admin_users WHERE email = ?', [email]);
    if (users.length === 0) return res.status(401).json({ error: 'Invalid credentials' });
    
    const user = users[0];
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
    
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.use('/api/admin/*', authMiddleware);

app.get('/api/admin/species', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM species ORDER BY name ASC');
  res.json(rows);
});

app.post('/api/admin/species', async (req, res) => {
  const { name, scientific_name, climate_zone, description, image_url } = req.body;
  const [result] = await pool.query(
    'INSERT INTO species (name, scientific_name, climate_zone, description, image_url) VALUES (?, ?, ?, ?, ?)',
    [name, scientific_name, climate_zone, description, image_url]
  );
  res.json({ id: result.insertId });
});

app.put('/api/admin/species/:id', async (req, res) => {
  const { name, scientific_name, climate_zone, description, image_url } = req.body;
  await pool.query(
    'UPDATE species SET name=?, scientific_name=?, climate_zone=?, description=?, image_url=? WHERE id=?',
    [name, scientific_name, climate_zone, description, image_url, req.params.id]
  );
  res.json({ success: true });
});

app.get('/api/admin/batches', async (req, res) => {
  const [rows] = await pool.query(`
    SELECT b.*, s.name as species_name, COUNT(q.id) as qr_count 
    FROM batches b 
    JOIN species s ON b.species_id = s.id 
    LEFT JOIN qr_codes q ON b.id = q.batch_id 
    GROUP BY b.id 
    ORDER BY b.created_at DESC
  `);
  res.json(rows);
});

app.post('/api/admin/batches', async (req, res) => {
  const { batchNumber, speciesId, notes } = req.body;
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const [batchResult] = await connection.query(
      'INSERT INTO batches (batch_number, species_id, notes) VALUES (?, ?, ?)',
      [batchNumber, speciesId, notes]
    );
    const batchId = batchResult.insertId;
    
    for (let i = 1; i <= 50; i++) {
      const seq = i.toString().padStart(4, '0');
      const code = `PRV-${batchNumber}-${seq}`;
      await connection.query(
        'INSERT INTO qr_codes (code, batch_id, species_id) VALUES (?, ?, ?)',
        [code, batchId, speciesId]
      );
    }
    await connection.commit();
    res.json({ success: true, batchId });
  } catch (err) {
    await connection.rollback();
    res.status(500).json({ error: err.message });
  } finally {
    connection.release();
  }
});

app.get('/api/admin/batches/:id/qrcodes', async (req, res) => {
  const [rows] = await pool.query(
    'SELECT q.*, s.name as species_name FROM qr_codes q JOIN species s ON q.species_id = s.id WHERE batch_id = ?',
    [req.params.id]
  );
  res.json(rows);
});

app.get('/api/admin/qrcodes/:id/download', async (req, res) => {
  const [rows] = await pool.query('SELECT code FROM qr_codes WHERE id = ?', [req.params.id]);
  if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
  
  const url = `${process.env.FRONTEND_URL}/scan/${rows[0].code}`;
  try {
    const imgData = await QRCode.toDataURL(url);
    const base64Data = imgData.replace(/^data:image\/png;base64,/, "");
    res.setHeader('Content-Type', 'image/png');
    res.send(Buffer.from(base64Data, 'base64'));
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate QR' });
  }
});

app.post('/api/admin/schedules', async (req, res) => {
  const { species_id, season, day_offset, action_type, message_title, message_body } = req.body;
  const [result] = await pool.query(
    'INSERT INTO care_schedules (species_id, season, day_offset, action_type, message_title, message_body) VALUES (?, ?, ?, ?, ?, ?)',
    [species_id, season, day_offset, action_type, message_title, message_body]
  );
  res.json({ id: result.insertId });
});

app.get('/api/admin/schedules/:speciesId', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM care_schedules WHERE species_id = ? ORDER BY season, day_offset', [req.params.speciesId]);
  res.json(rows);
});

app.delete('/api/admin/schedules/:id', async (req, res) => {
  await pool.query('DELETE FROM care_schedules WHERE id = ?', [req.params.id]);
  res.json({ success: true });
});

app.get('/api/admin/analytics', async (req, res) => {
  const [totalQRs] = await pool.query('SELECT COUNT(*) as count FROM qr_codes');
  const [scannedQRs] = await pool.query('SELECT COUNT(*) as count FROM qr_codes WHERE scanned_at IS NOT NULL');
  const [activeUsers] = await pool.query('SELECT COUNT(DISTINCT fcm_token) as count FROM qr_codes WHERE scanned_at >= NOW() - INTERVAL 30 DAY AND fcm_token IS NOT NULL');
  const [notifications] = await pool.query('SELECT COUNT(*) as count FROM notifications_log');
  
  const [topSpecies] = await pool.query(`
    SELECT s.name, COUNT(q.id) as scans 
    FROM species s 
    JOIN qr_codes q ON s.id = q.species_id 
    WHERE q.scanned_at IS NOT NULL 
    GROUP BY s.id 
    ORDER BY scans DESC LIMIT 5
  `);

  res.json({
    totalQRCodes: totalQRs[0].count,
    scannedQRCodes: scannedQRs[0].count,
    activeUsers: activeUsers[0].count,
    notificationsSent: notifications[0].count,
    topSpecies
  });
});

// ===== CRON JOB =====
// Run at 02:00 UTC (08:00 BST)
cron.schedule('0 2 * * *', async () => {
  console.log('Running daily notification job...');
  try {
    const [activeQRs] = await pool.query('SELECT * FROM qr_codes WHERE is_active = true AND day_zero IS NOT NULL AND fcm_token IS NOT NULL');
    
    for (const qr of activeQRs) {
      const daysElapsed = Math.floor((new Date() - new Date(qr.day_zero)) / (1000 * 60 * 60 * 24));
      
      const [schedules] = await pool.query(
        'SELECT * FROM care_schedules WHERE species_id = ? AND season = ? AND day_offset = ?',
        [qr.species_id, qr.season_detected, daysElapsed]
      );
      
      if (schedules.length > 0) {
        const sched = schedules[0];
        // Mock FCM sending
        console.log(`Sending FCM to ${qr.fcm_token}: ${sched.message_title}`);
        await pool.query(
          'INSERT INTO notifications_log (qr_code_id, action_type, status) VALUES (?, ?, ?)',
          [qr.id, sched.action_type, 'sent']
        );
      }
    }
  } catch (err) {
    console.error('Cron job error:', err);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
