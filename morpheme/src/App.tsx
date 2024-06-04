import './App.css';
import AppLayout from './AppLayout';
import {ContextProvider} from './CommonVals';

export default function App() {
    return (
        <ContextProvider>
            <AppLayout />
        </ContextProvider>
    );
}
