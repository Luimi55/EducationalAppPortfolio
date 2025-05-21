import { useNavigate } from "react-router";
import TopBar from "../components/Top-bar";
import { selectCard, selectCardOptions, setCardOrder, setRightChoice } from "../redux/Card-slice";
import { addCard, selectCardOrder } from "../redux/Deck-slice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import Button from "../components/Button";

const SelectAnswer = () => {
    const images = useAppSelector(selectCardOptions);
    const cardOrder = useAppSelector(selectCardOrder);
    const card = useAppSelector(selectCard);
    const dispatch = useAppDispatch();

    const navigate = useNavigate();
    
    return (
      <>
        <TopBar title="Add card" />

        <div className="flex flex-col items-center">
          <p className="mt-7 text-2xl text-center">
            Seleccione la respuesta correcta
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
            text="Guardar card"
            onClick={() => {
              dispatch(setCardOrder(cardOrder));
              dispatch(addCard(card));
              navigate("/preview-deck");
            }}
          />
        </div>
      </>
    );
};

export default SelectAnswer;
