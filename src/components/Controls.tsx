import React, { useState } from 'react';
import { 
  Play, 
  Square, 
  RefreshCw, 
  Save, 
  Upload, 
  Settings, 
  ChevronDown 
} from 'lucide-react';
import { 
  AlgorithmType, 
  MazeConfig, 
  Position, 
  VisualizationSpeed 
} from '../types';
import { 
  MIN_DIMENSION, 
  MAX_DIMENSION, 
  VISUALIZATION_SPEED 
} from '../constants';

interface ControlsProps {
  rows: number;
  cols: number;
  wallPercentage: number;
  algorithm: AlgorithmType;
  visualizationSpeed: VisualizationSpeed;
  isVisualizing: boolean;
  onStartVisualization: () => void;
  onStopVisualization: () => void;
  onClearPath: () => void;
  onResetMaze: () => void;
  onSaveMaze: (name: string) => void;
  onLoadMaze: (name: string) => void;
  onUpdateConfig: (config: Partial<MazeConfig>) => void;
  onSetAlgorithm: (algo: AlgorithmType) => void;
  onSetSpeed: (speed: VisualizationSpeed) => void;
  hasPath: boolean;
  timeElapsed: number | null;
  nodesExplored: number;
}

const Controls: React.FC<ControlsProps> = ({
  rows,
  cols,
  wallPercentage,
  algorithm,
  visualizationSpeed,
  isVisualizing,
  onStartVisualization,
  onStopVisualization,
  onClearPath,
  onResetMaze,
  onSaveMaze,
  onLoadMaze,
  onUpdateConfig,
  onSetAlgorithm,
  onSetSpeed,
  hasPath,
  timeElapsed,
  nodesExplored
}) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [saveName, setSaveName] = useState('my-maze');
  const [savedMazes, setSavedMazes] = useState<string[]>([]);

  // Load saved maze names from localStorage
  React.useEffect(() => {
    const mazeKeys = Object.keys(localStorage)
      .filter(key => key.startsWith('maze-'))
      .map(key => key.replace('maze-', ''));
    setSavedMazes(mazeKeys);
  }, []);

  const handleSave = () => {
    onSaveMaze(saveName);
    if (!savedMazes.includes(saveName)) {
      setSavedMazes([...savedMazes, saveName]);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-6">
      <div className="bg-white shadow-md rounded-lg p-4">
        {/* Main Controls */}
        <div className="flex flex-wrap justify-between items-center mb-4">
          <div className="flex gap-2 mb-2 sm:mb-0">
            <button
              className={`px-4 py-2 rounded-md flex items-center gap-1 ${
                isVisualizing
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
              onClick={isVisualizing ? onStopVisualization : onStartVisualization}
              disabled={isVisualizing}
            >
              {isVisualizing ? (
                <>
                  <Square size={16} /> Stop
                </>
              ) : (
                <>
                  <Play size={16} /> Solve
                </>
              )}
            </button>
            <button
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md flex items-center gap-1"
              onClick={onClearPath}
              disabled={isVisualizing}
            >
              <RefreshCw size={16} /> Clear Path
            </button>
            <button
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md flex items-center gap-1"
              onClick={onResetMaze}
              disabled={isVisualizing}
            >
              <RefreshCw size={16} /> Reset Maze
            </button>
          </div>

          <div className="flex items-center">
            <button
              className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-md flex items-center gap-1"
              onClick={() => setSettingsOpen(!settingsOpen)}
            >
              <Settings size={16} />
              Settings
              <ChevronDown size={16} className={`transition-transform ${settingsOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* Settings Panel */}
        {settingsOpen && (
          <div className="border-t border-gray-200 pt-4 mt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Maze Configuration</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Rows ({MIN_DIMENSION}-{MAX_DIMENSION})
                    </label>
                    <input
                      type="number"
                      min={MIN_DIMENSION}
                      max={MAX_DIMENSION}
                      value={rows}
                      onChange={(e) => 
                        onUpdateConfig({ rows: Math.max(MIN_DIMENSION, Math.min(MAX_DIMENSION, parseInt(e.target.value) || MIN_DIMENSION)) })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      disabled={isVisualizing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Columns ({MIN_DIMENSION}-{MAX_DIMENSION})
                    </label>
                    <input
                      type="number"
                      min={MIN_DIMENSION}
                      max={MAX_DIMENSION}
                      value={cols}
                      onChange={(e) => 
                        onUpdateConfig({ cols: Math.max(MIN_DIMENSION, Math.min(MAX_DIMENSION, parseInt(e.target.value) || MIN_DIMENSION)) })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      disabled={isVisualizing}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Wall Density ({(wallPercentage * 100).toFixed(0)}%)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="0.5"
                    step="0.05"
                    value={wallPercentage}
                    onChange={(e) => onUpdateConfig({ wallPercentage: parseFloat(e.target.value) })}
                    className="w-full"
                    disabled={isVisualizing}
                  />
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Algorithm Settings</h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Algorithm
                  </label>
                  <div className="flex gap-2">
                    <button
                      className={`px-4 py-2 rounded-md ${
                        algorithm === 'bfs'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 hover:bg-gray-300'
                      }`}
                      onClick={() => onSetAlgorithm('bfs')}
                      disabled={isVisualizing}
                    >
                      BFS
                    </button>
                    <button
                      className={`px-4 py-2 rounded-md ${
                        algorithm === 'dfs'
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 hover:bg-gray-300'
                      }`}
                      onClick={() => onSetAlgorithm('dfs')}
                      disabled={isVisualizing}
                    >
                      DFS
                    </button>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Visualization Speed
                  </label>
                  <div className="flex gap-2">
                    <button
                      className={`px-3 py-1 rounded-md ${
                        visualizationSpeed === 'slow'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 hover:bg-gray-300'
                      }`}
                      onClick={() => onSetSpeed('slow')}
                      disabled={isVisualizing}
                    >
                      Slow
                    </button>
                    <button
                      className={`px-3 py-1 rounded-md ${
                        visualizationSpeed === 'medium'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 hover:bg-gray-300'
                      }`}
                      onClick={() => onSetSpeed('medium')}
                      disabled={isVisualizing}
                    >
                      Medium
                    </button>
                    <button
                      className={`px-3 py-1 rounded-md ${
                        visualizationSpeed === 'fast'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 hover:bg-gray-300'
                      }`}
                      onClick={() => onSetSpeed('fast')}
                      disabled={isVisualizing}
                    >
                      Fast
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 border-t border-gray-200 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Save/Load Maze</h3>
                  <div className="flex items-end gap-2">
                    <div className="flex-grow">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Maze Name
                      </label>
                      <input
                        type="text"
                        value={saveName}
                        onChange={(e) => setSaveName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        disabled={isVisualizing}
                      />
                    </div>
                    <button
                      className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md flex items-center gap-1"
                      onClick={handleSave}
                      disabled={isVisualizing || !saveName.trim()}
                    >
                      <Save size={16} /> Save
                    </button>
                  </div>
                  {savedMazes.length > 0 && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Load Saved Maze
                      </label>
                      <div className="flex items-center gap-2">
                        <select
                          className="flex-grow px-3 py-2 border border-gray-300 rounded-md"
                          value={saveName}
                          onChange={(e) => setSaveName(e.target.value)}
                          disabled={isVisualizing}
                        >
                          {savedMazes.map((name) => (
                            <option key={name} value={name}>
                              {name}
                            </option>
                          ))}
                        </select>
                        <button
                          className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md flex items-center gap-1"
                          onClick={() => onLoadMaze(saveName)}
                          disabled={isVisualizing || savedMazes.length === 0}
                        >
                          <Upload size={16} /> Load
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Algorithm Performance</h3>
                  <div className="bg-gray-100 p-4 rounded-md">
                    <div className="mb-2">
                      <span className="text-sm font-medium text-gray-700">Time Elapsed:</span>{' '}
                      <span className="font-semibold">
                        {timeElapsed !== null ? `${timeElapsed.toFixed(2)}ms` : 'N/A'}
                      </span>
                    </div>
                    <div className="mb-2">
                      <span className="text-sm font-medium text-gray-700">Nodes Explored:</span>{' '}
                      <span className="font-semibold">{nodesExplored}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-700">Path Found:</span>{' '}
                      <span className={`font-semibold ${hasPath ? 'text-green-600' : 'text-red-600'}`}>
                        {hasPath ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Controls;