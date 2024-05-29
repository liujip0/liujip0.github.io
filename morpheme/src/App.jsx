import { useReducer, useState } from 'react';
import './App.css';
import TopBar from './TopBar';
import Widget from './Widget';
import ScreensLayout from './ScreensLayout';

export default function App() {
    const [conlang, conlangDispatch] = useReducer(conlangReducer, '');
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

function conlangReducer(conlang, action) {
    switch (action.type) {
        case 'replaceAll': {
            return action.newValue;
        }
        case 'replace': {
            const temp = {};
            temp[action.key] = action.newValue;
            return Object.assign({}, conlang, temp);
        }
        default: {
            throw Error('Unknown action in `conlangReducer`: ' + action.type);
        }
    }
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
    case 'swapAll': {
        return action.newValue;
    }
    default: {
      throw Error('Unknown action in `windowsReducer`: ' + action.type);
    }
  }
}