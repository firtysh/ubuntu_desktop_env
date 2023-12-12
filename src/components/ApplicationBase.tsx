import { ReactNode, RefObject, useRef } from 'react';
import AppBar from './AppBar';
type ApplicationBaseProps = {
  applicationTitle: string;
  applicationBody: ReactNode;
  optionalHeader?: string | ReactNode;
  desktopRef: RefObject<HTMLDivElement>;
};
const ApplicationBase = ({ applicationTitle, applicationBody, optionalHeader, desktopRef }: ApplicationBaseProps) => {
  const boxRef = useRef<HTMLDivElement>(null);
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        console.log('clicked on a application', e.target);
      }}
      ref={boxRef}
      className="flex flex-col min-w-[350px] w-[850px] min-h-[300px] h-[700px] bg-[rgba(0,0,0,0.1)] backdrop-blur relative top-8 left-8 rounded-lg overflow-hidden shadow-inner shadow-white"
    >
      <div className="absolute left-0 w-1 h-full cursor-w-resize leftHandler"></div>
      <div className="absolute right-0 w-1 h-full cursor-e-resize rightHandler"></div>
      <div className="absolute top-0 w-full h-1 cursor-n-resize topHandler"></div>
      <div className="absolute bottom-0 w-full h-1 cursor-s-resize bottomHandler"></div>
      <div className="absolute top-0 left-0 w-2 h-2 cursor-nw-resize topLeftHandler"></div>
      <div className="absolute top-0 right-0 w-2 h-2 cursor-ne-resize topRightHandler"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 cursor-sw-resize bottomLeftHandler"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 cursor-se-resize bottomRightHandler"></div>
      <AppBar optional={optionalHeader} title={applicationTitle} parentRef={boxRef} desktopRef={desktopRef} />
      {applicationBody}
    </div>
  );
};

export default ApplicationBase;
