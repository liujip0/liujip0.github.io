import { CSSProperties, MutableRefObject, useRef, useState } from 'react';
import {
  TbChevronDown,
  TbChevronUp,
  TbCopy,
  TbFilter,
  TbFilterX
} from 'react-icons/tb';
import { parseCxs, unparseCxs } from './common/Funcs.tsx';
import { PartOfSpeech, PartOfSpeech_Arr } from './common/Types.tsx';
import { useStoreState } from './common/Vals.tsx';
import { PartOfSpeechSelect } from './screens/LexiconScreen.tsx';

export default function Widgets() {
  const conlang = useStoreState((s) => s.conlang);
  const cxsinRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const cxsoutRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
  return (
    <div
      id="charinsertwidget"
      style={{
        display: 'flex',
        position: 'absolute',
        gridArea: 'b',
        width: '100%'
      }}>
      {conlang.widgets.charInsert.enabled && (
        <CharInsertWidget
          cxsinRef={cxsinRef}
          cxsoutRef={cxsoutRef}
        />
      )}
      {conlang.widgets.cxs.enabled && (
        <CxsWidget
          cxsinRef={cxsinRef}
          cxsoutRef={cxsoutRef}
        />
      )}
      {conlang.widgets.dictSearch.enabled && <DictSearchWidget />}
    </div>
  );
}

type DictFilter = {
  general: string;
  partOfSpeech: PartOfSpeech;
  definitionCount: number;
  romanization: string;
  ipa: string;
  definitions: string;
};
const dictFilterInit = {
  general: '',
  partOfSpeech: '' as PartOfSpeech,
  definitionCount: 0,
  romanization: '',
  ipa: '',
  definitions: ''
};
function DictSearchWidget() {
  const conlang = useStoreState((s) => s.conlang);
  const setLastInput = useStoreState((s) => s.setLastInput);
  const [dictSearchExpanded, setDictSearchExpanded] = useState(false);
  const [dictFilterExpanded, setDictFilterExpanded] = useState(false);
  const [dictFilter, setDictFilter] = useState<DictFilter>(dictFilterInit);
  return (
    <Widget
      onClick={() => {
        setDictSearchExpanded(true);
      }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center'
        }}>
        <input
          id="dictsearch"
          onFocus={() => {
            setLastInput('dictsearch');
          }}
          className="charis"
          placeholder="Lexicon Search"
          style={{
            marginRight: '0.5em'
          }}
          value={dictFilter.general}
          onInput={(event) => {
            setDictFilter({
              ...dictFilter,
              general: event.currentTarget.value
            });
          }}
        />
        <button
          onClick={(event) => {
            event.stopPropagation();
            setDictFilterExpanded(dictFilterExpanded ? false : true);
          }}
          style={{
            marginRight: '0.5em'
          }}>
          <TbFilter size={16} />
        </button>
        <button
          onClick={(event) => {
            event.stopPropagation();
            if (dictSearchExpanded) {
              setDictSearchExpanded(false);
              setDictFilterExpanded(false);
            } else {
              setDictSearchExpanded(true);
            }
          }}
          style={{
            height: 'min-content',
            width: 'min-content'
          }}>
          {dictSearchExpanded ?
            <TbChevronUp size={16} />
          : <TbChevronDown size={16} />}
        </button>
      </div>
      <div
        style={{
          marginTop: '0.3em',
          display: dictFilterExpanded ? 'flex' : 'none',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
        <input
          placeholder="Romanization"
          value={dictFilter.romanization}
          onInput={(event) => {
            setDictFilter({
              ...dictFilter,
              romanization: event.currentTarget.value
            });
          }}
          type="text"
          style={{
            marginRight: '0.5em'
          }}
        />
        <input
          placeholder="IPA"
          value={dictFilter.ipa}
          onInput={(event) => {
            setDictFilter({
              ...dictFilter,
              ipa: event.currentTarget.value
            });
          }}
          type="text"
          style={{
            marginRight: '0.5em'
          }}
        />
        <PartOfSpeechSelect
          value={dictFilter.partOfSpeech}
          onChange={(event) => {
            setDictFilter({
              ...dictFilter,
              partOfSpeech: event.currentTarget.value as PartOfSpeech
            });
          }}
          style={{
            marginRight: '0.5em'
          }}
        />
        <input
          type="number"
          placeholder="Def. Ct."
          style={{
            marginRight: '0.5em',
            width: '5em'
          }}
          value={dictFilter.definitionCount ? dictFilter.definitionCount : ''}
          onInput={(event) => {
            setDictFilter({
              ...dictFilter,
              definitionCount: parseInt(event.currentTarget.value)
            });
          }}
        />
        <input
          placeholder="Definitions"
          value={dictFilter.definitions}
          onInput={(event) => {
            setDictFilter({
              ...dictFilter,
              definitions: event.currentTarget.value
            });
          }}
          type="text"
          style={{
            marginRight: '0.5em'
          }}
        />
        <button
          onClick={() => {
            setDictFilter(dictFilterInit);
          }}>
          <TbFilterX size={16} />
        </button>
      </div>
      <div
        style={{
          marginTop: '0.3em',
          display: dictSearchExpanded ? 'flex' : 'none'
        }}>
        {(() => {
          if (
            dictFilter.general ||
            dictFilter.romanization ||
            dictFilter.ipa ||
            dictFilter.partOfSpeech ||
            dictFilter.definitionCount ||
            dictFilter.definitions
          ) {
            let filteredLexicon = conlang.lexicon;
            if (dictFilter.general) {
              if (PartOfSpeech_Arr.includes(dictFilter.general)) {
                filteredLexicon = filteredLexicon.filter(
                  (item) =>
                    item.romanization.includes(dictFilter.general) ||
                    item.ipa.includes(dictFilter.general) ||
                    item.definitions.some((x) =>
                      x.includes(dictFilter.general)
                    ) ||
                    item.partOfSpeech === dictFilter.general
                );
              } else {
                filteredLexicon = filteredLexicon.filter(
                  (item) =>
                    item.romanization.includes(dictFilter.general) ||
                    item.ipa.includes(dictFilter.general) ||
                    item.definitions.some((x) => x.includes(dictFilter.general))
                );
              }
            }
            if (dictFilter.romanization) {
              filteredLexicon = filteredLexicon.filter((item) =>
                item.romanization.includes(dictFilter.romanization)
              );
            }
            if (dictFilter.ipa) {
              filteredLexicon = filteredLexicon.filter((item) =>
                item.ipa.includes(dictFilter.ipa)
              );
            }
            if (dictFilter.partOfSpeech) {
              filteredLexicon = filteredLexicon.filter(
                (item) => item.partOfSpeech === dictFilter.partOfSpeech
              );
            }
            if (dictFilter.definitionCount) {
              filteredLexicon = filteredLexicon.filter(
                (item) => item.definitions.length === dictFilter.definitionCount
              );
            }
            if (dictFilter.definitions) {
              filteredLexicon = filteredLexicon.filter((item) =>
                item.definitions.some((x) => x.includes(dictFilter.definitions))
              );
            }
            return filteredLexicon.length ?
                <table>
                  {filteredLexicon.map((item) => (
                    <tr key={item.id}>
                      <td>{item.romanization}</td>
                      <td>{item.ipa}</td>
                      <td>{item.partOfSpeech}</td>
                      <td>
                        <ol
                          style={{
                            margin: '0',
                            paddingLeft: '1em'
                          }}>
                          {item.definitions.map((x) => (
                            <li>{x}</li>
                          ))}
                        </ol>
                      </td>
                    </tr>
                  ))}
                </table>
              : <i>No words match your search</i>;
          } else {
            return <i>Start typing to search</i>;
          }
        })()}
      </div>
    </Widget>
  );
}

type CxsWidgetProps = {
  cxsinRef: MutableRefObject<HTMLInputElement | null>;
  cxsoutRef: MutableRefObject<HTMLInputElement | null>;
};
function CxsWidget({ cxsinRef, cxsoutRef }: CxsWidgetProps) {
  const setLastInput = useStoreState((s) => s.setLastInput);
  const [cxsExpanded, setCxsExpanded] = useState(false);
  return (
    <Widget
      id="cxswidget"
      onClick={() => {
        setCxsExpanded(true);
      }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center'
        }}>
        <input
          className="charis"
          ref={cxsinRef}
          id="cxsin"
          onFocus={() => {
            setCxsExpanded(true);
            setLastInput('cxsin');
          }}
          placeholder="Conlang X-SAMPA"
          onInput={() => {
            if (cxsoutRef.current && cxsinRef.current) {
              cxsoutRef.current.value = parseCxs(cxsinRef.current.value);
            }
          }}
          style={{
            marginRight: '0.5em'
          }}
        />
        <button
          onClick={async () => {
            if (cxsinRef.current) {
              if (navigator.clipboard) {
                await navigator.clipboard.writeText(cxsinRef.current.value);
              } else {
                cxsinRef.current.select();
                document.execCommand('copy');
              }
            }
          }}
          style={{
            marginRight: '0.5em'
          }}>
          <TbCopy size={16} />
        </button>
        <button
          onClick={(event) => {
            event.stopPropagation();
            setCxsExpanded(cxsExpanded ? false : true);
          }}
          style={{
            height: 'min-content',
            width: 'min-content'
          }}>
          {cxsExpanded ?
            <TbChevronUp size={16} />
          : <TbChevronDown size={16} />}
        </button>
      </div>
      <div
        style={{
          marginTop: '0.3em',
          display: cxsExpanded ? 'flex' : 'none',
          alignItems: 'center'
        }}>
        <input
          className="charis"
          ref={cxsoutRef}
          id="cxsout"
          onFocus={() => {
            setLastInput('cxsout');
          }}
          placeholder="IPA"
          onInput={() => {
            if (cxsinRef.current && cxsoutRef.current) {
              cxsinRef.current.value = unparseCxs(cxsoutRef.current.value);
            }
          }}
          style={{
            marginRight: '0.5em'
          }}
        />
        <button
          onClick={async () => {
            if (cxsoutRef.current) {
              if (navigator.clipboard) {
                await navigator.clipboard.writeText(cxsoutRef.current.value);
              } else {
                cxsoutRef.current.select();
                document.execCommand('copy');
              }
            }
          }}>
          <TbCopy size={16} />
        </button>
      </div>
    </Widget>
  );
}

type CharInsertWidgetProps = {
  cxsinRef: MutableRefObject<HTMLInputElement | null>;
  cxsoutRef: MutableRefObject<HTMLInputElement | null>;
};
function CharInsertWidget({ cxsinRef, cxsoutRef }: CharInsertWidgetProps) {
  const conlang = useStoreState((s) => s.conlang);
  const lastInput = useStoreState((s) => s.lastInput);
  const insertText = useStoreState((s) => s.insertText);
  return (
    <Widget>
      {conlang.widgets.charInsert.chars.map((char) => {
        return (
          <button
            key={char}
            style={{
              fontFamily: 'monospace',
              marginRight: '0.2em'
            }}
            onClick={(event) => {
              event.preventDefault();
              if (lastInput) {
                if (lastInput === 'wysiwyg') {
                  insertText(char);
                } else {
                  const element = document.getElementById(
                    lastInput
                  )! as HTMLInputElement;
                  const start = element.selectionStart!;
                  const end = element.selectionEnd!;
                  const value = element.value;
                  element.value =
                    value.substring(0, start) + char + value.substring(end);
                  element.focus();
                  element.setSelectionRange(
                    start + char.length,
                    start + char.length
                  );
                }
              }
              if (cxsoutRef.current && cxsinRef.current) {
                if (lastInput === 'cxsin') {
                  cxsoutRef.current.value = parseCxs(cxsinRef.current.value);
                } else if (lastInput === 'cxsout') {
                  cxsinRef.current.value = unparseCxs(cxsoutRef.current.value);
                }
              }
            }}>
            {char}
          </button>
        );
      })}
    </Widget>
  );
}

type WidgetProps = {
  id?: string;
  onClick?: () => void;
  style?: CSSProperties;
  children: React.ReactNode;
};
function Widget({ id, onClick, style, children }: WidgetProps) {
  return (
    <div
      id={id}
      onClick={onClick}
      style={{
        ...style,
        backgroundColor: 'darkgray',
        padding: '0.5em',
        border: '1px solid black',
        height: 'min-content',
        zIndex: '2',
        position: 'relative'
      }}>
      {children}
    </div>
  );
}
