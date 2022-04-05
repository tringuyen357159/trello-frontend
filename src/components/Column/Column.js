import Card from 'components/Card/Card'
import React from 'react'
import { mapOrder } from 'utilities/sort';
import { Container, Draggable } from 'react-smooth-dnd';
import './Column.scss'

const Column = (props) => {
    const { column } = props;
    const cards = mapOrder(column.cards, column.cardOrder, 'id');

    const onCardDrop = (dropResult) => {

    }

    return (
        <div className='column'>
            <header className='column-drag-handle'>{column.title}</header>
            <div className='card-list'>
                <Container
                    orientation="vertical"
                    groupName="col"
                    onDrop={onCardDrop}
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
            </div>
            <footer>
                Footer
            </footer>
        </div>
    )
}

export default Column