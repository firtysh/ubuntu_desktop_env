// every command must have a description and an exec function
// the exec function must return a string, which will be printed to the terminal

type Commands = {
  [command: string]: {
    description: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    exec: (args?: any) => string | Promise<string>;
  };
};

export const commands: Commands = {
  clear: {
    description: 'Clears the terminal',
    exec: (setScrData) => {
      setScrData([]);
      return '';
    },
  },
  help: {
    description: 'Shows this help message',
    exec: () => {
      let output = 'Available commands:\n';
      for (const command in commands) {
        output += `[ ${command} ] -        ${commands[command].description}\n`;
      }
      return output;
    },
  },
  echo: {
    description: 'Prints the given text',
    exec: (args) => {
      console.log(args);

      return args?.join(' ') || ' ';
    },
  },
  whoami: {
    description: 'Prints efective user id',
    exec: () => {
      return 'suman';
    },
  },
  uname: {
    description: 'Prints system information',
    exec: (args) => {
      if (args[0] === '-a') {
        return 'Linux suman 5.15.0-86-generic #96~20.04.1-Ubuntu SMP Thu Sep 21 13:23:37 UTC 2023 x86_64 x86_64 x86_64 GNU/Linux';
      }
      return 'Linux';
    },
  },
  about: {
    description: 'About the project',
    exec: () => {
      return (
        'This is a web clone of Ubuntu Gnome Desktop Environment.\n\n' +
        'Tech Stack:  [ React Js, Typescript, Tailwind CSS, Vite ]\n' +
        'Github:  https://github.com/firtysh/ubuntu_desktop_env\n' +
        'Author:  Suman Mandal\n' +
        'Email:  sm2167198@gmail.com\n'
      );
    },
  },
  date: {
    description: 'Prints the current datetime',
    exec: () => {
      return new Date().toLocaleString('en-IN', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
        timeZoneName: 'short',
      });
    },
  },
  iambored: {
    description: 'Find out yourself',
    exec: async () => {
      const res = await fetch('http://www.boredapi.com/api/activity/');
      const data = await res.json();
      console.log(data);
      return data.activity;
    },
  },
  quote: {
    description: 'Prints a random quote',
    exec: async () => {
      const res = await fetch('https://api.quotable.io/random');
      const data = await res.json();
      console.log(data);
      return data.content;
    },
  },
  brba: {
    description: 'Prints a random Breaking Bad quote',
    exec: async () => {
      const res = await fetch('https://api.breakingbadquotes.xyz/v1/quotes');
      const data = await res.json();
      console.log(data);
      return `${data[0].quote} \n-- ${data[0].author}`;
    },
  },
  lock: {
    description: 'Locks the screen',
    exec: () => {
      return '';
    },
  },
  ls: {
    description: 'List files and folders',
    exec: async () => {
      // const handle = await window.showDirectoryPicker();
      // console.log(await navigator.storage.getDirectory());
      // const persist = await navigator.storage.persist();
      // console.log(persist);
      // console.log((await navigator.storage.estimate()).quota);
      // function formatBytes(bytes, decimals = 2) {
      //   if (!+bytes) return '0 Bytes';

      //   const k = 1024;
      //   const dm = decimals < 0 ? 0 : decimals;
      //   const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];

      //   const i = Math.floor(Math.log(bytes) / Math.log(k));

      //   return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
      // }

      // console.log(formatBytes((await navigator.storage.estimate()).usage, 2));

      // const root = await navigator.storage.getDirectory();
      // console.log(storage);

      // for await (const [key, value] of storage.entries()) {
      //   console.log({ key, value });
      // }

      return 'Still working on it';
    },
  },
};
