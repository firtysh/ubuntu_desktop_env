import ApplicationBase from 'components/ApplicationBase';
import TerminalBody from './TerminalBody';
type TerminalProps = {
  desktopRef: React.RefObject<HTMLDivElement>;
};

const Terminal = ({ desktopRef }: TerminalProps) => {
  return <ApplicationBase applicationBody={<TerminalBody />} applicationTitle="Terminal" desktopRef={desktopRef} />;
};

export default Terminal;
