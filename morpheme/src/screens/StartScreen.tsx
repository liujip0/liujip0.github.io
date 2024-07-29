import { useRef } from 'react';
import { createFile, getFile, writeFile } from '../common/Funcs.tsx';
import { Conlang } from '../common/Types.tsx';
import { conlangInit, useStoreState } from '../common/Vals.tsx';

export default function StartScreen() {
  const replaceConlang = useStoreState((s) => s.replaceConlang);
  const setFileHandle = useStoreState((s) => s.setFileHandle);
  const swapAllWindows = useStoreState((s) => s.swapAllWindows);
  const setSaved = useStoreState((s) => s.setSaved);
  const setLastInput = useStoreState((s) => s.setLastInput);
  const conlangNameRef = useRef<HTMLInputElement>(null);
  const createNewConlangRef = useRef<HTMLButtonElement>(null);
  const time = new Date().getMilliseconds();
  return (
    <>
      <h1>Welcome to Morpheme</h1>
      <h2>Open Existing Conlang</h2>
      <button
        onClick={() => {
          getFile({
            types: [
              {
                description: 'JSON Files',
                accept: {
                  'application/json': ['.json'],
                },
              },
            ],
            multiple: false,
            excludeAcceptAllOption: true,
            id: 'morpheme-picker',
          }).then((value) => {
            console.log(value.fileHandle);
            console.log(value.contents);
            setFileHandle(value.fileHandle);
            replaceConlang(JSON.parse(value.contents));
            swapAllWindows(['home-0', 'home-0', 'home-0', 'home-0']);
            setSaved(true);
          });
        }}>
        Choose File
      </button>
      <h2>Create New Conlang</h2>
      <label>
        Conlang name:&nbsp;
        <input
          type="text"
          ref={conlangNameRef}
          id={time + 'conlangname'}
          onFocus={() => {
            setLastInput(time + 'conlangname');
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && createNewConlangRef.current) {
              createNewConlangRef.current.click();
            }
          }}
        />
      </label>
      &nbsp;
      <button
        ref={createNewConlangRef}
        onClick={() => {
          if (conlangNameRef.current) {
            const name = conlangNameRef.current.value;
            const newConlang: Conlang = {
              ...conlangInit,
              name: name,
            };
            createFile({
              types: [
                {
                  description: 'JSON Files',
                  accept: { 'application/json': ['.json'] },
                },
              ],
              id: 'morpheme-picker',
              startIn: 'downloads',
              suggestedName: name + '.json',
            }).then((value) => {
              console.log('createnewconlang' + value);
              setFileHandle(value);
              if (value) {
                writeFile(value, JSON.stringify(newConlang));
                replaceConlang(newConlang);
              }
              swapAllWindows(['home-0', 'home-0', 'home-0', 'home-0']);
              setSaved(true);
            });
          }
        }}>
        Submit
      </button>
    </>
  );
}
