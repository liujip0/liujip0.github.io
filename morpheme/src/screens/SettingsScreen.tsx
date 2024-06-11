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
                    changeConlang(
                        ['widgets', 'charInsert', 'enabled'],
                        value === 'true'
                    );
                }}
            />
            <TextInput
                id="settingschars"
                label="Characters"
                description="Enter characters or character groups separated by commas."
                defaultValue={conlang.widgets.charInsert.chars.join(',')}
                onSave={(value) => {
                    changeConlang(
                        ['widgets', 'charInsert', 'chars'],
                        value.split(',')
                    );
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
    onSave: (value: string) => void;
};
function RadioInput({ label, options, defaultValue, onSave }: RadioInputProps) {
    const time = new Date().getTime();
    const inputRefs = useRef<Array<React.RefObject<HTMLInputElement>>>(
        Array.from({ length: options.length }, () =>
            createRef<HTMLInputElement>()
        )
    );
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [currentValue, setCurrentValue] = useState(
        defaultValue ? defaultValue : ''
    );
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
                            alignItems: 'center'
                        }}>
                        <input
                            ref={inputRefs.current[i]}
                            id={'radioinput-' + time + '-' + x.value}
                            type="radio"
                            checked={currentValue === x.value}
                            onChange={() => setCurrentValue(x.value)}
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
        </label>
    );
}
