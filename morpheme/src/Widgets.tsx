import { MutableRefObject, useRef, useState } from 'react';
import {
  TbChevronDown,
  TbChevronUp,
  TbCopy,
  TbFilter,
  TbFilterX
} from 'react-icons/tb';
import { parseCxs, unparseCxs } from './common/Funcs.tsx';
import { PartOfSpeech } from './common/Types.tsx';
import { useStoreState } from './common/Vals.tsx';
import { PartOfSpeechSelect } from './screens/LexiconScreen.tsx';

export default function Widgets() {
  const conlang = useStoreState((s) => s.conlang);
  const lastInput = useStoreState((s) => s.lastInput);
  const setLastInput = useStoreState((s) => s.setLastInput);
  const [cxsExpanded, setCxsExpanded] = useState(false);
  const cxsinRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const cxsoutRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const [dictSearchExpanded, setDictSearchExpanded] = useState(false);
  const [dictFilterExpanded, setDictFilterExpanded] = useState(false);
  const [dictFilter, setDictFilter] = useState<{
    partOfSpeech: PartOfSpeech;
    definitionCount: number;
    romanization: string;
    ipa: string;
    definitions: string;
  }>({
    partOfSpeech: '',
    definitionCount: 0,
    romanization: '',
    ipa: '',
    definitions: ''
  });
  const dictSearchRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
  return (
    <div
      id="charinsertwidget"
      style={{
        display: 'flex',
        position: 'absolute',
        gridArea: 'b'
      }}>
      {conlang.widgets.charInsert.enabled && (
        <Widget>
          {conlang.widgets.charInsert.chars.map((char) => {
            return (
              <button
                key={char}
                style={{
                  fontFamily: 'monospace',
                  marginRight: '0.2em'
                }}
                onClick={() => {
                  if (lastInput) {
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
                  if (cxsoutRef.current && cxsinRef.current) {
                    if (lastInput === 'cxsin') {
                      cxsoutRef.current.value = parseCxs(
                        cxsinRef.current.value
                      );
                    } else if (lastInput === 'cxsout') {
                      cxsinRef.current.value = unparseCxs(
                        cxsoutRef.current.value
                      );
                    }
                  }
                }}>
                {char}
              </button>
            );
          })}
        </Widget>
      )}
      {conlang.widgets.cxs.enabled && (
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
                    await navigator.clipboard.writeText(
                      cxsoutRef.current.value
                    );
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
      )}
      {conlang.widgets.dictSearch.enabled && (
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
              ref={dictSearchRef}
              style={{
                marginRight: '0.5em'
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
                setDictSearchExpanded(dictSearchExpanded ? false : true);
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
            <PartOfSpeechSelect
              value={dictFilter.partOfSpeech}
              onChange={(event) => {
                setDictFilter({
                  ...dictFilter,
                  partOfSpeech: event.currentTarget.value as PartOfSpeech
                });
              }}
            />
            <button>
              <TbFilterX size={16} />
            </button>
          </div>
        </Widget>
      )}
    </div>
  );
}

type WidgetProps = {
  id?: string;
  onClick?: () => void;
  children: React.ReactNode;
};
function Widget({ id, onClick, children }: WidgetProps) {
  return (
    <div
      id={id}
      onClick={onClick}
      style={{
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
