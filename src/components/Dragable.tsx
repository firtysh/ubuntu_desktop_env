import { RefObject, useRef } from 'react';
import AppBar from './AppBar';
type ApplicationProps = {
  desktopRef: RefObject<HTMLDivElement>;
};
const Dragable = ({ desktopRef }: ApplicationProps) => {
  const boxRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={boxRef}
      className="min-w-[500px] min-h-[400px]  bg-[rgba(0,0,0,0.1)] backdrop-blur absolute rounded-lg overflow-hidden shadow-inner shadow-white"
    >
      <AppBar title="Terminal" parentRef={boxRef} desktopRef={desktopRef} />
      <div className="p-2 font-bold text-green-500">Acer-Aspire-7@suman:~$</div>
    </div>
  );
};

export default Dragable;
