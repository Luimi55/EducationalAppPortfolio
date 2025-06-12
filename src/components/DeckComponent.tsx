import React from 'react'
import DeckModel from '../models/DeckModel'
import DefaultDeckImage from '../assets/DefaultDeckImage.avif'
import { useAppDispatch } from '../redux/hooks';
import { setSelectedDeck } from '../redux/SelectedDeck';
import { useNavigate } from "react-router";
import ClockIcon from '../assets/clock.png'
// import Question from '../assets/pregunta.png'
import Question from '../assets/burbuja-de-chat-de-preguntas.png'

type Props = {
    deck: DeckModel
}

const DeckComponent = ({deck}: Props) => {
    const image = deck.image? deck.image : DefaultDeckImage
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSelectedDeck= (deck: DeckModel)=>{
        dispatch(setSelectedDeck({
          id: deck.id,
          title: deck.title,
          cards: deck.cards
        }))
        navigate("/card-game/1")
      }

  return (
    // shadow-[0px_0px_15px_8px_rgba(0,0,0,0.1),0px_10px_15px_-3px_rgba(0,0,0,0.1)]
    // border-gray-200
    // border-1
    <div className='
    cursor-pointer
    p-4 
    shadow-[0px_0px_10px_2px_rgba(0,0,0,0.1),0px_10px_15px_-3px_rgba(0,0,0,0.1)]
    rounded-xl
    hover:scale-105
    ' onClick={()=>handleSelectedDeck(deck)}>
        <div className='w-66 h-40'>
            <img className='w-full h-full object-cover'  src={image.toString()} alt="" />
        </div>
        <p className='text-lg my-2'>{deck.title}</p>
        <div className='flex flex-row gap-8'>
            <div className='flex flex-row gap-2 items-center'>
                <img className='w-4 h-4' src={ClockIcon} alt="" />
                <p>{deck.cards.length/2} min.</p>
            </div>
            <div className='flex flex-row gap-2 items-center'>
                <img className='w-6 h-6' src={Question} alt="" />
                <p>{deck.cards.length} questions</p>
            </div>
            
        </div>
  </div>
  )
}

export default DeckComponent