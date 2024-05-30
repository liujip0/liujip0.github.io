import { useReducer } from "react";
import { MdAdd, MdClose, MdOutlineSwapHoriz } from "react-icons/md";
import { screenPosition, screenStr } from "./CommonTypes";
import { windowsReducerFunc } from "./App";

type ScreensMenusProps = {
    windowsDispatch: windowsReducerFunc;
};
type menuStr = 'add' | 'swap' | '';
type submenusArr = Array<menuStr>;
export default function ScreensMenus({
    windowsDispatch
}: ScreensMenusProps) {
    const [submenus, submenuDispatch] = useReducer(submenusReducer, ['', '', '', ''])
    return (
        <>
            <MenuButtonCont position={{
                gridRowStart: 'a0',
                gridColumnStart: 'a0'
            }}>
                <MenuButtons windowsDispatch={windowsDispatch} submenuDispatch={submenuDispatch} position={0}></MenuButtons>
                <Submenu menu={submenus[0]} position={0} windowsDispatch={windowsDispatch} submenuDispatch={submenuDispatch}></Submenu>
            </MenuButtonCont>
            <MenuButtonCont position={{
                gridRowStart: 'a1',
                gridColumnEnd: 'a1',
                marginLeft: 'auto'
            }}>
                <Submenu menu={submenus[1]} position={1} windowsDispatch={windowsDispatch} submenuDispatch={submenuDispatch}></Submenu>
                <MenuButtons windowsDispatch={windowsDispatch} submenuDispatch={submenuDispatch} position={1}></MenuButtons>
            </MenuButtonCont>
            <MenuButtonCont position={{
                gridRowEnd: 'a2',
                gridColumnStart: 'a2',
                marginTop: 'auto'
            }}>
                <MenuButtons windowsDispatch={windowsDispatch} submenuDispatch={submenuDispatch} position={2}></MenuButtons>
                <Submenu menu={submenus[2]} position={2} windowsDispatch={windowsDispatch} submenuDispatch={submenuDispatch}></Submenu>
            </MenuButtonCont>
            <MenuButtonCont position={{
                gridRowEnd: 'a3',
                gridColumnEnd: 'a3',
                marginTop: 'auto',
                marginLeft: 'auto'
            }}>
                <Submenu menu={submenus[3]} position={3} windowsDispatch={windowsDispatch} submenuDispatch={submenuDispatch}></Submenu>
                <MenuButtons windowsDispatch={windowsDispatch} submenuDispatch={submenuDispatch} position={3}></MenuButtons>
            </MenuButtonCont>
        </>
    );
}

type MenuButtonContProps = {
    position: Record<string, string>;
    children: React.ReactNode;
};
function MenuButtonCont({
    position,
    children
}: MenuButtonContProps) {
    return (
        <div style={{
            ...position,
            width: 'min-content',
            height: 'min-content',
            display: 'flex',
            backgroundColor: 'darkgray',
            zIndex: '2'
        }}>
            {children}
        </div>
    );
}

type MenuButtonProps = {
    onClick: () => void;
    children: React.ReactNode;
}
function MenuButton({
    onClick,
    children
}: MenuButtonProps) {
    return (
        <button onClick={onClick} style={{
            backgroundColor: 'transparent',
            border: 'none',
            margin: '0',
            padding: '0.3em'
        }}>
            {children}
        </button>
    );
}

type MenuButtonsProps = {
    position: screenPosition;
    submenuDispatch: submenusReducerFunc;
    windowsDispatch: windowsReducerFunc;
}
function MenuButtons({
    position,
    submenuDispatch,
    windowsDispatch
}: MenuButtonsProps) {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
        }}>
            <MenuButton onClick={() => {windowsDispatch({
                type: 'remove',
                position: position
            })}}>
                <MdClose />
            </MenuButton>
            <MenuButton onClick={() => {submenuDispatch({
                position: position,
                menu: 'swap'
            })}}>
                <MdOutlineSwapHoriz />
            </MenuButton>
            <MenuButton onClick={() => {submenuDispatch({
                position: position,
                menu: 'add'
            })}}>
                <MdAdd />
            </MenuButton>
        </div>
    );
}

type SubmenuButtonProps = {
    action: menuStr;
    position: screenPosition;
    screen: screenStr;
    windowsDispatch: windowsReducerFunc;
    submenuDispatch: submenusReducerFunc;
    children: React.ReactNode;
};
function SubmenuButton({
    action,
    position,
    screen,
    windowsDispatch,
    submenuDispatch,
    children
}: SubmenuButtonProps) {
    return (
        <button style={{
            border: 'none',
            backgroundColor: 'transparent',
            padding: '0.3em'
        }} onClick={() => {
            windowsDispatch(
                action === 'add' ? {
                    type: 'add',
                    position: position,
                    screen: screen
                } : {
                    type: 'swap',
                    position: position,
                    screen: screen
                }
            );
            submenuDispatch({
                position: position,
                menu: ''
            });
        }}>
            {children}
        </button>
    );
}

type SubmenuProps = {
    menu: menuStr;
    position: screenPosition;
    windowsDispatch: windowsReducerFunc;
    submenuDispatch: submenusReducerFunc;
}
function Submenu({
    menu,
    position,
    windowsDispatch,
    submenuDispatch
}: SubmenuProps) {
    return (
        <div style={{
            display: menu ? 'flex' : 'none',
            flexDirection: 'column',
            backgroundColor: 'lightgray'
        }}>
            <SubmenuButton
                action={menu}
                position={position}
                windowsDispatch={windowsDispatch}
                submenuDispatch={submenuDispatch}
                screen={'start'}
            >Start</SubmenuButton>
            <SubmenuButton
                action={menu}
                position={position}
                windowsDispatch={windowsDispatch}
                submenuDispatch={submenuDispatch}
                screen={'home'}
            >Home</SubmenuButton>
            <SubmenuButton
                action={menu}
                position={position}
                windowsDispatch={windowsDispatch}
                submenuDispatch={submenuDispatch}
                screen={'phonology'}
            >Phonology</SubmenuButton>
            <SubmenuButton
                action={menu}
                position={position}
                windowsDispatch={windowsDispatch}
                submenuDispatch={submenuDispatch}
                screen={'grammar'}
            >Grammar</SubmenuButton>
            <SubmenuButton
                action={menu}
                position={position}
                windowsDispatch={windowsDispatch}
                submenuDispatch={submenuDispatch}
                screen={'lexicon'}
            >Lexicon</SubmenuButton>
            <SubmenuButton
                action={menu}
                position={position}
                windowsDispatch={windowsDispatch}
                submenuDispatch={submenuDispatch}
                screen={'settings'}
            >Settings</SubmenuButton>
            <button style={{

            }} onClick={() => {submenuDispatch({
                position: position,
                menu: ''
            })}}>Close</button>
        </div>
    );
}

type submenusReducerAction = {
    position: screenPosition;
    menu: menuStr;
}
type submenusReducerFunc = (action: submenusReducerAction) => void;
function submenusReducer(
    submenus: submenusArr,
    action: submenusReducerAction
): submenusArr {
    const newSubmenus = [...submenus];
    newSubmenus[action.position] = action.menu;
    return newSubmenus;
}