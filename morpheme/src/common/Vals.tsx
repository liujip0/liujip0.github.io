/* eslint-disable react-refresh/only-export-components */
import { create } from 'zustand';
import { deepUpdate } from './Funcs';
import {
    Conlang,
    screenPosition,
    screenStr,
    submenuStr,
    submenusArr,
    windowsArr
} from './Types';

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

    cxsExpanded: boolean;
    setCxsExpanded: (value: boolean) => void;
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
                submenus: newSubmenus
            };
        }),

    windows: ['0-start', '0-start', '0-start', '0-start'],
    addWindows: (position, screen) =>
        set((s) => {
            const time = new Date().getMilliseconds();
            switch (position) {
                case 0: {
                    if (
                        s.windows[0] === s.windows[1] &&
                        s.windows[1] === s.windows[2] &&
                        s.windows[2] === s.windows[3]
                    ) {
                        const newWindows = [...s.windows];
                        newWindows[0] = time + '-' + screen;
                        newWindows[2] = time + '-' + screen;
                        return { windows: newWindows };
                    } else if (
                        s.windows[2] === s.windows[0] ||
                        s.windows[1] === s.windows[0]
                    ) {
                        const newWindows = [...s.windows];
                        newWindows[0] = time + '-' + screen;
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
                        newWindows[1] = time + '-' + screen;
                        newWindows[3] = time + '-' + screen;
                        return { windows: newWindows };
                    } else if (
                        s.windows[0] === s.windows[1] ||
                        s.windows[3] === s.windows[1]
                    ) {
                        const newWindows = [...s.windows];
                        newWindows[1] = time + '-' + screen;
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
                        newWindows[2] = time + '-' + screen;
                        newWindows[3] = time + '-' + screen;
                        return { windows: newWindows };
                    } else if (
                        s.windows[0] === s.windows[2] ||
                        s.windows[3] === s.windows[2]
                    ) {
                        const newWindows = [...s.windows];
                        newWindows[2] = time + '-' + screen;
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
                        newWindows[1] = time + '-' + screen;
                        newWindows[3] = time + '-' + screen;
                        return { windows: newWindows };
                    } else if (
                        s.windows[1] === s.windows[3] ||
                        s.windows[2] === s.windows[3]
                    ) {
                        const newWindows = [...s.windows];
                        newWindows[3] = time + '-' + screen;
                        return { windows: newWindows };
                    } else {
                        return {};
                    }
                }
            }
        }),
    swapWindows: (position, screen) =>
        set((s) => {
            const time = new Date().getMilliseconds();
            if (
                s.windows[0] === s.windows[1] &&
                s.windows[1] === s.windows[2] &&
                s.windows[2] === s.windows[3]
            ) {
                return { windows: Array(4).fill(time + '-' + screen) };
            } else {
                switch (position) {
                    case 0: {
                        if (s.windows[0] === s.windows[1]) {
                            const newWindows = [...s.windows];
                            newWindows[0] = time + '-' + screen;
                            newWindows[1] = time + '-' + screen;
                            return { windows: newWindows };
                        } else if (s.windows[0] === s.windows[2]) {
                            const newWindows = [...s.windows];
                            newWindows[0] = time + '-' + screen;
                            newWindows[2] = time + '-' + screen;
                            return { windows: newWindows };
                        } else {
                            const newWindows = [...s.windows];
                            newWindows[0] = time + '-' + screen;
                            return { windows: newWindows };
                        }
                    }
                    case 1: {
                        if (s.windows[1] === s.windows[0]) {
                            const newWindows = [...s.windows];
                            newWindows[0] = time + '-' + screen;
                            newWindows[1] = time + '-' + screen;
                            return { windows: newWindows };
                        } else if (s.windows[1] === s.windows[3]) {
                            const newWindows = [...s.windows];
                            newWindows[1] = time + '-' + screen;
                            newWindows[3] = time + '-' + screen;
                            return { windows: newWindows };
                        } else {
                            const newWindows = [...s.windows];
                            newWindows[1] = time + '-' + screen;
                            return { windows: newWindows };
                        }
                    }
                    case 2: {
                        if (s.windows[2] === s.windows[3]) {
                            const newWindows = [...s.windows];
                            newWindows[2] = time + '-' + screen;
                            newWindows[3] = time + '-' + screen;
                            return { windows: newWindows };
                        } else if (s.windows[2] === s.windows[0]) {
                            const newWindows = [...s.windows];
                            newWindows[2] = time + '-' + screen;
                            newWindows[0] = time + '-' + screen;
                            return { windows: newWindows };
                        } else {
                            const newWindows = [...s.windows];
                            newWindows[2] = time + '-' + screen;
                            return { windows: newWindows };
                        }
                    }
                    case 3: {
                        if (s.windows[3] === s.windows[2]) {
                            const newWindows = [...s.windows];
                            newWindows[2] = time + '-' + screen;
                            newWindows[3] = time + '-' + screen;
                            return { windows: newWindows };
                        } else if (s.windows[3] === s.windows[1]) {
                            const newWindows = [...s.windows];
                            newWindows[1] = time + '-' + screen;
                            newWindows[3] = time + '-' + screen;
                            return { windows: newWindows };
                        } else {
                            const newWindows = [...s.windows];
                            newWindows[3] = time + '-' + screen;
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
                return { windows: ['0-home', '0-home', '0-home', '0-home'] };
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
    conlang: {
        name: 'none',
        widgets: {
            charInsert: {
                enabled: true,
                chars: ['A', 'a', 'B', 'b', 'C', 'c']
            },
            dictSearch: {
                enabled: true
            },
            cxs: {
                enabled: true
            }
        },
        inventory: []
    },
    changeConlang: (path, value) =>
        set((s) => ({
            conlang: deepUpdate(s.conlang, path, value),
            saved: false
        })),
    replaceConlang: (value) => set(() => ({ conlang: value, saved: false })),

    lastInput: '',
    setLastInput: (value) => set(() => ({ lastInput: value })),

    cxsExpanded: false,
    setCxsExpanded: (value) => set(() => ({ cxsExpanded: value }))
}));
