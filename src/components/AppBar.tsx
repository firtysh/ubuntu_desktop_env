import { ReactNode, RefObject, useEffect, useRef } from 'react';
import { AiFillCloseCircle as CloseIcon } from 'react-icons/ai';
import { MdMinimize as MinimizeIcon, MdOutlineStop as MaximizeIcon } from 'react-icons/md';
// import { VscChromeRestore as RestoreIcon } from 'react-icons/vsc';

type AppBarProps = {
  title: string;
  parentRef: RefObject<HTMLDivElement>;
  desktopRef: RefObject<HTMLDivElement>;
  optional?: string | ReactNode;
};

const AppBar = ({ title, optional, parentRef, desktopRef }: AppBarProps) => {
  const appBarRef = useRef<HTMLDivElement>(null);
  const coord = useRef<{
    startX: number;
    startY: number;
    lastX: number;
    lastY: number;
  }>({
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
  });
  useEffect(() => {
    if (!appBarRef.current || !parentRef.current || !desktopRef.current) return;
    const appBar = appBarRef.current;
    const parent = parentRef.current;
    const desktop = desktopRef.current;
    const handleMouseMove = (e: MouseEvent) => {
      parent.style.top = `${e.clientY - coord.current.startY + coord.current.lastY}px`;
      parent.style.left = `${e.clientX - coord.current.startX + coord.current.lastX}px`;
    };
    const handleMouseDown = (e: MouseEvent) => {
      parent.style.cursor = 'grabbing';
      coord.current.startX = e.clientX;
      coord.current.startY = e.clientY;
      desktop.addEventListener('mousemove', handleMouseMove);
    };
    const handleMouseUp = () => {
      parent.style.cursor = 'auto';
      desktop.removeEventListener('mousemove', handleMouseMove);
      coord.current.lastX = parent.offsetLeft;
      coord.current.lastY = parent.offsetTop;
    };
    appBar.addEventListener('mousedown', handleMouseDown);
    appBar.addEventListener('mouseup', handleMouseUp);

    return () => {
      appBar.removeEventListener('mousedown', handleMouseDown);
      appBar.removeEventListener('mouseup', handleMouseUp);
    };
  }, [parentRef, desktopRef]);

  return (
    <div
      ref={appBarRef}
      className="h-10 bg-gray-900 shadow-inner shadow-[rgba(255,255,255,0.1)] flex items-center justify-center px-3 gap-3 rounded-t-lg"
    >
      <div>{optional}</div>
      <div className="flex-1 font-bold text-center text-white">{title}</div>
      <div className="flex gap-3 text-center text-white">
        <div className="p-1 rounded-full hover:bg-[rgba(255,255,255,0.2)] h-6 w-6 flex items-center justify-center">
          <MinimizeIcon />
        </div>
        <div className=" p-1 rounded-full hover:bg-[rgba(255,255,255,0.2)] h-6 w-6 flex items-center justify-center">
          {/* <RestoreIcon /> */}
          <MaximizeIcon />
        </div>
        <div className="flex items-center justify-center w-6 h-6 text-xl text-red-500 rounded-full">
          <CloseIcon />
        </div>
      </div>
    </div>
  );
};

export default AppBar;
