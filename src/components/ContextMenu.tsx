import { FC } from 'react';

type ContextMenuProps = {
  contextMenuVisible: boolean;
  contextMenuPos: {
    x: number;
    y: number;
  };
  context?: unknown;
};

const ContextMenu: FC<ContextMenuProps> = ({ contextMenuVisible, contextMenuPos, context }) => {
  console.log(context);

  return (
    <div
      className={`inline-block z-50 bg-green-400 top-[${contextMenuPos.y}] left-[${contextMenuPos.x}]`}
      hidden={!contextMenuVisible}
    >
      Hello context
    </div>
  );
};

export default ContextMenu;
