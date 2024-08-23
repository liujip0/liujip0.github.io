import { useRef } from 'react';
import { createFile, getFile, writeFile } from '../common/Funcs.tsx';
import { StringRes } from '../common/Resources.tsx';
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
      <h1>{StringRes.welcometomorpheme}</h1>
      <h2>{StringRes.openexistingconlang}</h2>
      <button
        onClick={() => {
          getFile({
            types: [
              {
                description: StringRes.jsonfiles,
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
            swapAllWindows([
              'tutorial-0',
              'tutorial-0',
              'tutorial-0',
              'tutorial-0',
            ]);
            setSaved(true);
          });
        }}>
        {StringRes.choosefile}
      </button>
      <h2>{StringRes.createnewconlang}</h2>
      <label>
        {StringRes.conlangname.d}&nbsp;
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
                  description: StringRes.jsonfiles,
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
              swapAllWindows([
                'tutorial-0',
                'tutorial-0',
                'tutorial-0',
                'tutorial-0',
              ]);
              setSaved(true);
            });
          }
        }}>
        {StringRes.submit}
      </button>
    </>
  );
}
