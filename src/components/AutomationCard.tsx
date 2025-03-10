import React from 'react';
import { AutomationRule } from '../types';
import { Clock, ToggleLeft as Toggle } from 'lucide-react';

interface AutomationCardProps {
  rule: AutomationRule;
  onToggle: (id: string) => void;
}

export function AutomationCard({ rule, onToggle }: AutomationCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-purple-500" />
            <h3 className="text-lg font-semibold">{rule.name}</h3>
          </div>
          <p className="text-sm text-gray-600">When: {rule.condition}</p>
          <p className="text-sm text-gray-600">Then: {rule.action}</p>
        </div>
        <button
          onClick={() => onToggle(rule.id)}
          className={`p-2 rounded-full transition-colors ${
            rule.enabled ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-400'
          }`}
        >
          <Toggle className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}