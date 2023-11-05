import { CgLayoutGridSmall } from 'react-icons/cg';
import { BsTerminalFill, BsFolderFill } from 'react-icons/bs';

const MenuBar = () => {
  return (
    <div className="max-w-[64px] w-16 flex items-center flex-col h-full bg-[rgba(220,11,50,0.2)] backdrop-blur-sm">
      <div className="flex flex-col items-center flex-1 py-4 text-gray-700 drop-shadow-[0px_0px_1px_rgba(255,255,255,0.75)] text-3xl">
        <div className="p-3 hover:bg-[rgba(255,255,255,0.1)] rounded">
          <BsTerminalFill />
        </div>
        <div className="p-3 hover:bg-[rgba(255,255,255,0.1)] rounded">
          <BsFolderFill />
        </div>
      </div>
      <div className="text-6xl hover:bg-[rgba(255,255,255,0.1)] rounded">
        <CgLayoutGridSmall />
      </div>
    </div>
  );
};

export default MenuBar;
