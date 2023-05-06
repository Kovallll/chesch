import React, { FC, useEffect, useState } from 'react'
import { Board } from '../models/Board';
import { Cell } from '../models/Cell';
import { Player } from '../models/Player';
import CellComponent from './CellComponent';

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
    currentPlayer: Player | null;
    swapPlayer: () => void
}

const BoardComponent: FC<BoardProps>= ({swapPlayer, board, setBoard, currentPlayer}) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null)

    function click(cell: Cell) {
        if(selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell);
            swapPlayer()
            setSelectedCell(null);
            updateBoard()
        }
        else {
            if(cell.figure?.color === currentPlayer?.color) {
                setSelectedCell(cell);
            }
        }
    }

    useEffect(() => {
        hightlightCells()
    },[selectedCell])

    function hightlightCells() {
        board.hightlightCells(selectedCell)
        updateBoard()
    }

    function updateBoard() {
        const newBoard = board.getCopyBoard()
        setBoard(newBoard)
    }

    return (
        <>
        <div>Текущий игрок {currentPlayer?.color}</div>
        <div className='board'>
            {board.cells.map((row,index) => 
            <React.Fragment key={index}>
                {row.map(cell => 
                    <CellComponent
                      click={click}
                      cell={cell}
                      key={cell.id}
                      selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                    />    
                )}
            </React.Fragment>
            )}
        </div>
        </>
    )
}

export default BoardComponent