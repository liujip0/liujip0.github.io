import { useRef } from "react";
import { getFile, writeFile, createFile } from "./CommonFuncs";
import { useConlangContext, useFileHandleContext, useSavedContext, useWindowsContext } from "./CommonVals";

export default function StartScreen() {
    const {setConlang} = useConlangContext();
    const {setFileHandle} = useFileHandleContext();
    const {setWindows} = useWindowsContext();
    const {setSaved} = useSavedContext();
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
                    setFileHandle(value.fileHandle);
                    setConlang({
                        type: 'replaceAll',
                        newValue: JSON.parse(value.contents)
                    });
                    setWindows({
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
                        setFileHandle(value);
                        if (value) {
                            writeFile(value, JSON.stringify(newConlang));
                            setConlang({
                                type: 'replaceAll',
                                newValue: newConlang
                            });
                        }
                        setWindows({
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