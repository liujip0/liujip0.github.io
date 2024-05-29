export default function StartScreen({
    conlang, conlangDispatch,
    conlangFileHandle, setConlangFileHandle
}) {
    return (
        <>
            <h1>Welcome to Morpheme</h1>
            <h2>Open Existing Conlang</h2>
            <button onClick={() => {
                const [fileData, fileHandle] = getFile({
                    types: [{
                        description: 'JSON Files',
                        accept: {
                            'application/json': ['.json']
                        }
                    }],
                    multiple: false,
                    excludeAcceptAllOption: true,
                    id: 'morpheme-picker'
                });
                setConlangFileHandle(fileHandle);
                conlangDispatch({
                    type: 'replaceAll',
                    newValue: JSON.parse(fileData.text())
                })
            }}>Choose File</button>
            <h2>Create New Conlang</h2>
            <label>
                Conlang name:&nbsp;
                <input type="text" id="conlangname" />
            </label>
            &nbsp;
            <button onClick={() => {
                const name = document.getElementById("conlangname").value
                const newConlang = {
                    name: name
                };
                setConlangFileHandle(createFile({
                    types: [{
                        description: 'JSON Files',
                        accept: {'application/json': ['.json']}
                    }],
                    id: 'morpheme-picker',
                    startIn: 'downloads',
                    suggestedName: name
                }));
                writeFile(conlangFileHandle, JSON.stringify(newConlang));
                conlangDispatch({
                    type: 'replaceAll',
                    newValue: newConlang
                });
            }}>Submit</button>
            <label>{conlang.name}</label>
        </>
    );
}

async function getFile(options) {
    const [fileHandle] = await window.showOpenFilePicker(options);
    const fileData = await fileHandle.getFile();
    return [fileData, fileHandle];
}

async function writeFile(fileHandle, contents) {
    const writeable = await fileHandle.createWriteable();
    await writeable.write(contents);
    await writeable.close();
}

async function createFile(options) {
    const fileHandle = await window.showSaveFilePicker(options);
    return fileHandle;
}