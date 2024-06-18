import { createRef, useRef, useState } from 'react';
import { DimenRes } from '../common/Resources';
import { useStoreState } from '../common/Vals';

export default function SettingsScreen() {
  const conlang = useStoreState((s) => s.conlang);
  const changeConlang = useStoreState((s) => s.changeConlang);
  return (
    <>
      <h1>Settings</h1>
      <h2>General</h2>
      <TextInput
        id="settingsconlangname"
        label="Conlang Name:"
        description="This will not change the file name."
        defaultValue={conlang.name}
        onSave={(value) => {
          changeConlang(['name'], value);
        }}
      />
      <RadioInput
        label="Autosave"
        options={[
          {
            label: 'Disabled',
            value: '0'
          },
          {
            label: 'Every 1 minute',
            value: '1'
          },
          {
            label: 'Every 5 minutes',
            value: '5'
          },
          {
            label: 'Every 10 minutes',
            value: '10'
          }
        ]}
        customOption={{
          label: 'Custom:',
          description: 'Time in minutes between saves'
        }}
        defaultValue={conlang.autosave.toString()}
        onSave={(value) => changeConlang(['autosave'], parseInt(value))}
      />

      <h2>Character Inserter Widget</h2>
      <RadioInput
        label="Enabled"
        options={[
          {
            label: 'Yes',
            value: 'true'
          },
          {
            label: 'No',
            value: 'false'
          }
        ]}
        defaultValue={conlang.widgets.charInsert.enabled.toString()}
        onSave={(value) => {
          changeConlang(['widgets', 'charInsert', 'enabled'], value === 'true');
        }}
      />
      <TextInput
        id="settingschars"
        label="Characters"
        description="Enter characters or character groups separated by commas."
        defaultValue={conlang.widgets.charInsert.chars.join(',')}
        onSave={(value) => {
          changeConlang(['widgets', 'charInsert', 'chars'], value.split(','));
        }}
      />

      <h2>Articles</h2>
      <RadioInput
        label="Folders on top"
        description={
          'When articles are listed together, folders will show up ' +
          'on top regardless of alphabetical order.'
        }
        options={[
          {
            label: 'Yes',
            value: 'true'
          },
          {
            label: 'No',
            value: 'false'
          }
        ]}
        onSave={(value) => {
          changeConlang(['articles', 'foldersOnTop'], value === 'true');
        }}
      />
    </>
  );
}

type TextInputProps = {
  id: string;
  label: string;
  description?: string;
  defaultValue?: string;
  onSave: (value: string) => void;
};
function TextInput({
  id,
  label,
  description,
  defaultValue,
  onSave
}: TextInputProps) {
  const setLastInput = useStoreState((s) => s.setLastInput);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const time = new Date().getMilliseconds();
  return (
    <label
      style={{
        fontSize: DimenRes.input.label,
        display: 'block',
        marginBottom: DimenRes.input.spaceBetween,
        fontWeight: 'bold'
      }}>
      {label}
      <div>
        <input
          id={time + id}
          ref={inputRef}
          defaultValue={defaultValue ? defaultValue : ''}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && buttonRef.current) {
              buttonRef.current.click();
            }
          }}
          onFocus={() => {
            setLastInput(time + id);
          }}
          type="text"
          style={{
            fontSize: DimenRes.input.input,
            fontFamily: 'monospace'
          }}
        />
        &nbsp;
        <button
          onClick={() => {
            if (inputRef.current) {
              onSave(inputRef.current.value);
            }
          }}
          ref={buttonRef}
          style={{
            fontSize: DimenRes.input.button
          }}>
          Save
        </button>
      </div>
      {description && (
        <div
          style={{
            fontSize: DimenRes.input.description,
            fontWeight: 'normal'
          }}>
          {description}
        </div>
      )}
    </label>
  );
}

type radioInputOption = {
  label: string;
  value: string;
  description?: string;
};
type RadioInputProps = {
  label: string;
  options: Array<radioInputOption>;
  defaultValue?: string;
  description?: string;
  onSave: (value: string) => void;
  customOption?: {
    defaultValue?: string;
    label: string;
    description?: string;
  };
};
function RadioInput({
  label,
  options,
  defaultValue,
  description,
  onSave,
  customOption
}: RadioInputProps) {
  const time = new Date().getTime();
  const inputRefs = useRef<Array<React.RefObject<HTMLInputElement>>>(
    Array.from(
      { length: customOption ? options.length + 1 : options.length },
      () => createRef<HTMLInputElement>()
    )
  );
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [currentSelection, setCurrentSelection] = useState(
    defaultValue ? defaultValue : ''
  );
  const [currentValue, setCurrentValue] = useState(
    defaultValue ? defaultValue : ''
  );
  const customInputRef = useRef<HTMLInputElement>(null);
  return (
    <label
      style={{
        fontSize: DimenRes.input.label,
        display: 'block',
        marginBottom: DimenRes.input.spaceBetween,
        fontWeight: 'bold'
      }}>
      {label}
      {options.map((x: radioInputOption, i: number) => {
        return (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              margin: '0.25em 0'
            }}>
            <input
              ref={inputRefs.current[i]}
              id={'radioinput-' + time + '-' + x.value}
              type="radio"
              checked={currentSelection === x.value}
              onChange={() => {
                setCurrentSelection(x.value);
                setCurrentValue(x.value);
              }}
            />
            <label
              style={{
                fontSize: DimenRes.input.input,
                marginLeft: '0.5em',
                fontWeight: 'normal'
              }}
              htmlFor={'radioinput-' + time + '-' + x.value}>
              {x.label}
              <br />
              {x.description && (
                <span
                  style={{
                    fontSize: DimenRes.input.description
                  }}>
                  {x.description}
                </span>
              )}
            </label>
          </div>
        );
      })}
      {customOption && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            margin: '0.25em 0'
          }}>
          <input
            ref={inputRefs.current[options.length]}
            id={'radioinput-custom'}
            type="radio"
            checked={currentSelection === 'custom'}
            onChange={() => {
              setCurrentSelection('custom');
              if (customInputRef.current) {
                setCurrentValue(customInputRef.current.value);
              }
            }}
          />
          <label
            style={{
              fontSize: DimenRes.input.input,
              marginLeft: '0.5em',
              fontWeight: 'normal',
              padding: '0'
            }}
            htmlFor={'radioinput-custom'}>
            {customOption.label}&nbsp;
            {
              <input
                defaultValue={customOption.defaultValue}
                ref={customInputRef}
                type="text"
              />
            }
            <br />
            {customOption.description && (
              <span
                style={{
                  fontSize: DimenRes.input.description,
                  padding: '0'
                }}>
                {customOption.description}
              </span>
            )}
          </label>
        </div>
      )}
      <button
        onClick={() => {
          onSave(currentValue);
        }}
        ref={buttonRef}
        style={{
          fontSize: DimenRes.input.button,
          marginTop: '0.3em'
        }}>
        Save
      </button>
      {description && (
        <div
          style={{
            fontSize: DimenRes.input.description,
            fontWeight: 'normal'
          }}>
          {description}
        </div>
      )}
    </label>
  );
}
