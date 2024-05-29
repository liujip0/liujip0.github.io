import PropTypes from 'prop-types';
import HomeScreen from './HomeScreen';
import ScreensMenus from './ScreensMenus';
import SettingsScreen from './SettingsScreen';
import StartScreen from './StartScreen';
import { Conlang } from './Interfaces';

export default function ScreensLayout({
  conlang: Conlang, conlangDispatch,
  setSaved,
  windows, windowsDispatch,
  conlangFileHandle, setConlangFileHandle
}) {
    return (
        <>
            <ScreensMenus windowsDispatch={windowsDispatch}></ScreensMenus>

            <Screen
              windows={windows} windowsDispatch={windowsDispatch}
              position={0}
              conlang={conlang} conlangDispatch={conlangDispatch}
              conlangFileHandle={conlangFileHandle} setConlangFileHandle={setConlangFileHandle}
              setSaved={setSaved}
              location={{
                gridRowStart: 'a0',
                gridRowEnd: (windows[0] === windows[2] ? 'a2' : 'a0'),
                gridColumnStart: 'a0',
                gridColumnEnd: (windows[0] === windows[1] ? 'a1' : 'a0')
              }}
            ></Screen>

            {windows[0] !== windows[1] &&
              <Screen
                windows={windows} windowsDispatch={windowsDispatch}
                position={1}
                conlang={conlang} conlangDispatch={conlangDispatch}
                conlangFileHandle={conlangFileHandle} setConlangFileHandle={setConlangFileHandle}
                setSaved={setSaved}
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
                windows={windows} windowsDispatch={windowsDispatch}
                position={2}
                conlang={conlang} conlangDispatch={conlangDispatch}
                conlangFileHandle={conlangFileHandle} setConlangFileHandle={setConlangFileHandle}
                setSaved={setSaved}
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
                windows={windows} windowsDispatch={windowsDispatch}
                position={3}
                conlang={conlang} conlangDispatch={conlangDispatch}
                conlangFileHandle={conlangFileHandle} setConlangFileHandle={setConlangFileHandle}
                setSaved={setSaved}
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
  windows, windowsDispatch,
  conlang, conlangDispatch,
  conlangFileHandle, setConlangFileHandle,
  setSaved
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
          windowsDispatch={windowsDispatch}
          setSaved={setSaved}
        ></StartScreen>
      }
      {windows[position].split('-')[1] === 'home' &&
        <HomeScreen></HomeScreen>
      }
      {windows[position].split('-')[1] === 'settings' &&
        <SettingsScreen
          conlang={conlang}
          conlangDispatch={conlangDispatch}
        ></SettingsScreen>
      }
    </div>
  );
}
Screen.propTypes = {
  location: PropTypes.object.isRequired,
  position: PropTypes.number.isRequired,
  windows: PropTypes.arrayOf(PropTypes.string).isRequired,
  windowsDispatch: PropTypes.func.isRequired,
  conlang: PropTypes.shape({
    name: PropTypes.string.isRequired
  }),
  conlangDispatch: PropTypes.func.isRequired,
  conlangFileHandle: PropTypes.any.isRequired,
  setConlangFileHandle: PropTypes.func.isRequired,
  setSaved: PropTypes.func.isRequired
}