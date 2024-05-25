import React from 'react';

export default function TopBar() {
    return (
        <div style={{
            fontSize: '1.5em',
            backgroundColor: 'gray',
            display: 'flex',
            alignItems: 'center',
            gridArea: 'a'
        }}>
            <div style={{
                fontSize: '1.5em',
                margin: '0.4em 0.5em 0.4em 0.5em'
            }}>Title</div>

            <div style={{
                display: 'flex'
            }}>
                <MenuItem>Phonology</MenuItem>
                <MenuItem>Grammar</MenuItem>
                <MenuItem>Lexicon</MenuItem>
                <MenuItem>Tools</MenuItem>
                <MenuItem>Settings</MenuItem>
            </div>
        </div>
    );
}

function MenuItem({children}) {
    return (
        <div style={{
            margin: '0.2em 0em 0.2em 1em'
        }}>
            {children}
        </div>
    )
}