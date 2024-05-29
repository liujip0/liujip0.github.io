export async function getFile(options: object) {
    if (!window.showOpenFilePicker) {
        throw Error('File System Access API not supported');
    }
    const fileHandles = await window.showOpenFilePicker(options);
    const fileHandle = fileHandles[0] as FileSystemFileHandle;
    const fileData = await fileHandle.getFile();
    const contents = await fileData.text();
    return {
        contents: contents,
        fileHandle: fileHandle
    };
}

export async function writeFile(fileHandle: FileSystemFileHandle, contents: string) {
    console.log(fileHandle);
    const writeable = await fileHandle.createWritable();
    await writeable.write(contents);
    await writeable.close();
}

export async function createFile(options: object) {
    if (!window.showSaveFilePicker) {
        throw Error('File System Access API not supported');
    }
    const fileHandle = await window.showSaveFilePicker(options) as FileSystemFileHandle;
    return fileHandle;
}