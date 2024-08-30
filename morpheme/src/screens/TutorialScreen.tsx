import { TbSquareAsterisk, TbSquareOff, TbSquarePlus } from 'react-icons/tb';
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
      <h1
        style={{
          fontSize: '3em',
        }}>
        {StringRes.tutorial}
      </h1>
      <NavSection id="tutorial-navigation">{StringRes.navigation}</NavSection>
      <p>
        You can navigate between pages using the icons in each corner of the
        screen. The&nbsp;
        <div
          style={{
            display: 'inline-block',
            backgroundColor: 'lightgray',
            padding: '0.2em',
          }}>
          <TbSquareAsterisk />
        </div>
        &nbsp;symbol can be used to change the current page, and the&nbsp;
        <div
          style={{
            display: 'inline-block',
            backgroundColor: 'lightgray',
            padding: '0.2em',
          }}>
          <TbSquarePlus />
        </div>
        &nbsp;can be used to split-screen the application.&nbsp;
        <b>
          WARNING: Do not open two instances of the application in different
          browser tab or windows, as the changes you make in each tab/window
          will override each other.&nbsp;
        </b>
        To un-split the application, use&nbsp;
        <div
          style={{
            display: 'inline-block',
            backgroundColor: 'lightgray',
            padding: '0.2em',
          }}>
          <TbSquareOff />
        </div>
        . Clicking it will remove the screen closest to it.
      </p>
      <NavSection id="tutorial-phonology">{StringRes.phonology}</NavSection>
      <p>
        The Phonology page is where you can manage the sounds of your langauge,
        as well as how they are written.
      </p>
      <h2>Phonetic Inventory</h2>
      <p>
        Select the sounds you want by clicking on them. If you wish to have
        diacritics and/or multiple versions of the same sound, add the sound
        without diacritics and move to the next section, Phonemes &amp;
        Romanization.
      </p>
      <h2>Phonemes &amp; Romanization</h2>
      <p>
        This section is for managing phonemes as well as adding IPA diacritics.
        In addition, you can set a sound to be an allophone of another phoneme.
        Make sure to add a romanization for each phoneme, as this will be what
        you use in other screens to create words, translations, etc. If your
        orthography contains characters that may be difficult to type, you can
        add them to the Character Inserter widget using the Settings page.
      </p>
      <NavSection id="tutorial-articles">{StringRes.articles}</NavSection>
      <NavSection id="tutorial-inflections">{StringRes.inflections}</NavSection>
      <h2>Glossing Abbreviations</h2>
      <NavSection id="tutorial-lexicon">{StringRes.lexicon}</NavSection>
      <h2>Word Classes</h2>
    </>
  );
}
