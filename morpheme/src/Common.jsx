export async function getFile(options) {
    const [fileHandle] = await window.showOpenFilePicker(options);
    const fileData = await fileHandle.getFile();
    return [fileData, fileHandle];
}

export async function writeFile(fileHandle, contents) {
    console.log(fileHandle);
    const writeable = await fileHandle.createWritable();
    await writeable.write(contents);
    await writeable.close();
}

export async function createFile(options) {
    const fileHandle = await window.showSaveFilePicker(options);
    return fileHandle;
}