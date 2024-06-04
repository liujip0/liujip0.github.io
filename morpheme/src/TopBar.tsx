import { writeFile } from "./CommonFuncs";
import { useConlangContext, useFileHandleContext, useStore, useWindowsContext } from "./CommonVals";

export default function TopBar() {
    const {conlang} = useConlangContext();
    const saved = useStore((state) => state.saved);
    const setSaved = useStore((state) => state.setSaved);
    const {setWindows} = useWindowsContext();
    const {fileHandle} = useFileHandleContext();
    return (
        <div style={{
            fontSize: '1.5em',
            backgroundColor: 'gray',
            display: 'flex',
            alignItems: 'center',
            gridArea: 'a'
        }}>
            <div style={{
                fontSize: '1.5em',
                margin: '0.4em 0.5em 0.4em 0.5em'
            }}>Morpheme</div>

            <div style={{
                display: 'flex'
            }}>
                <MenuItem onClick={() => {setWindows({
                    type: 'swapAll',
                    newValue: ['0-start', '0-start', '0-start', '0-start']
                })}}>
                    Currently Editing:&nbsp;
                    <code>
                        {conlang.name ? conlang.name : 'none'}
                    </code>
                    {saved ? '' : '*'}
                </MenuItem>
                <MenuItem onClick={() => {
                    setSaved(true);
                    if (fileHandle) {
                        writeFile(fileHandle, JSON.stringify(conlang));
                    }
                }}>
                    Save
                </MenuItem>
                <MenuItem>Import</MenuItem>
                <MenuItem>Export</MenuItem>
            </div>
        </div>
    );
}

type MenuItemProps = {
    onClick?: () => void;
    children: React.ReactNode;
};
function MenuItem({
    onClick,
    children
}: MenuItemProps) {
    return (
        <div style={{
            margin: '0.2em 0em 0.2em 1em',
            cursor: 'pointer'
        }} onClick={onClick}>
            {children}
        </div>
    )
}