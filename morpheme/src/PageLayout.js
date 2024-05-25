import React from 'react';
import TopBar from './TopBar.js'
import Widget from './Widget.js';
import ScreensLayout from './ScreensLayout.js';

export default function PageLayout() {
    return (
        <div style={{
            position: 'relative',
            top: '0',
            left: '0',
            height: '100vh',
            width: '100vw',
            display: 'grid',
            gridTemplateRows: '5em 3em 1fr 1em 1fr',
            gridTemplateColumns: '1fr 1em 1fr',
            gridTemplateAreas: `'a a a' 'b b b' 'a0 c a1' 'd d d' 'a2 e a3'`,
            overflow: 'scroll'
        }}>
            <TopBar></TopBar>
            <div style={{
                display: 'flex',
                position: 'absolute',
                gridArea: 'b'
            }}>
                <Widget>
                    A a B b C c
                </Widget>
                <Widget>
                    <input type="text" />
                </Widget>
                <Widget><span id="test"></span></Widget>
            </div>
            <ScreensLayout></ScreensLayout>
        </div>
    );
}