import { useState } from 'react';
import { useStoreState } from '../common/Vals.tsx';

export default function LexiconScreen() {
  const [currentWord, setCurrentWord] = useState('');
  return (
    <div
      style={{
        display: 'flex',
        height: '100%'
      }}>
      <Words
        currentWord={currentWord}
        setCurrentWord={setCurrentWord}
      />
    </div>
  );
}

type WordsProps = {
  currentWord: string;
  setCurrentWord: (value: string) => void;
};
function Words({ currentWord, setCurrentWord }: WordsProps) {
  const conlang = useStoreState((s) => s.conlang);
  const alphabeticalOrder = conlang.phonology.inventory.map(
    (x) => x.romanization
  );
  return (
    <div
      style={{
        width: '12em',
        display: 'flex',
        backgroundColor: 'lightgray',
        flexDirection: 'column',
        padding: '0.5em'
      }}>
      <div
        style={{
          backgroundColor: 'white',
          marginBottom: '1em',
          display: 'flex',
          justifyContent: 'space-around'
        }}></div>
      <div
        style={{
          backgroundColor: 'white',
          flex: '1',
          overflowY: 'scroll'
        }}>
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column'
          }}>
          {conlang.lexicon.map((item) => {
            return (
              <div
                style={{
                  backgroundColor:
                    item.id === currentWord ? 'darkgray' : 'white'
                }}
                onClick={() => {
                  setCurrentWord(item.id);
                }}></div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
