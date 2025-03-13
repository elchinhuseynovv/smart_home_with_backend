import React, { useState } from 'react';
import { Device, AutomationRule } from './types';
import { devices as initialDevices, automationRules as initialRules, rooms } from './data';
import { DeviceCard } from './components/DeviceCard';
import { AutomationCard } from './components/AutomationCard';
import { PythonAnalytics } from './components/PythonAnalytics';
import { Home, Settings, Activity } from 'lucide-react';

function App() {
  const [devices, setDevices] = useState<Device[]>(initialDevices);
  const [automationRules, setAutomationRules] = useState<AutomationRule[]>(initialRules);
  const [activeTab, setActiveTab] = useState<'devices' | 'automation' | 'analytics'>('devices');

  const handleDeviceToggle = (id: string) => {
    setDevices(devices.map(device =>
      device.id === id ? { ...device, status: !device.status } : device
    ));
  };

  const handleDeviceUpdate = (id: string, data: Partial<Device['data']>) => {
    setDevices(devices.map(device =>
      device.id === id ? { ...device, data: { ...device.data, ...data } } : device
    ));
  };

  const handleAutomationToggle = (id: string) => {
    setAutomationRules(rules =>
      rules.map(rule =>
        rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Home className="w-6 h-6 text-purple-600" />
              <span className="ml-2 text-xl font-semibold">Smart Home</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Settings className="w-6 h-6 text-gray-600" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Activity className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('devices')}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === 'devices'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            Devices
          </button>
          <button
            onClick={() => setActiveTab('automation')}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === 'automation'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            Automation
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === 'analytics'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            Analytics
          </button>
        </div>

        {activeTab === 'devices' && (
          <div className="space-y-8">
            {rooms.map(room => (
              <div key={room.id} className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">{room.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {devices
                    .filter(device => device.room === room.id)
                    .map(device => (
                      <DeviceCard
                        key={device.id}
                        device={device}
                        onToggle={handleDeviceToggle}
                        onUpdate={handleDeviceUpdate}
                      />
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'automation' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {automationRules.map(rule => (
              <AutomationCard
                key={rule.id}
                rule={rule}
                onToggle={handleAutomationToggle}
              />
            ))}
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PythonAnalytics devices={devices} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;