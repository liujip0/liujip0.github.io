import jsPDF, { jsPDFOptions } from 'jspdf';
import { FormEventHandler, useEffect, useState } from 'react';
import {
  TbChevronDown,
  TbChevronUp,
  TbTriangle,
  TbTriangleInverted
} from 'react-icons/tb';
import { IconButton, Popup } from './common/Components.tsx';
import { writeFile } from './common/Funcs';
import { Consonant, Vowel } from './common/Types.tsx';
import { useStoreState } from './common/Vals';
import { charisBold } from './fonts/charis/CharisSIL-Bold-bold.ts';
import { charisBoldItalic } from './fonts/charis/CharisSIL-BoldItalic-bolditalic.ts';
import { charisItalic } from './fonts/charis/CharisSIL-Italic.ts';
import { charisRegular } from './fonts/charis/CharisSIL-Regular.ts';

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

type PdfOptions = {
  title: string;
  author: string;
  enabledSections: Record<string, boolean>;
  orderedSections: Array<string>;
  pageNumbers: boolean;
  pageNumsIncludeTitle: boolean;
  paperSize: 'letter' | 'a4';
};
function ExportConlang() {
  const conlang = useStoreState((s) => s.conlang);
  const [exportMenu, setExportMenu] = useState(false);
  const [pdfPopup, setPdfPopup] = useState(false);
  const pdfOptionsInit: PdfOptions = {
    title: conlang.name,
    author: '',
    enabledSections: {
      title: true,
      contents: true,
      phonology: true
    },
    orderedSections: ['title', 'contents', 'phonology'],
    pageNumbers: true,
    pageNumsIncludeTitle: false,
    paperSize: 'letter'
  };
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
                fontSize: '0.7em',
                width: 'max-content',
                padding: '0.2em'
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
              fontSize: '1.3em',
              marginBottom: '0.3em'
            }}>
            Export to PDF
          </h1>
          <div
            style={{
              overflowY: 'scroll',
              display: 'flex',
              flexDirection: 'column'
            }}>
            <TextInput
              id="pdftitle"
              label="Conlang Title"
              value={pdfOptions.title}
              onInput={(event) => {
                setPdfOptions({
                  ...pdfOptions,
                  title: event.currentTarget.value
                });
              }}
            />
            <TextInput
              id="pdfauthor"
              label="Conlang Author"
              value={pdfOptions.author}
              onInput={(event) => {
                setPdfOptions({
                  ...pdfOptions,
                  author: event.currentTarget.value
                });
              }}
            />
            <label
              style={{
                fontSize: '0.7em',
                marginBottom: '0.5em'
              }}>
              <b>Paper Size:&nbsp;</b>
              <select
                value={pdfOptions.paperSize}
                onChange={(event) => {
                  setPdfOptions({
                    ...pdfOptions,
                    paperSize: event.currentTarget.value
                  } as PdfOptions);
                }}>
                <option value="letter">Letter</option>
                <option value="a4">A4</option>
              </select>
            </label>
            <div
              style={{
                fontSize: '0.7em',
                marginBottom: '0.5em',
                display: 'flex',
                flexDirection: 'column'
              }}>
              <b>Sections to Include</b>
              {pdfOptions.orderedSections.map((item) => (
                <label>
                  <input
                    type="checkbox"
                    checked={pdfOptions.enabledSections[item]}
                    onChange={(event) => {
                      setPdfOptions({
                        ...pdfOptions,
                        enabledSections: {
                          ...pdfOptions.enabledSections,
                          [item]: event.currentTarget.checked
                        }
                      });
                    }}
                  />
                  {
                    {
                      title: 'Title Page',
                      contents: 'Table of Contents',
                      phonology: 'Phonology'
                    }[item]
                  }
                  <IconButton
                    onClick={() => {
                      const index = pdfOptions.orderedSections.indexOf(item);
                      if (index > 0) {
                        const newOrderedSections = pdfOptions.orderedSections;
                        newOrderedSections.splice(index, 1);
                        newOrderedSections.splice(index - 1, 0, item);
                        setPdfOptions({
                          ...pdfOptions,
                          orderedSections: newOrderedSections
                        });
                      }
                    }}>
                    <TbTriangle />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      const index = pdfOptions.orderedSections.indexOf(item);
                      if (index < pdfOptions.orderedSections.length - 1) {
                        const newOrderedSections = pdfOptions.orderedSections;
                        newOrderedSections.splice(index, 1);
                        newOrderedSections.splice(index + 1, 0, item);
                        setPdfOptions({
                          ...pdfOptions,
                          orderedSections: newOrderedSections
                        });
                      }
                    }}>
                    <TbTriangleInverted />
                  </IconButton>
                </label>
              ))}
            </div>
            <div
              style={{
                fontSize: '0.7em',
                marginBottom: '0.5em',
                display: 'flex',
                flexDirection: 'column'
              }}>
              <b>Other Settings</b>
              <label>
                <input
                  type="checkbox"
                  checked={pdfOptions.pageNumbers}
                  onChange={(event) => {
                    setPdfOptions({
                      ...pdfOptions,
                      pageNumbers: event.currentTarget.checked
                    });
                  }}
                />
                Page Numbers
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={pdfOptions.pageNumsIncludeTitle}
                  onChange={(event) => {
                    setPdfOptions({
                      ...pdfOptions,
                      pageNumsIncludeTitle: event.currentTarget.checked
                    });
                  }}
                />
                Include Title Page
              </label>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '0.3em'
            }}>
            <button
              onClick={() => {
                setPdfPopup(false);
              }}>
              Cancel
            </button>
            &nbsp;
            <button
              onClick={async () => {
                setPdfPopup(false);
                const unit = {
                  letter: 'in',
                  a4: 'mm'
                }[pdfOptions.paperSize];
                const doc = new jsPDF({
                  unit: unit,
                  format: pdfOptions.paperSize
                } as jsPDFOptions);
                doc.addFileToVFS('CharisSIL-Regular.ttf', charisRegular);
                doc.addFont('CharisSIL-Regular.ttf', 'CharisSIL', 'normal');
                doc.addFileToVFS('CharisSIL-Italic.ttf', charisItalic);
                doc.addFont('CharisSIL-Italic.ttf', 'CharisSIL', 'italic');
                doc.addFileToVFS('CharisSIL-BoldItalic.ttf', charisBoldItalic);
                doc.addFont(
                  'CharisSIL-BoldItalic.ttf',
                  'CharisSIL',
                  'bolditalic'
                );
                doc.addFileToVFS('CharisSIL-Bold.ttf', charisBold);
                doc.addFont('CharisSIL-Bold.ttf', 'CharisSIL', 'bold');
                let tocPage = -1;
                const toc: Array<{
                  section: string;
                  page: number;
                }> = [];
                pdfOptions.orderedSections.map((item) => {
                  if (pdfOptions.enabledSections[item]) {
                    switch (item) {
                      case 'title': {
                        toc.push({
                          section: 'Title Page',
                          page: doc.getCurrentPageInfo().pageNumber
                        });
                        doc.setFontSize(25);
                        console.log(doc.getFontList());
                        doc.setFont('CharisSIL', 'bold');
                        doc.text(
                          pdfOptions.title,
                          unit === 'in' ? 1 : 25,
                          unit === 'in' ? 3 : 75,
                          {
                            maxWidth: unit === 'in' ? 6.5 : 160
                          }
                        );
                        if (pdfOptions.author) {
                          doc.setFontSize(16);
                          doc.setFont('CharisSIL', 'normal');
                          doc.text(
                            pdfOptions.author,
                            unit === 'in' ? 1 : 25,
                            unit === 'in' ? 5 : 125,
                            {
                              maxWidth: unit === 'in' ? 6.5 : 160
                            }
                          );
                        }
                        doc.addPage(pdfOptions.paperSize);
                        break;
                      }
                      case 'contents': {
                        toc.push({
                          section: 'Table of Contents',
                          page: doc.getCurrentPageInfo().pageNumber
                        });
                        tocPage = doc.getCurrentPageInfo().pageNumber;
                        doc.addPage(pdfOptions.paperSize);
                        break;
                      }
                      case 'phonology': {
                        toc.push({
                          section: 'Phonology',
                          page: doc.getCurrentPageInfo().pageNumber
                        });
                        doc.setFontSize(20);
                        doc.setFont('CharisSIL', 'bold');
                        doc.text(
                          'Phonology',
                          unit === 'in' ? 1 : 25,
                          unit === 'in' ? 1 : 25
                        );
                        const consonantCols = {
                          bilabial: 0,
                          labiodental: 0,
                          dental: 0,
                          alveolar: 0,
                          postalveolar: 0,
                          retroflex: 0,
                          alveolopalatal: 0,
                          palatal: 0,
                          labiovelar: 0,
                          velar: 0,
                          uvular: 0,
                          pharyngeal: 0,
                          epiglottal: 0,
                          glottal: 0,
                          other: 0
                        };
                        const consonantRows = {
                          plosive: 0,
                          nasal: 0,
                          trill: 0,
                          tapflap: 0,
                          lateralflap: 0,
                          fricative: 0,
                          lateralfricative: 0,
                          approximant: 0,
                          lateralapproximant: 0,
                          click: 0,
                          implosive: 0
                        };
                        const vowelCols = {
                          front: 0,
                          frontcentral: 0,
                          central: 0,
                          centralback: 0,
                          back: 0
                        };
                        const vowelRows = {
                          close: 0,
                          highclosemid: 0,
                          closemid: 0,
                          mid: 0,
                          openmid: 0,
                          lowopenmid: 0,
                          open: 0
                        };
                        for (
                          let i = 0;
                          i < conlang.phonology.inventory.length;
                          i++
                        ) {
                          if (
                            conlang.phonology.inventory[i].type === 'consonant'
                          ) {
                            consonantCols[
                              (
                                conlang.phonology.inventory[i] as Consonant
                              ).placeOfArticulation
                            ] += 1;
                            consonantRows[
                              (
                                conlang.phonology.inventory[i] as Consonant
                              ).mannerOfArticulation
                            ] += 1;
                          } else {
                            vowelCols[
                              (conlang.phonology.inventory[i] as Vowel).backness
                            ] += 1;
                            vowelRows[
                              (conlang.phonology.inventory[i] as Vowel).height
                            ] += 1;
                          }
                        }
                        const consonantColsCount = [];
                        for (const [key, value] of Object.entries(
                          consonantCols
                        )) {
                          if (value > 0) {
                            consonantColsCount.push(key);
                          }
                        }
                        const consonantRowsCount = [];
                        for (const [key, value] of Object.entries(
                          consonantRows
                        )) {
                          if (value > 0) {
                            consonantRowsCount.push(key);
                          }
                        }
                        const consonants = Array(
                          consonantRowsCount.length
                        ).fill(Array(consonantColsCount.length).fill(''));
                        const vowelColsCount = [];
                        for (const [key, value] of Object.entries(vowelCols)) {
                          if (value > 0) {
                            vowelColsCount.push(key);
                          }
                        }
                        const vowelRowsCount = [];
                        for (const [key, value] of Object.entries(vowelRows)) {
                          if (value > 0) {
                            vowelRowsCount.push(key);
                          }
                        }
                        const vowels = Array(vowelRowsCount.length).fill(
                          Array(vowelColsCount.length).fill('')
                        );
                        for (
                          let i = 0;
                          i < conlang.phonology.inventory.length;
                          i++
                        ) {
                          const item = conlang.phonology.inventory[i];
                          if (item.type === 'consonant') {
                            const x = consonantRowsCount.indexOf(
                              item.mannerOfArticulation
                            );
                            const y = consonantColsCount.indexOf(
                              item.placeOfArticulation
                            );
                            if (consonants[x][y]) {
                              consonants[x][y] =
                                `${item.ipa} <${item.romanization}>`;
                            } else {
                              consonants[x][y] +=
                                ` | ${item.ipa} <${item.romanization}>`;
                            }
                          } else {
                            const x = vowelRowsCount.indexOf(item.height);
                            const y = vowelColsCount.indexOf(item.backness);
                            if (vowels[x][y] === '') {
                              vowels[x][y] =
                                `${item.ipa} <${item.romanization}>`;
                            } else {
                              vowels[x][y] +=
                                ` | ${item.ipa} <${item.romanization}>`;
                            }
                          }
                        }
                        console.log(consonants);
                        console.log(vowels);
                        doc.setFontSize(18);
                        doc.setFont('CharisSIL', 'bold');
                        doc.text(
                          'Consonants',
                          unit === 'in' ? 1 : 25,
                          unit === 'in' ? 1.5 : 37
                        );
                        doc.setFontSize(10);
                        doc.setFont('CharisSIL', 'normal');
                        doc.text(
                          'Created with Morpheme',
                          unit === 'in' ? 1 : 25,
                          unit === 'in' ? 10.5 : 284
                        );
                        doc.setTextColor(0, 0, 255);
                        doc.textWithLink(
                          'https://liujip0.github.io/morpheme',
                          unit === 'in' ? 3 : 75,
                          unit === 'in' ? 10.5 : 284,
                          {
                            url: 'https://liujip0.github.io/morpheme'
                          }
                        );
                        doc.setFontSize(16);
                        doc.setTextColor(0);
                        doc.addPage(pdfOptions.paperSize);
                        break;
                      }
                    }
                  }
                });
                if (pdfOptions.enabledSections['contents']) {
                  doc.setPage(tocPage);
                  doc.setFontSize(20);
                  doc.setFont('CharisSIL', 'bold');
                  doc.text(
                    'Table of Contents',
                    unit === 'in' ? 1 : 25,
                    unit === 'in' ? 1 : 25
                  );
                  doc.setFontSize(16);
                  doc.setFont('CharisSIL', 'normal');
                  for (let i = 0; i < toc.length; i++) {
                    doc.text(
                      toc[i].section,
                      unit === 'in' ? 1 : 25,
                      unit === 'in' ? 2 + 0.5 * i : 50 + 12 * i
                    );
                    doc.text(
                      toc[i].page.toString(),
                      unit === 'in' ? 7.5 : 272,
                      unit === 'in' ? 2 + 0.5 * i : 50 + 12 * i
                    );
                  }
                }
                doc.save(conlang.name + '.pdf');
              }}>
              Finish
            </button>
          </div>
        </Popup>
      )}
    </>
  );
}

type TextInputProps = {
  id: string;
  label: string;
  value: string;
  onInput: FormEventHandler<HTMLInputElement>;
};
function TextInput({ id, label, value, onInput }: TextInputProps) {
  const setLastInput = useStoreState((s) => s.setLastInput);
  return (
    <label
      style={{
        fontSize: '0.7em',
        marginBottom: '0.5em'
      }}>
      <b>{label}:&nbsp;</b>
      <input
        type="text"
        id={id}
        onFocus={() => {
          setLastInput('pdftitle');
        }}
        value={value}
        onInput={onInput}
      />
    </label>
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
