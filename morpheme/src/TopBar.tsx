import {writeFile} from './common/CommonFuncs';
import {useStoreState} from './common/CommonVals';

export default function TopBar() {
    const conlang = useStoreState((s) => s.conlang);
    const saved = useStoreState((s) => s.saved);
    const setSaved = useStoreState((s) => s.setSaved);
    const swapAllWindows = useStoreState((s) => s.swapAllWindows);
    const fileHandle = useStoreState((s) => s.fileHandle);
    return (
        <div
            style={{
                fontSize: '1.5em',
                backgroundColor: 'gray',
                display: 'flex',
                alignItems: 'center',
                gridArea: 'a'
            }}>
            <div
                style={{
                    fontSize: '1.5em',
                    margin: '0.4em 0.5em 0.4em 0.5em'
                }}>
                Morpheme
            </div>

            <div
                style={{
                    display: 'flex'
                }}>
                <MenuItem
                    onClick={() => {
                        swapAllWindows([
                            '0-start',
                            '0-start',
                            '0-start',
                            '0-start'
                        ]);
                    }}>
                    Currently Editing:&nbsp;
                    <span className="monospace">
                        {conlang.name ? conlang.name : 'none'}
                    </span>
                    {saved ? '' : '*'}
                </MenuItem>
                <MenuItem
                    onClick={() => {
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
function MenuItem({onClick, children}: MenuItemProps) {
    return (
        <div
            style={{
                margin: '0.2em 0em 0.2em 1em',
                cursor: 'pointer'
            }}
            onClick={onClick}>
            {children}
        </div>
    );
}
