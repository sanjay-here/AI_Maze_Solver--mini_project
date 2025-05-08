import React from 'react';
import { CELL_COLORS } from '../constants';

const Legend: React.FC = () => {
  const legendItems = [
    { type: 'start', label: 'Start' },
    { type: 'end', label: 'End' },
    { type: 'wall', label: 'Wall' },
    { type: 'empty', label: 'Empty' },
    { type: 'visited', label: 'Visited' },
    { type: 'path', label: 'Path' },
  ];

  return (
    <div className="mb-8 max-w-4xl mx-auto">
      <div className="bg-white shadow-md rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-3">Legend</h3>
        <div className="flex flex-wrap gap-4">
          {legendItems.map((item) => (
            <div key={item.type} className="flex items-center">
              <div
                className="w-6 h-6 border border-gray-300 mr-2"
                style={{ backgroundColor: CELL_COLORS[item.type as keyof typeof CELL_COLORS] }}
              />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 text-sm text-gray-600">
          <p><strong>Click on the grid</strong> to toggle walls. <strong>Click and drag</strong> to draw walls quickly.</p>
          <p className="mt-1"><strong>Maze Tools:</strong> Use the controls above to generate new mazes, run algorithms, and adjust settings.</p>
        </div>
      </div>
    </div>
  );
};

export default Legend;