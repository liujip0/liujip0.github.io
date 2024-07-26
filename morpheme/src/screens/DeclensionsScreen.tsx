import React, { useState } from 'react';
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
    declension: Declension | '_'
  ) => {
    if (declension === '_') {
      setDragging(declension);
    } else {
      setDragging(declension.id);
    }
    event.dataTransfer.setData('text/plain', '');
  };
  const handleDragEnd = () => {
    setDragging(null);
  };
  const handleDragOver = (event: React.DragEvent<HTMLLIElement>) => {
    event.preventDefault();
  };
  const handleDrop = (targetItem: string) => {
    if (!dragging) return;
    const currentIndex = conlang.declensions[partOfSpeech].findIndex((x) => {
      if (x === '_') {
        return x === dragging;
      } else {
        return x.id === dragging;
      }
    });
    const targetIndex = conlang.declensions[partOfSpeech].findIndex((x) => {
      if (x === '_') {
        return x === targetItem;
      } else {
        return x.id === targetItem;
      }
    });
    if (currentIndex !== -1 && targetIndex !== -1) {
      const newDeclensions = conlang.declensions[partOfSpeech];
      newDeclensions.splice(currentIndex, 1);
      newDeclensions.splice(
        targetIndex,
        0,
        conlang.declensions[partOfSpeech].find((x) => {
          if (x === '_') {
            return x === dragging;
          } else {
            return x.id === dragging;
          }
        })!
      );
      changeConlang(['declensions'], {
        ...conlang.declensions,
        [partOfSpeech]: newDeclensions
      });
    }
  };
  return (
    <>
      <button
        onClick={() => {
          const newDeclensions = conlang.declensions[partOfSpeech];
          newDeclensions.push({
            id: createId('declension'),
            name: createId('declension'),
            affix: [],
            gloss: []
          });
          changeConlang(['declensions'], {
            ...conlang.declensions,
            [partOfSpeech]: newDeclensions
          });
        }}>
        Add Declension
      </button>
      <ul>
        {conlang.declensions[partOfSpeech].map((item) =>
          (() => {
            if (item === '_') {
              return (
                <li
                  key={'_'}
                  draggable
                  onDragStart={(event) => {
                    handleDragStart(event, '_');
                  }}
                  onDragEnd={handleDragEnd}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop('_')}>
                  Root Word
                </li>
              );
            } else {
              return <li key={item.id}>{item.name}</li>;
            }
          })()
        )}
      </ul>
    </>
  );
}
