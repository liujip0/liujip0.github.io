import jsPDF, { jsPDFOptions } from 'jspdf';
import autoTable, { CellDef } from 'jspdf-autotable';
import { FormEventHandler, useState } from 'react';
import {
  TbChevronDown,
  TbChevronUp,
  TbTriangle,
  TbTriangleInverted,
} from 'react-icons/tb';
import { charisBold } from '../public/fonts/charis/CharisSIL-Bold-bold.ts';
import { charisBoldItalic } from '../public/fonts/charis/CharisSIL-BoldItalic-bolditalic.ts';
import { charisItalic } from '../public/fonts/charis/CharisSIL-Italic.ts';
import { charisRegular } from '../public/fonts/charis/CharisSIL-Regular.ts';
import { IconButton, Popup } from './common/Components.tsx';
import { StringRes } from './common/Resources.tsx';
import {
  Backness,
  Backness_Arr,
  Conlang,
  Height,
  Height_Arr,
  MannerOfArticulation,
  MannerOfArticulation_Arr,
  PlaceOfArticulation,
  PlaceOfArticulation_Arr,
} from './common/Types.tsx';
import { useStoreState } from './common/Vals.tsx';
import { MenuItem } from './TopBar.tsx';

type PdfOptions = {
  title: string;
  author: string;
  enabledSections: Record<string, boolean>;
  orderedSections: Array<string>;
  pageNumbers: boolean;
  pageNumsIncludeTitle: boolean;
  pageNumsIncludeToc: boolean;
  paperSize: 'letter' | 'a4';
};
export default function ExportConlang() {
  const conlang = useStoreState((s) => s.conlang);
  const [exportMenu, setExportMenu] = useState(false);
  const [pdfPopup, setPdfPopup] = useState(false);
  const pdfOptionsInit: PdfOptions = {
    title: conlang.name,
    author: '',
    enabledSections: {
      title: true,
      contents: true,
      phonology: true,
    },
    orderedSections: ['title', 'contents', 'phonology'],
    pageNumbers: true,
    pageNumsIncludeTitle: true,
    pageNumsIncludeToc: true,
    paperSize: 'letter',
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
            position: 'relative',
          }}>
          {StringRes.export}
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
              }}>
              <div
                onClick={() => {
                  setPdfPopup(true);
                }}
                style={{
                  padding: '0.2em',
                }}>
                {StringRes.exporttopdf}
              </div>
            </div>
          )}
        </div>
      </MenuItem>
      {pdfPopup && (
        <PdfPopup
          pdfOptions={pdfOptions}
          setPdfOptions={setPdfOptions}
          setPdfPopup={setPdfPopup}
        />
      )}
    </>
  );
}

type PdfPopupProps = {
  pdfOptions: PdfOptions;
  setPdfOptions: (value: PdfOptions) => void;
  setPdfPopup: (value: boolean) => void;
};
function PdfPopup({ pdfOptions, setPdfOptions, setPdfPopup }: PdfPopupProps) {
  const conlang = useStoreState((s) => s.conlang);
  return (
    <Popup
      onClose={() => {
        setPdfPopup(false);
      }}>
      <h1
        style={{
          textAlign: 'left',
          margin: '0',
          fontSize: '1.3em',
          marginBottom: '0.3em',
        }}>
        {StringRes.exporttopdf}
      </h1>
      <div
        style={{
          overflowY: 'scroll',
          display: 'flex',
          flexDirection: 'column',
        }}>
        <TextInput
          id="pdftitle"
          label={StringRes.conlangtitle}
          value={pdfOptions.title}
          onInput={(event) => {
            setPdfOptions({
              ...pdfOptions,
              title: event.currentTarget.value,
            });
          }}
        />
        <TextInput
          id="pdfauthor"
          label={StringRes.conlangauthor}
          value={pdfOptions.author}
          onInput={(event) => {
            setPdfOptions({
              ...pdfOptions,
              author: event.currentTarget.value,
            });
          }}
        />
        <label
          style={{
            fontSize: '0.7em',
            marginBottom: '0.5em',
          }}>
          <b>{StringRes.papersize}&nbsp;</b>
          <select
            value={pdfOptions.paperSize}
            onChange={(event) => {
              setPdfOptions({
                ...pdfOptions,
                paperSize: event.currentTarget.value,
              } as PdfOptions);
            }}>
            <option value="letter">{StringRes.letter}</option>
            <option value="a4">{StringRes.a4}</option>
          </select>
        </label>
        <div
          style={{
            fontSize: '0.7em',
            marginBottom: '0.5em',
            display: 'flex',
            flexDirection: 'column',
          }}>
          <b>{StringRes.sectionstoinclude}</b>
          {pdfOptions.orderedSections.map((item) => (
            <label key={item}>
              <input
                type="checkbox"
                checked={pdfOptions.enabledSections[item]}
                onChange={(event) => {
                  setPdfOptions({
                    ...pdfOptions,
                    enabledSections: {
                      ...pdfOptions.enabledSections,
                      [item]: event.currentTarget.checked,
                    },
                  });
                }}
              />
              {
                {
                  title: StringRes.titlepage,
                  contents: StringRes.tableofcontents,
                  phonology: StringRes.phonology,
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
                      orderedSections: newOrderedSections,
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
                      orderedSections: newOrderedSections,
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
            flexDirection: 'column',
          }}>
          <b>{StringRes.othersettings}</b>
          <label>
            <input
              type="checkbox"
              checked={pdfOptions.pageNumbers}
              onChange={(event) => {
                setPdfOptions({
                  ...pdfOptions,
                  pageNumbers: event.currentTarget.checked,
                });
              }}
            />
            {StringRes.pagenumbers}
          </label>
          <label>
            <input
              type="checkbox"
              checked={pdfOptions.pageNumsIncludeTitle}
              onChange={(event) => {
                setPdfOptions({
                  ...pdfOptions,
                  pageNumsIncludeTitle: event.currentTarget.checked,
                });
              }}
            />
            {StringRes.pagenumsincludetitle}
          </label>
          <label>
            <input
              type="checkbox"
              checked={pdfOptions.pageNumsIncludeToc}
              onChange={(event) => {
                setPdfOptions({
                  ...pdfOptions,
                  pageNumsIncludeToc: event.currentTarget.checked,
                });
              }}
            />
            {StringRes.pagenumsincludetoc}
          </label>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '0.3em',
        }}>
        <button
          onClick={() => {
            setPdfPopup(false);
          }}>
          {StringRes.cancel}
        </button>
        &nbsp;
        <button
          onClick={() => {
            setPdfPopup(false);
            exportToPdf(pdfOptions, conlang);
          }}>
          {StringRes.finish}
        </button>
      </div>
    </Popup>
  );
}

function exportToPdf(pdfOptions: PdfOptions, conlang: Conlang) {
  const unit = {
    letter: 'in',
    a4: 'mm',
  }[pdfOptions.paperSize];
  const doc = new jsPDF({
    unit: unit,
    format: pdfOptions.paperSize,
  } as jsPDFOptions);
  doc.addFileToVFS('CharisSIL-Regular.ttf', charisRegular);
  doc.addFont('CharisSIL-Regular.ttf', 'CharisSIL', 'normal');
  doc.addFileToVFS('CharisSIL-Italic.ttf', charisItalic);
  doc.addFont('CharisSIL-Italic.ttf', 'CharisSIL', 'italic');
  doc.addFileToVFS('CharisSIL-BoldItalic.ttf', charisBoldItalic);
  doc.addFont('CharisSIL-BoldItalic.ttf', 'CharisSIL', 'bolditalic');
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
            section: StringRes.titlepage,
            page: doc.getCurrentPageInfo().pageNumber,
          });
          doc.setFontSize(25);
          console.log(doc.getFontList());
          doc.setFont('CharisSIL', 'bold');
          doc.text(
            pdfOptions.title,
            unit === 'in' ? 1 : 25,
            unit === 'in' ? 3 : 75,
            {
              maxWidth: unit === 'in' ? 6.5 : 160,
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
                maxWidth: unit === 'in' ? 6.5 : 160,
              }
            );
          }
          doc.addPage(pdfOptions.paperSize);
          break;
        }
        case 'contents': {
          toc.push({
            section: StringRes.tableofcontents,
            page: doc.getCurrentPageInfo().pageNumber,
          });
          tocPage = doc.getCurrentPageInfo().pageNumber;
          doc.addPage(pdfOptions.paperSize);
          break;
        }
        case 'phonology': {
          toc.push({
            section: StringRes.phonology,
            page: doc.getCurrentPageInfo().pageNumber,
          });
          doc.setFontSize(20);
          doc.setFont('CharisSIL', 'bold');
          doc.text(
            StringRes.phonology,
            unit === 'in' ? 1 : 25,
            unit === 'in' ? 1 : 25
          );
          const consonantCols: Record<PlaceOfArticulation, number> = {};
          for (let i = 0; i < PlaceOfArticulation_Arr.length; i++) {
            consonantCols[PlaceOfArticulation_Arr[i]] = 0;
          }
          const consonantRows: Record<MannerOfArticulation, number> = {};
          for (let i = 0; i < MannerOfArticulation_Arr.length; i++) {
            consonantRows[MannerOfArticulation_Arr[i]] = 0;
          }
          const vowelCols: Record<Backness, number> = {};
          for (let i = 0; i < Backness_Arr.length; i++) {
            vowelCols[Backness_Arr[i]] = 0;
          }
          const vowelRows: Record<Height, number> = {};
          for (let i = 0; i < Height_Arr.length; i++) {
            vowelRows[Height_Arr[i]] = 0;
          }
          const consonantColsCount: Array<PlaceOfArticulation> = [];
          const consonantRowsCount: Array<MannerOfArticulation> = [];
          const vowelColsCount: Array<Backness> = [];
          const vowelRowsCount: Array<Height> = [];
          for (let i = 0; i < conlang.phonology.inventory.length; i++) {
            const item = conlang.phonology.inventory[i];
            if (item.type === 'consonant') {
              consonantCols[item.placeOfArticulation] += 1;
              if (!consonantColsCount.includes(item.placeOfArticulation)) {
                consonantColsCount.push(item.placeOfArticulation);
              }
              consonantRows[item.mannerOfArticulation] += 1;
              if (!consonantRowsCount.includes(item.mannerOfArticulation)) {
                consonantRowsCount.push(item.mannerOfArticulation);
              }
            } else {
              vowelCols[item.backness] += 1;
              if (!vowelColsCount.includes(item.backness)) {
                vowelColsCount.push(item.backness);
              }
              vowelRows[item.height] += 1;
              if (!vowelRowsCount.includes(item.height)) {
                vowelRowsCount.push(item.height);
              }
            }
          }
          console.log(vowelCols);
          console.log(vowelRows);
          consonantColsCount.sort(
            (a, b) =>
              PlaceOfArticulation_Arr.indexOf(a) -
              PlaceOfArticulation_Arr.indexOf(b)
          );
          consonantRowsCount.sort(
            (a, b) =>
              MannerOfArticulation_Arr.indexOf(a) -
              MannerOfArticulation_Arr.indexOf(b)
          );
          vowelColsCount.sort(
            (a, b) => Backness_Arr.indexOf(a) - Backness_Arr.indexOf(b)
          );
          vowelRowsCount.sort(
            (a, b) => Height_Arr.indexOf(a) - Height_Arr.indexOf(b)
          );
          const vowelColsFinal = Backness_Arr;
          const vowelRowsFinal = Height_Arr;
          if (vowelCols.frontcentral === 0) {
            if (vowelCols.front > 0) {
              vowelColsFinal.splice(1, 1);
            } else {
              vowelColsFinal.splice(0, 2);
            }
          } else if (vowelCols.front === 0) {
            vowelColsFinal.splice(0, 1);
          }
          if (vowelCols.centralback === 0) {
            if (vowelCols.back > 0) {
              vowelColsFinal.splice(vowelColsFinal.indexOf('centralback'), 1);
            } else {
              vowelColsFinal.splice(vowelColsFinal.indexOf('centralback'), 2);
            }
          } else if (vowelCols.back === 0) {
            vowelColsFinal.splice(vowelColsFinal.indexOf('back'), 1);
          }
          if (vowelRows.highclosemid === 0) {
            if (vowelRows.close > 0) {
              vowelRowsFinal.splice(1, 1);
            } else {
              vowelRowsFinal.splice(0, 2);
            }
          } else if (vowelRows.close === 0) {
            vowelRowsFinal.splice(0, 1);
          }
          if (vowelRows.lowopenmid === 0) {
            if (vowelRows.open > 0) {
              vowelRowsFinal.splice(vowelRowsFinal.indexOf('lowopenmid'), 1);
            } else {
              vowelRowsFinal.splice(vowelRowsFinal.indexOf('lowopenmid'), 2);
            }
          } else if (vowelRows.open === 0) {
            vowelRowsFinal.splice(vowelRowsFinal.indexOf('open'), 1);
          }
          if (vowelRows.closemid === 0) {
            vowelRowsFinal.splice(vowelRowsFinal.indexOf('closemid'), 1);
          }
          if (vowelRows.openmid === 0) {
            vowelRowsFinal.splice(vowelRowsFinal.indexOf('openmid'), 1);
          }
          if (
            vowelRows.mid === 0 &&
            (vowelRows.closemid > 0 || vowelRows.openmid > 0)
          ) {
            vowelRowsFinal.splice(vowelRowsFinal.indexOf('mid'), 1);
          }
          const consonants: Array<Array<string | CellDef>> = Array(
            consonantRowsCount.length + 1
          )
            .fill(null)
            .map((_, index) =>
              index === 0 ?
                Array(consonantColsCount.length + 1).fill('')
              : Array(consonantColsCount.length * 2 + 1).fill('')
            );
          const vowels: Array<Array<string | CellDef>> = Array(
            vowelRowsFinal.length + 1
          )
            .fill(null)
            .map((_, index) =>
              index === 0 ?
                Array(vowelColsFinal.length + 1).fill('')
              : Array(vowelColsFinal.length * 2 + 1).fill('')
            );
          for (let i = 0; i < conlang.phonology.inventory.length; i++) {
            const item = conlang.phonology.inventory[i];
            if (item.type === 'consonant') {
              const x =
                consonantRowsCount.indexOf(item.mannerOfArticulation) + 1;
              const y =
                consonantColsCount.indexOf(item.placeOfArticulation) * 2 +
                (item.voiced ? 1 : 0) +
                1;
              if (consonants[x][y] === '') {
                consonants[x][y] = `${item.ipa} <${item.romanization}>`;
              } else {
                consonants[x][y] += `\n${item.ipa} <${item.romanization}>`;
              }
            } else {
              const x = vowelRowsFinal.indexOf(item.height) + 1;
              const y =
                vowelColsFinal.indexOf(item.backness) * 2 +
                (item.rounded ? 1 : 0) +
                1;
              if (vowels[x][y] === '') {
                vowels[x][y] = `${item.ipa} <${item.romanization}>`;
                console.log(vowels[x][y]);
              } else {
                vowels[x][y] += `\n${item.ipa} <${item.romanization}>`;
              }
            }
          }
          for (let i = 0; i < consonantColsCount.length; i++) {
            consonants[0][i + 1] = {
              content: {
                bilabial: StringRes.placeofarticulation.bilabial,
                labiodental: StringRes.placeofarticulation.labiodental,
                dental: StringRes.placeofarticulation.dental,
                alveolar: StringRes.placeofarticulation.alveolar,
                postalveolar: StringRes.placeofarticulation.postalveolar,
                retroflex: StringRes.placeofarticulation.retroflex,
                alveolopalatal: StringRes.placeofarticulation.alveolopalatal,
                palatal: StringRes.placeofarticulation.palatal,
                labiovelar: StringRes.placeofarticulation.labiovelar,
                velar: StringRes.placeofarticulation.velar,
                uvular: StringRes.placeofarticulation.uvular,
                pharyngeal: StringRes.placeofarticulation.pharyngeal,
                epiglottal: StringRes.placeofarticulation.epiglottal,
                glottal: StringRes.placeofarticulation.glottal,
                other: StringRes.placeofarticulation.other,
              }[consonantColsCount[i]]!,
              colSpan: 2,
            };
          }
          for (let i = 0; i < consonantRowsCount.length; i++) {
            consonants[i + 1][0] = {
              plosive: StringRes.mannerofarticulation.plosive,
              nasal: StringRes.mannerofarticulation.nasal,
              trill: StringRes.mannerofarticulation.trill,
              tapflap: StringRes.mannerofarticulation.taporflap,
              lateralflap: StringRes.mannerofarticulation.lateralflap,
              fricative: StringRes.mannerofarticulation.fricative,
              lateralfricative: StringRes.mannerofarticulation.lateralfricative,
              approximant: StringRes.mannerofarticulation.approximant,
              lateralapproximant:
                StringRes.mannerofarticulation.lateralapproximant,
              click: StringRes.mannerofarticulation.click,
              implosive: StringRes.mannerofarticulation.implosive,
            }[consonantRowsCount[i]]!;
          }
          for (let i = 0; i < vowelColsFinal.length; i++) {
            vowels[0][i + 1] = {
              content: {
                front: StringRes.backness.front,
                frontcentral:
                  vowelCols.front > 0 ? '' : StringRes.backness.front,
                central: StringRes.backness.central,
                centralback: vowelCols.back > 0 ? '' : StringRes.backness.back,
                back: StringRes.backness.back,
              }[vowelColsFinal[i]]!,
              colSpan: 2,
            };
          }
          for (let i = 0; i < vowelRowsFinal.length; i++) {
            vowels[i + 1][0] = {
              close: StringRes.height.close,
              highclosemid: vowelRows.close > 0 ? '' : StringRes.height.close,
              closemid: StringRes.height.closemid,
              mid:
                vowelRows.closemid > 0 && vowelRows.openmid > 0 ?
                  ''
                : StringRes.height.mid,
              openmid: StringRes.height.openmid,
              lowopenmid: vowelRows.open > 0 ? '' : StringRes.height.open,
              open: StringRes.height.open,
            }[vowelRowsFinal[i]]!;
          }
          console.log(consonants);
          console.log(vowels);
          doc.setFontSize(18);
          doc.setFont('CharisSIL', 'bold');
          doc.text(
            StringRes.consonants,
            unit === 'in' ? 1 : 25,
            unit === 'in' ? 1.5 : 37
          );
          let finalY = 0;
          autoTable(doc, {
            head: [consonants[0]],
            body: consonants.slice(1),
            startY: unit === 'in' ? 1.7 : 43,
            theme: 'plain',
            styles: {
              font: 'CharisSIL',
              fontStyle: 'normal',
              lineWidth: 0.001,
              lineColor: 0,
              cellWidth: unit === 'in' ? 0.8 : 20,
            },
            didDrawPage: (data) => {
              if (data.cursor) {
                finalY = data.cursor.y;
              }
            },
            margin: {
              left: unit === 'in' ? 1 : 25,
            },
          });
          doc.text(
            StringRes.vowels,
            unit === 'in' ? 1 : 25,
            finalY + (unit === 'in' ? 0.5 : 12)
          );
          autoTable(doc, {
            head: [vowels[0]],
            body: vowels.slice(1),
            startY: finalY + (unit === 'in' ? 0.7 : 18),
            theme: 'plain',
            styles: {
              font: 'CharisSIL',
              fontStyle: 'normal',
              lineWidth: 0.001,
              lineColor: 0,
              cellWidth: unit === 'in' ? 0.8 : 20,
            },
            didDrawPage: (data) => {
              if (data.cursor) {
                finalY = data.cursor.y;
              }
            },
            margin: {
              left: unit === 'in' ? 1 : 25,
            },
          });
          if (doc.getCurrentPageInfo().pageNumber % 2 === 0) {
            doc.setFontSize(10);
            doc.setFont('CharisSIL', 'normal');
            doc.text(
              pdfOptions.title,
              unit === 'in' ? 4.2 : 105,
              unit === 'in' ? 10.5 : 284,
              {
                align: 'center',
              }
            );
            doc.text(
              pdfOptions.author,
              unit === 'in' ? 7.5 : 185,
              unit === 'in' ? 10.5 : 284,
              {
                align: 'right',
              }
            );
            doc.setFontSize(12);
            doc.setFont('CharisSIL', 'bold');
            doc.text(
              (
                doc.getCurrentPageInfo().pageNumber -
                (pdfOptions.pageNumsIncludeTitle ? 0 : 1) -
                (pdfOptions.pageNumsIncludeToc ? 0 : 1)
              ).toString(),
              unit === 'in' ? 1 : 25,
              unit === 'in' ? 10.5 : 284
            );
          } else {
            doc.setFontSize(10);
            doc.setFont('CharisSIL', 'normal');
            doc.text(
              StringRes.createdwithmorpheme,
              unit === 'in' ? 1 : 25,
              unit === 'in' ? 10.5 : 284
            );
            doc.setTextColor(0, 0, 255);
            doc.textWithLink(
              StringRes.url,
              unit === 'in' ? 4.2 : 105,
              unit === 'in' ? 10.5 : 284,
              {
                url: StringRes.url,
                align: 'center',
              }
            );
            doc.setTextColor(0);
            doc.setFontSize(12);
            doc.setFont('CharisSIL', 'bold');
            doc.text(
              (
                doc.getCurrentPageInfo().pageNumber -
                (pdfOptions.pageNumsIncludeTitle ? 0 : 1) -
                (pdfOptions.pageNumsIncludeToc ? 0 : 1)
              ).toString(),
              unit === 'in' ? 7.5 : 185,
              unit === 'in' ? 10.5 : 284
            );
          }
          doc.addPage(pdfOptions.paperSize);
          break;
        }
        case 'articles': {
          toc.push({
            section: StringRes.articles,
            page: doc.getCurrentPageInfo().pageNumber,
          });
          doc.setFontSize(20);
          doc.setFont('CharisSIL', 'bold');
          doc.text(
            StringRes.articles,
            unit === 'in' ? 1 : 25,
            unit === 'in' ? 1 : 25
          );
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
      StringRes.tableofcontents,
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
        unit === 'in' ? 7.5 : 185,
        unit === 'in' ? 2 + 0.5 * i : 50 + 12 * i
      );
    }
    if (doc.getCurrentPageInfo().pageNumber % 2 === 0) {
      doc.setFontSize(10);
      doc.setFont('CharisSIL', 'normal');
      doc.text(
        pdfOptions.title,
        unit === 'in' ? 4.2 : 105,
        unit === 'in' ? 10.5 : 284,
        {
          align: 'center',
        }
      );
      doc.text(
        pdfOptions.author,
        unit === 'in' ? 7.5 : 185,
        unit === 'in' ? 10.5 : 284,
        {
          align: 'right',
        }
      );
      doc.setFontSize(12);
      doc.setFont('CharisSIL', 'bold');
      if (pdfOptions.pageNumsIncludeToc) {
        doc.text(
          (
            doc.getCurrentPageInfo().pageNumber -
            (pdfOptions.pageNumsIncludeTitle ? 0 : 1)
          ).toString(),
          unit === 'in' ? 1 : 25,
          unit === 'in' ? 10.5 : 284
        );
      }
    } else {
      doc.setFontSize(10);
      doc.setFont('CharisSIL', 'normal');
      doc.text(
        StringRes.createdwithmorpheme,
        unit === 'in' ? 1 : 25,
        unit === 'in' ? 10.5 : 284
      );
      doc.setTextColor(0, 0, 255);
      doc.textWithLink(
        StringRes.url,
        unit === 'in' ? 4.2 : 105,
        unit === 'in' ? 10.5 : 284,
        {
          url: StringRes.url,
          align: 'center',
        }
      );
      doc.setTextColor(0);
      doc.setFontSize(12);
      doc.setFont('CharisSIL', 'bold');
      if (pdfOptions.pageNumsIncludeToc) {
        doc.text(
          (
            doc.getCurrentPageInfo().pageNumber -
            (pdfOptions.pageNumsIncludeTitle ? 0 : 1)
          ).toString(),
          unit === 'in' ? 7.5 : 185,
          unit === 'in' ? 10.5 : 284
        );
      }
    }
  }
  doc.deletePage(doc.getNumberOfPages());
  doc.save(conlang.name + '.pdf');
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
        marginBottom: '0.5em',
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
