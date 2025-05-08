import { Maze, Position } from '../types';

// Breadth-First Search Algorithm
export const bfs = (
  maze: Maze,
  start: Position,
  end: Position,
  animationCallback: (visitedNodes: Position[], path: Position[]) => void
): void => {
  const rows = maze.length;
  const cols = maze[0].length;
  
  // Create a deep copy of the maze for our algorithm
  const workingMaze = JSON.parse(JSON.stringify(maze)) as Maze;
  
  // Initialize visited array
  const visited: boolean[][] = Array(rows)
    .fill(false)
    .map(() => Array(cols).fill(false));
  
  // Movement directions (up, right, down, left)
  const directions = [
    { row: -1, col: 0 },
    { row: 0, col: 1 },
    { row: 1, col: 0 },
    { row: 0, col: -1 },
  ];
  
  // Queue for BFS
  const queue: Position[] = [start];
  
  // Mark start as visited
  visited[start.row][start.col] = true;
  
  // For visualization
  const visitedNodes: Position[] = [];
  
  // For pathfinding
  const parents: Record<string, Position | null> = {};
  const posToString = (pos: Position): string => `${pos.row},${pos.col}`;
  parents[posToString(start)] = null;
  
  const processQueue = () => {
    // If queue is empty, no path exists
    if (queue.length === 0) {
      animationCallback(visitedNodes, []);
      return;
    }
    
    // Get the first position from the queue
    const current = queue.shift()!;
    visitedNodes.push(current);
    
    // Check if we reached the end
    if (current.row === end.row && current.col === end.col) {
      // Reconstruct path
      const path: Position[] = [];
      let currentPos: Position | null = end;
      
      while (currentPos) {
        path.unshift(currentPos);
        const parentPos = parents[posToString(currentPos)];
        currentPos = parentPos;
      }
      
      // Return the path
      animationCallback(visitedNodes, path);
      return;
    }
    
    // Explore all four directions
    for (const dir of directions) {
      const newRow = current.row + dir.row;
      const newCol = current.col + dir.col;
      
      // Check if the new position is valid
      if (
        newRow >= 0 &&
        newRow < rows &&
        newCol >= 0 &&
        newCol < cols &&
        !visited[newRow][newCol] &&
        workingMaze[newRow][newCol].type !== 'wall'
      ) {
        // Mark as visited
        visited[newRow][newCol] = true;
        
        // Add to queue
        const newPos = { row: newRow, col: newCol };
        queue.push(newPos);
        
        // Set parent for path reconstruction
        parents[posToString(newPos)] = current;
      }
    }
    
    // Continue processing
    setTimeout(processQueue, 10);
  };
  
  // Start the BFS process
  processQueue();
};