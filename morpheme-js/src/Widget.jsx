export default function Widget({children}) {
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