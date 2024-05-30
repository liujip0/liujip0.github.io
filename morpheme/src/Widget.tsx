type WidgetProps = {
    children: React.ReactNode;
};
export default function Widget({
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