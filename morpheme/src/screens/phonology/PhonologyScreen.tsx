import { NavBar, NavSection } from '../../common/Components.tsx';
import Phonemes from './Phonemes.tsx';
import PhoneticInventory from './PhoneticInventory.tsx';

export default function PhonologyScreen() {
  return (
    <>
      <NavBar
        sections={[
          { id: 'inventory', label: 'Phonetic Inventory' },
          { id: 'phonemes', label: 'Phonemes & Romanization' },
          { id: 'orthography', label: 'Orthography' },
          { id: 'phonotactics', label: 'Phonotactics' }
        ]}
      />
      <PhoneticInventory />
      <Phonemes />

      <NavSection id="orthography">Orthography</NavSection>
      <NavSection id="phonotactics">Phonotactics</NavSection>
    </>
  );
}
