import { MutableRefObject, useRef } from 'react';
import { parseCxs, unparseCxs } from './common/Funcs.tsx';
import { useStoreState } from './common/Vals.tsx';

export default function Widgets() {
  const conlang = useStoreState((s) => s.conlang);
  const lastInput = useStoreState((s) => s.lastInput);
  const setLastInput = useStoreState((s) => s.setLastInput);
  const cxsExpanded = useStoreState((s) => s.cxsExpanded);
  const setCxsExpanded = useStoreState((s) => s.setCxsExpanded);
  const cxsinRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const cxsoutRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
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
                  fontFamily: 'monospace'
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
      {
        //TODO dictSearch
      }
      {conlang.widgets.cxs.enabled && (
        <Widget
          id="cxswidget"
          onClick={() => {
            setCxsExpanded(true);
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
          />
          &nbsp;
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
            }}>
            Copy
          </button>
          <div
            style={{
              marginTop: '0.3em',
              display: cxsExpanded ? 'block' : 'none'
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
            />
            &nbsp;
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
              Copy
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
        zIndex: '2'
      }}>
      {children}
    </div>
  );
}
