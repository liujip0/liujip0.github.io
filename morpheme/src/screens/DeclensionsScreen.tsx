import { useState } from 'react';
import { TbCopy, TbGripVertical, TbPlus, TbTrash } from 'react-icons/tb';
import {
  GlossingAbbreviations,
  IconButton,
  NavBar,
  NavSection,
} from '../common/Components.tsx';
import { createId } from '../common/Funcs.tsx';
import { Gloss } from '../common/Gloss.tsx';
import { Affix, Declension, PartOfSpeech } from '../common/Types.tsx';
import { useStoreState } from '../common/Vals.tsx';

export default function DeclensionsScreen() {
  const conlang = useStoreState((s) => s.conlang);
  const changeConlang = useStoreState((s) => s.changeConlang);
  const [glossingAbbreviations, setGlossingAbbreviations] = useState(false);
  const [propNConf, setPropNConf] = useState(false);
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
          { id: 'ConjDeclensions', label: 'Conjugations' },
        ]}
        custom={
          <button
            style={{
              marginLeft: 'auto',
              fontSize: '1.2em',
            }}
            onClick={() => {
              setGlossingAbbreviations(true);
            }}>
            Glossing Abbreviations
          </button>
        }
      />
      {glossingAbbreviations && (
        <GlossingAbbreviations
          onClose={() => {
            setGlossingAbbreviations(false);
          }}
        />
      )}
      <NavSection id="NDeclensions">Nouns</NavSection>
      <Declensions partOfSpeech="noun" />
      <NavSection id="VDeclensions">Verbs</NavSection>
      <Declensions partOfSpeech="verb" />
      <NavSection id="AdjDeclensions">Adjectives</NavSection>
      <Declensions partOfSpeech="adjective" />
      <NavSection id="AdvDeclensions">Adverbs</NavSection>
      <Declensions partOfSpeech="adverb" />
      <NavSection id="PronDeclensions">Pronouns</NavSection>
      <Pronouns />
      <NavSection id="PropNDeclensions">Proper Nouns</NavSection>
      {!propNConf ?
        <label>
          <input
            type="checkbox"
            checked={conlang.declensions.properNounEqualsNoun}
            onChange={(event) => {
              if (event.currentTarget.checked) {
                setPropNConf(true);
              } else {
                changeConlang(
                  ['declensions', 'properNounEqualsNoun'],
                  event.currentTarget.checked
                );
              }
            }}
          />
          Use the same declensions as nouns
        </label>
      : <div>
          Are you sure? You will lose your currently saved declensions.
          <button
            onClick={() => {
              changeConlang(['declensions', 'properNounEqualsNoun'], true);
              changeConlang(
                ['declensions', 'list', 'proper noun'],
                conlang.declensions.list.noun
              );
            }}>
            Yes
          </button>
          <button>Cancel</button>
        </div>
      }
      <br />
      <br />
      {!conlang.declensions.properNounEqualsNoun ?
        <Declensions partOfSpeech="proper noun" />
      : <></>}
      <NavSection id="PtclDeclensions">Particles</NavSection>
      <Declensions partOfSpeech="particle" />
      <NavSection id="AdpDeclensions">Adpositions</NavSection>
      <Declensions partOfSpeech="adposition" />
      <NavSection id="ConjDeclensions">Conjunctions</NavSection>
      <Declensions partOfSpeech="conjunction" />
    </>
  );
}

function Pronouns() {
  return (
    <>
      <button>Add Table</button>
    </>
  );
}

type DeclensionsProps = {
  partOfSpeech: PartOfSpeech;
};
function Declensions({ partOfSpeech }: DeclensionsProps) {
  const conlang = useStoreState((s) => s.conlang);
  console.log(partOfSpeech);
  console.log(
    conlang.declensions.list[
      partOfSpeech as keyof typeof conlang.declensions.list
    ]
  );
  return (
    <>
      <button
        style={{
          marginBottom: '1em',
        }}>
        Add Declension
      </button>
      {conlang.declensions.list[
        partOfSpeech as keyof typeof conlang.declensions.list
      ].map((declension, declensionNumber) => (
        <div
          key={declension.id}
          style={{
            border: '1px solid black',
            padding: '1em',
          }}>
          <Affixes
            partOfSpeech={partOfSpeech}
            declensionNumber={declensionNumber}
          />
        </div>
      ))}
    </>
  );
}

type AffixesProps = {
  partOfSpeech: PartOfSpeech;
  declensionNumber: number;
};
function Affixes({ partOfSpeech, declensionNumber }: AffixesProps) {
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
    const currentIndex = (
      conlang.declensions.list[
        partOfSpeech as keyof typeof conlang.declensions.list
      ] as Array<Declension>
    )[declensionNumber].affixes.findIndex((x) =>
      x === '_' ? x === dragging : x.id === dragging
    );
    const targetIndex = (
      conlang.declensions.list[
        partOfSpeech as keyof typeof conlang.declensions.list
      ] as Array<Declension>
    )[declensionNumber].affixes.findIndex((x) =>
      x === '_' ? x === targetItem : x.id === targetItem
    );
    if (currentIndex !== -1 && targetIndex !== -1) {
      const newDeclensions = conlang.declensions.list[
        partOfSpeech as keyof typeof conlang.declensions.list
      ] as Array<Declension>;
      const newAffixes = newDeclensions[declensionNumber].affixes;
      const draggedItem = newAffixes[currentIndex];
      newAffixes.splice(currentIndex, 1);
      newAffixes.splice(targetIndex, 0, draggedItem as Affix | '_');
      newDeclensions.splice(declensionNumber, 1, {
        ...newDeclensions[declensionNumber],
        affixes: newAffixes,
      });
      changeConlang(['declensions', 'list', partOfSpeech], newDeclensions);
    }
  };
  const changeDeclension = (id: string, property: string, value: unknown) => {
    const newDeclensions = conlang.declensions.list[
      partOfSpeech as keyof typeof conlang.declensions.list
    ] as Array<Declension>;
    const newAffixes = newDeclensions[declensionNumber].affixes;
    const index = newAffixes.findIndex((x) =>
      x === '_' ? false : x.id === id
    );
    const declension = newAffixes[index] as Affix;
    newAffixes.splice(index, 1, { ...declension, [property]: value });
    newDeclensions.splice(declensionNumber, 1, {
      ...newDeclensions[declensionNumber],
      affixes: newAffixes,
    });
    changeConlang(['declensions', 'list', partOfSpeech], newDeclensions);
    if (partOfSpeech === 'noun' && conlang.declensions.properNounEqualsNoun) {
      changeConlang(['declensions', 'list', 'proper noun'], newDeclensions);
    }
  };
  console.log(conlang.declensions.list);
  return (
    <>
      <button
        onClick={() => {
          const newDeclensions = conlang.declensions.list[
            partOfSpeech as keyof typeof conlang.declensions.list
          ] as Array<Declension>;
          const newAffixes = newDeclensions[declensionNumber].affixes;
          newAffixes.push({
            id: createId('declension'),
            type: 'declension',
            name: '',
            affix: [],
            gloss: [],
          });
          newDeclensions.splice(declensionNumber, 1, {
            ...newDeclensions[declensionNumber],
            affixes: newAffixes,
          });
          changeConlang(['declensions', 'list'], {
            ...conlang.declensions.list,
            [partOfSpeech]: newDeclensions,
          });
          console.log(newDeclensions);
        }}>
        Add Affix
      </button>
      <ul
        style={{
          listStyleType: 'none',
          listStylePosition: 'outside',
          padding: '0',
        }}>
        {(
          conlang.declensions.list[
            partOfSpeech as keyof typeof conlang.declensions.list
          ] as Array<Declension>
        )[declensionNumber].affixes.map((affix) => {
          if (affix === '_') {
            return (
              <RootWord
                key={'_'}
                handleDragStart={handleDragStart}
                handleDragEnd={handleDragEnd}
                handleDragOver={handleDragOver}
                handleDrop={handleDrop}
              />
            );
          } else {
            return (
              <AffixLi
                key={affix.id}
                declension={affix as Affix}
                changeAffix={(property, value) => {
                  changeDeclension(affix.id, property, value);
                }}
                deleteAffix={() => {
                  const newDeclensions = conlang.declensions.list[
                    partOfSpeech as keyof typeof conlang.declensions.list
                  ] as Array<Declension>;
                  let newAffixes = newDeclensions[declensionNumber].affixes;
                  newAffixes = newAffixes.filter((x) =>
                    x === '_' ? true : x.id !== affix.id
                  ) as Array<Affix | '_'>;
                  newDeclensions.splice(declensionNumber, 1, {
                    ...newDeclensions[declensionNumber],
                    affixes: newAffixes,
                  });
                  changeConlang(
                    ['declensions', 'list', partOfSpeech],
                    newDeclensions
                  );
                  if (
                    partOfSpeech === 'noun' &&
                    conlang.declensions.properNounEqualsNoun
                  ) {
                    changeConlang(
                      ['declensions', 'list', 'proper noun'],
                      newDeclensions
                    );
                  }
                }}
                handleDragStart={handleDragStart}
                handleDragEnd={handleDragEnd}
                handleDragOver={handleDragOver}
                handleDrop={handleDrop}
              />
            );
          }
        })}
      </ul>
    </>
  );
}

type AffixLiProps = {
  declension: Affix;
  changeAffix: (property: string, value: unknown) => void;
  deleteAffix: () => void;
  handleDragStart: (
    event: React.DragEvent<HTMLLIElement>,
    declension: string
  ) => void;
  handleDragEnd: (event: React.DragEvent<HTMLLIElement>) => void;
  handleDragOver: (event: React.DragEvent<HTMLLIElement>) => void;
  handleDrop: (targetItem: string) => void;
};
function AffixLi({
  declension,
  changeAffix,
  deleteAffix,
  handleDragStart,
  handleDragEnd,
  handleDragOver,
  handleDrop,
}: AffixLiProps) {
  return (
    <li
      onDragStart={(event) => {
        handleDragStart(event, declension.id);
      }}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={() => handleDrop(declension.id)}
      style={{
        border: '1px solid black',
        padding: '0.3em',
        marginBottom: '0.1em',
        display: 'flex',
        alignItems: 'center',
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
            marginRight: '0.5em',
          }}
        />
      </div>
      <div
        style={{
          overflowX: 'scroll',
          flex: '1',
        }}>
        <table
          style={{
            width: 'max-content',
          }}>
          <tr>
            <td
              colSpan={declension.affix.length + 1}
              style={{
                padding: '0.5em',
              }}>
              Name:&nbsp;
              <input
                value={declension.name}
                onInput={(event) => {
                  changeAffix('name', event.currentTarget.value);
                }}
                style={{
                  width: '70%',
                  maxWidth: '40em',
                }}
              />
            </td>
          </tr>
          <tr>
            {declension.gloss.map((gloss, index) => (
              <td
                style={{
                  padding: '0.5em',
                }}>
                {gloss.map((x, xIndex) => (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}>
                    <select
                      value={x}
                      onChange={(event) => {
                        const newGloss = declension.gloss;
                        const newX = gloss;
                        newX.splice(xIndex, 1, event.currentTarget.value);
                        newGloss.splice(index, 1, newX);
                        changeAffix('gloss', newGloss);
                      }}
                      style={{
                        width: '80%',
                      }}>
                      <option value={''}>-</option>
                      {Object.keys(Gloss).map((key) => (
                        <option
                          value={key}
                          key={key}>
                          {key}
                        </option>
                      ))}
                    </select>
                    <IconButton
                      onClick={() => {
                        const newGloss = declension.gloss;
                        const newX = gloss;
                        newX.splice(xIndex, 1);
                        newGloss.splice(index, 1, newX);
                        changeAffix('gloss', newGloss);
                      }}>
                      <TbTrash size={17} />
                    </IconButton>
                  </div>
                ))}
                <button
                  onClick={() => {
                    const newGloss = declension.gloss;
                    newGloss.splice(index, 1, [...gloss, '']);
                    changeAffix('gloss', newGloss);
                  }}>
                  Add Gloss
                </button>
              </td>
            ))}
            <td rowSpan={3}>
              <IconButton
                onClick={() => {
                  changeAffix('affix', [...declension.affix, '']);
                  changeAffix('gloss', [...declension.gloss, ['']]);
                }}>
                <TbPlus size={20} />
              </IconButton>
            </td>
          </tr>
          <tr>
            {declension.affix.map((affix, index) => (
              <td
                style={{
                  padding: '0.5em',
                }}>
                <input
                  value={affix}
                  onInput={(event) => {
                    const newAffix = declension.affix;
                    newAffix.splice(index, 1, event.currentTarget.value);
                    changeAffix('affix', newAffix);
                  }}
                  style={{
                    width: '100%',
                  }}
                />
              </td>
            ))}
          </tr>
          <tr>
            {declension.affix.map((_affix, index) => (
              <td>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    height: '100%',
                    width: '100%',
                  }}>
                  <IconButton
                    onClick={() => {
                      const newAffix = declension.affix;
                      newAffix.splice(index, 0, declension.affix[index]);
                      changeAffix('affix', newAffix);
                      const newGloss = declension.gloss;
                      newGloss.splice(index, 0, declension.gloss[index]);
                      changeAffix('gloss', newGloss);
                    }}>
                    <TbCopy size={18} />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      const newAffix = declension.affix;
                      newAffix.splice(index, 1);
                      changeAffix('affix', newAffix);
                      const newGloss = declension.gloss;
                      newGloss.splice(index, 1);
                      changeAffix('gloss', newGloss);
                    }}>
                    <TbTrash size={18} />
                  </IconButton>
                </div>
              </td>
            ))}
          </tr>
        </table>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}>
        <IconButton onClick={deleteAffix}>
          <TbTrash size={20} />
        </IconButton>
      </div>
    </li>
  );
}

type RootWordProps = {
  handleDragStart: (
    event: React.DragEvent<HTMLLIElement>,
    declension: string
  ) => void;
  handleDragEnd: (event: React.DragEvent<HTMLLIElement>) => void;
  handleDragOver: (event: React.DragEvent<HTMLLIElement>) => void;
  handleDrop: (targetItem: string) => void;
};
function RootWord({
  handleDragStart,
  handleDragEnd,
  handleDragOver,
  handleDrop,
}: RootWordProps) {
  return (
    <li
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
        alignItems: 'center',
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
            marginRight: '0.5em',
          }}
        />
      </div>
      <div>Root Word</div>
    </li>
  );
}
