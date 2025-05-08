import { Maze, Position } from '../types';

// Depth-First Search Algorithm
export const dfs = (
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
  
  // Stack for DFS
  const stack: Position[] = [start];
  
  // For visualization
  const visitedNodes: Position[] = [];
  
  // For pathfinding
  const parents: Record<string, Position | null> = {};
  const posToString = (pos: Position): string => `${pos.row},${pos.col}`;
  parents[posToString(start)] = null;
  
  // Check if a path is found
  let pathFound = false;
  
  const processStack = () => {
    // If stack is empty or path is found, we're done
    if (stack.length === 0 || pathFound) {
      if (!pathFound) {
        animationCallback(visitedNodes, []);
      }
      return;
    }
    
    // Get the top position from the stack
    const current = stack.pop()!;
    
    // Skip if already visited
    if (visited[current.row][current.col]) {
      setTimeout(processStack, 10);
      return;
    }
    
    // Mark as visited
    visited[current.row][current.col] = true;
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
      
      // Mark that we found a path
      pathFound = true;
      
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
        // Add to stack
        const newPos = { row: newRow, col: newCol };
        stack.push(newPos);
        
        // Set parent for path reconstruction (only if not already set)
        if (!parents[posToString(newPos)]) {
          parents[posToString(newPos)] = current;
        }
      }
    }
    
    // Continue processing
    setTimeout(processStack, 10);
  };
  
  // Start the DFS process
  processStack();
};