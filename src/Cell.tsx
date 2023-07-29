/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
import { times } from 'lodash-es';
import React from 'react';

import { CellState, Coordinate, NumberOption } from './App.types';

function Cell({
  state,
  column,
  row,
  highlighted,
  selectedExplicit,
  selectedImplicit,
  setHoverCell,
  setSelectedCell,
  togglePossibilities,
}: {
  state: CellState;
  column: number;
  row: number;
  highlighted: boolean;
  selectedExplicit: boolean;
  selectedImplicit: boolean;
  setHoverCell: (coordinate: Coordinate) => void;
  setSelectedCell: (coordinate: Coordinate) => void;
  togglePossibilities: (possibility: NumberOption) => void;
}) {
  const renderCellContent = () => {
    if (state.value) {
      return <div className="c-cell__single-value">{state.value}</div>;
    } else {
      return (
        <>
          {times(9, (possibility) => {
            possibility = possibility + 1;
            return (
              <div
                key={'possibility-' + row + '-' + column + '-' + possibility}
                onClick={() =>
                  selectedExplicit && togglePossibilities(possibility as NumberOption)
                }
              >
                {state.possibilities.includes(possibility as NumberOption)
                  ? String(possibility)
                  : ''}
              </div>
            );
          })}
        </>
      );
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/mouse-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      className={
        'c-cell' +
        (highlighted ? ' c-cell--highlighted' : '') +
        (selectedExplicit ? ' c-cell--selected-explicit' : '') +
        (selectedImplicit ? ' c-cell--selected-implicit' : '')
      }
      onMouseOver={(evt) => {
        evt.stopPropagation();
        setHoverCell({ row, column });
      }}
      onClick={(evt) => {
        evt.stopPropagation();
        setSelectedCell({ row, column });
      }}
    >
      {renderCellContent()}
    </div>
  );
}

export default Cell;
