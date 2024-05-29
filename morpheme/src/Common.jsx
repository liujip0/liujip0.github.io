export async function getFile(options) {
    const [fileHandle] = await window.showOpenFilePicker(options);
    const fileData = await fileHandle.getFile();
    return [fileData, fileHandle];
}

export async function writeFile(fileHandle, contents) {
    const writeable = await fileHandle.createWriteable();
    await writeable.write(contents);
    await writeable.close();
}

export async function createFile(options) {
    const fileHandle = await window.showSaveFilePicker(options);
    return fileHandle;
}