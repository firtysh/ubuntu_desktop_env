import { useRef, useState } from 'react';
import { commands } from './commands';
import useAuth from 'hooks/useAuth';

const initial = 'Acer-aspire-7@suman:~$';
// const base64 =
//   'IyAgIF9fICAgICAgX18gICAgICAgICAgX19fICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX18gICAgICAgICAgICAgIAojICAvXCBcICBfXy9cIFwgICAgICAgIC9cXyBcICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC9cIFxfXyAgICAgICAgICAgCiMgIFwgXCBcL1wgXCBcIFwgICAgIF9fXC8vXCBcICAgICAgX19fICAgICBfX18gICAgIF9fXyBfX18gICAgICAgX18gICAgXCBcICxfXCAgICBfX18gICAKIyAgIFwgXCBcIFwgXCBcIFwgIC8nX19gXFwgXCBcICAgIC8nX19fXCAgLyBfX2BcIC8nIF9fYCBfX2BcICAgLydfX2BcICAgXCBcIFwvICAgLyBfX2BcIAojICAgIFwgXCBcXy8gXF9cIFwvXCAgX18vIFxfXCBcXyAvXCBcX18vIC9cIFxMXCBcL1wgXC9cIFwvXCBcIC9cICBfXy8gICAgXCBcIFxfIC9cIFxMXCBcCiMgICAgIFwgYFxfX194X19fL1wgXF9fX19cL1xfX19fXFwgXF9fX19cXCBcX19fXy9cIFxfXCBcX1wgXF9cXCBcX19fX1wgICAgXCBcX19cXCBcX19fXy8KIyAgICAgICdcL19fLy9fXy8gIFwvX19fXy9cL19fX18vIFwvX19fXy8gXC9fX18vICBcL18vXC9fL1wvXy8gXC9fX19fLyAgICAgXC9fXy8gXC9fX18vIAojICAgX18gICAgICBfXyAgICAgICAgICAgX18gICAgICAgICAgX18gIF9fICAgX18gICAgICAgICAgICAgICAgICAgICAgICBfXyAgICAgICAgICAgICAgCiMgIC9cIFwgIF9fL1wgXCAgICAgICAgIC9cIFwgICAgICAgIC9cIFwvXCBcIC9cIFwgICAgICAgICAgICAgICAgICAgICAgL1wgXF9fICAgICAgICAgICAKIyAgXCBcIFwvXCBcIFwgXCAgICAgX18gXCBcIFxfX19fICAgXCBcIFwgXCBcXCBcIFxfX19fICAgX18gIF9fICAgIF9fXyBcIFwgLF9cICBfXyAgX18gIAojICAgXCBcIFwgXCBcIFwgXCAgLydfX2BcXCBcICdfX2BcICAgXCBcIFwgXCBcXCBcICdfX2BcIC9cIFwvXCBcIC8nIF8gYFxcIFwgXC8gL1wgXC9cIFwgCiMgICAgXCBcIFxfLyBcX1wgXC9cICBfXy8gXCBcIFxMXCBcICAgXCBcIFxfXCBcXCBcIFxMXCBcXCBcIFxfXCBcL1wgXC9cIFxcIFwgXF9cIFwgXF9cIFwKIyAgICAgXCBgXF9fX3hfX18vXCBcX19fX1wgXCBcXyxfXy8gICAgXCBcX19fX19cXCBcXyxfXy8gXCBcX19fXy9cIFxfXCBcX1xcIFxfX1xcIFxfX19fLwojICAgICAgJ1wvX18vL19fLyAgXC9fX19fLyAgXC9fX18vICAgICAgXC9fX19fXy8gXC9fX18vICAgXC9fX18vICBcL18vXC9fLyBcL19fLyBcL19fXy8gCiMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKIyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIA==';

// const asci = atob(base64);

const TerminalBody = () => {
  const { setUsername } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);

  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const [input, setInput] = useState<string>('');
  const [scrData, setScrData] = useState<{ command: string; output: string }[]>([]);

  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === 'Backspace') {
      setInput((prev) => prev.slice(0, -1));
    }
    if (e.key === 'Enter') {
      setHistoryIndex(0);
      setHistory((prev) => [input, ...prev]);
      if (input === '') {
        setScrData((prev) => [
          {
            command: input,
            output: '',
          },
          ...prev,
        ]);

        return;
      }
      const command = input.split(' ')[0];
      const args = input.split(/\s+/).slice(1);
      if (command === 'clear') {
        setScrData([]);
        setInput('');
        return;
      }
      if (command === 'lock') {
        localStorage.clear();
        setUsername(null);
        return;
      }

      const output = (await commands[command]?.exec(args)) ?? `${command}: command not found`;
      setScrData((prev) => [
        {
          command: input,
          output,
        },
        ...prev,
      ]);
      setInput('');
    }
    if (e.key === 'ArrowUp') {
      setInput(() => {
        if (history.length === 0) return '';
        setHistoryIndex((prev) => {
          if (historyIndex === history.length - 1) return prev;
          else return prev + 1;
        });
        return history[historyIndex];
      });
    }
    if (e.key === 'ArrowDown') {
      setInput(() => {
        if (history.length === 0) return '';
        if (historyIndex === 0) return '';
        setHistoryIndex((prev) => prev - 1);
        return history[historyIndex - 1];
      });
    }
  };

  return (
    <div
      className="flex flex-col-reverse h-full overflow-y-scroll leading-tight bg-black"
      style={{}}
      onClick={() => {
        inputRef.current?.focus();
      }}
    >
      <div id="terminal_input" className="mb-auto">
        <span className="mr-2 font-bold text-green-500">{initial}</span>
        <span className="text-white break-all whitespace-break-spaces">{input}</span>
        <input
          ref={inputRef}
          autoFocus
          type="text"
          value=""
          className="focus:bg-white bg-transparent  outline-none w-[1ch] h-[2ch] animate-pulse"
          onChange={(e) => {
            setInput((prev) => prev + e.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
      </div>
      {scrData.map((data) => {
        return (
          <>
            <div className="break-all whitespace-break-spaces">{data.output}</div>
            <div>
              <span className="mr-2 font-bold text-green-500">{initial}</span>
              <span className="text-white break-all whitespace-break-spaces">{data.command}</span>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default TerminalBody;

// "

// #  s__ssssss__ssssssss___sssssssssssssssssssssssssssssssssssssssss__sssssssssssss
// #  /\s\ss__/\s\ssssss/\_s\sssssssssssssssssssssssssssssssssssssss/\s\__ssssssssss
// #  \s\s\/\s\s\s\ssss_\//\s\sssss___ssss___ssss___s___ssssss__ssss\s\s,_\sss___sss
// #  s\s\s\s\s\s\s\s/'__`\s\s\sss/'___\s/s__`\/'s__`s__`\ss/'__`\sss\s\s\/ss/s__`\s
// #  ss\s\s\_/s\_\s/\ss__/\_\s\_/\s\__//\s\L\s/\s\/\s\/\s\/\ss__/ssss\s\s\_/\s\L\s\
// #  sss\s`\___x___\s\____/\____\s\____\s\____\s\_\s\_\s\_\s\____\ssss\s\__\s\____/
// #  ssss'\/__//__/s\/____\/____/\/____/\/___/s\/_/\/_/\/_/\/____/sssss\/__/\/___/s
// #  s__ssssss__sssssssss__ssssssssss__ss__ss__sssssssssssssssssssss__sssssssssssss
// #  /\s\ss__/\s\sssssss/\s\ssssssss/\s\/\s\/\s\sssssssssssssssssss/\s\__ssssssssss
// #  \s\s\/\s\s\s\ssss__\s\s\____sss\s\s\s\s\s\s\____ss__ss__sss___\s\s,_\s__ss__ss
// #  s\s\s\s\s\s\s\s/'__`\s\s'__`\sss\s\s\s\s\s\s'__`\/\s\/\s\/'s_s`\s\s\//\s\/\s\s
// #  ss\s\s\_/s\_\s/\ss__/\s\s\L\s\sss\s\s\_\s\s\s\L\s\s\s\_\s/\s\/\s\s\s\\s\s\_\s\
// #  sss\s`\___x___\s\____\\s\_,__/ssss\s\_____\s\_,__/\s\____\s\_\s\_\s\__\s\____/
// #  ssss'\/__//__/s\/____/s\/___/ssssss\/_____/\/___/ss\/___/s\/_/\/_/\/__/\/___/s
// #  ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
// #  ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss

// "
