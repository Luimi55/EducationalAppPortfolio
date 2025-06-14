import { useNavigate } from "react-router";
import TopBar from "../components/Top-bar";
import { selectCard, selectCardOptions, setRightChoice } from "../redux/Card-slice";
import { addCard, selectCardOrder } from "../redux/Deck-slice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import Button from "../components/Button";

const SelectAnswer = () => {
    const images = useAppSelector(selectCardOptions);
    const cardOrder = useAppSelector(selectCardOrder);
    const card = useAppSelector(selectCard);
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const handleOnClick = () =>  {
      const cardTemp = { ...card};
      cardTemp.order = cardOrder;
      dispatch(addCard(cardTemp));
      navigate("/preview-deck");
    }
    
    return (
      <>
        <TopBar title="Add card" />

        <div className="flex flex-col items-center">
          <p className="mt-7 text-2xl text-center">
            Choose the correct answer
          </p>

          <div className="flex flex-col items-center gap-y-6 mt-7">
            {images.map((cardOption) => (
              <img
                key={cardOption.id}
                className={`w-76 h-40 ${cardOption.isCorrect ? "border-4 border-green-500" : "border-2 border-black"}`}
                src={cardOption.image}
                id={cardOption.id}
                onClick={(e) => {
                  dispatch(setRightChoice(e.currentTarget.id));
                }}
              />
            ))}
          </div>

          <Button
            text="Save card"
            onClick={handleOnClick}
          />
        </div>
      </>
    );
};

export default SelectAnswer;
