import Column from 'components/Column/Column'
import React, { useState, useEffect, useRef } from 'react'
import { isEmpty } from 'lodash'
import { initialData } from '../../actions/initialData'
import { mapOrder } from 'utilities/sort'
import { Container, Draggable } from 'react-smooth-dnd';
import { applyDrag } from 'utilities/dragDrop'
import { Container as BootstrapContainer, Row, Col, Form, Button } from 'react-bootstrap'
import './Board.scss'

const Board = () => {
    const [board, setBoard] = useState({})
    const [columns, setColumns] = useState([])
    const [openNewColumn, setOpenNewColumn] = useState(false)
    const [newColumnTitle, setNewColumnTitle] = useState('')
    const inputRef = useRef(null)
    
    useEffect(() => {
        const boardFromDB = initialData.boards.find(item => item.id === 'board-1');
        if(boardFromDB) {
            setBoard(boardFromDB)
            //sort column
            setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, 'id'))
        }
    }, [])

    useEffect(() => {
        if(inputRef && inputRef.current) {
            inputRef.current.focus()
            inputRef.current.select()
        }
    }, [openNewColumn])

    if (isEmpty(board)) {
        return <div className='not-found'>Board not found!</div>
    }

    const onColumnDrop = (dropResult) => {
        //lấy lại column mới sau khi đã kéo thả
        let newColumns = [...columns]
        newColumns = applyDrag(newColumns, dropResult)

        //cập nhật lại board mới sau khi kéo thả
        let newBoard = {...board} 
        newBoard.columnOrder = newColumns.map(c => c.id)
        newBoard.columns = newColumns

        setColumns(newColumns)
        setBoard(newBoard)
    }

    const onCardDrop = (columnId, dropResult) => {
        if(dropResult.addedIndex !== null || dropResult.removedIndex !== null) {
            let newColumns = [...columns]
            let currentColumn = newColumns.find(c => c.id === columnId)
            currentColumn.cards = applyDrag(currentColumn.cards, dropResult)
            currentColumn.cardOrder = currentColumn.cards.map(c => c.id)
            setColumns(newColumns)
        }
    }

    const handleOpenNewColumn = () => {
        setOpenNewColumn(true)
    }

    const handleCloseNewColumn = () => {
        setOpenNewColumn(false)
    }

    const handleAddNewColumn = () => {
        if(!newColumnTitle) {
            inputRef.current.focus()
            return
        }
        const newColumn = {
            id: Math.random().toString(36).substring(2, 5),
            boardId: board.id,
            title: newColumnTitle.trim(),
            cardOrder: [],
            cards: []
        }

        let newColumns = [...columns];
        newColumns.push(newColumn)

        let newBoard = {...board} 
        newBoard.columnOrder = newColumns.map(c => c.id)
        newBoard.columns = newColumns

        setColumns(newColumns)
        setBoard(newBoard)
        setNewColumnTitle('')
        inputRef.current.focus()
    }

    const onUpdateTitleColumn = (titleUpdate) => {
        const columnId = titleUpdate.id
        let newColumns = [...columns];
        const columnIndex = newColumns.findIndex(item => item.id === columnId)

        if(titleUpdate._destroy) {
            //remove column
            newColumns.splice(columnIndex, 1)
        } else {
            //update title column
            newColumns.splice(columnIndex, 1, titleUpdate)
        }

        let newBoard = {...board} 
        newBoard.columnOrder = newColumns.map(c => c.id)
        newBoard.columns = newColumns

        setColumns(newColumns)
        setBoard(newBoard)
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
                            <Column 
                                column={column} 
                                onCardDrop={onCardDrop} 
                                onUpdateTitleColumn={onUpdateTitleColumn} 
                            />
                        </Draggable>
                    )
                })}
            </Container>
            <BootstrapContainer>
                {!openNewColumn ?
                    <Row>
                        <Col className='board-add' onClick={handleOpenNewColumn}> 
                            <i className="fa-solid fa-plus"></i>Add another column
                        </Col>
                    </Row>
                    :
                    <Row>
                        <Col className='board-form'> 
                            <Form.Control 
                                type="text" 
                                placeholder="Enter column title..."
                                className='board-add__input' 
                                ref={inputRef}
                                value={newColumnTitle}
                                onChange={e => setNewColumnTitle(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleAddNewColumn()}
                            />
                            <Button 
                                variant="primary"
                                onClick={handleAddNewColumn}
                            >Add column</Button> 
                            <span 
                                className='board-close'
                                onClick={handleCloseNewColumn}
                            ><i className="fa-solid fa-xmark"></i></span> 
                        </Col>
                    </Row>
                }
            </BootstrapContainer>
        </div>
    )
}

export default Board