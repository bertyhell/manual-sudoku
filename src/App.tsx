/* eslint-disable jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events,jsx-a11y/mouse-events-have-key-events */
import './App.scss';

import { cloneDeep, times } from 'lodash-es';
import React, { useState } from 'react';

import { CLUSTER_AND_CELL_INDEX_TO_ROW_AND_COLUMN } from './App.consts';
import { CellState, Coordinate, NumberOption } from './App.types';
import Cell from './Cell';

const defaultCellState: CellState = {
  value: null,
  possibilities: [1, 2, 3, 4, 5, 6, 7, 8, 9],
};

function App() {
  const [state, setState] = useState<CellState[][]>(
    times(9, () => times(9, () => cloneDeep(defaultCellState))),
  );
  const [hoverCell, setHoverCell] = useState<Coordinate | null>(null);
  const [selectedCell, setSelectedCell] = useState<Coordinate | null>(null);

  const setValue = (value: NumberOption | null) => {
    if (!selectedCell) {
      window.alert('cannot set value when no cell is selected');
      return;
    }
    const newState = cloneDeep(state);
    if (newState[selectedCell.row][selectedCell.column].value === value) {
      newState[selectedCell.row][selectedCell.column].value = null;
    } else {
      newState[selectedCell.row][selectedCell.column].value = value;
    }
    setState(newState);
  };

  const togglePossibility = (row: number, column: number, possibility: NumberOption) => {
    const newState = cloneDeep(state);
    if (newState[row][column].possibilities.includes(possibility)) {
      newState[row][column].possibilities = newState[row][column].possibilities.filter(
        (p) => p !== possibility,
      );
    } else {
      newState[row][column].possibilities.push(possibility);
      newState[row][column].possibilities.sort();
    }
    setState(newState);
  };

  return (
    <div
      className="c-app"
      onMouseOver={() => setHoverCell(null)}
      onClick={() => setSelectedCell(null)}
    >
      <div className="c-playboard">
        {times(9).map((clusterIndex) => {
          return (
            <div className="c-cluster" key={'cluster-' + clusterIndex}>
              {times(9).map((cellIndex) => {
                const { row, column } =
                  CLUSTER_AND_CELL_INDEX_TO_ROW_AND_COLUMN[clusterIndex][cellIndex];
                return (
                  <Cell
                    key={'cell-' + clusterIndex + '-' + cellIndex}
                    state={state[row][column]}
                    row={row}
                    column={column}
                    setHoverCell={setHoverCell}
                    setSelectedCell={setSelectedCell}
                    selectedExplicit={
                      selectedCell?.row === row && selectedCell?.column === column
                    }
                    selectedImplicit={
                      !!selectedCell &&
                      (selectedCell?.row === row ||
                        selectedCell.column === column ||
                        (Math.floor(selectedCell?.row / 3) === Math.floor(row / 3) &&
                          Math.floor(selectedCell?.column / 3) ===
                            Math.floor(column / 3)))
                    }
                    highlighted={
                      !!hoverCell &&
                      (hoverCell?.row === row ||
                        hoverCell.column === column ||
                        (Math.floor(hoverCell?.row / 3) === Math.floor(row / 3) &&
                          Math.floor(hoverCell?.column / 3) === Math.floor(column / 3)))
                    }
                    togglePossibilities={(possibility: NumberOption) =>
                      togglePossibility(row, column, possibility)
                    }
                  />
                );
              })}
            </div>
          );
        })}
      </div>
      <div className={'c-options' + (selectedCell ? ' c-options--enabled' : '')}>
        {times(9, (val) => val + 1).map((value) => {
          return (
            <div
              key={'set-value-' + value}
              onClick={(evt) => {
                evt.stopPropagation();
                setValue(value as NumberOption);
              }}
            >
              {value}
            </div>
          );
        })}
        <div
          onClick={(evt) => {
            evt.stopPropagation();
            setValue(null);
          }}
        >
          X
        </div>
      </div>
    </div>
  );
}

export default App;
