import { TbSquareAsterisk, TbSquareOff, TbSquarePlus } from 'react-icons/tb';
import { IconButton } from './common/Components.tsx';
import { StringRes } from './common/Resources.tsx';
import { screenPosition, screenStr } from './common/Types.tsx';
import { useStoreState } from './common/Vals.tsx';

export default function ScreensMenus() {
  return (
    <>
      <MenuButtonCont
        position={{
          gridRowStart: 'a0',
          gridColumnStart: 'a0',
        }}>
        <MenuButtons position={0} />
        <Submenu position={0} />
      </MenuButtonCont>
      <MenuButtonCont
        position={{
          gridRowStart: 'a1',
          gridColumnEnd: 'a1',
          marginLeft: 'auto',
        }}>
        <Submenu position={1} />
        <MenuButtons position={1} />
      </MenuButtonCont>
      <MenuButtonCont
        position={{
          gridRowEnd: 'a2',
          gridColumnStart: 'a2',
          marginTop: 'auto',
        }}>
        <MenuButtons position={2} />
        <Submenu position={2} />
      </MenuButtonCont>
      <MenuButtonCont
        position={{
          gridRowEnd: 'a3',
          gridColumnEnd: 'a3',
          marginTop: 'auto',
          marginLeft: 'auto',
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
        zIndex: '2',
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
  const submenus = useStoreState((s) => s.submenus);
  const replaceSubmenus = useStoreState((s) => s.replaceSubmenus);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}>
      <IconButton
        onClick={() => {
          if (submenus[position] !== 'add') {
            replaceSubmenus(position, 'add');
          } else {
            replaceSubmenus(position, '');
          }
        }}>
        <TbSquarePlus size={17} />
      </IconButton>
      <IconButton
        onClick={() => {
          if (submenus[position] !== 'swap') {
            replaceSubmenus(position, 'swap');
          } else {
            replaceSubmenus(position, '');
          }
        }}>
        <TbSquareAsterisk size={17} />
      </IconButton>
      <IconButton
        onClick={() => {
          removeWindows(position);
        }}>
        <TbSquareOff
          size={17}
          style={{
            transform: 'scaleX(-1)',
          }}
        />
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
        padding: '0.3em',
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
        backgroundColor: 'lightgray',
      }}>
      <SubmenuButton
        position={position}
        screen={'start'}>
        {StringRes.start}
      </SubmenuButton>
      <SubmenuButton
        position={position}
        screen={'tutorial'}>
        {StringRes.tutorial}
      </SubmenuButton>
      <SubmenuButton
        position={position}
        screen={'phonology'}>
        {StringRes.phonology}
      </SubmenuButton>
      <SubmenuButton
        position={position}
        screen={'articles'}>
        {StringRes.articles}
      </SubmenuButton>
      <SubmenuButton
        position={position}
        screen={'declensions'}>
        {StringRes.inflections}
      </SubmenuButton>
      <SubmenuButton
        position={position}
        screen={'lexicon'}>
        {StringRes.lexicon}
      </SubmenuButton>
      <SubmenuButton
        position={position}
        screen={'translations'}>
        {StringRes.translations}
      </SubmenuButton>
      <SubmenuButton
        position={position}
        screen={'settings'}>
        {StringRes.settings}
      </SubmenuButton>
      <button
        style={{}}
        onClick={() => {
          replaceSubmenus(position, '');
        }}>
        {StringRes.close}
      </button>
    </div>
  );
}
