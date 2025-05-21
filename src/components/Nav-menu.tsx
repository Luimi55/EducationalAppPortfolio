import { useNavigate } from "react-router";

const NavMenu = (props : {opened : boolean, setOpened : ( _ : boolean) => void}) => {
    const navigate = useNavigate();
    
    return (
      <div
        onClick={() => {
            props.setOpened(false);
        }}
        className={`absolute z-10 h-screen w-screen bg-black/70 ${props.opened ? "visible" : "invisible"}`}
      >        
        <div className="relative w-5/8 max-w-[268px] h-screen bg-white z-20">        
            <div className="flex flex-col pt-8">
                <button 
                    type="button" 
                    className="mx-6 my-3 bg-white text-left text-2xl"
                    onClick={() => {navigate("/")}}
                >
                    Home
                </button>
                
                <button 
                    type="button" 
                    className="mx-6 my-3 bg-white text-left text-2xl"
                    onClick={() => {navigate("/select-format")}}
                >
                    Create deck
                </button>
            </div>
        </div>
      </div>
    )
}

export default NavMenu


