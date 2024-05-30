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
    return (
        <>
            <h1>Settings</h1>
            <TextInput label={'Conlang Name:'} defaultValue={conlang.name} onSave={(value) => {
                conlangDispatch({
                    type: 'replace',
                    key: 'name',
                    newValue: value
                })
            }}></TextInput>

            <h2>Widgets</h2>

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
    const inputRefs = useRef<Array<React.RefObject<HTMLInputElement>>>(
        Array.from({length: options.length}, () => createRef<HTMLInputElement>())
    );
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [currentValue, setCurrentValue] = useState<string | null>(null);
    return (
        <label>
            {label}
            {options.map((i: radioInputOption) => {
                return (<>
                    <input
                        id={'radioinput-' + time + '-' + i.value}
                        type="radio"
                        checked={defaultValue != null && defaultValue === i.value ? true : false}
                    />
                    <label htmlFor={'radioinput-' + time + '-' + i.value}>{i.label}</label>
                </>);
            })}
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