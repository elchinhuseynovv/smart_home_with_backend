import { Device, AutomationRule, Room } from './types';

export const devices: Device[] = [
  {
    id: '1',
    name: 'Living Room Light',
    type: 'light',
    status: true,
    data: { brightness: 80 },
    room: 'living'
  },
  {
    id: '2',
    name: 'Bedroom AC',
    type: 'ac',
    status: true,
    data: { temperature: 22 },
    room: 'bedroom'
  },
  {
    id: '3',
    name: 'Front Door Camera',
    type: 'camera',
    status: true,
    data: { 
      streamUrl: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=800&q=80'
    },
    room: 'entrance'
  }
];

export const automationRules: AutomationRule[] = [
  {
    id: '1',
    name: 'Night Mode',
    condition: 'Time is 10:00 PM',
    action: 'Turn off all lights',
    enabled: true
  },
  {
    id: '2',
    name: 'Morning Routine',
    condition: 'Time is 7:00 AM',
    action: 'Turn on living room lights, set AC to 23°C',
    enabled: true
  }
];

export const rooms: Room[] = [
  {
    id: 'living',
    name: 'Living Room',
    devices: devices.filter(d => d.room === 'living')
  },
  {
    id: 'bedroom',
    name: 'Bedroom',
    devices: devices.filter(d => d.room === 'bedroom')
  },
  {
    id: 'entrance',
    name: 'Entrance',
    devices: devices.filter(d => d.room === 'entrance')
  }
];