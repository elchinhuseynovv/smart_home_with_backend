export interface Device {
  id: string;
  name: string;
  type: 'light' | 'ac' | 'camera';
  status: boolean;
  data?: {
    brightness?: number;
    temperature?: number;
    streamUrl?: string;
  };
  room: string;
}

export interface AutomationRule {
  id: string;
  name: string;
  condition: string;
  action: string;
  enabled: boolean;
}

export interface Room {
  id: string;
  name: string;
  devices: Device[];
}