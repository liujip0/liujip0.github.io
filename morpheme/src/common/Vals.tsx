/* eslint-disable react-refresh/only-export-components */
import { create } from 'zustand';
import { createId, deepUpdate } from './Funcs';
import { StringRes } from './Resources.tsx';
import {
  Conlang,
  screenPosition,
  screenStr,
  submenuStr,
  submenusArr,
  windowsArr,
} from './Types';

export const conlangInit: Conlang = {
  name: StringRes.untitled,
  autosave: 0,
  widgets: {
    charInsert: {
      enabled: true,
      chars: ['A', 'a', 'B', 'b', 'C', 'c'],
    },
    dictSearch: {
      enabled: true,
    },
    cxs: {
      enabled: true,
    },
  },
  phonology: {
    inventory: [],
  },
  articles: {
    list: [
      {
        type: 'folder',
        id: 'root',
        path: [],
        contents: [],
        name: '/',
      },
    ],
  },
  declensions: {
    properNounEqualsNoun: true,
    list: {
      noun: [
        {
          id: 'NDeclension-init',
          wordClasses: [],
          affixes: ['_'],
        },
      ],
      verb: [
        {
          id: 'VDeclension-init',
          wordClasses: [],
          affixes: ['_'],
        },
      ],
      adjective: [
        {
          id: 'AdjDeclension-init',
          wordClasses: [],
          affixes: ['_'],
        },
      ],
      adverb: [
        {
          id: 'AdvDeclension-init',
          wordClasses: [],
          affixes: ['_'],
        },
      ],
      pronoun: [],
      'proper noun': [
        {
          id: 'PropNDeclension-init',
          wordClasses: [],
          affixes: ['_'],
        },
      ],
      particle: [
        {
          id: 'PtclDeclension-init',
          wordClasses: [],
          affixes: ['_'],
        },
      ],
      adposition: [
        {
          id: 'AdpDeclension-init',
          wordClasses: [],
          affixes: ['_'],
        },
      ],
      conjunction: [
        {
          id: 'ConjDeclension-init',
          wordClasses: [],
          affixes: ['_'],
        },
      ],
      interjection: [
        {
          id: 'InterjDeclension-init',
          wordClasses: [],
          affixes: ['_'],
        },
      ],
    },
  },
  lexicon: [],
  wordClasses: [
    {
      id: '',
      partOfSpeech: '',
      gloss: '',
      name: StringRes.unclassed,
    },
  ],
};

interface StoreState {
  saved: boolean;
  setSaved: (value: boolean) => void;

  fileHandle: FileSystemFileHandle | null;
  setFileHandle: (value: FileSystemFileHandle | null) => void;

  submenus: submenusArr;
  replaceSubmenus: (position: screenPosition, menu: submenuStr) => void;

  windows: windowsArr;
  addWindows: (position: screenPosition, screen: screenStr) => void;
  swapWindows: (position: screenPosition, screen: screenStr) => void;
  removeWindows: (position: screenPosition) => void;
  swapAllWindows: (value: windowsArr) => void;

  conlang: Conlang;
  changeConlang: (path: Array<string>, value: unknown) => void;
  replaceConlang: (value: Conlang) => void;

  lastInput: string;
  setLastInput: (value: string) => void;

  insertText: (text: string) => void;
  setInsertText: (value: (text: string) => void) => void;
}
export const useStoreState = create<StoreState>()((set) => ({
  saved: true,
  setSaved: (value) => set(() => ({ saved: value })),

  fileHandle: null,
  setFileHandle: (value) => set(() => ({ fileHandle: value })),

  submenus: ['', '', '', ''],
  replaceSubmenus: (position, menu) =>
    set((s) => {
      const newSubmenus = [...s.submenus];
      newSubmenus[position] = menu;
      return {
        submenus: newSubmenus,
      };
    }),

  windows: ['start-0', 'start-0', 'start-0', 'start-0'],
  addWindows: (position, screen) =>
    set((s) => {
      const id = createId(screen);
      switch (position) {
        case 0: {
          if (
            s.windows[0] === s.windows[1] &&
            s.windows[1] === s.windows[2] &&
            s.windows[2] === s.windows[3]
          ) {
            const newWindows = [...s.windows];
            newWindows[0] = id;
            newWindows[2] = id;
            return { windows: newWindows };
          } else if (
            s.windows[2] === s.windows[0] ||
            s.windows[1] === s.windows[0]
          ) {
            const newWindows = [...s.windows];
            newWindows[0] = id;
            return { windows: newWindows };
          } else {
            return {};
          }
        }
        case 1: {
          if (
            s.windows[0] === s.windows[1] &&
            s.windows[1] === s.windows[2] &&
            s.windows[2] === s.windows[3]
          ) {
            const newWindows = [...s.windows];
            newWindows[1] = id;
            newWindows[3] = id;
            return { windows: newWindows };
          } else if (
            s.windows[0] === s.windows[1] ||
            s.windows[3] === s.windows[1]
          ) {
            const newWindows = [...s.windows];
            newWindows[1] = id;
            return { windows: newWindows };
          } else {
            return {};
          }
        }
        case 2: {
          if (
            s.windows[0] === s.windows[1] &&
            s.windows[1] === s.windows[2] &&
            s.windows[2] === s.windows[3]
          ) {
            const newWindows = [...s.windows];
            newWindows[2] = id;
            newWindows[3] = id;
            return { windows: newWindows };
          } else if (
            s.windows[0] === s.windows[2] ||
            s.windows[3] === s.windows[2]
          ) {
            const newWindows = [...s.windows];
            newWindows[2] = id;
            return { windows: newWindows };
          } else {
            return {};
          }
        }
        case 3: {
          if (
            s.windows[0] === s.windows[1] &&
            s.windows[1] === s.windows[2] &&
            s.windows[2] === s.windows[3]
          ) {
            const newWindows = [...s.windows];
            newWindows[1] = id;
            newWindows[3] = id;
            return { windows: newWindows };
          } else if (
            s.windows[1] === s.windows[3] ||
            s.windows[2] === s.windows[3]
          ) {
            const newWindows = [...s.windows];
            newWindows[3] = id;
            return { windows: newWindows };
          } else {
            return {};
          }
        }
      }
    }),
  swapWindows: (position, screen) =>
    set((s) => {
      const id = createId(screen);
      if (
        s.windows[0] === s.windows[1] &&
        s.windows[1] === s.windows[2] &&
        s.windows[2] === s.windows[3]
      ) {
        return { windows: Array(4).fill(id) };
      } else {
        switch (position) {
          case 0: {
            if (s.windows[0] === s.windows[1]) {
              const newWindows = [...s.windows];
              newWindows[0] = id;
              newWindows[1] = id;
              return { windows: newWindows };
            } else if (s.windows[0] === s.windows[2]) {
              const newWindows = [...s.windows];
              newWindows[0] = id;
              newWindows[2] = id;
              return { windows: newWindows };
            } else {
              const newWindows = [...s.windows];
              newWindows[0] = id;
              return { windows: newWindows };
            }
          }
          case 1: {
            if (s.windows[1] === s.windows[0]) {
              const newWindows = [...s.windows];
              newWindows[0] = id;
              newWindows[1] = id;
              return { windows: newWindows };
            } else if (s.windows[1] === s.windows[3]) {
              const newWindows = [...s.windows];
              newWindows[1] = id;
              newWindows[3] = id;
              return { windows: newWindows };
            } else {
              const newWindows = [...s.windows];
              newWindows[1] = id;
              return { windows: newWindows };
            }
          }
          case 2: {
            if (s.windows[2] === s.windows[3]) {
              const newWindows = [...s.windows];
              newWindows[2] = id;
              newWindows[3] = id;
              return { windows: newWindows };
            } else if (s.windows[2] === s.windows[0]) {
              const newWindows = [...s.windows];
              newWindows[2] = id;
              newWindows[0] = id;
              return { windows: newWindows };
            } else {
              const newWindows = [...s.windows];
              newWindows[2] = id;
              return { windows: newWindows };
            }
          }
          case 3: {
            if (s.windows[3] === s.windows[2]) {
              const newWindows = [...s.windows];
              newWindows[2] = id;
              newWindows[3] = id;
              return { windows: newWindows };
            } else if (s.windows[3] === s.windows[1]) {
              const newWindows = [...s.windows];
              newWindows[1] = id;
              newWindows[3] = id;
              return { windows: newWindows };
            } else {
              const newWindows = [...s.windows];
              newWindows[3] = id;
              return { windows: newWindows };
            }
          }
        }
      }
    }),
  removeWindows: (position) =>
    set((s) => {
      if (
        s.windows[0] === s.windows[1] &&
        s.windows[1] === s.windows[2] &&
        s.windows[2] === s.windows[3]
      ) {
        return {
          windows: ['0-start', '0-start', '0-start', '0-start'],
        };
      } else {
        switch (position) {
          case 0: {
            if (s.windows[0] === s.windows[2]) {
              const newWindows = [...s.windows];
              newWindows[0] = s.windows[1];
              newWindows[2] = s.windows[3];
              return { windows: newWindows };
            } else if (s.windows[0] === s.windows[1]) {
              const newWindows = [...s.windows];
              newWindows[0] = s.windows[2];
              newWindows[1] = s.windows[3];
              return { windows: newWindows };
            } else if (s.windows[2] === s.windows[3]) {
              const newWindows = [...s.windows];
              newWindows[0] = s.windows[1];
              return { windows: newWindows };
            } else {
              const newWindows = [...s.windows];
              newWindows[0] = s.windows[2];
              return { windows: newWindows };
            }
          }
          case 1: {
            if (s.windows[1] === s.windows[3]) {
              const newWindows = [...s.windows];
              newWindows[1] = s.windows[0];
              newWindows[3] = s.windows[2];
              return { windows: newWindows };
            } else if (s.windows[1] === s.windows[0]) {
              const newWindows = [...s.windows];
              newWindows[1] = s.windows[3];
              newWindows[2] = s.windows[0];
              return { windows: newWindows };
            } else if (s.windows[2] === s.windows[3]) {
              const newWindows = [...s.windows];
              newWindows[1] = s.windows[0];
              return { windows: newWindows };
            } else {
              const newWindows = [...s.windows];
              newWindows[1] = s.windows[3];
              return { windows: newWindows };
            }
          }
          case 2: {
            if (s.windows[2] === s.windows[0]) {
              const newWindows = [...s.windows];
              newWindows[0] = s.windows[1];
              newWindows[2] = s.windows[3];
              return { windows: newWindows };
            } else if (s.windows[2] === s.windows[3]) {
              const newWindows = [...s.windows];
              newWindows[2] = s.windows[0];
              newWindows[3] = s.windows[1];
              return { windows: newWindows };
            } else if (s.windows[0] === s.windows[1]) {
              const newWindows = [...s.windows];
              newWindows[2] = s.windows[3];
              return { windows: newWindows };
            } else {
              const newWindows = [...s.windows];
              newWindows[2] = s.windows[0];
              return { windows: newWindows };
            }
          }
          case 3: {
            if (s.windows[3] === s.windows[1]) {
              const newWindows = [...s.windows];
              newWindows[1] = s.windows[0];
              newWindows[3] = s.windows[2];
              return { windows: newWindows };
            } else if (s.windows[3] === s.windows[2]) {
              const newWindows = [...s.windows];
              newWindows[2] = s.windows[0];
              newWindows[3] = s.windows[1];
              return { windows: newWindows };
            } else if (s.windows[0] === s.windows[1]) {
              const newWindows = [...s.windows];
              newWindows[3] = s.windows[2];
              return { windows: newWindows };
            } else {
              const newWindows = [...s.windows];
              newWindows[3] = s.windows[1];
              return { windows: newWindows };
            }
          }
        }
      }
    }),
  swapAllWindows: (value) => set(() => ({ windows: value })),
  conlang: conlangInit,
  changeConlang: (path, value) =>
    set((s) => ({
      conlang: deepUpdate(s.conlang, path, value),
      saved: false,
    })),
  replaceConlang: (value) => set(() => ({ conlang: value, saved: false })),

  lastInput: '',
  setLastInput: (value) => set(() => ({ lastInput: value })),

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  insertText: (_text) => {},
  setInsertText: (value) => set(() => ({ insertText: value })),
}));
