import { useState, useCallback, useEffect } from 'react';
import { Maze, Position, AlgorithmType, VisualizationSpeed, MazeConfig } from '../types';
import { 
  generateRandomMaze, 
  generateRandomPositions, 
  setStartAndEnd, 
  toggleCellType,
  clearPath,
  resetMaze,
  saveMaze as saveMazeUtil,
  loadMaze as loadMazeUtil
} from '../utils/mazeGenerator';
import { bfs } from '../algorithms/bfs';
import { dfs } from '../algorithms/dfs';
import { 
  DEFAULT_ROWS, 
  DEFAULT_COLS, 
  DEFAULT_WALL_PERCENTAGE,
  VISUALIZATION_SPEED
} from '../constants';

export const useMaze = () => {
  // Maze state
  const [rows, setRows] = useState(DEFAULT_ROWS);
  const [cols, setCols] = useState(DEFAULT_COLS);
  const [wallPercentage, setWallPercentage] = useState(DEFAULT_WALL_PERCENTAGE);
  const [maze, setMaze] = useState<Maze>(() => 
    generateRandomMaze(rows, cols, wallPercentage)
  );
  const [start, setStart] = useState<Position>({ row: 0, col: 0 });
  const [end, setEnd] = useState<Position>({ row: rows - 1, col: cols - 1 });
  
  // Visualization state
  const [visitedCells, setVisitedCells] = useState<Position[]>([]);
  const [pathCells, setPathCells] = useState<Position[]>([]);
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [algorithm, setAlgorithm] = useState<AlgorithmType>('bfs');
  const [visualizationSpeed, setVisualizationSpeed] = useState<VisualizationSpeed>('medium');
  const [timeElapsed, setTimeElapsed] = useState<number | null>(null);
  const [nodesExplored, setNodesExplored] = useState(0);
  const [hasPath, setHasPath] = useState(false);
  
  // Initialize the maze
  useEffect(() => {
    initializeMaze();
  }, [rows, cols, wallPercentage]);
  
  // Initialize the maze with random positions
  const initializeMaze = useCallback(() => {
    const newMaze = generateRandomMaze(rows, cols, wallPercentage);
    const positions = generateRandomPositions(rows, cols, newMaze);
    setStart(positions.start);
    setEnd(positions.end);
    setMaze(setStartAndEnd(newMaze, positions.start, positions.end));
    setVisitedCells([]);
    setPathCells([]);
    setTimeElapsed(null);
    setNodesExplored(0);
    setHasPath(false);
  }, [rows, cols, wallPercentage]);
  
  // Handle cell click to toggle walls
  const handleCellClick = useCallback((position: Position) => {
    if (isVisualizing) return;
    
    setMaze((prevMaze) => toggleCellType(prevMaze, position, start, end));
  }, [isVisualizing, start, end]);
  
  // Start visualization
  const startVisualization = useCallback(() => {
    if (isVisualizing) return;
    
    setIsVisualizing(true);
    setVisitedCells([]);
    setPathCells([]);
    setTimeElapsed(null);
    setNodesExplored(0);
    setHasPath(false);
    
    const startTime = performance.now();
    
    // Use the selected algorithm
    const animationCallback = (
      visitedNodes: Position[],
      path: Position[]
    ) => {
      const endTime = performance.now();
      setTimeElapsed(endTime - startTime);
      setNodesExplored(visitedNodes.length);
      setHasPath(path.length > 0);
      
      // Visualize the explored path step by step
      let visCount = 0;
      const speed = VISUALIZATION_SPEED[visualizationSpeed];
      
      const visInterval = setInterval(() => {
        if (visCount >= visitedNodes.length) {
          clearInterval(visInterval);
          
          // Start path visualization after visited cells
          let pathCount = 0;
          if (path.length > 0) {
            const pathInterval = setInterval(() => {
              if (pathCount >= path.length) {
                clearInterval(pathInterval);
                setIsVisualizing(false);
                return;
              }
              
              setPathCells((prev) => [...prev, path[pathCount]]);
              pathCount++;
            }, speed / 2);
          } else {
            setIsVisualizing(false);
          }
          
          return;
        }
        
        setVisitedCells((prev) => [...prev, visitedNodes[visCount]]);
        visCount++;
      }, speed);
    };
    
    if (algorithm === 'bfs') {
      bfs(maze, start, end, animationCallback);
    } else if (algorithm === 'dfs') {
      dfs(maze, start, end, animationCallback);
    }
  }, [maze, start, end, algorithm, visualizationSpeed, isVisualizing]);
  
  // Stop visualization
  const stopVisualization = useCallback(() => {
    setIsVisualizing(false);
  }, []);
  
  // Clear the path
  const handleClearPath = useCallback(() => {
    if (isVisualizing) return;
    
    setMaze((prevMaze) => clearPath(prevMaze));
    setVisitedCells([]);
    setPathCells([]);
    setTimeElapsed(null);
    setNodesExplored(0);
    setHasPath(false);
  }, [isVisualizing]);
  
  // Reset the maze completely
  const handleResetMaze = useCallback(() => {
    if (isVisualizing) return;
    
    initializeMaze();
  }, [isVisualizing, initializeMaze]);
  
  // Update maze configuration
  const updateConfig = useCallback((config: Partial<MazeConfig>) => {
    if (isVisualizing) return;
    
    if (config.rows !== undefined) setRows(config.rows);
    if (config.cols !== undefined) setCols(config.cols);
    if (config.wallPercentage !== undefined) setWallPercentage(config.wallPercentage);
    if (config.start !== undefined) setStart(config.start);
    if (config.end !== undefined) setEnd(config.end);
  }, [isVisualizing]);
  
  // Save maze
  const saveMazeConfig = useCallback((name: string) => {
    if (isVisualizing) return;
    
    const mazeConfig = {
      maze,
      start,
      end,
      rows,
      cols,
      wallPercentage
    };
    
    saveMazeUtil(mazeConfig, name);
  }, [isVisualizing, maze, start, end, rows, cols, wallPercentage]);
  
  // Load maze
  const loadMazeConfig = useCallback((name: string) => {
    if (isVisualizing) return;
    
    const loadedMaze = loadMazeUtil(name);
    if (loadedMaze) {
      const mazeConfig = loadedMaze;
      setMaze(mazeConfig.maze);
      setStart(mazeConfig.start);
      setEnd(mazeConfig.end);
      setRows(mazeConfig.rows);
      setCols(mazeConfig.cols);
      setWallPercentage(mazeConfig.wallPercentage);
      setVisitedCells([]);
      setPathCells([]);
      setTimeElapsed(null);
      setNodesExplored(0);
      setHasPath(false);
    }
  }, [isVisualizing]);
  
  return {
    maze,
    start,
    end,
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
  };
};