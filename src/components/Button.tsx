const Button = (props : {className?: string, text: string, reducedMt?: boolean, onClick : () => void}) => {
    return (
        <button
          onClick={props.onClick}
          className={` cursor-pointer h-12 w-68 bg-[#D9D9D9] text-2xl rounded-lg ${props.reducedMt ? "mt-6" : "mt-10"} ${props.className}`}
        >
          {props.text}
        </button>
    );
}

export default Button