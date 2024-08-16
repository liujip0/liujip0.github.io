import {
  ChangeEventHandler,
  CSSProperties,
  MouseEventHandler,
  useState,
} from 'react';
import { Gloss } from './Gloss.tsx';
import { PartOfSpeech } from './Types.tsx';

type NavBarProps = {
  sections: Array<{
    label: string;
    id: string;
  }>;
  custom?: React.ReactNode;
};
export function NavBar({ sections, custom }: NavBarProps) {
  return (
    <div
      style={{
        position: 'sticky',
        top: '0',
        display: 'flex',
        backgroundColor: 'white',
        width: '100%',
      }}>
      <div
        style={{
          overflowX: 'scroll',
          display: 'flex',
          flex: '1',
        }}>
        {sections.map((x) => {
          return (
            <button
              key={x.id}
              style={{
                margin: '0.2em',
                height: 'min-content',
              }}
              onClick={() => {
                const element = document.getElementById(x.id)!;
                element.scrollIntoView({
                  block: 'start',
                  inline: 'nearest',
                  behavior: 'smooth',
                });
              }}>
              {x.label}
            </button>
          );
        })}
      </div>
      {custom}
    </div>
  );
}

type NavSectionProps = {
  id: string;
  children: React.ReactNode;
};
export function NavSection({ id, children }: NavSectionProps) {
  return (
    <h1
      style={{
        marginTop: '1em',
        paddingTop: '1.3em',
      }}
      id={id}>
      {children}
    </h1>
  );
}

type PopupProps = {
  children: React.ReactNode;
};
export function Popup({ children }: PopupProps) {
  return (
    <div
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        backgroundColor: '#00000088',
        width: '100vw',
        height: '100vh',
        zIndex: '99',
      }}>
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'lightgray',
          border: '3px solid darkgray',
          padding: '1em',
          maxHeight: '80vh',
        }}>
        {children}
      </div>
    </div>
  );
}

type AlertProps = {
  title: string;
  description: string;
  onAccept?: () => void;
  onDecline?: () => void;
};
export function Alert({ title, description, onAccept, onDecline }: AlertProps) {
  return (
    <Popup>
      <h1
        style={{
          textAlign: 'left',
          margin: '0',
          fontSize: '1.6em',
        }}>
        {title}
      </h1>
      <p
        style={{
          fontWeight: 'normal',
          textAlign: 'left',
        }}>
        {description}
      </p>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}>
        <button onClick={onDecline}>Go Back</button>&nbsp;
        <button onClick={onAccept}>Continue</button>
      </div>
    </Popup>
  );
}

type IconButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
};
export function IconButton({ onClick, children }: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: 'transparent',
        border: 'none',
        margin: '0',
        padding: '0.3em',
      }}>
      {children}
    </button>
  );
}

type GlossingAbbreviationsProps = {
  onClose: () => void;
};
export function GlossingAbbreviations({ onClose }: GlossingAbbreviationsProps) {
  const [searchAbbr, setSearchAbbr] = useState('');
  const [searchDef, setSearchDef] = useState('');
  return (
    <Popup>
      <h1
        style={{
          textAlign: 'left',
          margin: '0',
          fontSize: '1.6em',
        }}>
        Glossing Abbreviations
      </h1>
      <div
        style={{
          overflow: 'scroll',
          flex: '1',
          marginTop: '1em',
          marginBottom: '1em',
        }}>
        <table>
          <thead>
            <tr>
              <th>
                <input
                  value={searchAbbr}
                  onInput={(event) => {
                    setSearchAbbr(event.currentTarget.value);
                  }}
                />
              </th>
              <th>
                <input
                  value={searchDef}
                  onInput={(event) => {
                    setSearchDef(event.currentTarget.value);
                  }}
                  style={{
                    width: '100%',
                  }}
                />
              </th>
            </tr>
          </thead>
          {Object.entries(Gloss)
            .filter((x) =>
              x[0].toUpperCase().includes(searchAbbr.toUpperCase())
            )
            .filter((x) => x[1].toUpperCase().includes(searchDef.toUpperCase()))
            .map((item) => (
              <tr key={item[0]}>
                <td>{item[0]}</td>
                <td>{item[1]}</td>
              </tr>
            ))}
        </table>
      </div>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
        }}>
        <button onClick={onClose}>Done</button>
      </div>
    </Popup>
  );
}

type PartOfSpeechSelectProps = {
  value: PartOfSpeech;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  style?: CSSProperties;
  disabled?: boolean;
};
export function PartOfSpeechSelect({
  value,
  onChange,
  style,
  disabled,
}: PartOfSpeechSelectProps) {
  return (
    <select
      value={value}
      onChange={onChange}
      style={style}
      disabled={disabled}>
      <option value="">-</option>
      <option value="noun">Noun</option>
      <option value="verb">Verb</option>
      <option value="adjective">Adjective</option>
      <option value="adverb">Adverb</option>
      <option value="pronoun">Pronoun</option>
      <option value="proper noun">Proper Noun</option>
      <option value="particle">Particle</option>
      <option value="adposition">Adposition</option>
      <option value="conjunction">Conjunction</option>
    </select>
  );
}
