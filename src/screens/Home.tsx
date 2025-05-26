import React, {useState, useEffect, useRef} from 'react'

import TopBar from '../components/Top-bar';
import useGoogleApi from '../hooks/auth/useGoogleApi';
import { useNavigate } from "react-router";
import DeckModel from '../models/DeckModel';
import CardModel from '../models/CardModel';
import { useAppDispatch } from '../redux/hooks';
import { setSelectedDeck } from '../redux/SelectedDeck';

const Home = () => {
  const navigate = useNavigate();
  const [deckList, setDeckList] = useState<DeckModel[]>([]);
  const hasFetched = useRef(false);
  const dispatch = useAppDispatch();
  
  const {
    getAppFolder,
    createAppFolder,
    uploadImage,
    downloadImage,
    getDeckFile,
    addDeck,
    getDeckFileContent
  } = useGoogleApi();


  useEffect(()=>{
    if (hasFetched.current) return;
    hasFetched.current = true;
    getDeckContentLocal()
  },[])
  
  const [image,setImage] = useState();

  const handleSelectedDeck= (deck: DeckModel)=>{
    dispatch(setSelectedDeck({
      id: deck.id,
      title: deck.title,
      cards: deck.cards
    }))
    navigate("/card-game/1")
  }

  const createFolderLocal = async() =>{
    try {
      const getFolderResponse = await getAppFolder()
      const isFolderExist: Boolean = getFolderResponse?.data?.files?.length > 0
      if(!isFolderExist){
        const createFolderResponse = await createAppFolder()
      }
    } catch (err:any) {
      const status = err?.response?.status;
      if(status == 401){
        navigate("/login")
      }
    }
  }

  const addFile = async (event:any)  => {
    try {
      const input = event.target as HTMLInputElement
      const files : FileList | null = input.files
      if(files && files.length > 0) {
        const file : File = files[0];
        await uploadImage("1bLgoeQWp0SOB-ftJtDeYnBxPE3KiU6T5", file)
      }
    } catch (err:any) {
      const status = err?.response?.status;
      if(status == 401){
        navigate("/login")
      }
    }
  }

  const downloadFileLocal = async ()=>{
    try {
      const res = await downloadImage("1WUUABEWmF7IndqkFO5t6opXCuqYg2Kyj")
      setImage(res.data)
    } catch (err:any) {
      const status = err?.response?.status;
      if(status == 401){
        navigate("/login")
      }
    }
  }

  const getDecksLocal = async ()=>{
    try {
      const r = await getDeckFile();
      console.log(r)
    } catch (err:any) {
      const status = err?.response?.status;
      if(status == 401){
        navigate("/login")
      }
    }
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

  const postDecksLocal = async ()=>{
    try {
      const req: DeckModel = {
        id: "3",
        title: "Deck 3",
        cards: [
          {
            id: "1",
            order: 1,
            question: "Question 1",
            cardOptions: [
              {
                id: "1",
                image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII",
                isCorrect: true
              },
              {
                id: "2",
                image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII",
                isCorrect: false
              },
              {
                id: "3",
                image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII",
                isCorrect: false
              }
            ]
          },
          {
            id: "2",
            order: 2,
            question: "Question 2",
            cardOptions: [
              {
                id: "1",
                image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII",
                isCorrect: true
              },
              {
                id: "2",
                image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII",
                isCorrect: false
              },
              {
                id: "3",
                image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII",
                isCorrect: false
              }
            ]
          }
        ]
      };
      const r = await addDeck(req);
      console.log(r)
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
