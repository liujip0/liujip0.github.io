import { useEffect, useState } from 'react';
import { TbChevronDown, TbChevronUp } from 'react-icons/tb';
import { Popup } from './common/Components.tsx';
import { writeFile } from './common/Funcs';
import { useStoreState } from './common/Vals';

export default function TopBar() {
  const conlang = useStoreState((s) => s.conlang);
  const saved = useStoreState((s) => s.saved);
  const setSaved = useStoreState((s) => s.setSaved);
  const swapAllWindows = useStoreState((s) => s.swapAllWindows);
  const fileHandle = useStoreState((s) => s.fileHandle);
  useEffect(() => {
    if (conlang.autosave) {
      const autosaveInterval = setInterval(() => {
        console.log('saved');
        setSaved(true);
        if (fileHandle) {
          writeFile(fileHandle, JSON.stringify(conlang));
        }
      }, conlang.autosave * 60000);
      return () => clearInterval(autosaveInterval);
    }
  }, [conlang, fileHandle, setSaved]);
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
            swapAllWindows(['0-start', '0-start', '0-start', '0-start']);
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
        <ExportConlang />
      </div>
    </div>
  );
}

type PdfOptions = {};
const pdfOptionsInit = {};
function ExportConlang() {
  const [exportMenu, setExportMenu] = useState(false);
  const [pdfPopup, setPdfPopup] = useState(false);
  const [pdfOptions, setPdfOptions] = useState<PdfOptions>(pdfOptionsInit);
  return (
    <>
      <MenuItem
        onClick={() => {
          setExportMenu(exportMenu ? false : true);
        }}>
        <div
          style={{
            position: 'relative'
          }}>
          Export
          {exportMenu ?
            <TbChevronUp />
          : <TbChevronDown />}
          {exportMenu && (
            <div
              style={{
                position: 'absolute',
                left: '0',
                top: '2em',
                border: '1px solid black',
                zIndex: '90',
                backgroundColor: 'white',
                fontSize: '0.7em'
              }}>
              <div
                onClick={() => {
                  setPdfPopup(true);
                }}>
                Export to PDF
              </div>
            </div>
          )}
        </div>
      </MenuItem>
      {pdfPopup && (
        <Popup>
          <h1
            style={{
              textAlign: 'left',
              margin: '0',
              fontSize: '1.6em'
            }}>
            Export to PDF
          </h1>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end'
            }}>
            <button
              onClick={() => {
                setPdfPopup(false);
              }}>
              Cancel
            </button>
            &nbsp;
            <button
              onClick={() => {
                setPdfPopup(false);
              }}>
              Finish
            </button>
          </div>
        </Popup>
      )}
    </>
  );
}

type MenuItemProps = {
  onClick?: () => void;
  children: React.ReactNode;
};
function MenuItem({ onClick, children }: MenuItemProps) {
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
