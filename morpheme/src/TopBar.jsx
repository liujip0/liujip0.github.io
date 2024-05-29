import { writeFile } from "./Common";

export default function TopBar({
    conlang,
    saved, setSaved,
    windowsDispatch,
    conlangFileHandle
}) {
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
                <MenuItem onClick={() => {windowsDispatch({
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
                    writeFile(conlangFileHandle, JSON.stringify(conlang))
                }}>
                    Save
                </MenuItem>
                <MenuItem onClick={() => {windowsDispatch({
                    type: 'swapAll',
                    newValue: ['0-settings', '0-settings', '0-settings', '0-settings']
                })}}>
                    Settings
                </MenuItem>
            </div>
        </div>
    );
}

function MenuItem({onClick, children}) {
    return (
        <div style={{
            margin: '0.2em 0em 0.2em 1em',
            cursor: 'pointer'
        }} onClick={onClick}>
            {children}
        </div>
    )
}