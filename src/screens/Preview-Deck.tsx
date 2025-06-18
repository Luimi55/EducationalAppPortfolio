import React, {useState} from 'react'
import { useNavigate } from "react-router";
import TopBar from "../components/Top-bar";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { resetDeckState, selectCards, selectDeck, selectTitle, setTitle } from "../redux/Deck-slice";
import useGoogleApi from '../hooks/auth/useGoogleApi';
import { resetCardState } from "../redux/Card-slice";
import TextInput from "../components/Text-input";
import Button from "../components/Button";
import Loading from '../components/Loading';

const PreviewDeck = () => {
  const cards = useAppSelector(selectCards);
  const title = useAppSelector(selectTitle);
  const deck = useAppSelector(selectDeck);
  const dispatch = useAppDispatch();
  const [showLoading, setShowLoading] = useState<boolean>(false)

  const {    
    addDeck
  } = useGoogleApi();
  const navigate = useNavigate();

  const handleSave = async () => {
    try {
      setShowLoading(true)
      const r = await addDeck(deck);
      dispatch(resetCardState());
      dispatch(resetDeckState());
      navigate("/");
      setShowLoading(false)
    }
    catch (err: any) {
      setShowLoading(false)
      const status = err?.response?.status;
      if(status == 401){
        navigate("/login");
      }
    }
  };

  return (
    <>
      <TopBar title="Create deck" />

      <div className="flex flex-col items-center px-11 py-6">
        <TextInput
          placeholder="Insert a title"
          value={title}
          setValue={setTitle}
        />

        <div className="flex flex-col items-center gap-y-6 pt-4">
          {cards.map((card, index) => (
            <div
              key={index}
              className="w-86 h-30 p-4 border-2 border-black text-2xl text-center place-content-center"
            >
              {card.question}
            </div>
          ))}
        </div>

        <Button
          text="Add other card"
          reducedMt
          onClick={() => {
            dispatch(resetCardState());
            navigate("/multiple-choice-form");
          }}
        />

        <Button
          text="Save deck"
          reducedMt
          onClick={() => {handleSave()}}
        />
        <Loading show={showLoading}/>
      </div>
    </>
  );
};

export default PreviewDeck;
