import { createContext, useContext, useReducer, useState } from "react";
import { deepUpdate } from "./CommonFuncs";
import { Conlang, submenuStr, screenPosition, screenStr, submenusArr, windowsArr } from "./CommonTypes";

type ContextProviderProps = {
    children: React.ReactNode;
}
export function ContextProvider({children}: ContextProviderProps) {
    const [saved, setSaved] = useState(savedInit);
    const [conlang, setConlang] = useReducer(conlangReducer, conlangInit);
    const [windows, setWindows] = useReducer(windowsReducer, windowsInit);
    const [fileHandle, setFileHandle] = useState<FileSystemFileHandle | null>(fileHandleInit);
    const [submenus, setSubmenus] = useReducer(submenusReducer, submenusInit);

    return (
        <ConlangContext.Provider value={{
            conlang: conlang,
            setConlang: (action: conlangReducerAction) => {
                setSaved(false);
                setConlang(action);
            }
        }}>
            <SavedContext.Provider value={{
                saved: saved,
                setSaved: setSaved
            }}>
                <WindowsContext.Provider value={{
                    windows: windows,
                    setWindows: setWindows
                }}>
                    <FileHandleContext.Provider value={{
                        fileHandle: fileHandle,
                        setFileHandle: setFileHandle
                    }}>
                        <SubmenusContext.Provider value={{
                            submenus: submenus,
                            setSubmenus: setSubmenus
                        }}>
                            {children}
                        </SubmenusContext.Provider>
                    </FileHandleContext.Provider>
                </WindowsContext.Provider>
            </SavedContext.Provider>
        </ConlangContext.Provider>
    );
}

const conlangInit: Conlang = {
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
    }
};
type conlangReducerAction = {
    type: 'replaceAll';
    newValue: Conlang;
} | {
    type: 'replace';
    path: Array<string>;
    newValue: unknown;
};
function conlangReducer(
    conlang: Conlang,
    action: conlangReducerAction
): Conlang {
    switch (action.type) {
        case 'replaceAll': {
            return action.newValue;
        }
        case 'replace': {
            return deepUpdate(conlang, action.path, action.newValue);
        }
    }
}
const ConlangContext = createContext<{
    conlang: Conlang;
    setConlang: (action: conlangReducerAction) => void;
} | null>(null);
export function useConlangContext() {
    const conlangContext = useContext(ConlangContext);
    if (conlangContext) {
        return conlangContext;
    } else {
        throw Error('`useConlangContext` not in context provider');
    }
}

const savedInit = true;
const SavedContext = createContext<{
    saved: boolean;
    setSaved: (value: boolean) => void;
} | null>(null);
export function useSavedContext() {
    const savedContext = useContext(SavedContext);
    if (savedContext) {
        return savedContext;
    } else {
        throw Error ('`useSavedContext` not in context provider');
    }
}

const windowsInit = ['0-start', '0-start', '0-start', '0-start'];
type windowsReducerAction = {
    type: 'add' | 'swap',
    position: screenPosition,
    screen: screenStr
} | {
    type: 'remove',
    position: screenPosition
} | {
    type: 'swapAll',
    newValue: windowsArr
};
export type windowsReducerFunc = (action: windowsReducerAction) => void;
function windowsReducer(
    windows: windowsArr,
    action: windowsReducerAction
): windowsArr {
    const time = new Date().getMilliseconds();
    switch (action.type) {
        case 'add': {
            switch (action.position) {
                case 0: {
                    if (windows[0] === windows[1] && windows[1] === windows[2] && windows[2] === windows[3]) {
                        const newWindows = [...windows];
                        newWindows[0] = time + '-' + action.screen;
                        newWindows[2] = time + '-' + action.screen;
                        return newWindows;
                    } else if (windows[2] === windows[0] || windows[1] === windows[0]) {
                        const newWindows = [...windows];
                        newWindows[0] = time + '-' + action.screen;
                        return newWindows;
                    } else {
                        return windows;
                    }
                }
                case 1: {
                    if (windows[0] === windows[1] && windows[1] === windows[2] && windows[2] === windows[3]) {
                        const newWindows = [...windows];
                        newWindows[1] = time + '-' + action.screen;
                        newWindows[3] = time + '-' + action.screen;
                        return newWindows;
                    } else if (windows[0] === windows[1] || windows[3] === windows[1]) {
                        const newWindows = [...windows];
                        newWindows[1] = time + '-' + action.screen;
                        return newWindows;
                    } else {
                        return windows;
                    }
                }
                case 2: {
                    if (windows[0] === windows[1] && windows[1] === windows[2] && windows[2] === windows[3]) {
                        const newWindows = [...windows];
                        newWindows[2] = time + '-' + action.screen;
                        newWindows[3] = time + '-' + action.screen;
                        return newWindows;
                    } else if (windows[0] === windows[2] || windows[3] === windows[2]) {
                        const newWindows = [...windows];
                        newWindows[2] = time + '-' + action.screen;
                        return newWindows;
                    } else {
                        return windows;
                    }
                }
                case 3: {
                    if (windows[0] === windows[1] && windows[1] === windows[2] && windows[2] === windows[3]) {
                        const newWindows = [...windows];
                        newWindows[1] = time + '-' + action.screen;
                        newWindows[3] = time + '-' + action.screen;
                        return newWindows;
                    } else if (windows[1] === windows[3] || windows[2] === windows[3]) {
                        const newWindows = [...windows];
                        newWindows[3] = time + '-' + action.screen;
                        return newWindows;
                    } else {
                        return windows;
                    }
                }
                default: {
                    throw Error('Unknown position for `add`: ' + action.position);
                }
            }
        }
        case 'remove': {
            if (windows[0] === windows[1] && windows[1] === windows[2] && windows[2] === windows[3]) {
                return ['0-home', '0-home', '0-home', '0-home'];
            } else {
                switch (action.position) {
                    case 0: {
                    if (windows[0] === windows[2]) {
                        const newWindows = [...windows];
                        newWindows[0] = windows[1];
                        newWindows[2] = windows[3];
                        return newWindows;
                    } else if (windows[0] === windows[1]) {
                        const newWindows = [...windows];
                        newWindows[0] = windows[2];
                        newWindows[1] = windows[3];
                        return newWindows;
                    } else if (windows[2] === windows[3]) {
                        const newWindows = [...windows];
                        newWindows[0] = windows[1];
                        return newWindows;
                    } else {
                        const newWindows = [...windows];
                        newWindows[0] = windows[2];
                        return newWindows;
                    }
                    }
                    case 1: {
                    if (windows[1] === windows[3]) {
                        const newWindows = [...windows];
                        newWindows[1] = windows[0];
                        newWindows[3] = windows[2];
                        return newWindows;
                    } else if (windows[1] === windows[0]) {
                        const newWindows = [...windows];
                        newWindows[1] = windows[3];
                        newWindows[2] = windows[0];
                        return newWindows;
                    } else if (windows[2] === windows[3]) {
                        const newWindows = [...windows];
                        newWindows[1] = windows[0];
                        return newWindows;
                    } else {
                        const newWindows = [...windows];
                        newWindows[1] = windows[3];
                        return newWindows;
                    }
                    }
                    case 2: {
                    if (windows[2] === windows[0]) {
                        const newWindows = [...windows];
                        newWindows[0] = windows[1];
                        newWindows[2] = windows[3];
                        return newWindows;
                    } else if (windows[2] === windows[3]) {
                        const newWindows = [...windows];
                        newWindows[2] = windows[0];
                        newWindows[3] = windows[1];
                        return newWindows;
                    } else if (windows[0] === windows[1]) {
                        const newWindows = [...windows];
                        newWindows[2] = windows[3];
                        return newWindows;
                    } else {
                        const newWindows = [...windows];
                        newWindows[2] = windows[0];
                        return newWindows;
                    }
                    }
                    case 3: {
                    if (windows[3] === windows[1]) {
                        const newWindows = [...windows];
                        newWindows[1] = windows[0];
                        newWindows[3] = windows[2];
                        return newWindows;
                    } else if (windows[3] === windows[2]) {
                        const newWindows = [...windows];
                        newWindows[2] = windows[0];
                        newWindows[3] = windows[1];
                        return newWindows;
                    } else if (windows[0] === windows[1]) {
                        const newWindows = [...windows];
                        newWindows[3] = windows[2];
                        return newWindows;
                    } else {
                        const newWindows = [...windows];
                        newWindows[3] = windows[1];
                        return newWindows;
                    }
                    }
                    default: {
                        throw Error('Unknown position for `remove`: ' + action.position);
                    }
                }
            }
        }
        case 'swap': {
            if (windows[0] === windows[1] && windows[1] === windows[2] && windows[2] === windows[3]) {
                return Array(4).fill(time + '-' + action.screen);
            } else {
                switch (action.position) {
                    case 0: {
                        if (windows[0] === windows[1]) {
                            const newWindows = [...windows];
                            newWindows[0] = time + '-' + action.screen;
                            newWindows[1] = time + '-' + action.screen;
                            return newWindows;
                        } else if (windows[0] === windows[2]) {
                            const newWindows = [...windows];
                            newWindows[0] = time + '-' + action.screen;
                            newWindows[2] = time + '-' + action.screen;
                            return newWindows;
                        } else {
                            const newWindows = [...windows];
                            newWindows[0] = time + '-' + action.screen;
                            return newWindows;
                        }
                    }
                    case 1: {
                        if (windows[1] === windows[0]) {
                            const newWindows = [...windows];
                            newWindows[0] = time + '-' + action.screen;
                            newWindows[1] = time + '-' + action.screen;
                            return newWindows;
                        } else if (windows[1] === windows[3]) {
                            const newWindows = [...windows];
                            newWindows[1] = time + '-' + action.screen;
                            newWindows[3] = time + '-' + action.screen;
                            return newWindows;
                        } else {
                            const newWindows = [...windows];
                            newWindows[1] = time + '-' + action.screen;
                            return newWindows;
                        }
                    }
                    case 2: {
                        if (windows[2] === windows[3]) {
                            const newWindows = [...windows];
                            newWindows[2] = time + '-' + action.screen;
                            newWindows[3] = time + '-' + action.screen;
                            return newWindows;
                        } else if (windows[2] === windows[0]) {
                            const newWindows = [...windows];
                            newWindows[2] = time + '-' + action.screen;
                            newWindows[0] = time + '-' + action.screen;
                            return newWindows;
                        } else {
                            const newWindows = [...windows];
                            newWindows[2] = time + '-' + action.screen;
                            return newWindows;
                        }
                    }
                    case 3: {
                        if (windows[3] === windows[2]) {
                            const newWindows = [...windows];
                            newWindows[2] = time + '-' + action.screen;
                            newWindows[3] = time + '-' + action.screen;
                            return newWindows;
                        } else if (windows[3] === windows[1]) {
                            const newWindows = [...windows];
                            newWindows[1] = time + '-' + action.screen;
                            newWindows[3] = time + '-' + action.screen;
                            return newWindows;
                        } else {
                            const newWindows = [...windows];
                            newWindows[3] = time + '-' + action.screen;
                            return newWindows;
                        }
                    }
                    default: {
                        throw Error('Unknown position for `remove`' + action.position);
                    }
                }
            }
        }
        case 'swapAll': {
            return action.newValue;
        }
    }
}
const WindowsContext = createContext<{
    windows: windowsArr;
    setWindows: (action: windowsReducerAction) => void;
} | null>(null);
export function useWindowsContext() {
    const windowsContext = useContext(WindowsContext);
    if (windowsContext) {
        return windowsContext;
    } else {
        throw Error('`useWindowsContext` not in context provider');
    }
}

const fileHandleInit = null;
const FileHandleContext = createContext<{
    fileHandle: FileSystemFileHandle | null;
    setFileHandle: (value: (FileSystemFileHandle | null)) => void;
} | null>(null);
export function useFileHandleContext() {
    const fileHandleContext = useContext(FileHandleContext);
    if (fileHandleContext) {
        return fileHandleContext;
    } else {
        throw Error('`useFileHandleContext` not in context provider');
    }
}

const submenusInit: submenusArr = ['', '', '', ''];
type submenusReducerAction = {
    type: 'replace';
    position: screenPosition;
    menu: submenuStr;
}
function submenusReducer(
    submenus: submenusArr,
    action: submenusReducerAction
): submenusArr {
    switch (action.type) {
        case 'replace': {
            const newSubmenus = [...submenus];
            newSubmenus[action.position] = action.menu;
            return newSubmenus;
        }
    }
}
const SubmenusContext = createContext<{
    submenus: submenusArr;
    setSubmenus: (action: submenusReducerAction) => void;
} | null>(null);
export function useSubmenusContext() {
    const submenusContext = useContext(SubmenusContext);
    if (submenusContext) {
        return submenusContext;
    } else {
        throw Error('`useSubmenusContext` not in context provider');
    }
}