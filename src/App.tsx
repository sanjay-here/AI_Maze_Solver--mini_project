import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import MazeGrid from './components/MazeGrid';
import Controls from './components/Controls';
import Legend from './components/Legend';
import { useMaze } from './hooks/useMaze';

function App() {
  const {
    maze,
    rows,
    cols,
    wallPercentage,
    algorithm,
    visualizationSpeed,
    visitedCells,
    pathCells,
    isVisualizing,
    timeElapsed,
    nodesExplored,
    hasPath,
    handleCellClick,
    startVisualization,
    stopVisualization,
    handleClearPath,
    handleResetMaze,
    updateConfig,
    setAlgorithm,
    setVisualizationSpeed,
    saveMazeConfig,
    loadMazeConfig
  } = useMaze();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      
      <main className="container mx-auto px-4 flex-grow">
        <Controls
          rows={rows}
          cols={cols}
          wallPercentage={wallPercentage}
          algorithm={algorithm}
          visualizationSpeed={visualizationSpeed}
          isVisualizing={isVisualizing}
          onStartVisualization={startVisualization}
          onStopVisualization={stopVisualization}
          onClearPath={handleClearPath}
          onResetMaze={handleResetMaze}
          onSaveMaze={saveMazeConfig}
          onLoadMaze={loadMazeConfig}
          onUpdateConfig={updateConfig}
          onSetAlgorithm={setAlgorithm}
          onSetSpeed={setVisualizationSpeed}
          hasPath={hasPath}
          timeElapsed={timeElapsed}
          nodesExplored={nodesExplored}
        />
        
        <Legend />
        
        <div className="flex justify-center">
          <MazeGrid
            maze={maze}
            onCellClick={handleCellClick}
            visitedCells={visitedCells}
            pathCells={pathCells}
            isVisualizing={isVisualizing}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;