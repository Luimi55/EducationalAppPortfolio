import React, {useState, useEffect, useRef} from 'react'

import TopBar from '../components/Top-bar';
import useGoogleApi from '../hooks/auth/useGoogleApi';
import { useNavigate } from "react-router";
import DeckModel from '../models/DeckModel';
import { useAppDispatch } from '../redux/hooks';
import { setSelectedDeck } from '../redux/SelectedDeck';
import { setUserInfo } from '../redux/UserInfo';
import DeckComponent from '../components/DeckComponent';
import Loading from '../components/Loading';

const Home = () => {
  const navigate = useNavigate();
  const [deckList, setDeckList] = useState<DeckModel[]>([]);
  const hasFetched = useRef(false);
  const [showLoading, setShowLoading] = useState<boolean>(false)
  const dispatch = useAppDispatch();
  
  const {
    getDeckFile,
    getDeckFileContent,
    getUserInfoAsync,
  } = useGoogleApi();


  useEffect(()=>{
    if (hasFetched.current) return;
    hasFetched.current = true;
    setShowLoading(true)
    getUserInfo()
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
      setShowLoading(false)
    } catch (err:any) {
      const status = err?.response?.status;
      if(status == 401){
        navigate("/login")
      }
      setShowLoading(false)
    }
  }

  const getUserInfo = async ()=>{
    const userInfo = await getUserInfoAsync();
    if(userInfo.data && userInfo.data.picture){
      dispatch(setUserInfo({
        profileImage:userInfo.data.picture,
        name:userInfo.data.name,
        given_name:userInfo.data.given_name,
        family_name:userInfo.data.family_name,
      }))
    }

  }




  
  return (
    <>
      <TopBar title="Home"/>
      <div className='flex flex-row flex-wrap items-center justify-center gap-16 px-16 py-8'>
        {deckList.map((deck, key)=>{return(
          <DeckComponent deck={deck}/>
        )})}
      </div>
        <Loading show={showLoading}/>

    </>
  )
}

export default Home
