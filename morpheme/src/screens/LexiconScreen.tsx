import { useState } from 'react';
import {
  TbCopy,
  TbPlus,
  TbTrash,
  TbTriangle,
  TbTriangleInverted,
} from 'react-icons/tb';
import {
  Alert,
  IconButton,
  PartOfSpeechSelect,
  Popup,
} from '../common/Components.tsx';
import {
  createId,
  partOfSpeechAbbreviation,
  romanizationToIpa,
} from '../common/Funcs.tsx';
import { Consonant, Vowel, Word } from '../common/Types.tsx';
import { useStoreState } from '../common/Vals.tsx';

export default function LexiconScreen() {
  const conlang = useStoreState((s) => s.conlang);
  const changeConlang = useStoreState((s) => s.changeConlang);
  const [currentWord, setCurrentWord] = useState('');
  const createRomanizationMap = (
    inventory: Array<Consonant | Vowel>
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
        [property]: newValue,
      });
      changeConlang(['lexicon'], newLexicon);
      sortLexicon();
    }
  };
  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
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
  const [deleteWord, setDeleteWord] = useState(false);
  const [manageClasses, setManageClasses] = useState(false);
  const getWord = (id: string) => {
    const index = conlang.lexicon.findIndex((value) => value.id === id);
    return conlang.lexicon[index];
  };
  const word = getWord(currentWord);
  const addWord = (word: Word) => {
    const id = createId(word.romanization);
    const newLexicon = conlang.lexicon;
    newLexicon.push({
      ...word,
      id: id,
    });
    changeConlang(['lexicon'], newLexicon);
    sortLexicon();
    return id;
  };
  const moveUpWord = (id: string) => {
    const index = conlang.lexicon.findIndex((value) => value.id === id);
    if (index > 0) {
      const word = conlang.lexicon[index];
      const newLexicon = conlang.lexicon;
      newLexicon.splice(index, 1);
      newLexicon.splice(index - 1, 0, word);
      changeConlang(['lexicon'], newLexicon);
    }
  };
  const moveDownWord = (id: string) => {
    const index = conlang.lexicon.findIndex((value) => value.id === id);
    if (index < conlang.lexicon.length - 1) {
      const word = conlang.lexicon[index];
      const newLexicon = conlang.lexicon;
      newLexicon.splice(index, 1);
      newLexicon.splice(index + 1, 0, word);
      changeConlang(['lexicon'], newLexicon);
    }
  };
  return (
    <div
      style={{
        width: '12em',
        display: 'flex',
        backgroundColor: 'lightgray',
        flexDirection: 'column',
        padding: '0.5em',
      }}>
      <div
        style={{
          backgroundColor: 'white',
          marginBottom: '1em',
          display: 'flex',
        }}>
        <button
          style={{
            flex: '1',
          }}
          onClick={() => {
            setManageClasses(true);
          }}>
          Manage Classes
        </button>
        {manageClasses && (
          <ManageClasses
            onClose={() => {
              setManageClasses(false);
            }}
          />
        )}
      </div>
      <div
        style={{
          backgroundColor: 'white',
          marginBottom: '1em',
          display: 'flex',
          justifyContent: 'space-around',
        }}>
        <IconButton
          onClick={() => {
            addWord({
              id: '',
              romanization: '',
              ipa: '',
              ipaOverride: false,
              definitions: [''],
              partOfSpeech: '',
              wordClass: '',
            });
          }}>
          <TbPlus size={20} />
        </IconButton>
        <IconButton
          onClick={() => {
            moveUpWord(currentWord);
          }}>
          <TbTriangle size={20} />
        </IconButton>
        <IconButton
          onClick={() => {
            moveDownWord(currentWord);
          }}>
          <TbTriangleInverted size={20} />
        </IconButton>
        <IconButton
          onClick={() => {
            setDeleteWord(true);
          }}>
          <TbTrash size={20} />
        </IconButton>
        {deleteWord && (
          <Alert
            title="Confirmation"
            description={
              'Are you sure you want to delete ' +
              word.romanization +
              ' [' +
              partOfSpeechAbbreviation(word.partOfSpeech) +
              ']? This cannot be undone.'
            }
            onDecline={() => {
              setDeleteWord(false);
            }}
            onAccept={() => {
              setDeleteWord(false);
              let newLexicon = conlang.lexicon;
              newLexicon = newLexicon.filter((x) => x.id !== currentWord);
              changeConlang(['lexicon'], newLexicon);
            }}
          />
        )}
      </div>
      <div
        style={{
          backgroundColor: 'white',
          flex: '1',
          overflowY: 'scroll',
        }}>
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
          }}>
          {conlang.lexicon.map((item) => {
            return (
              <div
                key={item.id}
                style={{
                  backgroundColor:
                    item.id === currentWord ? 'darkgray' : 'white',
                  paddingLeft: '0.3em',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setCurrentWord(item.id);
                }}>
                {item.romanization}
                &nbsp;|&nbsp;
                {item.definitions[0]}
                &nbsp;[
                {partOfSpeechAbbreviation(item.partOfSpeech)}]
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

type ManageClassesProps = {
  onClose: () => void;
};
function ManageClasses({ onClose }: ManageClassesProps) {
  const conlang = useStoreState((s) => s.conlang);
  const changeConlang = useStoreState((s) => s.changeConlang);
  const changeWordClass = (id: string, property: string, newValue: unknown) => {
    const newWordClasses = conlang.wordClasses;
    const index = newWordClasses.findIndex((x) => x.id === id);
    newWordClasses.splice(index, 1, {
      ...conlang.wordClasses[index],
      [property]: newValue,
    });
    changeConlang(['wordClasses'], newWordClasses);
  };
  return (
    <Popup onClose={onClose}>
      <div
        style={{
          flex: '1',
          overflowY: 'scroll',
        }}>
        <h1>Manage Classes</h1>
        <button
          onClick={() => {
            const newWordClasses = conlang.wordClasses;
            newWordClasses.push({
              id: createId('wordClass'),
              partOfSpeech: '',
              gloss: '',
              name: '',
            });
            changeConlang(['wordClasses'], newWordClasses);
          }}>
          New Class
        </button>
        {conlang.wordClasses.map((wordClass) => (
          <div
            key={wordClass.id}
            style={{
              width: '100%',
              border: '1px solid black',
              marginTop: '1em',
              display: 'flex',
              padding: '1em',
            }}>
            <label
              style={{
                marginRight: '1em',
              }}>
              Part of Speech
              <br />
              <PartOfSpeechSelect
                value={wordClass.partOfSpeech}
                onChange={(event) =>
                  changeWordClass(
                    wordClass.id,
                    'partOfSpeech',
                    event.currentTarget.value
                  )
                }
                disabled={wordClass.id === ''}
              />
            </label>
            <label
              style={{
                marginRight: '1em',
              }}>
              Gloss
              <br />
              <input
                type="text"
                size={8}
                value={wordClass.gloss}
                disabled={wordClass.id === ''}
              />
            </label>
            <label
              style={{
                marginRight: '1em',
              }}>
              Name
              <br />
              <input
                type="text"
                value={wordClass.name}
                disabled={wordClass.id === ''}
              />
            </label>
            <IconButton
              onClick={() => {
                if (wordClass.id !== '') {
                  let newWordClasses = conlang.wordClasses;
                  newWordClasses = newWordClasses.filter(
                    (x) => x.id !== wordClass.id
                  );
                  changeConlang(['wordClasses'], newWordClasses);
                }
              }}>
              <TbTrash
                size={20}
                style={{
                  color: wordClass.id === '' ? 'gray' : 'black',
                }}
              />
            </IconButton>
          </div>
        ))}
      </div>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '1em',
        }}>
        <button onClick={onClose}>Done</button>
      </div>
    </Popup>
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
  createRomanizationMap,
}: WordEditorProps) {
  const conlang = useStoreState((s) => s.conlang);
  const setLastInput = useStoreState((s) => s.setLastInput);
  const [deleteWord, setDeleteWord] = useState<number | null>(null);
  const word = conlang.lexicon.find((x) => x.id === currentWord);
  const id = createId('');
  return (
    <div
      style={{
        border: '1px solid black',
        margin: '1em',
        padding: '0.7em',
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'scroll',
      }}>
      {word && (
        <>
          <div
            style={{
              marginBottom: '1em',
            }}>
            <label>
              Romanization:&nbsp;
              <input
                size={40}
                value={word.romanization}
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
                id={'wordRomanization' + id}
                onFocus={() => {
                  setLastInput('wordRomanization' + id);
                }}
              />
            </label>
          </div>
          <div
            style={{
              marginBottom: '1em',
            }}>
            <label>
              IPA:&nbsp;
              <input
                size={40}
                value={word.ipa}
                disabled={!word.ipaOverride}
                onInput={(event) => {
                  changeWord('ipa', event.currentTarget.value);
                }}
                id={'wordIpa' + id}
                onFocus={() => {
                  setLastInput('wordIpa' + id);
                }}
              />
            </label>
            <div
              style={{
                fontSize: '0.8em',
              }}>
              <label>
                <input
                  type="checkbox"
                  checked={word.ipaOverride}
                  onChange={(event) => {
                    changeWord('ipaOverride', event.currentTarget.checked);
                    if (!event.currentTarget.checked) {
                      changeWord(
                        'ipa',
                        romanizationToIpa(
                          word.romanization,
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
          <div
            style={{
              marginBottom: '1em',
            }}>
            <label>
              Part of Speech:&nbsp;
              <PartOfSpeechSelect
                value={word.partOfSpeech}
                onChange={(event) => {
                  changeWord('partOfSpeech', event.currentTarget.value);
                }}
              />
            </label>
          </div>
          <div
            style={{
              marginBottom: '1em',
            }}>
            <label>
              Class:&nbsp;
              <select
                value={word.wordClass}
                onChange={(event) => {
                  changeWord('wordClass', event.currentTarget.value);
                }}>
                {conlang.wordClasses.map((wordClass) => (
                  <option value={wordClass.id}>
                    [{partOfSpeechAbbreviation(wordClass.partOfSpeech)}]&nbsp;
                    {wordClass.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div
            style={{
              marginBottom: '1em',
            }}>
            Definitions:
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid black',
                padding: '1em',
              }}>
              <button
                onClick={() => {
                  const newDefinitions = word.definitions;
                  newDefinitions.push('');
                  changeWord('definitions', newDefinitions);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: 'max-content',
                }}>
                <TbPlus size={18} />
                <div
                  style={{
                    height: 'min-content',
                  }}>
                  &nbsp;New Definition
                </div>
              </button>
              <ol
                style={{
                  margin: '0',
                  padding: '1em',
                }}>
                {word.definitions.map((item, index) => (
                  <li
                    key={index}
                    style={{
                      marginBottom: '0.5em',
                    }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                      }}>
                      <input
                        value={item}
                        onInput={(event) => {
                          const newDefinitions = word.definitions;
                          newDefinitions.splice(
                            index,
                            1,
                            event.currentTarget.value
                          );
                          changeWord('definitions', newDefinitions);
                        }}
                        style={{
                          minWidth: '20em',
                          width: '70%',
                          marginRight: '0.5em',
                        }}
                        id={'wordDefinition-' + index + id}
                        onFocus={() => {
                          setLastInput('wordDefinition-' + index + id);
                        }}
                      />
                      <IconButton
                        onClick={() => {
                          const newDefinitions = word.definitions;
                          newDefinitions.splice(index, 0, item);
                          changeWord('definitions', newDefinitions);
                        }}>
                        <TbCopy size={18} />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          if (index > 0) {
                            const newDefinitions = word.definitions;
                            newDefinitions.splice(index, 1);
                            newDefinitions.splice(index - 1, 0, item);
                            changeWord('definitions', newDefinitions);
                          }
                        }}>
                        <TbTriangle size={18} />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          if (index < word.definitions.length - 1) {
                            const newDefinitions = word.definitions;
                            newDefinitions.splice(index, 1);
                            newDefinitions.splice(index + 1, 0, item);
                            changeWord('definitions', newDefinitions);
                          }
                        }}>
                        <TbTriangleInverted size={18} />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          setDeleteWord(index);
                        }}>
                        <TbTrash size={18} />
                      </IconButton>
                      {deleteWord === index && (
                        <Alert
                          title="Confirmation"
                          description={
                            'Are you sure you want to delete the definition "' +
                            item +
                            '"? This cannot be undone.'
                          }
                          onDecline={() => {
                            setDeleteWord(null);
                          }}
                          onAccept={() => {
                            const newDefinitions = word.definitions;
                            newDefinitions.splice(index, 1);
                            changeWord('definitions', newDefinitions);
                            setDeleteWord(null);
                          }}
                        />
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
