import { useState } from "react";
import NavMenu from "./Nav-menu";

const TopBar = (props : {title : string}) => {
    const [opened, setOpened] = useState(false);    

  return (
    <>
      <NavMenu opened={opened} setOpened={setOpened} />
      <div className="flex flex-row w-screen h-16 items-center px-5 gap-x-9 bg-[#6E85EF]">
        <button
          onClick={() => {
            setOpened(true);
          }}
          className="w-12 h-12"
        >
          <img className="cursor-pointer" src="src\assets\menu.png" width="34" height="34"/>
        </button>
        <p className="text-[22px] text-white">{props.title}</p>
      </div>
    </>
  );
};

export default TopBar;
