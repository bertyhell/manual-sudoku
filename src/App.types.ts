export type NumberOption = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface CellState {
  value: NumberOption | null;
  possibilities: NumberOption[];
}

export interface Coordinate {
  row: number;
  column: number;
}
