export type CellType = 'empty' | 'wall' | 'start' | 'end' | 'visited' | 'path';

export type Position = {
  row: number;
  col: number;
};

export type MazeCell = {
  type: CellType;
  position: Position;
  distance?: number;
  parent?: Position;
};

export type Maze = MazeCell[][];

export type AlgorithmType = 'bfs' | 'dfs';

export type VisualizationSpeed = 'slow' | 'medium' | 'fast';

export type MazeConfig = {
  rows: number;
  cols: number;
  start: Position;
  end: Position;
  wallPercentage: number;
};