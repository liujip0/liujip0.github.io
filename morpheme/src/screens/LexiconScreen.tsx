import { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { IconButton } from '../common/Components.tsx';
import { romanizationToIpa } from '../common/Funcs.tsx';
import { Phoneme, Word } from '../common/Types.tsx';
import { useStoreState } from '../common/Vals.tsx';

export default function LexiconScreen() {
  const conlang = useStoreState((s) => s.conlang);
  const changeConlang = useStoreState((s) => s.changeConlang);
  const [currentWord, setCurrentWord] = useState('');
  const createRomanizationMap = (
    inventory: Array<Phoneme>
  ): Array<[string, string]> => {
    const mappingArr: Array<[string, string]> = [];
    for (let i = 0; i < inventory.length; i++) {
      mappingArr.push([inventory[i].romanization, inventory[i].ipa]);
    }
    mappingArr.sort((a, b) => b.length - a.length);
    return mappingArr;
  };
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
      />
      <WordEditor
        currentWord={currentWord}
        changeWord={(property, newValue) => {
          changeWord(currentWord, property, newValue);
        }}
        createRomanizationMap={() => {
          return createRomanizationMap(conlang.phonology.inventory);
        }}
      />
    </div>
  );
}

type WordsProps = {
  currentWord: string;
  setCurrentWord: (value: string) => void;
  sortLexicon: () => void;
};
function Words({ currentWord, setCurrentWord, sortLexicon }: WordsProps) {
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
              romanization: '',
              ipa: '',
              ipaOverride: false,
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
                key={item.id}
                style={{
                  backgroundColor:
                    item.id === currentWord ? 'darkgray' : 'white',
                  paddingLeft: '0.3em'
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

type WordEditorProps = {
  currentWord: string;
  changeWord: (property: string, newValue: unknown) => void;
  createRomanizationMap: () => Array<[string, string]>;
};
function WordEditor({
  currentWord,
  changeWord,
  createRomanizationMap
}: WordEditorProps) {
  const conlang = useStoreState((s) => s.conlang);
  const word = conlang.lexicon.find((x) => x.id === currentWord);
  return (
    <div
      style={{
        border: '1px solid black',
        margin: '1em',
        padding: '0.7em',
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'scroll'
      }}>
      {currentWord && (
        <>
          <div
            style={{
              marginBottom: '1em'
            }}>
            <label>
              Romanization:&nbsp;
              <input
                size={40}
                value={word!.romanization}
                onChange={(event) => {
                  changeWord('romanization', event.currentTarget.value);
                  changeWord(
                    'ipa',
                    romanizationToIpa(
                      event.currentTarget.value,
                      createRomanizationMap()
                    )
                  );
                }}
              />
            </label>
          </div>
          <div
            style={{
              marginBottom: '1em'
            }}>
            <label>
              IPA:&nbsp;
              <input
                size={40}
                value={word!.ipa}
                disabled={!word!.ipaOverride}
                onInput={(event) => {
                  changeWord('ipa', event.currentTarget.value);
                }}
              />
            </label>
            <div
              style={{
                fontSize: '0.8em'
              }}>
              <label>
                <input
                  type="checkbox"
                  checked={word!.ipaOverride}
                  onChange={(event) => {
                    changeWord('ipaOverride', event.currentTarget.checked);
                    if (!event.currentTarget.checked) {
                      changeWord(
                        'ipa',
                        romanizationToIpa(
                          word!.romanization,
                          createRomanizationMap()
                        )
                      );
                    }
                  }}
                />
                Override autogeneration
              </label>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
