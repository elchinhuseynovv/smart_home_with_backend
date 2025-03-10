import React from 'react';
import { Device } from '../types';
import { Lightbulb, Thermometer, Camera, Power } from 'lucide-react';

interface DeviceCardProps {
  device: Device;
  onToggle: (id: string) => void;
  onUpdate: (id: string, data: Partial<Device['data']>) => void;
}

export function DeviceCard({ device, onToggle, onUpdate }: DeviceCardProps) {
  const getIcon = () => {
    switch (device.type) {
      case 'light':
        return <Lightbulb className={`w-6 h-6 ${device.status ? 'text-yellow-400' : 'text-gray-400'}`} />;
      case 'ac':
        return <Thermometer className={`w-6 h-6 ${device.status ? 'text-blue-400' : 'text-gray-400'}`} />;
      case 'camera':
        return <Camera className={`w-6 h-6 ${device.status ? 'text-green-400' : 'text-gray-400'}`} />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          {getIcon()}
          <h3 className="text-lg font-semibold">{device.name}</h3>
        </div>
        <button
          onClick={() => onToggle(device.id)}
          className={`p-2 rounded-full transition-colors ${
            device.status ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
          }`}
        >
          <Power className="w-5 h-5" />
        </button>
      </div>

      {device.status && (
        <div className="space-y-4">
          {device.type === 'light' && device.data?.brightness !== undefined && (
            <div className="space-y-2">
              <label className="text-sm text-gray-600">Brightness</label>
              <input
                type="range"
                min="0"
                max="100"
                value={device.data.brightness}
                onChange={(e) => onUpdate(device.id, { brightness: Number(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-sm text-gray-600">{device.data.brightness}%</span>
            </div>
          )}

          {device.type === 'ac' && device.data?.temperature !== undefined && (
            <div className="space-y-2">
              <label className="text-sm text-gray-600">Temperature</label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => onUpdate(device.id, { temperature: device.data!.temperature! - 1 })}
                  className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  -
                </button>
                <span className="text-lg font-medium">{device.data.temperature}°C</span>
                <button
                  onClick={() => onUpdate(device.id, { temperature: device.data!.temperature! + 1 })}
                  className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  +
                </button>
              </div>
            </div>
          )}

          {device.type === 'camera' && device.data?.streamUrl && (
            <div className="space-y-2">
              <img
                src={device.data.streamUrl}
                alt="Camera Feed"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}