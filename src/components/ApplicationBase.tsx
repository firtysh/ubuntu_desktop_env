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
      className=" flex flex-col min-w-[350px] w-[850px] min-h-[300px] h-[700px] bg-[rgba(0,0,0,0.1)] backdrop-blur absolute rounded-lg overflow-hidden shadow-inner shadow-white"
    >
      <AppBar optional={optionalHeader} title={applicationTitle} parentRef={boxRef} desktopRef={desktopRef} />
      {applicationBody}
    </div>
  );
};

export default ApplicationBase;
