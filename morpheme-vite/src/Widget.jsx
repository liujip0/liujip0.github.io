export default function Widget({children}) {
    return (
        <div style={{
            backgroundColor: 'darkgray',
            padding: '0.5em'
        }}>
            {children}
        </div>
    );
}