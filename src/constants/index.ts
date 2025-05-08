import { AlgorithmType, VisualizationSpeed } from '../types';

export const DEFAULT_ROWS = 15;
export const DEFAULT_COLS = 15;
export const DEFAULT_WALL_PERCENTAGE = 0.2;
export const MIN_DIMENSION = 5;
export const MAX_DIMENSION = 40;

export const CELL_SIZE = {
  MOBILE: 20,
  TABLET: 25,
  DESKTOP: 30,
};

export const ALGORITHM_COLORS: Record<AlgorithmType, string> = {
  bfs: '#3B82F6', // Blue
  dfs: '#10B981', // Green
};

export const VISUALIZATION_SPEED: Record<VisualizationSpeed, number> = {
  slow: 200,
  medium: 100,
  fast: 50,
};

export const CELL_COLORS = {
  empty: '#FFFFFF',
  wall: '#1F2937',
  start: '#F97316', // Orange
  end: '#7C3AED', // Purple
  visited: '#DBEAFE', // Light blue
  path: '#EAB308', // Yellow
};