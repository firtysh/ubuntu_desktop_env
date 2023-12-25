import { ReactNode, RefObject, useEffect, useRef } from 'react';
import AppBar from './AppBar';
type ApplicationBaseProps = {
  applicationTitle: string;
  applicationBody: ReactNode;
  optionalHeader?: string | ReactNode;
  desktopRef: RefObject<HTMLDivElement>;
};
const ApplicationBase = ({ applicationTitle, applicationBody, optionalHeader, desktopRef }: ApplicationBaseProps) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const leftResizerRef = useRef<HTMLDivElement>(null);
  const rightResizerRef = useRef<HTMLDivElement>(null);
  const topResizerRef = useRef<HTMLDivElement>(null);
  const bottomResizerRef = useRef<HTMLDivElement>(null);
  const topLeftResizerRef = useRef<HTMLDivElement>(null);
  const bottomLeftResizerRef = useRef<HTMLDivElement>(null);
  const topRightResizerRef = useRef<HTMLDivElement>(null);
  const bottomRightResizerRef = useRef<HTMLDivElement>(null);
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
  const dim = useRef<{
    h: number;
    w: number;
  }>({
    h: 0,
    w: 0,
  });
  useEffect(() => {
    if (
      boxRef.current &&
      leftResizerRef.current &&
      rightResizerRef.current &&
      topResizerRef.current &&
      bottomResizerRef.current &&
      topLeftResizerRef.current &&
      topRightResizerRef.current &&
      bottomLeftResizerRef.current &&
      bottomRightResizerRef.current
    ) {
      const box = boxRef.current;
      const leftResizer = leftResizerRef.current;
      const rightResizer = rightResizerRef.current;
      const topResizer = topResizerRef.current;
      const bottomResizer = bottomResizerRef.current;
      const topLeftResizer = topLeftResizerRef.current;
      const bottomLeftResizer = bottomLeftResizerRef.current;
      const topRightResizer = topRightResizerRef.current;
      const bottomRightResizer = bottomRightResizerRef.current;
      const resizers = [
        leftResizer,
        rightResizer,
        topResizer,
        bottomResizer,
        topLeftResizer,
        bottomLeftResizer,
        topRightResizer,
        bottomRightResizer,
      ];

      // const handleMouseMove = (e: MouseEvent) => {
      //   const dx = e.clientX - coord.current.startX;
      //   const dy = e.clientY - coord.current.startY;
      //   console.log(`dx : ${dx}, dy : ${dy}`);
      //   console.log(`moving ${box.offsetLeft + dx}`);
      //   box.style.left = `${dx + coord.current.lastX}px`;
      //   box.style.width = `${dim.current.w - dx}px`;
      // };

      const calcL = (e: MouseEvent) => {
        return `${e.clientX - coord.current.startX + coord.current.lastX}px`;
      };
      const calcT = (e: MouseEvent) => {
        return `${e.clientX - coord.current.startY + coord.current.lastY}px`;
      };
      const calcW = (e: MouseEvent) => {
        return `${dim.current.w - e.clientX + coord.current.startX}px`;
      };
      const calcH = (e: MouseEvent) => {
        return `${dim.current.h - e.clientY + coord.current.startY}px`;
      };

      const handleLeftResize = (e: MouseEvent) => {
        box.style.left = calcL(e);
        box.style.width = calcW(e);
      };
      const handleRightResize = (e: MouseEvent) => {
        // box.style.left = calcL(e);
        box.style.width = calcW(e);
      };

      const leftResizerDown = (e: MouseEvent) => {
        coord.current.startX = e.clientX;
        coord.current.startY = e.clientY;
        dim.current.w = box.offsetWidth;
        dim.current.h = box.offsetHeight;
        document.addEventListener('mousemove', handleLeftResize);
      };
      const rightResizerDown = (e: MouseEvent) => {
        coord.current.startX = e.clientX;
        coord.current.startY = e.clientY;
        dim.current.w = box.offsetWidth;
        dim.current.h = box.offsetHeight;
        document.addEventListener('mousemove', handleRightResize);
      };
      const handleMouseUp = () => {
        console.log('mouseUp');
        coord.current.lastX = box.offsetLeft;
        coord.current.lastY = box.offsetTop;
        document.removeEventListener('mousemove', handleLeftResize);
      };
      leftResizer.addEventListener('mousedown', leftResizerDown);
      rightResizer.addEventListener('mousedown', rightResizerDown);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        leftResizer.removeEventListener('mousedown', leftResizerDown);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, []);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        console.log('clicked on a application', e.target);
      }}
      ref={boxRef}
      className="flex flex-col min-w-[350px] w-[850px] min-h-[300px] h-[700px] bg-[rgba(0,0,0,0.1)] backdrop-blur relative top-8 left-8 rounded-lg shadow-inner shadow-white"
    >
      <div className="absolute left-0 w-1 h-full cursor-e-resize leftHandler" ref={leftResizerRef}></div>
      <div className="absolute right-0 w-1 h-full cursor-w-resize rightHandler" ref={rightResizerRef}></div>
      <div className="absolute top-0 w-full h-1 cursor-s-resize topHandler" ref={topResizerRef}></div>
      <div className="absolute bottom-0 w-full h-1 cursor-n-resize bottomHandler" ref={bottomResizerRef}></div>
      <div className="absolute top-0 left-0 w-2 h-2 cursor-se-resize topLeftHandler" ref={topLeftResizerRef}></div>
      <div className="absolute top-0 right-0 w-2 h-2 cursor-sw-resize topRightHandler" ref={topRightResizerRef}></div>
      <div
        className="absolute bottom-0 left-0 w-2 h-2 cursor-ne-resize bottomLeftHandler"
        ref={bottomLeftResizerRef}
      ></div>
      <div
        className="absolute bottom-0 right-0 w-2 h-2 cursor-nw-resize bottomRightHandler"
        ref={bottomRightResizerRef}
      ></div>
      <AppBar optional={optionalHeader} title={applicationTitle} parentRef={boxRef} desktopRef={desktopRef} />
      {applicationBody}
    </div>
  );
};

export default ApplicationBase;
