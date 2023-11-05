import Dragable from 'components/Dragable';
import MenuBar from 'components/MenuBar';
import NotificationBar from 'components/NotificationBar';
import { useEffect, useRef } from 'react';

const Home = () => {
  const desktopRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!desktopRef.current) return;
    const desktop = desktopRef.current;
    const contextMenuHandler = (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      console.log(e);
    };
    desktop.addEventListener('contextmenu', contextMenuHandler);
    return () => {
      removeEventListener('contextmenu', contextMenuHandler);
    };
  }, []);

  return (
    <>
      <NotificationBar />
      <div id="wrapper" className="flex flex-1">
        <MenuBar />
        <div ref={desktopRef} id="desktop" className="relative flex-1 overflow-hidden">
          <Dragable desktopRef={desktopRef} />
        </div>
      </div>
    </>
  );
};

export default Home;
