import { useAppDispatch } from "../redux/hooks";

const TextInput = (props : {placeholder: string, value : string, setValue : ( _ : string) => any}) => {
    const dispatch = useAppDispatch();
    
    return (
      <input
        type="text"
        placeholder={props.placeholder}
        required
        className="w-86 h-12 px-4 text-2xl border-2 border-black"
        value={props.value}
        onChange={(e) => {
          dispatch(props.setValue(e.target.value));
        }}
      ></input>
    );
}

export default TextInput