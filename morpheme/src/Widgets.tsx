import {useStoreState} from './CommonVals';

export default function Widgets() {
    const conlang = useStoreState((s) => s.conlang);
    const lastInput = useStoreState((s) => s.lastInput);
    return (
        <div
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
                                            value.substring(0, start) +
                                            char +
                                            value.substring(end);
                                        element.focus();
                                        element.setSelectionRange(
                                            start + char.length,
                                            start + char.length
                                        );
                                    }
                                }}>
                                {char}
                            </button>
                        );
                    })}
                </Widget>
            )}
            <Widget>
                <input type="text" />
            </Widget>
            <Widget>
                <span id="test"></span>
            </Widget>
        </div>
    );
}

type WidgetProps = {
    children: React.ReactNode;
};
function Widget({children}: WidgetProps) {
    return (
        <div
            style={{
                backgroundColor: 'darkgray',
                padding: '0.5em',
                border: '1px solid black'
            }}>
            {children}
        </div>
    );
}
