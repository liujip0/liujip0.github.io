import {NavBar, NavSection} from '../../common/CommonFuncs.tsx';
import PhoneticInventory from './PhoneticInventory.tsx';

export default function PhonologyScreen() {
    return (
        <>
            <NavBar
                sections={[
                    {id: 'inventory', label: 'Phonetic Inventory'},
                    {id: 'phonemes', label: 'Phonemes'},
                    {id: 'orthography', label: 'Orthography & Romanization'},
                    {id: 'phonotactics', label: 'Phonotactics'}
                ]}
            />
            <PhoneticInventory />

            <NavSection id="orthography">
                Orthography &amp; Romanization
            </NavSection>
            <NavSection id="phonotactics">Phonotactics</NavSection>
        </>
    );
}
