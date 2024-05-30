import { Conlang } from "./CommonTypes";

type WidgetsProps = {
    conlang: Conlang;
}
export default function Widgets({
    conlang
}: WidgetsProps) {
    return (
        <div style={{
            display: 'flex',
            position: 'absolute',
            gridArea: 'b'
        }}>
            {conlang.widgets.charInsert.enabled &&
                <Widget>
                    {conlang.widgets.charInsert.chars.map((char) => {
                        return (
                            <button style={{
                                fontFamily: 'monospace'
                            }}>{char}</button>
                        );
                    })}
                </Widget>
            }
            <Widget>
                <input type="text" />
            </Widget>
            <Widget><span id="test"></span></Widget>
        </div>
    );
}

type WidgetProps = {
    children: React.ReactNode;
};
function Widget({
    children
}: WidgetProps) {
    return (
        <div style={{
            backgroundColor: 'darkgray',
            padding: '0.5em',
            border: '1px solid black'
        }}>
            {children}
        </div>
    );
}