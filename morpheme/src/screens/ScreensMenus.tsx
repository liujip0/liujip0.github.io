import { MdAdd, MdClose, MdOutlineSwapHoriz } from 'react-icons/md';
import { IconButton } from '../common/Components.tsx';
import { screenPosition, screenStr } from '../common/Types';
import { useStoreState } from '../common/Vals';

export default function ScreensMenus() {
    return (
        <>
            <MenuButtonCont
                position={{
                    gridRowStart: 'a0',
                    gridColumnStart: 'a0'
                }}>
                <MenuButtons position={0} />
                <Submenu position={0} />
            </MenuButtonCont>
            <MenuButtonCont
                position={{
                    gridRowStart: 'a1',
                    gridColumnEnd: 'a1',
                    marginLeft: 'auto'
                }}>
                <Submenu position={1} />
                <MenuButtons position={1} />
            </MenuButtonCont>
            <MenuButtonCont
                position={{
                    gridRowEnd: 'a2',
                    gridColumnStart: 'a2',
                    marginTop: 'auto'
                }}>
                <MenuButtons position={2} />
                <Submenu position={2} />
            </MenuButtonCont>
            <MenuButtonCont
                position={{
                    gridRowEnd: 'a3',
                    gridColumnEnd: 'a3',
                    marginTop: 'auto',
                    marginLeft: 'auto'
                }}>
                <Submenu position={3} />
                <MenuButtons position={3} />
            </MenuButtonCont>
        </>
    );
}

type MenuButtonContProps = {
    position: Record<string, string>;
    children: React.ReactNode;
};
function MenuButtonCont({ position, children }: MenuButtonContProps) {
    return (
        <div
            style={{
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

type MenuButtonsProps = {
    position: screenPosition;
};
function MenuButtons({ position }: MenuButtonsProps) {
    const removeWindows = useStoreState((s) => s.removeWindows);
    const replaceSubmenus = useStoreState((s) => s.replaceSubmenus);
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column'
            }}>
            <IconButton
                onClick={() => {
                    removeWindows(position);
                }}>
                <MdClose size={17} />
            </IconButton>
            <IconButton
                onClick={() => {
                    replaceSubmenus(position, 'swap');
                }}>
                <MdOutlineSwapHoriz size={17} />
            </IconButton>
            <IconButton
                onClick={() => {
                    replaceSubmenus(position, 'add');
                }}>
                <MdAdd size={17} />
            </IconButton>
        </div>
    );
}

type SubmenuButtonProps = {
    position: screenPosition;
    screen: screenStr;
    children: React.ReactNode;
};
function SubmenuButton({ position, screen, children }: SubmenuButtonProps) {
    const addWindows = useStoreState((s) => s.addWindows);
    const swapWindows = useStoreState((s) => s.swapWindows);
    const submenus = useStoreState((s) => s.submenus);
    const replaceSubmenus = useStoreState((s) => s.replaceSubmenus);
    return (
        <button
            style={{
                border: 'none',
                backgroundColor: 'transparent',
                padding: '0.3em'
            }}
            onClick={() => {
                if (submenus[position] === 'add') {
                    addWindows(position, screen);
                } else {
                    swapWindows(position, screen);
                }
                replaceSubmenus(position, '');
            }}>
            {children}
        </button>
    );
}

type SubmenuProps = {
    position: screenPosition;
};
function Submenu({ position }: SubmenuProps) {
    const submenus = useStoreState((s) => s.submenus);
    const replaceSubmenus = useStoreState((s) => s.replaceSubmenus);
    return (
        <div
            style={{
                display: submenus[position] ? 'flex' : 'none',
                flexDirection: 'column',
                backgroundColor: 'lightgray'
            }}>
            <SubmenuButton
                position={position}
                screen={'start'}>
                Start
            </SubmenuButton>
            <SubmenuButton
                position={position}
                screen={'home'}>
                Home
            </SubmenuButton>
            <SubmenuButton
                position={position}
                screen={'phonology'}>
                Phonology
            </SubmenuButton>
            <SubmenuButton
                position={position}
                screen={'articles'}>
                Articles
            </SubmenuButton>
            <SubmenuButton
                position={position}
                screen={'lexicon'}>
                Lexicon
            </SubmenuButton>
            <SubmenuButton
                position={position}
                screen={'settings'}>
                Settings
            </SubmenuButton>
            <button
                style={{}}
                onClick={() => {
                    replaceSubmenus(position, '');
                }}>
                Close
            </button>
        </div>
    );
}
