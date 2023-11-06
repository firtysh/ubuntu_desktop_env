import ApplicationBase from 'components/ApplicationBase';
type FileExplorerProps = {
  desktopRef: React.RefObject<HTMLDivElement>;
};
const FileExplorer = ({ desktopRef }: FileExplorerProps) => {
  return (
    <ApplicationBase applicationBody={<>this is body</>} applicationTitle="File Explorer" desktopRef={desktopRef} />
  );
};

export default FileExplorer;
