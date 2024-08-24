import { NavBar, NavSection } from '../common/Components.tsx';
import { StringRes } from '../common/Resources.tsx';

export default function TutorialScreen() {
  return (
    <>
      <NavBar
        sections={[
          { label: StringRes.navigation, id: 'tutorial-navigation' },
          { label: StringRes.phonology, id: 'tutorial-phonology' },
          { label: StringRes.articles, id: 'tutorial-articles' },
          { label: StringRes.inflections, id: 'tutorial-inflections' },
          { label: StringRes.lexicon, id: 'tutorial-lexicon' },
        ]}
      />
      <NavSection id="tutorial-navigation">{StringRes.navigation}</NavSection>
      <NavSection id="tutorial-phonology">{StringRes.phonology}</NavSection>
      <h2>Phonetic Inventory</h2>
      <h2>Phonemes &amp; Romanization</h2>
      <NavSection id="tutorial-articles">{StringRes.articles}</NavSection>
      <NavSection id="tutorial-inflections">{StringRes.inflections}</NavSection>
      <h2>Glossing Abbreviations</h2>
      <NavSection id="tutorial-lexicon">{StringRes.lexicon}</NavSection>
      <h2>Word Classes</h2>
    </>
  );
}
