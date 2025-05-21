import { useNavigate } from "react-router";
import TopBar from "../components/Top-bar";

const SelectFormat = () => {
  const navigate = useNavigate();

  const formats = [
    {
      name: "Seleccion multiple",
      route: "/multiple-choice-form",
    },
  ];

  return (
    <>
      <TopBar title="Create deck" />
      
      <div className="px-11 py-6">
        <p className="text-2xl">Elije un formato</p>
        
        <div className="flex flex-col items-center gap-y-6 pt-4">
          {formats.map((format, index) => (
            <button
              key={index}
              onClick={() => {navigate(format.route)}}
              className="w-76 h-40 border-2 border-black text-2xl"
            >
              {format.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default SelectFormat;
