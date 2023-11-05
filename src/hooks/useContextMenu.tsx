import { useState } from 'react';

const useContextMenu = () => {
  const [context, setContext] = useState();
  const [contextMenuPos, setContextMenuPos] = useState({ x: 0, y: 0 });
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  return { context, setContext, contextMenuPos, setContextMenuPos, contextMenuVisible, setContextMenuVisible };
};

export default useContextMenu;
