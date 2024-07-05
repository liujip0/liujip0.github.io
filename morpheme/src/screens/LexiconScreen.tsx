import { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { IconButton } from '../common/Components.tsx';
import { Word } from '../common/Types.tsx';
import { useStoreState } from '../common/Vals.tsx';

export default function LexiconScreen() {
  const conlang = useStoreState((s) => s.conlang);
  const changeConlang = useStoreState((s) => s.changeConlang);
  const [currentWord, setCurrentWord] = useState('');
  const createAlphabetMap = (
    alphabetArray: Array<string>
  ): Map<string, number> => {
    const alphabetMap = new Map();
    for (let i = 0; i < alphabetArray.length; i++) {
      alphabetMap.set(alphabetArray[i], i);
    }
    return alphabetMap;
  };
  const sortLexicon = () => {
    const newLexicon = conlang.lexicon;
    newLexicon.sort((a, b) => {
      let indexA, indexB;
      let i = 0,
        j = 0;
      while (i < a.romanization.length && j < b.romanization.length) {
        let foundA = false,
          foundB = false;
        let maxKeyLength = 1;
        for (const [key, value] of createAlphabetMap(
          conlang.phonology.inventory.map((x) => x.romanization)
        ).entries()) {
          if (a.romanization.startsWith(key, i)) {
            indexA = value;
            foundA = true;
            maxKeyLength = key.length;
          }
          if (b.romanization.startsWith(key, j)) {
            indexB = value;
            foundB = true;
            maxKeyLength = Math.max(maxKeyLength, key.length);
          }
          if (foundA && foundB) break;
        }
        if (!foundA) indexA = -1;
        if (!foundB) indexB = -1;
        if (indexA !== indexB) {
          return indexA! - indexB!;
        }
        i += maxKeyLength;
        j += maxKeyLength;
      }
      return a.romanization.length - b.romanization.length;
    });
    changeConlang(['lexicon'], newLexicon);
  };
  const changeWord = (id: string, property: string, newValue: unknown) => {
    const index = conlang.lexicon.findIndex((value) => value.id === id);
    const newLexicon = conlang.lexicon;
    if (index !== -1) {
      newLexicon.splice(index, 1, {
        ...conlang.lexicon[index],
        [property]: newValue
      });
      changeConlang(['lexicon'], newLexicon);
      sortLexicon();
    }
  };
  return (
    <div
      style={{
        display: 'flex',
        height: '100%'
      }}>
      <Words
        currentWord={currentWord}
        setCurrentWord={setCurrentWord}
        sortLexicon={sortLexicon}
        changeWord={changeWord}
      />
    </div>
  );
}

type WordsProps = {
  currentWord: string;
  setCurrentWord: (value: string) => void;
  sortLexicon: () => void;
  changeWord: (id: string, property: string, newValue: unknown) => void;
};
function Words({
  currentWord,
  setCurrentWord,
  sortLexicon,
  changeWord
}: WordsProps) {
  const conlang = useStoreState((s) => s.conlang);
  const changeConlang = useStoreState((s) => s.changeConlang);
  const addWord = (word: Word) => {
    const datetime = new Date();
    const id =
      word.romanization +
      '-' +
      datetime.getHours() +
      '-' +
      datetime.getMinutes() +
      '-' +
      datetime.getSeconds() +
      '-' +
      datetime.getMilliseconds();
    const newLexicon = conlang.lexicon;
    newLexicon.push({
      ...word,
      id: id
    });
    changeConlang(['lexicon'], newLexicon);
    sortLexicon();
    return id;
  };
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
        }}>
        <IconButton
          onClick={() => {
            addWord({
              id: '',
              romanization: 'test',
              ipa: '',
              definition: [''],
              partOfSpeech: ''
            });
          }}>
          <MdAdd />
        </IconButton>
      </div>
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
                }}>
                {item.romanization}
                &nbsp;|&nbsp;
                {item.definition[0]}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
