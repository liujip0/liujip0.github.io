import ScreensMenus from './ScreensMenus.tsx';
import { screenPosition } from './common/Types.tsx';
import { useStoreState } from './common/Vals.tsx';
import InflectionsScreen from './screens/InflectionsScreen.tsx';
import LexiconScreen from './screens/LexiconScreen.tsx';
import SettingsScreen from './screens/SettingsScreen.tsx';
import StartScreen from './screens/StartScreen.tsx';
import TranslationsScreen from './screens/TranslationsScreen.tsx';
import TutorialScreen from './screens/TutorialScreen.tsx';
import { ArticlesScreen } from './screens/articles/ArticlesScreen.tsx';
import PhonologyScreen from './screens/phonology/PhonologyScreen.tsx';

export default function ScreensLayout() {
  const windows = useStoreState((s) => s.windows);
  return (
    <>
      <ScreensMenus />

      <Screen
        position={0}
        location={{
          gridRowStart: 'a0',
          gridRowEnd: windows[0] === windows[2] ? 'a2' : 'a0',
          gridColumnStart: 'a0',
          gridColumnEnd: windows[0] === windows[1] ? 'a1' : 'a0',
        }}
      />

      {windows[0] !== windows[1] && (
        <Screen
          position={1}
          location={{
            gridRowStart: 'a1',
            gridRowEnd: windows[1] === windows[3] ? 'a3' : 'a1',
            gridColumnStart: 'a1',
            gridColumnEnd: 'a1',
          }}
        />
      )}

      {windows[0] !== windows[2] && (
        <Screen
          position={2}
          location={{
            gridRowStart: 'a2',
            gridRowEnd: 'a2',
            gridColumnStart: 'a2',
            gridColumnEnd: windows[2] === windows[3] ? 'a3' : 'a2',
          }}
        />
      )}

      {windows[1] !== windows[3] && windows[2] !== windows[3] && (
        <Screen
          position={3}
          location={{
            gridRowStart: 'a3',
            gridRowEnd: 'a3',
            gridColumnStart: 'a3',
            gridColumnEnd: 'a3',
          }}
        />
      )}
    </>
  );
}

type ScreenProps = {
  location: Record<string, string>;
  position: screenPosition;
};
function Screen({ location, position }: ScreenProps) {
  const windows = useStoreState((s) => s.windows);
  return (
    <div
      style={{
        ...location,
        padding: '0.5em 2em',
        overflow: 'scroll',
        backgroundColor: 'white',
      }}>
      {(() => {
        switch (windows[position].split('-')[0]) {
          case 'start':
            return <StartScreen />;
          case 'tutorial':
            return <TutorialScreen />;
          case 'phonology':
            return <PhonologyScreen />;
          case 'articles':
            return <ArticlesScreen />;
          case 'declensions':
            return <InflectionsScreen />;
          case 'lexicon':
            return <LexiconScreen />;
          case 'translations':
            return <TranslationsScreen />;
          case 'settings':
            return <SettingsScreen />;
        }
      })()}
    </div>
  );
}
