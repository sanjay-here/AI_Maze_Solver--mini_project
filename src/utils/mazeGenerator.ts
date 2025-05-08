import { 
  DEFAULT_ROWS, 
  DEFAULT_COLS, 
  DEFAULT_WALL_PERCENTAGE 
} from '../constants';
import { Maze, MazeCell, Position } from '../types';

// Initialize an empty maze grid
export const initializeMaze = (
  rows: number = DEFAULT_ROWS, 
  cols: number = DEFAULT_COLS
): Maze => {
  const maze: Maze = [];

  for (let i = 0; i < rows; i++) {
    const row: MazeCell[] = [];
    for (let j = 0; j < cols; j++) {
      row.push({
        type: 'empty',
        position: { row: i, col: j },
      });
    }
    maze.push(row);
  }

  return maze;
};

// Generate a random maze with walls
export const generateRandomMaze = (
  rows: number = DEFAULT_ROWS,
  cols: number = DEFAULT_COLS,
  wallPercentage: number = DEFAULT_WALL_PERCENTAGE
): Maze => {
  const maze = initializeMaze(rows, cols);
  
  // Add random walls
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (Math.random() < wallPercentage) {
        maze[i][j].type = 'wall';
      }
    }
  }
  
  return maze;
};

// Set start and end points
export const setStartAndEnd = (
  maze: Maze,
  start: Position,
  end: Position
): Maze => {
  const newMaze = JSON.parse(JSON.stringify(maze)) as Maze;
  
  // Ensure start and end positions are not walls
  newMaze[start.row][start.col].type = 'start';
  newMaze[end.row][end.col].type = 'end';
  
  return newMaze;
};

// Generate random start and end positions
export const generateRandomPositions = (
  rows: number,
  cols: number,
  maze: Maze
): { start: Position; end: Position } => {
  const getRandomPosition = (): Position => {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);
    return { row, col };
  };

  let start = getRandomPosition();
  while (maze[start.row][start.col].type === 'wall') {
    start = getRandomPosition();
  }

  let end = getRandomPosition();
  while (
    maze[end.row][end.col].type === 'wall' ||
    (end.row === start.row && end.col === start.col)
  ) {
    end = getRandomPosition();
  }

  return { start, end };
};

// Clear the maze, keeping only walls
export const clearPath = (maze: Maze): Maze => {
  const newMaze = JSON.parse(JSON.stringify(maze)) as Maze;
  
  for (let i = 0; i < newMaze.length; i++) {
    for (let j = 0; j < newMaze[0].length; j++) {
      if (newMaze[i][j].type === 'visited' || newMaze[i][j].type === 'path') {
        newMaze[i][j].type = 'empty';
      }
    }
  }
  
  return newMaze;
};

// Reset the maze completely - remove walls, paths, etc.
export const resetMaze = (maze: Maze): Maze => {
  const rows = maze.length;
  const cols = maze[0].length;
  return initializeMaze(rows, cols);
};

// Toggle a cell's type (wall/empty)
export const toggleCellType = (
  maze: Maze,
  position: Position,
  start: Position,
  end: Position
): Maze => {
  const { row, col } = position;
  const newMaze = JSON.parse(JSON.stringify(maze)) as Maze;
  
  // Don't allow changing start or end positions
  if (
    (row === start.row && col === start.col) ||
    (row === end.row && col === end.col)
  ) {
    return newMaze;
  }
  
  // Toggle between wall and empty
  newMaze[row][col].type = newMaze[row][col].type === 'wall' ? 'empty' : 'wall';
  
  return newMaze;
};

// Save maze configuration
export const saveMaze = (maze: Maze, name: string): void => {
  localStorage.setItem(`maze-${name}`, JSON.stringify(maze));
};

// Load maze configuration
export const loadMaze = (name: string): Maze | null => {
  const savedMaze = localStorage.getItem(`maze-${name}`);
  return savedMaze ? JSON.parse(savedMaze) : null;
};