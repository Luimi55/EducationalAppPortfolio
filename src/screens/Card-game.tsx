import React, {useState, useEffect} from 'react'
import { useAppSelector } from '../redux/hooks'
import { useParams } from "react-router"
import { getCards } from '../redux/SelectedDeck'
import CardModel from '../models/CardModel'
import { useNavigate } from "react-router";
import Button from '../components/Button'
import Confetti from 'react-confetti'
import { useWindowSize } from "@uidotdev/usehooks";


const CardGame = () => {
  let {cardOrder} = useParams()
  const navigate = useNavigate();
  const [enabled, setEnabled] = useState<Boolean>(false);
  const [selectedCard, setSelectedCard] = useState<String>("");
  const [currentCard, setCurrentCard] = useState<CardModel>();
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const cards = useAppSelector(getCards)
  const { width, height } = useWindowSize()
  

  useEffect(()=>{
    if(cards.length == 0){
      navigate("/")
    }

    if(cardOrder){
      const cardOrderInt : number = parseInt(cardOrder)
      const tempCard = cards.find((card)=>card.order == cardOrderInt)
    console.log(cards)

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
      setShowConfetti(true)
      setTimeout(()=>{setShowConfetti(false)},5000)
    } else{
      setEnabled(false)
    }
  }

  const nextCard = () =>{
    if(enabled && cardOrder){
      setSelectedCard("")
      setEnabled(false)
      setShowConfetti(false)
      const cardOrderInt : number = parseInt(cardOrder)
      const nextNumber: number = cardOrderInt+1;
      navigate("/card-game/"+nextNumber)
    }
  }


  return (
    <div className='flex flex-col h-screen items-center justify-center p-10'>
      <p className=' text-5xl'>{currentCard?.question}</p>
      <div className='flex md:flex-row flex-col gap-9 w-full flex-1 items-center justify-center'>
        {currentCard?.cardOptions.map((option, key)=>(
          <img 
            key={key} 
            onClick={()=>onOptionClick(option.id, option.isCorrect)}
            alt="" 
            className={`lg:h-70 lg:w-70 h-50 w-50 cursor-pointer
              ${selectedCard==option.id&&option.isCorrect?
                 "border-3 border-solid border-green-400": ""} 
              ${selectedCard==option.id&&!option.isCorrect?
                 "border-3 border-red-400": ""}
            `}
            src={option.image}
          />
        ))}
      </div>
      <Button className={`${enabled? "bg-green-400": ""}`} text='Next' onClick={()=>nextCard()}/>
      {showConfetti&&<Confetti
        width={(width??0)-20}
        height={(height??0)-20}
        frameRate={35}
      />}
    </div>
  )
}

export default CardGame