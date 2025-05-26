import React, {useState, useEffect, useRef} from 'react'

import TopBar from '../components/Top-bar';
import useGoogleApi from '../hooks/auth/useGoogleApi';
import { useNavigate } from "react-router";
import DeckModel from '../models/DeckModel';
import { useAppDispatch } from '../redux/hooks';
import { setSelectedDeck } from '../redux/SelectedDeck';

const Home = () => {
  const navigate = useNavigate();
  const [deckList, setDeckList] = useState<DeckModel[]>([]);
  const hasFetched = useRef(false);
  const dispatch = useAppDispatch();
  
  const {
    getDeckFile,
    getDeckFileContent
  } = useGoogleApi();


  useEffect(()=>{
    if (hasFetched.current) return;
    hasFetched.current = true;
    getDeckContentLocal()
  },[])
  

  const handleSelectedDeck= (deck: DeckModel)=>{
    dispatch(setSelectedDeck({
      id: deck.id,
      title: deck.title,
      cards: deck.cards
    }))
    navigate("/card-game/1")
  }


  const getDeckContentLocal = async ()=>{
    try {
      const deckFileResponse = await getDeckFile();
      const filesList= deckFileResponse?.data?.files
      const isFileCreated = filesList?.length > 0
      if(isFileCreated){
        const fileContentResponse = await getDeckFileContent(filesList?.at()?.id);
        const fileContent: DeckModel[] = fileContentResponse.data;
        setDeckList(fileContent)
      }
    } catch (err:any) {
      const status = err?.response?.status;
      if(status == 401){
        navigate("/login")
      }
    }
  }




  return (
    <>
      <TopBar title="Home"/>


      <div className='flex flex-row flex-wrap items-center justify-center gap-6 pt-4'>
        {deckList.map((deck, key)=>(
            <button key={key} onClick={()=>handleSelectedDeck(deck)} className='w-76 h-40  border-2 border-black text-2xl hover:border-4'>{deck.title}</button>
        ))}
      </div>
    </>
  )
}

export default Home
