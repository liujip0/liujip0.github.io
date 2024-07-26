import React, { useState } from 'react';
import { TbGripVertical } from 'react-icons/tb';
import { NavBar, NavSection } from '../common/Components.tsx';
import { createId } from '../common/Funcs.tsx';
import { Declension, PartOfSpeech } from '../common/Types.tsx';
import { useStoreState } from '../common/Vals.tsx';

export default function DeclensionsScreen() {
  return (
    <>
      <NavBar
        sections={[
          { id: 'NDeclensions', label: 'Nouns' },
          { id: 'VDeclensions', label: 'Verbs' },
          { id: 'AdjDeclensions', label: 'Adjectives' },
          { id: 'AdvDeclensions', label: 'Adverbs' },
          { id: 'PronDeclensions', label: 'Pronouns' },
          { id: 'PropNDeclensions', label: 'Proper Nouns' },
          { id: 'PtclDeclensions', label: 'Particles' },
          { id: 'AdpDeclensions', label: 'Adpositions' },
          { id: 'ConjDeclensions', label: 'Conjugations' }
        ]}
      />
      <NavSection id="NDeclensions">Nouns</NavSection>
      <Declensions partOfSpeech="noun" />
      <NavSection id="VDeclensions">Verbs</NavSection>
      <NavSection id="AdjDeclensions">Adjectives</NavSection>
      <NavSection id="AdvDeclensions">Adverbs</NavSection>
      <NavSection id="PronDeclensions">Pronouns</NavSection>
      <NavSection id="PropNDeclensions">Proper Nouns</NavSection>
      <NavSection id="PtclDeclensions">Particles</NavSection>
      <NavSection id="AdpDeclensions">Adpositions</NavSection>
      <NavSection id="ConjDeclensions">Conjugations</NavSection>
    </>
  );
}

type DeclensionsProps = {
  partOfSpeech: PartOfSpeech;
};
function Declensions({ partOfSpeech }: DeclensionsProps) {
  const conlang = useStoreState((s) => s.conlang);
  const changeConlang = useStoreState((s) => s.changeConlang);
  const [dragging, setDragging] = useState<string | null>(null);
  const handleDragStart = (
    event: React.DragEvent<HTMLLIElement>,
    declension: string
  ) => {
    setDragging(declension);
    event.dataTransfer.setData('text/plain', '');
  };
  const handleDragEnd = (event: React.DragEvent<HTMLLIElement>) => {
    setDragging(null);
    event.currentTarget.draggable = false;
  };
  const handleDragOver = (event: React.DragEvent<HTMLLIElement>) => {
    event.preventDefault();
  };
  const handleDrop = (targetItem: string) => {
    if (!dragging) return;
    const currentIndex = conlang.declensions[partOfSpeech].findIndex((x) =>
      x === '_' ? x === dragging : x.id === dragging
    );
    const targetIndex = conlang.declensions[partOfSpeech].findIndex((x) =>
      x === '_' ? x === targetItem : x.id === targetItem
    );
    if (currentIndex !== -1 && targetIndex !== -1) {
      const newDeclensions = conlang.declensions[partOfSpeech];
      const draggedItem = newDeclensions[currentIndex];
      newDeclensions.splice(currentIndex, 1);
      newDeclensions.splice(targetIndex, 0, draggedItem);
      changeConlang(['declensions', partOfSpeech], newDeclensions);
    }
  };
  const changeDeclension = (id: string, property: string, value: unknown) => {
    const newDeclensions = conlang.declensions[partOfSpeech];
    const index = newDeclensions.findIndex((x) =>
      x === '_' ? false : x.id === id
    );
    const declension = newDeclensions[index] as Declension;
    newDeclensions.splice(index, 1, { ...declension, [property]: value });
    changeConlang(['declensions', partOfSpeech], newDeclensions);
  };
  return (
    <>
      <button
        onClick={() => {
          const newDeclensions = conlang.declensions[partOfSpeech];
          newDeclensions.push({
            id: createId('declension'),
            name: '',
            affix: [],
            gloss: []
          });
          changeConlang(['declensions'], {
            ...conlang.declensions,
            [partOfSpeech]: newDeclensions
          });
          console.log(newDeclensions);
        }}>
        Add Declension
      </button>
      <ul
        style={{
          listStyleType: 'none',
          listStylePosition: 'outside',
          padding: '0'
        }}>
        {conlang.declensions[partOfSpeech].map((item) => {
          if (item === '_') {
            return (
              <li
                key={'_'}
                onDragStart={(event) => {
                  handleDragStart(event, '_');
                }}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop('_')}
                style={{
                  border: '1px solid black',
                  padding: '0.3em',
                  marginBottom: '0.1em',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                <div
                  onMouseDown={(event) => {
                    const parentLi = event.currentTarget.parentElement;
                    if (parentLi) {
                      parentLi.draggable = true;
                    }
                  }}
                  onMouseUp={(event) => {
                    const parentLi = event.currentTarget.parentElement;
                    if (parentLi) {
                      parentLi.draggable = false;
                    }
                  }}>
                  <TbGripVertical
                    size={20}
                    style={{
                      marginRight: '0.5em'
                    }}
                  />
                </div>
                <div>Root Word</div>
              </li>
            );
          } else {
            return (
              <li
                key={item.id}
                onDragStart={(event) => {
                  handleDragStart(event, item.id);
                }}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(item.id)}
                style={{
                  border: '1px solid black',
                  padding: '0.3em',
                  marginBottom: '0.1em',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                <div
                  onMouseDown={(event) => {
                    const parentLi = event.currentTarget.parentElement;
                    if (parentLi) {
                      parentLi.draggable = true;
                    }
                  }}
                  onMouseUp={(event) => {
                    const parentLi = event.currentTarget.parentElement;
                    if (parentLi) {
                      parentLi.draggable = false;
                    }
                  }}>
                  <TbGripVertical
                    size={20}
                    style={{
                      marginRight: '0.5em'
                    }}
                  />
                </div>
                <table>
                  <tr>
                    <td colSpan={Math.max(1, item.affix.length)}>
                      Name:{' '}
                      <input
                        value={item.name}
                        onInput={(event) => {
                          changeDeclension(
                            item.id,
                            'name',
                            event.currentTarget.value
                          );
                        }}
                        style={{
                          width: '70%'
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    {item.gloss.map((gloss) => (
                      <td>{gloss}</td>
                    ))}
                  </tr>
                </table>
              </li>
            );
          }
        })}
      </ul>
    </>
  );
}
