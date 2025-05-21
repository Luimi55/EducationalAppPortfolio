import TopBar from "../components/Top-bar";
import { ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addOption, removeOption, selectCardOptions, selectQuestion, setQuestion } from "../redux/Card-slice";
import { useNavigate } from "react-router";
import { UUID } from "../utils";
import TextInput from "../components/Text-input";
import Button from "../components/Button";

const MultipleChoiceForm = () => {
  const question = useAppSelector(selectQuestion);
  const images = useAppSelector(selectCardOptions);
  const dispatch = useAppDispatch();

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files !== null && files[0]) {
      const fileReader = new FileReader();
      
      fileReader.onload = () => {
        const fileContent = fileReader.result as string;
        dispatch(addOption({
          id: UUID(),
          image: fileContent,
          isCorrect: false}));
      };
      
      fileReader.readAsDataURL(files[0]);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="h-dvh">
      <TopBar title="Add card" />

      <div className="flex flex-col items-center py-6">
        <TextInput 
          placeholder="Ingresa pregunta"
          value={question}
          setValue={setQuestion}
        />

        <div className={`flex flex-col items-center gap-y-6 ${images.length > 0 ? "mt-9" : ""}`}>
          {images.map((cardOption) => (
            <div
              key={cardOption.id}
              className="relative z-0 border-2 border-black"
              >
                <img
                  className="w-76 h-40"
                  src={cardOption.image}
                />

                <button 
                  className="absolute top-2 right-2" 
                  onClick={() => {dispatch(removeOption(cardOption.id))}}
                >
                  <img src="src\assets\recycle-bin.png" width="32" height="32"/>
                </button>
            </div>
          ))}
        </div>

        <input
          id="imageUploader"
          type="file"
          className="w-0 h-0 opacity-0"
          accept=".jpg, .jpeg, .png"
          onChange={handleFileUpload}
        />

        <label htmlFor="imageUploader" className="flex flex-row justify-center items-center w-76 h-40 mt-9 text-2xl border-2 border-black">
          Agregar imagen
        </label>

        <Button
          text="Siguiente"
          onClick={() => {navigate("/select-answer")}}
        />
      </div>
    </div>
  );
};

export default MultipleChoiceForm;
