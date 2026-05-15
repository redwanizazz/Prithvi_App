
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api';
import SeasonBadge from '../components/SeasonBadge';
import CareEventIcon from '../components/CareEventIcon';

export default function Plant() {
  const { qrCode } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pushPermission, setPushPermission] = useState('default');

  useEffect(() => {
    const fetchData = async () => {
      try {
        let token = null;
        if ('Notification' in window && Notification.permission === 'granted') {
          // In real app, fetch FCM token here
          token = 'dummy_fcm_token_for_demo'; 
        }

        const res = await axios.post(`/api/scan/${qrCode}`, { fcmToken: token });
        setData(res.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load plant data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    
    if ('Notification' in window) setPushPermission(Notification.permission);
  }, [qrCode]);

  const requestNotification = async () => {
    if ('Notification' in window) {
      const perm = await Notification.requestPermission();
      setPushPermission(perm);
      if (perm === 'granted') {
        // Mock re-register
        await axios.post(`/api/scan/${qrCode}`, { fcmToken: 'dummy_fcm_token_for_demo' });
      }
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-prithvi-cream text-prithvi-green text-xl font-bold">Loading your plant journey...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center bg-prithvi-cream text-red-600 font-bold p-6 text-center">{error}</div>;
  if (!data) return null;

  const { species, season, daysElapsed, schedulePreview } = data;
  const nextAction = schedulePreview.find(s => s.day_offset >= daysElapsed) || schedulePreview[schedulePreview.length - 1];
  const germinationEvent = schedulePreview.find(s => s.action_type === 'germination');
  const daysToGermination = germinationEvent ? germinationEvent.day_offset - daysElapsed : null;

  return (
    <div className="bg-prithvi-cream min-h-screen pb-20">
      {/* Header Info */}
      <div className="bg-prithvi-green text-prithvi-cream pt-12 pb-24 px-6 rounded-b-[3rem] relative">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{species.name}</h1>
              <p className="italic opacity-80">{species.scientific_name}</p>
            </div>
            <SeasonBadge season={season} />
          </div>
          
          <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/20">
            <p className="text-sm uppercase tracking-wider opacity-80 mb-1">Journey Status</p>
            <p className="text-3xl font-bold">Day {daysElapsed}</p>
            {daysToGermination > 0 && (
              <p className="mt-2 text-sm text-yellow-300">🌱 ~{daysToGermination} days until germination expected</p>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 -mt-12">
        {/* Next Action Card */}
        {nextAction && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border-l-8 border-prithvi-brown">
            <h2 className="text-sm uppercase font-bold text-gray-500 mb-4">Up Next (Day {nextAction.day_offset})</h2>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-prithvi-cream flex items-center justify-center">
                <CareEventIcon type={nextAction.action_type} className="w-8 h-8 text-prithvi-brown" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-prithvi-green">{nextAction.message_title}</h3>
                <p className="text-gray-600 mt-1">{nextAction.message_body}</p>
              </div>
            </div>
          </div>
        )}

        {/* Notification Prompt */}
        {pushPermission !== 'granted' && (
          <div className="bg-blue-50 rounded-xl p-4 mb-8 flex justify-between items-center border border-blue-100">
            <p className="text-blue-800 text-sm font-medium mr-4">Enable notifications to get timely care reminders.</p>
            <button onClick={requestNotification} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap">
              Enable
            </button>
          </div>
        )}

        {/* Timeline */}
        <h2 className="text-2xl font-bold text-prithvi-green mb-6">Upcoming Care</h2>
        <div className="space-y-6">
          {schedulePreview.map((item, idx) => (
            <div key={item.id} className={`flex gap-4 ${item.day_offset < daysElapsed ? 'opacity-50' : ''}`}>
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${item.day_offset <= daysElapsed ? 'bg-prithvi-green text-white' : 'bg-gray-200 text-gray-500'}`}>
                  <CareEventIcon type={item.action_type} className="w-6 h-6" />
                </div>
                {idx !== schedulePreview.length - 1 && <div className="w-0.5 h-full bg-gray-200 my-2"></div>}
              </div>
              <div className="pb-6 pt-2">
                <p className="text-sm font-bold text-prithvi-brown mb-1">Day {item.day_offset}</p>
                <h4 className="text-lg font-bold text-prithvi-green">{item.message_title}</h4>
                <p className="text-gray-600 text-sm mt-1">{item.message_body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

