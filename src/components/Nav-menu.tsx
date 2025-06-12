import { useNavigate } from "react-router";
import home from '../assets/home.png'
import deckImage from '../assets/poker.png'
import signOut from '../assets/cerrar-sesion.png'
import { getUserInfo } from '../redux/UserInfo'
import { useAppSelector } from '../redux/hooks'
import { removeCookie } from "typescript-cookie";

const NavMenu = (props : {opened : boolean, setOpened : ( _ : boolean) => void}) => {
    const navigate = useNavigate();
    const userInfo = useAppSelector(getUserInfo)

    const handleSignOut = () =>{
        removeCookie(import.meta.env.VITE_AUTH_COOKIE)
        navigate("/login")
    }

    return (
      <div
        onClick={() => {
            props.setOpened(false);
        }}
        className={`absolute z-10 h-screen w-screen bg-black/70 ${props.opened ? "visible" : "invisible"}`}
      >
       
        <div className="relative w-5/8 max-w-[268px] h-screen bg-white z-20"> 
            <div className="flex flex-row items-center gap-4  bg-[#6E85EF] p-5">
                <img className="w-13 h-13 rounded-full" src={userInfo.profileImage} alt="" />
                <p className="text-white text-lg">{userInfo.name}</p>
                 
            </div>     
            <div className="relative max-w-[268px] h-[30px] bg-[#6E85EF]">
                <div className="absolute bottom-[-1px] left-[-1px] w-full h-[20px] bg-white  border-black rounded-t-[25px]"></div>
            </div>  
            <div className="flex flex-col px-5 gap-7">
                <div 
                    className=" bg-white text-left text-xl cursor-pointer flex flex-row items-center gap-3 hover:font-medium"
                    onClick={() => {navigate("/")}}
                >
                    <img src={home} alt="" className="w-7 h-7"/>
                    Home
                </div>
                
                <div 
                    className=" bg-white text-left text-xl cursor-pointer flex flex-row items-center gap-3  hover:font-medium"
                    onClick={() => {navigate("/select-format")}}
                >
                    <img src={deckImage} alt="" className="w-6 h-7"/>
                    Create deck
                </div>
                <div 
                    className=" bg-white text-left text-xl cursor-pointer flex flex-row items-center gap-3  hover:font-medium"
                    onClick={() => handleSignOut()}
                >
                    <img src={signOut} alt="" className="w-6 h-6"/>
                    Sign out
                </div>
            </div>
        </div>
      </div>
    )
}

export default NavMenu


