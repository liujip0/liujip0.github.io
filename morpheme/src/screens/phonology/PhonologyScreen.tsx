import { NavBar, NavSection } from '../../common/Components.tsx';
import { StringRes } from '../../common/Resources.tsx';
import Phonemes from './Phonemes.tsx';
import PhoneticInventory from './PhoneticInventory.tsx';

export default function PhonologyScreen() {
  return (
    <>
      <NavBar
        sections={[
          { id: 'inventory', label: StringRes.phoneticinventory },
          { id: 'phonemes', label: StringRes.phonemesromanization },
          { id: 'orthography', label: StringRes.orthography },
          { id: 'phonotactics', label: StringRes.phonotactics },
        ]}
      />
      <PhoneticInventory />
      <Phonemes />

      <NavSection id="orthography">{StringRes.orthography}</NavSection>
      <NavSection id="phonotactics">{StringRes.phonotactics}</NavSection>
    </>
  );
}
