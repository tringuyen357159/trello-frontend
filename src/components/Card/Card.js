import React from 'react'
import './Card.scss'

const Card = (props) => {
  const { card } = props;

  return (
    <>
      <div className='card-item'>
        {card.cover && <img src={card.cover} onMouseDown={e => e.preventDefault()} alt='img-cover' />}
        {card.title}
      </div>
    </>
  )
}

export default Card