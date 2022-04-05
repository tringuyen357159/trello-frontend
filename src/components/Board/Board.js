import Column from 'components/Column/Column'
import React, { useState, useEffect } from 'react'
import { isEmpty } from 'lodash'
import { initialData } from '../../actions/initialData'
import { mapOrder } from 'utilities/sort'
import { Container, Draggable } from 'react-smooth-dnd';
import './Board.scss'

const Board = () => {
    const [board, setBoard] = useState({})
    const [columns, setColumns] = useState([])

    useEffect(() => {
        const boardFromDB = initialData.boards.find(item => item.id === 'board-1');
        if(boardFromDB) {
            setBoard(boardFromDB)

            //sort column
            setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, 'id'))
        }
    }, [])

    if (isEmpty(board)) {
        return <div className='not-found'>Board not found!</div>
    }

    const onColumnDrop = (dropResult) => {

    }

    return (
        <div className='board-columns'>
            <Container
                orientation="horizontal"
                onDrop={onColumnDrop}
                getChildPayload={index => columns[index]}
                dragHandleSelector=".column-drag-handle"
                dropPlaceholder={{
                    animationDuration: 150,
                    showOnTop: true,
                    className: 'columns-drop-preview'
                }}
            >
                {columns && columns.length > 0 && columns.map((column, index) => {
                    return (
                        <Draggable key={index}>
                            <Column column={column}/>
                        </Draggable>
                    )
                })}
            </Container>
        </div>
    )
}

export default Board