import Card from 'components/Card/Card'
import React, { useState, useEffect, useRef } from 'react'
import { mapOrder } from 'utilities/sort';
import { Container, Draggable } from 'react-smooth-dnd';
import { Dropdown, Form, Button } from 'react-bootstrap';
import ConfirmModal from 'components/Common/ConfirmModal';
import { cloneDeep } from 'lodash';
import './Column.scss'

const Column = (props) => {
    const [showModal, setShowModal] = useState(false)
    const [columnTitle, setColumnTitle] = useState('')
    const [newCardTitle, setNewCardTitle] = useState('')
    const [openNewCard, setOpenNewCard] = useState(false)
    const { column, onCardDrop, onUpdateTitleColumn } = props;
    const textareaRef = useRef(null)
    const cards = mapOrder(column.cards, column.cardOrder, 'id');

    useEffect(() => {
        setColumnTitle(column.title)
    },[column.title])


    useEffect(() => {
        if(textareaRef && textareaRef.current) {
            textareaRef.current.focus()
            textareaRef.current.select()
        }
    }, [openNewCard])

    const handleShowModal = () => {
        setShowModal(!showModal)
    }

    const onConfirmModalAction = (type) => {
        if(type === 'close'){
            setShowModal(!showModal)
        } else if(type === 'confirm') {
            const newColumn = {...column, _destroy: true};
            onUpdateTitleColumn(newColumn)
            setShowModal(!showModal)
            setOpenNewCard(false)
        }
    }

    const handleSelectAllInLineText = (e) => {
        e.target.focus()
        e.target.select()
    }

    const handleSetColumnTitleChange = (e) => {
        setColumnTitle(e.target.value)
    }

    const handleSetColumnTitleBlur = () => {
        const newColumn = {...column, title: columnTitle};
        onUpdateTitleColumn(newColumn)
    }

    const handleSaveTitle = (e) => {
        if(e.key === 'Enter') {
            e.target.blur()
        }
    }

    const handleOpenNewCard = () => {
        setOpenNewCard(true)
    }

    const handleCloseNewCard = () => {
        setOpenNewCard(false)
    }

    const handleAddNewCard = () => {
        if(!newCardTitle) {
            textareaRef.current.focus()
            return
        }

        const newCard = {
            id: Math.random().toString(36).substring(2, 5),
            boardId: column.boardId,
            columnId: column.id,
            title: newCardTitle.trim(),
            cover: null
        }

        let newColumn = cloneDeep(column)
        newColumn.cards.push(newCard)
        newColumn.cardOrder.push(newCard.id)

        onUpdateTitleColumn(newColumn)
        setNewCardTitle('')
        setOpenNewCard(false)
    }

    return (
        <div className='column'>
            <header className='column-drag-handle'>
                <div className='column-title'>
                    <Form.Control 
                        size='sm'
                        type="text" 
                        className='column-title-update content-editable' 
                        value={columnTitle}
                        spellCheck={false}
                        onMouseDown={e => e.preventDefault()}
                        onClick={handleSelectAllInLineText}
                        onChange={handleSetColumnTitleChange}
                        onBlur={handleSetColumnTitleBlur}
                        onKeyDown={handleSaveTitle}
                    />
                </div>
                <div className='column-dropdown-action'>
                    <Dropdown >
                        <Dropdown.Toggle id="dropdown-autoclose-true" />
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={handleOpenNewCard} >Add card...</Dropdown.Item>
                            <Dropdown.Item onClick={handleShowModal} >Remove column...</Dropdown.Item>
                            <Dropdown.Item >Move all card in this column ...</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </header>
            <div className='card-list'>
                <Container
                    orientation="vertical"
                    groupName="col"
                    onDrop={dropResult => onCardDrop(column.id, dropResult)}
                    getChildPayload={index => cards[index]}
                    dragClass='card-ghost'
                    dropClass='card-ghost-drop'
                    dropPlaceholder={{                      
                        animationDuration: 150,
                        showOnTop: true,
                        className: 'card-drop-preview' 
                    }}
                    dropPlaceholderAnimationDuration={200}
                >
                    {cards && cards.length > 0 && cards.map((card, index) => {
                        return (
                            <Draggable key={index}>
                                <Card card={card} />
                            </Draggable>
                        )
                    })}
                </Container>
                {openNewCard &&
                    <div className='card-new'>
                        <Form.Control 
                            as="textarea" 
                            rows={4}
                            className='card-new__input'
                            placeholder='Enter a title for this card' 
                            ref={textareaRef}
                            value={newCardTitle}
                            onChange={e => setNewCardTitle(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleAddNewCard()}
                        />
                        <Button 
                            variant="primary"
                            onClick={handleAddNewCard}
                        >Add card</Button> 
                        <span 
                            className='board-close'
                            onClick={handleCloseNewCard}
                        ><i className="fa-solid fa-xmark"></i></span> 
                    </div>
                }
            </div>
            <footer className='footer'>
            {!openNewCard &&
                    <div className='footer-action' onClick={handleOpenNewCard}>
                        <i className="fa-solid fa-plus"></i>Add another card
                    </div>
            }
            </footer>
            <ConfirmModal 
                show={showModal} 
                onAction={onConfirmModalAction}
                title="Remove column"
                content={`Are you sure you want to remove <strong>${column.title}</strong>?<br /> All related cards will also be remove!`}
            />
        </div>
    )
}

export default Column