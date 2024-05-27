import { useReducer } from 'react';
import HomeScreen from './HomeScreen';
import ScreensMenus from './ScreensMenus';

export default function ScreensLayout() {
    const [windows, windowsDispatch] = useReducer(windowsReducer, ['0-home', '0-home', '0-home', '0-home']);
    return (
        <>
            <ScreensMenus windowsDispatch={windowsDispatch}></ScreensMenus>

            <Screen position={{
                gridRowStart: 'a0',
                gridRowEnd: (windows[0] === windows[2] ? 'a2' : 'a0'),
                gridColumnStart: 'a0',
                gridColumnEnd: (windows[0] === windows[1] ? 'a1' : 'a0')
            }}>
                {windows[0].split('-')[1] === 'home' && <HomeScreen></HomeScreen>}
            </Screen>

            {windows[0] !== windows[1] && <Screen position={{
                gridRowStart: 'a1',
                gridRowEnd: (windows[1] === windows[3] ? 'a3' : 'a1'),
                gridColumnStart: 'a1',
                gridColumnEnd: 'a1'
            }}>
                {windows[1].split('-')[1] === 'home' && <HomeScreen></HomeScreen>}
            </Screen>}

            {windows[0] !== windows[2] && <Screen position={{
                gridRowStart: 'a2',
                gridRowEnd: 'a2',
                gridColumnStart: 'a2',
                gridColumnEnd: (windows[2] === windows[3] ? 'a3' : 'a2')
            }}>
                {windows[2].split('-')[1] === 'home' && <HomeScreen></HomeScreen>}
            </Screen>}

            {windows[1] !== windows[3] && windows[2] !== windows[3] && <Screen position={{
                gridRowStart: 'a3',
                gridRowEnd: 'a3',
                gridColumnStart: 'a3',
                gridColumnEnd: 'a3'
            }}>
                {windows[3].split('-')[1] === 'home' && <HomeScreen></HomeScreen>}
            </Screen>}
        </>
    );
}

function Screen({position, children}) {
  return (
    <div style={{
      ...position,
      padding: '0.5em',
      overflow: 'scroll'
    }}>
      {children}
    </div>
  );
}

function windowsReducer(windows, action) {
    const time = new Date().getMilliseconds();
    switch (action.type) {
      case 'add': {
        switch (action.position) {
          case 0: {
            if (windows[0] === windows[1] && windows[1] === windows[2] && windows[2] === windows[3]) {
              return windows.with(0, time + '-' + action.screen).with(2, time + '-' + action.screen);
            } else if (windows[2] === windows[0] || windows[1] === windows[0]) {
              return windows.with(0, time + '-' + action.screen);
            } else {
              return windows;
            }
          }
          case 1: {
            if (windows[0] === windows[1] && windows[1] === windows[2] && windows[2] === windows[3]) {
              return windows.with(1, time + '-' + action.screen).with(3, time + '-' + action.screen);
            } else if (windows[0] === windows[1] || windows[3] === windows[1]) {
              return windows.with(1, time + '-' + action.screen);
            } else {
              return windows;
            }
          }
          case 2: {
            if (windows[0] === windows[1] && windows[1] === windows[2] && windows[2] === windows[3]) {
              return windows.with(2, time + '-' + action.screen).with(3, time + '-' + action.screen);
            } else if (windows[0] === windows[2] || windows[3] === windows[2]) {
              return windows.with(2, time + '-' + action.screen);
            } else {
              return windows;
            }
          }
          case 3: {
            if (windows[0] === windows[1] && windows[1] === windows[2] && windows[2] === windows[3]) {
              return windows.with(1, time + '-' + action.screen).with(3, time + '-' + action.screen);
            } else if (windows[1] === windows[3] || windows[2] === windows[3]) {
              return windows.with(3, time + '-' + action.screen);
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
          return ['0-home', '0-home', '0-home', '0-home']
        } else {
          switch (action.position) {
            case 0: {
              if (windows[0] === windows[2]) {
                return windows.with(0, windows[1]).with(2, windows[3])
              } else if (windows[0] === windows[1]) {
                return windows.with(0, windows[2]).with(1, windows[3])
              } else if (windows[2] === windows[3]) {
                return windows.with(0, windows[1])
              } else {
                return windows.with(0, windows[2])
              }
            }
            case 1: {
              if (windows[1] === windows[3]) {
                return windows.with(1, windows[0]).with(3, windows[2])
              } else if (windows[1] === windows[0]) {
                return windows.with(1, windows[3]).with(2, windows[0])
              } else if (windows[2] === windows[3]) {
                return windows.with(1, windows[0])
              } else {
                return windows.with(1, windows[3])
              }
            }
            case 2: {
              if (windows[2] === windows[0]) {
                return windows.with(0, windows[1]).with(2, windows[3])
              } else if (windows[2] === windows[3]) {
                return windows.with(2, windows[0]).with(3, windows[1])
              } else if (windows[0] === windows[1]) {
                return windows.with(2, windows[3])
              } else {
                return windows.with(2, windows[0])
              }
            }
            case 3: {
              if (windows[3] === windows[1]) {
                return windows.with(1, windows[0]).with(3, windows[2])
              } else if (windows[3] === windows[2]) {
                return windows.with(3, windows[1]).with(2, windows[0])
              } else if (windows[0] === windows[1]) {
                return windows.with(3, windows[2])
              } else {
                return windows.with(3, windows[1])
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
                return windows.with(0, time + '-' + action.screen).with(1, time + '-' + action.screen);
              } else if (windows[0] === windows[2]) {
                return windows.with(0, time + '-' + action.screen).with(2, time + '-' + action.screen);
              } else {
                return windows.with(0, time + '-' + action.screen);
              }
            }
            case 1: {
              if (windows[1] === windows[0]) {
                return windows.with(1, time + '-' + action.screen).with(0, time + '-' + action.screen);
              } else if (windows[1] === windows[3]) {
                return windows.with(1, time + '-' + action.screen).with(3, time + '-' + action.screen);
              } else {
                return windows.with(1, time + '-' + action.screen);
              }
            }
            case 2: {
              if (windows[2] === windows[3]) {
                return windows.with(2, time + '-' + action.screen).with(3, time + '-' + action.screen);
              } else if (windows[2] === windows[0]) {
                return windows.with(2, time + '-' + action.screen).with(0, time + '-' + action.screen);
              } else {
                return windows.with(2, time + '-' + action.screen);
              }
            }
            case 3: {
              if (windows[3] === windows[2]) {
                return windows.with(3, time + '-' + action.screen).with(2, time + '-' + action.screen);
              } else if (windows[3] === windows[1]) {
                return windows.with(3, time + '-' + action.screen).with(1, time + '-' + action.screen);
              } else {
                return windows.with(3, time + '-' + action.screen);
              }
            }
            default: {
              throw Error('Unknown position for `remove`' + action.position);
            }
          }
        }
      }
      default: {
        throw Error('Unknown action: ' + action.type);
      }
    }
}