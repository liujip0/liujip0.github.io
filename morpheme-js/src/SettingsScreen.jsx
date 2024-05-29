export default function SettingsScreen({conlang, conlangDispatch}) {
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

function TextInput({label, defaultValue, onSave}) {
    const time = new Date().getMilliseconds();
    return (
        <label>
            {label}&nbsp;
            <input id={'textinput-' + time} defaultValue={defaultValue} type="text" />
            &nbsp;
            <button id={'textinputsave-' + time} onClick={() => {
                onSave(document.getElementById('textinput-' + time).value);
            }}>Save</button>
        </label>
    );
}

function RadioInput({label, options, defaultValue, onSave}) {
    const time = new Date().getMilliseconds();
    return (
        <label>
            {label}
            {options.map((value) => {
                
            })}
        </label>
    );
}