import React from 'react'
import { useNavigate } from "react-router";
import Button from '../components/Button';

type Props = {}

const EndGame = (props: Props) => {
    const navigate = useNavigate()
  return (
    <div className='flex flex-col items-center justify-center py-26'>
        <img className='w-30 h-30' src="https://static-00.iconduck.com/assets.00/party-popper-emoji-503x512-0vkq9zgo.png" alt="" />
        <p className='text-6xl m-2'>Congratulations!</p>
        <p className='text-4xl m-2'>You've done great!</p>
        <div className='flex flex-row gap-10 mt-16'>
            <Button text='Retry' onClick={()=>navigate("/card-game/1")}/>
            <Button text='Go home' onClick={()=>navigate("/")}/>
        </div>
    </div>
  )
}

export default EndGame