'use client';

const PRESETS = [0.1, 0.5, 1.0];

interface Props {
  value: number;
  onChange: (v: number) => void;
}

export function SlippageSettings({ value, onChange }: Props) {
  return (
    <div className="bg-surface rounded-xl p-4 border border-surface-border space-y-3">
      <div className="text-sm font-medium">Slippage Tolerance</div>
      <div className="flex items-center gap-2">
        {PRESETS.map((p) => (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
              value === p
                ? 'bg-brand text-white'
                : 'bg-surface-hover hover:bg-surface-border text-gray-300'
            }`}
          >
            {p}%
          </button>
        ))}
        <div className="flex items-center gap-1 flex-1">
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value) || 0.5)}
            className="input-field text-sm py-1.5 text-right"
            min="0.01"
            max="50"
            step="0.1"
          />
          <span className="text-gray-400 text-sm">%</span>
        </div>
      </div>
    </div>
  );
}
