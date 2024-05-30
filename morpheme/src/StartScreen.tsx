import { useRef } from "react";
import { conlangReducerFunc, setConlangFileHandleFunc, setSavedFunc, windowsReducerFunc } from "./App";
import { getFile, writeFile, createFile } from "./CommonFuncs";

type StartScreenProps = {
    conlangDispatch: conlangReducerFunc;
    setConlangFileHandle: setConlangFileHandleFunc;
    windowsDispatch: windowsReducerFunc;
    setSaved: setSavedFunc;
};
export default function StartScreen({
    conlangDispatch,
    setConlangFileHandle,
    windowsDispatch,
    setSaved
}: StartScreenProps) {
    const conlangNameRef = useRef<HTMLInputElement>(null);
    const createNewConlangRef = useRef<HTMLButtonElement>(null);
    return (
        <>
            <h1>Welcome to Morpheme</h1>

            <h2>Open Existing Conlang</h2>
            <button onClick={() => {
                getFile({
                    types: [{
                        description: 'JSON Files',
                        accept: {
                            'application/json': ['.json']
                        }
                    }],
                    multiple: false,
                    excludeAcceptAllOption: true,
                    id: 'morpheme-picker'
                }).then((value) => {
                    console.log(value.fileHandle);
                    console.log(value.contents);
                    setConlangFileHandle(value.fileHandle);
                    conlangDispatch({
                        type: 'replaceAll',
                        newValue: JSON.parse(value.contents)
                    });
                    windowsDispatch({
                        type: 'swapAll',
                        newValue: ['0-home', '0-home', '0-home', '0-home']
                    });
                    setSaved(true);
                });
            }}>Choose File</button>

            <h2>Create New Conlang</h2>
            <label>
                Conlang name:&nbsp;
                <input
                    type="text"
                    ref={conlangNameRef}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter' && createNewConlangRef.current) {
                            createNewConlangRef.current.click();
                        }
                    }}
                />
            </label>
            &nbsp;
            <button ref={createNewConlangRef} onClick={() => {
                if (conlangNameRef.current) {
                    const name = conlangNameRef.current.value
                    const newConlang = {
                        name: name,
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
                    };
                    createFile({
                        types: [{
                            description: 'JSON Files',
                            accept: {'application/json': ['.json']}
                        }],
                        id: 'morpheme-picker',
                        startIn: 'downloads',
                        suggestedName: name + '.json'
                    }).then((value) => {
                        console.log('createnewconlang' + value);
                        setConlangFileHandle(value);
                        if (value) {
                            writeFile(value, JSON.stringify(newConlang));
                            conlangDispatch({
                                type: 'replaceAll',
                                newValue: newConlang
                            });
                        }
                        windowsDispatch({
                            type: 'swapAll',
                            newValue: ['0-home', '0-home', '0-home', '0-home']
                        });
                        setSaved(true);
                    });
                }
            }}>Submit</button>
        </>
    );
}