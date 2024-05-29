import { useReducer, useState } from 'react';
import './App.css';
import TopBar from './TopBar';
import Widget from './Widget';
import ScreensLayout from './ScreensLayout';
import { Conlang, Screen, ScreenPosition } from './Interfaces';

export default function App() {
    const [conlang, conlangDispatch] = useReducer(conlangReducer, {
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
    });
    const [saved, setSaved] = useState(true);
    const [windows, windowsDispatch] = useReducer(windowsReducer, ['0-start', '0-start', '0-start', '0-start']);
    const [conlangFileHandle, setConlangFileHandle] = useState(null);
    return (
        <div style={{
            position: 'relative',
            top: '0',
            left: '0',
            height: '100vh',
            width: '100vw',
            display: 'grid',
            gridTemplateRows: '5em 3em 1fr 1em 1fr',
            gridTemplateColumns: '1fr 1em 1fr',
            gridTemplateAreas: `'a a a' 'b b b' 'a0 c a1' 'd d d' 'a2 e a3'`,
            overflow: 'scroll',
            backgroundColor: 'lightgray'
        }}>
            <TopBar
                conlang={conlang}
                saved={saved} setSaved={setSaved}
                windowsDispatch={windowsDispatch}
                conlangFileHandle={conlangFileHandle}
            ></TopBar>
            <div style={{
                display: 'flex',
                position: 'absolute',
                gridArea: 'b'
            }}>
                <Widget>
                    A a B b C c BA Ba ba
                </Widget>
                <Widget>
                    <input type="text" />
                </Widget>
                <Widget><span id="test"></span></Widget>
            </div>
            <ScreensLayout
                conlang={conlang} conlangDispatch={(action) => {
                    setSaved(false);
                    conlangDispatch(action);
                }}
                setSaved={setSaved}
                windows={windows} windowsDispatch={windowsDispatch}
                conlangFileHandle={conlangFileHandle} setConlangFileHandle={setConlangFileHandle}
            ></ScreensLayout>
        </div>
    );
}

function conlangReducer(
  conlang: Conlang,
  action: {
    type: 'replaceAll';
    newValue: Conlang;
  } | {
    type: 'replace';
    key: keyof Conlang;
    newValue: Partial<Conlang>;
  }
): Conlang {
    switch (action.type) {
        case 'replaceAll': {
            return action.newValue;
        }
        case 'replace': {
            const newConlang = {...conlang};
            try {
              (newConlang[action.key] as Partial<Conlang>) = action.newValue;
            } catch (error) {
              throw Error('Incorrect type for newValue in `conlangReducer`');
            }
            return newConlang;
        }
    }
}

function windowsReducer(
  windows: Array<string>,
  action: {
    type: 'add' | 'swap',
    position: ScreenPosition,
    screen: Screen
  } | {
    type: 'remove',
    position: ScreenPosition
  } | {
    type: 'swapAll',
    newValue: Array<string>
  }
): Array<string> {
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
        return ['0-home', '0-home', '0-home', '0-home']
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