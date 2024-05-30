import { createRef, useRef, useState } from "react";
import { conlangReducerFunc } from "./App";
import { Conlang } from "./CommonTypes";
import { DimenRes } from "./Resources";

type SettingsScreenProps = {
    conlang: Conlang;
    conlangDispatch: conlangReducerFunc;
};
export default function SettingsScreen({
    conlang,
    conlangDispatch
}: SettingsScreenProps) {
    const [test, setTest] = useState('')
    return (
        <>
            <h1>Settings</h1>
            <TextInput
                label="Conlang Name:"
                description="This will not change the file name."
                defaultValue={conlang.name}
                onSave={(value) => {
                    conlangDispatch({
                        type: 'replace',
                        newValue: {
                            name: value
                        }
                    })
                }}
            ></TextInput>

            <h2>Widgets</h2>
            <h3>Character Inserter</h3>
            <RadioInput
                label="Enabled"
                options={[
                    {
                        label: 'Yes',
                        value: 'true',
                        description: 'Show Character Inserter widget'
                    },
                    {
                        label: 'No',
                        value: 'false'
                    }
                ]}
                onSave={(value) => {setTest(value)}}
            ></RadioInput>
            <div>{test}</div>
        </>
    );
}

type TextInputProps = {
    label: string;
    description?: string;
    defaultValue: string;
    onSave: (value: string) => void;
};
function TextInput({
    label,
    description,
    defaultValue,
    onSave
}: TextInputProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    return (
        <label style={{
            fontSize: DimenRes.input.label
        }}>
            {label}
            <div>
                <input
                    ref={inputRef}
                    defaultValue={defaultValue}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter' && buttonRef.current) {
                            buttonRef.current.click();
                        }
                    }}
                    type="text"
                    style={{
                        fontSize: DimenRes.input.input
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
                    }}
                >Save</button>
            </div>
            {description &&
                <div style={{
                    fontSize: DimenRes.input.description
                }}>{description}</div>
            }
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
function RadioInput({
    label,
    options,
    defaultValue,
    onSave
}: RadioInputProps) {
    const time = new Date().getTime();
    const inputRefs = useRef<Array<React.RefObject<HTMLInputElement>>>(
        Array.from({length: options.length}, () => createRef<HTMLInputElement>())
    );
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [currentValue, setCurrentValue] = useState(defaultValue != null ? defaultValue : '');
    return (
        <label style={{
            fontSize: DimenRes.input.label
        }}>
            {label}
            {options.map((x: radioInputOption, i: number) => {
                return (<div>
                    <input
                        ref={inputRefs.current[i]}
                        id={'radioinput-' + time + '-' + x.value}
                        type="radio"
                        checked={currentValue === x.value}
                        onChange={() => setCurrentValue(x.value)}
                    />
                    <label style={{
                        fontSize: DimenRes.input.input
                    }} htmlFor={'radioinput-' + time + '-' + x.value}>
                        {x.label}<br />
                        {x.description &&
                            <span style={{
                                fontSize: DimenRes.input.description
                            }}>{x.description}</span>
                        }
                    </label>
                </div>);
            })}
            &nbsp;
            <button
                onClick={() => {
                    onSave(currentValue);
                }}
                ref={buttonRef}
                style={{
                    fontSize: DimenRes.input.button
                }}
            >Save</button>
        </label>
    );
}