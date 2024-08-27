import { useRef, useState } from 'react';
import {
  TbCopy,
  TbPlus,
  TbTrash,
  TbTriangle,
  TbTriangleInverted,
} from 'react-icons/tb';
import { IconButton } from '../common/Components.tsx';
import { createId } from '../common/Funcs.tsx';
import { StringRes } from '../common/Resources.tsx';
import { Translation } from '../common/Types.tsx';
import { useStoreState } from '../common/Vals.tsx';

export default function TranslationsScreen() {
  const conlang = useStoreState((s) => s.conlang);
  const [currentTranslation, setCurrentTranslation] =
    useState('translation-init');
  const getTranslation = (id: string) => {
    return conlang.translations.find((x) => x.id === id)!;
  };
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
      }}>
      <Translations
        currentTranslation={currentTranslation}
        setCurrentTranslation={setCurrentTranslation}
        getTranslation={getTranslation}
      />
      <TranslationEditor
        currentTranslation={currentTranslation}
        getTranslation={getTranslation}
      />
    </div>
  );
}

type TranslationsProps = {
  currentTranslation: string;
  setCurrentTranslation: (value: string) => void;
  getTranslation: (id: string) => Translation;
};
function Translations({
  currentTranslation,
  setCurrentTranslation,
  getTranslation,
}: TranslationsProps) {
  const conlang = useStoreState((s) => s.conlang);
  const changeConlang = useStoreState((s) => s.changeConlang);
  const addTranslation = (translation: Translation) => {
    const newTranslations = conlang.translations;
    const id = createId('translation');
    newTranslations.push({
      ...translation,
      id: id,
    });
    changeConlang(['translations'], newTranslations);
  };
  const moveUpTranslation = (id: string) => {
    const index = conlang.translations.findIndex((x) => x.id === id);
    if (index > 0) {
      const translation = conlang.translations[index];
      const newTranslations = conlang.translations;
      newTranslations.splice(index, 1);
      newTranslations.splice(index - 1, 0, translation);
      changeConlang(['translations'], newTranslations);
    }
  };
  const moveDownTranslation = (id: string) => {
    const index = conlang.translations.findIndex((x) => x.id === id);
    if (index < conlang.translations.length - 1) {
      const translation = conlang.translations[index];
      const newTranslations = conlang.translations;
      newTranslations.splice(index, 1);
      newTranslations.splice(index + 1, 0, translation);
      changeConlang(['translations'], newTranslations);
    }
  };
  const copyTranslation = (id: string) => {
    const newTranslations = conlang.translations;
    newTranslations.push(getTranslation(id));
    changeConlang(['translations'], newTranslations);
  };
  const deleteTranslation = (id: string) => {
    let newTranslations = conlang.translations;
    newTranslations = newTranslations.filter((x) => x.id !== id);
    changeConlang(['translations'], newTranslations);
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
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <IconButton
          onClick={() => {
            addTranslation({
              id: '',
              name: StringRes.untitled,
              english: '',
              translation: [''],
              gloss: '',
              wip: false,
              notes: '',
            });
          }}>
          <TbPlus />
        </IconButton>
        <IconButton
          onClick={() => {
            moveUpTranslation(currentTranslation);
          }}>
          <TbTriangle />
        </IconButton>
        <IconButton
          onClick={() => {
            moveDownTranslation(currentTranslation);
          }}>
          <TbTriangleInverted />
        </IconButton>
        <IconButton
          onClick={() => {
            copyTranslation(currentTranslation);
          }}>
          <TbCopy />
        </IconButton>
        <IconButton
          onClick={() => {
            deleteTranslation(currentTranslation);
          }}>
          <TbTrash />
        </IconButton>
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
          {conlang.translations.map((translation) => (
            <div
              key={translation.id}
              style={{
                backgroundColor:
                  translation.id === currentTranslation ? 'darkgray' : 'white',
                paddingLeft: '0.3em',
                cursor: 'pointer',
              }}
              onClick={() => {
                setCurrentTranslation(translation.id);
              }}>
              {translation.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

type TranslationEditorProps = {
  currentTranslation: string;
  getTranslation: (id: string) => Translation;
};
function TranslationEditor({
  currentTranslation,
  getTranslation,
}: TranslationEditorProps) {
  const conlang = useStoreState((s) => s.conlang);
  const changeConlang = useStoreState((s) => s.changeConlang);
  const setLastInput = useStoreState((s) => s.setLastInput);
  const translationRef = useRef<HTMLTextAreaElement>(null);
  const changeTranslation = (id: string, property: string, value: unknown) => {
    const newTranslations = conlang.translations;
    const index = conlang.translations.findIndex((x) => x.id === id);
    newTranslations.splice(index, 1, {
      ...conlang.translations[index],
      [property]: value,
    });
    changeConlang(['translations'], newTranslations);
  };
  const translation = getTranslation(currentTranslation);
  const id = createId('translationName');
  return (
    <div
      style={{
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
      }}>
      <div
        style={{
          width: '100%',
          textAlign: 'center',
          padding: '1em',
        }}>
        <label>
          {StringRes.name.b}&nbsp;
          <input
            type="text"
            size={30}
            value={translation.name}
            onInput={(event) => {
              changeTranslation(
                translation.id,
                'name',
                event.currentTarget.value
              );
            }}
            id={id}
            onFocus={() => {
              setLastInput(id);
            }}
          />
        </label>
      </div>
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
        <label
          style={{
            marginBottom: '1em',
          }}>
          English
          <br />
          <textarea
            style={{
              width: '100%',
            }}
            onInput={(event) => {
              changeTranslation(
                currentTranslation,
                'english',
                event.currentTarget.value
              );
            }}
          />
        </label>
        <label
          style={{
            marginBottom: '1em',
          }}>
          Translation
          <br />
          <textarea
            style={{
              width: '100%',
            }}
            ref={translationRef}
            // defaultValue={getTranslation(currentTranslation)
            //   .translation.filter((x) => !'.-=|'.includes(x))
            //   .join('')}
            onKeyDown={(event) => {
              console.log(event.key);
              switch (event.key) {
                case 'Backspace': {
                  if (translationRef.current) {
                    const index = translationRef.current.selectionEnd;
                    const newTranslation =
                      getTranslation(currentTranslation).translation;
                    let x = 0;
                    console.log(index);
                    for (let i = 0; i < newTranslation.length; i++) {
                      console.log('i:' + i);
                      if ('.-=|'.includes(newTranslation[i])) {
                        continue;
                      }
                      if (x > index) {
                        console.log('break');
                        break;
                      }
                      for (let j = 0; j < newTranslation[i].length + 1; j++) {
                        console.log('j:' + j);
                        if (x < index) {
                          console.log('continue');
                          x++;
                          continue;
                        }
                        console.log(j);
                        console.log(newTranslation[i].slice(0, j - 1));
                        console.log(
                          newTranslation[i].slice(j, newTranslation[i].length)
                        );
                        newTranslation[i] =
                          newTranslation[i].slice(0, j - 1) +
                          newTranslation[i].slice(j, newTranslation[i].length);
                        break;
                      }
                    }
                    changeTranslation(
                      currentTranslation,
                      'translation',
                      newTranslation
                    );
                  }
                  break;
                }
                default: {
                  if (
                    translationRef.current &&
                    event.key.length === 1 &&
                    !event.metaKey &&
                    !event.altKey &&
                    !event.ctrlKey
                  ) {
                    const index = translationRef.current.selectionEnd;
                    const newTranslation =
                      getTranslation(currentTranslation).translation;
                    let x = 0;
                    for (let i = 0; i < newTranslation.length; i++) {
                      if (
                        '.-=|'.includes(newTranslation[i]) &&
                        newTranslation[i] !== ''
                      ) {
                        continue;
                      }
                      if (x > index) {
                        break;
                      }
                      for (let j = 0; j < newTranslation[i].length + 1; j++) {
                        if (x < index) {
                          x++;
                          continue;
                        }
                        newTranslation[i] =
                          newTranslation[i].slice(0, j) +
                          event.key +
                          newTranslation[i].slice(j, -1);
                        break;
                      }
                    }
                    changeTranslation(
                      currentTranslation,
                      'translation',
                      newTranslation
                    );
                  }
                  break;
                }
              }
              console.log(getTranslation(currentTranslation).translation);
            }}
          />
        </label>
        <div>
          Gloss
          <div>
            {getTranslation(currentTranslation).translation.map(
              (chars, index) => {
                if ('.-'.includes(chars)) {
                  return (
                    <div
                      key={index}
                      style={{
                        color: 'blue',
                        display: 'inline',
                      }}>
                      {chars}
                    </div>
                  );
                } else {
                  return (
                    <span key={index}>
                      {chars.split('').map((char, charIndex) => (
                        <span
                          key={charIndex}
                          onClick={() => {
                            const newTranslation =
                              getTranslation(currentTranslation).translation;
                            let x = 0;
                            for (let i = 0; i < newTranslation.length; i++) {
                              if (
                                '.-=|'.includes(newTranslation[i]) &&
                                newTranslation[i] !== ''
                              ) {
                                continue;
                              }
                              if (x > index) {
                                break;
                              }
                              for (
                                let j = 0;
                                j < newTranslation[i].length + 1;
                                j++
                              ) {
                                if (x < index) {
                                  x++;
                                  continue;
                                }
                                newTranslation.splice(
                                  i,
                                  1,
                                  newTranslation[i].slice(0, j),
                                  '',
                                  newTranslation[i].slice(j, -1)
                                );
                                newTranslation[i] =
                                  newTranslation[i].slice(0, j) +
                                  newTranslation[i].slice(j, -1);
                                break;
                              }
                            }
                            changeTranslation(
                              currentTranslation,
                              'translation',
                              newTranslation
                            );
                          }}>
                          {char}
                        </span>
                      ))}
                    </span>
                  );
                }
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
