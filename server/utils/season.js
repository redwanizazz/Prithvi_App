
function detectSeason(month) {
  // Bangladesh seasons based on month (1-12)
  if (month >= 3 && month <= 5) return 'pre-monsoon';
  if (month >= 6 && month <= 9) return 'monsoon';
  if (month >= 10 && month <= 11) return 'post-monsoon';
  return 'dry-winter'; // 12, 1, 2
}

module.exports = { detectSeason };
