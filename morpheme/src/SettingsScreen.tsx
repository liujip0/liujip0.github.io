import { createRef, useRef, useState } from "react";
import { conlangReducerFunc } from "./App";
import { Conlang } from "./Types";

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
                label={'Conlang Name:'}
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
                        value: 'true'
                    },
                    {
                        label: 'No',
                        value: 'false'
                    }
                ]}
                onSave={(value) => {setTest(value)}}
            ></RadioInput>
        </>
    );
}

type TextInputProps = {
    label: string;
    defaultValue: string;
    onSave: (value: string) => void;
};
function TextInput({
    label,
    defaultValue,
    onSave
}: TextInputProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    return (
        <label>
            {label}&nbsp;
            <input
                ref={inputRef}
                defaultValue={defaultValue}
                onKeyDown={(event) => {
                    if (event.key === 'Enter' && buttonRef.current) {
                        buttonRef.current.click();
                    }
                }}
                type="text"
            />
            &nbsp;
            <button
                onClick={() => {
                    if (inputRef.current) {
                        onSave(inputRef.current.value);
                    }
                }}
                ref={buttonRef}
            >Save</button>
        </label>
    );
}

type radioInputOption = {
    label: string;
    value: string;
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
        <label>
            {label}
            {options.map((x: radioInputOption, i: number) => {
                return (<>
                    <input
                        ref={inputRefs.current[i]}
                        id={'radioinput-' + time + '-' + x.value}
                        type="radio"
                        checked={currentValue === x.value}
                        onChange={() => setCurrentValue(x.value)}
                    />
                    <label htmlFor={'radioinput-' + time + '-' + x.value}>{x.label}</label>
                </>);
            })}
            &nbsp;
            <button
                onClick={() => {
                    onSave(currentValue);
                }}
                ref={buttonRef}
            >Save</button>
        </label>
    );
}