import HomeScreen from './HomeScreen';
import ScreensMenus from './ScreensMenus';
import StartScreen from './StartScreen';

export default function ScreensLayout({
  conlangDispatch,
  windows, windowsDispatch,
  conlangFileHandle, setConlangFileHandle
}) {
    return (
        <>
            <ScreensMenus windowsDispatch={windowsDispatch}></ScreensMenus>

            <Screen
              windows={windows}
              position={0}
              conlangDispatch={conlangDispatch}
              conlangFileHandle={conlangFileHandle} setConlangFileHandle={setConlangFileHandle}
              location={{
                gridRowStart: 'a0',
                gridRowEnd: (windows[0] === windows[2] ? 'a2' : 'a0'),
                gridColumnStart: 'a0',
                gridColumnEnd: (windows[0] === windows[1] ? 'a1' : 'a0')
              }}
            ></Screen>

            {windows[0] !== windows[1] &&
              <Screen
                windows={windows}
                position={1}
                conlangDispatch={conlangDispatch}
                conlangFileHandle={conlangFileHandle} setConlangFileHandle={setConlangFileHandle}
                location={{
                  gridRowStart: 'a1',
                  gridRowEnd: (windows[1] === windows[3] ? 'a3' : 'a1'),
                  gridColumnStart: 'a1',
                  gridColumnEnd: 'a1'
                }}
              ></Screen>
            }

            {windows[0] !== windows[2] &&
              <Screen
                windows={windows}
                position={2}
                conlangDispatch={conlangDispatch}
                conlangFileHandle={conlangFileHandle} setConlangFileHandle={setConlangFileHandle}
                location={{
                  gridRowStart: 'a2',
                  gridRowEnd: 'a2',
                  gridColumnStart: 'a2',
                  gridColumnEnd: (windows[2] === windows[3] ? 'a3' : 'a2')
                }}
              ></Screen>
            }

            {windows[1] !== windows[3] && windows[2] !== windows[3] &&
              <Screen
                windows={windows}
                position={3}
                conlangDispatch={conlangDispatch}
                conlangFileHandle={conlangFileHandle} setConlangFileHandle={setConlangFileHandle}
                location={{
                  gridRowStart: 'a3',
                  gridRowEnd: 'a3',
                  gridColumnStart: 'a3',
                  gridColumnEnd: 'a3'
                }}
              ></Screen>}
        </>
    );
}

function Screen({
  location,
  position,
  windows,
  conlangDispatch,
  conlangFileHandle, setConlangFileHandle
}) {
  return (
    <div style={{
      ...location,
      padding: '0.5em 2em',
      overflow: 'scroll',
      backgroundColor: 'white'
    }}>
      {windows[position].split('-')[1] === 'start' &&
        <StartScreen
          conlangDispatch={conlangDispatch}
          conlangFileHandle={conlangFileHandle} setConlangFileHandle={setConlangFileHandle}
        ></StartScreen>
      }
      {windows[position].split('-')[1] === 'home' &&
        <HomeScreen></HomeScreen>
      }
    </div>
  );
}