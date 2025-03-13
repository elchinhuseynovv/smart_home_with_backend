import React, { useEffect, useState } from 'react';
import { Device } from '../types';

interface PythonAnalyticsProps {
  devices: Device[];
}

declare global {
  interface Window {
    loadPyodide: () => Promise<any>;
  }
}

export function PythonAnalytics({ devices }: PythonAnalyticsProps) {
  const [analytics, setAnalytics] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function runPythonAnalysis() {
      try {
        const pyodide = await window.loadPyodide();
        
        // Python code as a template string
        const pythonCode = `
import json
from datetime import datetime

def analyze_device_usage(devices_json):
    devices = json.loads(devices_json)
    
    # Calculate usage statistics
    stats = {
        'active_devices': len([d for d in devices if d['status']]),
        'total_devices': len(devices),
        'lights_brightness_avg': 0,
        'ac_temp_avg': 0
    }
    
    # Calculate averages
    lights = [d for d in devices if d['type'] == 'light' and d['status']]
    if lights:
        stats['lights_brightness_avg'] = sum(d['data'].get('brightness', 0) for d in lights) / len(lights)
    
    acs = [d for d in devices if d['type'] == 'ac' and d['status']]
    if acs:
        stats['ac_temp_avg'] = sum(d['data'].get('temperature', 0) for d in acs) / len(acs)
    
    return json.dumps(stats)
`;

        // Load the Python code
        await pyodide.runPythonAsync(pythonCode);
        
        // Convert devices to JSON and run analysis
        const result = await pyodide.runPythonAsync(`
analyze_device_usage('${JSON.stringify(devices)}')
`);
        
        setAnalytics(JSON.parse(result));
        setLoading(false);
      } catch (error) {
        console.error('Error running Python analysis:', error);
        setLoading(false);
      }
    }

    runPythonAnalysis();
  }, [devices]);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <p>Loading analytics...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4">Device Analytics (Python-powered)</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-purple-50 rounded-lg">
          <p className="text-sm text-purple-600">Active Devices</p>
          <p className="text-2xl font-bold">{analytics.active_devices} / {analytics.total_devices}</p>
        </div>
        <div className="p-4 bg-yellow-50 rounded-lg">
          <p className="text-sm text-yellow-600">Avg. Light Brightness</p>
          <p className="text-2xl font-bold">{analytics.lights_brightness_avg.toFixed(1)}%</p>
        </div>
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-600">Avg. AC Temperature</p>
          <p className="text-2xl font-bold">{analytics.ac_temp_avg.toFixed(1)}°C</p>
        </div>
      </div>
    </div>
  );
}