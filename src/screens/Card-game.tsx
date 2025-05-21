import React, {useState, useEffect} from 'react'
import { useAppSelector } from '../redux/hooks'
import { useParams } from "react-router"
import { getCards } from '../redux/SelectedDeck'
import CardModel from '../models/CardModel'
import { useNavigate } from "react-router";
import Button from '../components/Button'


const CardGame = () => {
  let {cardOrder} = useParams()
  const navigate = useNavigate();
  const [enabled, setEnabled] = useState<Boolean>(false);
  const [selectedCard, setSelectedCard] = useState<String>("");
  const [currentCard, setCurrentCard] = useState<CardModel>();
  const cards = useAppSelector(getCards)
  

  useEffect(()=>{
    if(cards.length == 0){
      navigate("/")
    }

    if(cardOrder){
      const cardOrderInt : number = parseInt(cardOrder)
      const tempCard = cards.find((card)=>card.order == cardOrderInt)
      if(tempCard){
        setCurrentCard(tempCard)
      } else {
        navigate("/")
      }
    }
  },[cardOrder]) 

  const onOptionClick = (optionId: String, isCorrect: boolean) => {
    setSelectedCard(optionId)
    if(isCorrect){
      setEnabled(true)
    } else{
      setEnabled(false)
    }
  }

  const nextCard = () =>{
    if(enabled && cardOrder){
      const cardOrderInt : number = parseInt(cardOrder)
      const nextNumber: number = cardOrderInt+1;
      navigate("/card-game/"+nextNumber)
    }
  }


  return (
    <div className='flex flex-col h-screen items-center justify-center'>
      <p className='mt-9 mb-9 text-5xl'>{currentCard?.question}</p>
      <div className='flex md:flex-row flex-col gap-9 w-full flex-1 items-center justify-center'>
        {currentCard?.cardOptions.map((option, key)=>(
          <img key={key} onClick={()=>onOptionClick(option.id, option.isCorrect)} className={`lg:h-70 lg:w-70 h-50 w-50 ${selectedCard==option.id&&option.isCorrect? "border-3 border-solid border-green-400": ""} ${selectedCard==option.id&&!option.isCorrect? "border-3 border-red-400": ""}`} src={option.image} alt="" />
        ))}
      </div>
      <Button className={`${enabled? "bg-green-400": ""}`} text='Next' onClick={()=>nextCard()}/>
    </div>
  )
}

export default CardGame