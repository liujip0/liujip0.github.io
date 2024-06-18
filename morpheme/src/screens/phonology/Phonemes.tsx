import { useState } from 'react';
import { Alert, NavSection } from '../../common/Components.tsx';
import {
  diacriticToChar,
  sortConsonantsDiacritics,
  sortVowelDiacritics
} from '../../common/Funcs.tsx';
import {
  IpaConsonantDiacritic,
  IpaVowelDiacritic,
  Phoneme
} from '../../common/Types.tsx';
import { useStoreState } from '../../common/Vals.tsx';

export default function Phonemes() {
  return (
    <>
      <NavSection id="phonemes">Phonemes &amp; Romanization</NavSection>
      <p>
        Manage phonemes, allophones, etc. and their romanizations. Your
        orthography can be managed in the next section.
      </p>
      <PhonemesTable />
    </>
  );
}

function PhonemesTable() {
  const conlang = useStoreState((s) => s.conlang);
  const changeConlang = useStoreState((s) => s.changeConlang);
  const [copyIpa, setCopyIpa] = useState(false);
  const changePhoneme = (id: string, property: string, newValue: unknown) => {
    const index = conlang.phonology.inventory.findIndex(
      (value) => value.id === id
    );
    const newInventory = conlang.phonology.inventory;
    if (index !== -1) {
      newInventory.splice(index, 1, {
        ...conlang.phonology.inventory[index],
        [property]: newValue
      });
      changeConlang(['phonology', 'inventory'], newInventory);
    }
  };
  const addPhoneme = (phoneme: Phoneme) => {
    const time = new Date().getMilliseconds();
    const newInventory = conlang.phonology.inventory;
    newInventory.push({
      ...phoneme,
      id: time + '-' + phoneme.base
    });
    newInventory.sort((a, b) => {
      if (a.type === 'consonant') {
        if (b.type === 'consonant') {
          return a.ipa < b.ipa ? -1 : 1;
        } else {
          return -1;
        }
      } else {
        if (b.type === 'consonant') {
          return 1;
        } else {
          return a.ipa < b.ipa ? -1 : 1;
        }
      }
    });
    changeConlang(['phoology', 'inventory'], newInventory);
  };
  const deletePhoneme = (id: string) => {
    let newInventory = conlang.phonology.inventory;
    newInventory = newInventory.filter((x) => x.id !== id);
    newInventory.sort((a, b) => {
      if (a.type === 'consonant') {
        if (b.type === 'consonant') {
          return a.ipa < b.ipa ? -1 : 1;
        } else {
          return -1;
        }
      } else {
        if (b.type === 'consonant') {
          return 1;
        } else {
          return a.ipa < b.ipa ? -1 : 1;
        }
      }
    });
    changeConlang(['phonology', 'inventory'], newInventory);
  };
  const getPhoneme = (id: string) => {
    const index = conlang.phonology.inventory.findIndex(
      (value) => value.id === id
    );
    return conlang.phonology.inventory[index];
  };
  return (
    <div
      style={{
        overflowX: 'scroll'
      }}>
      <table
        style={{
          width: 'max-content'
        }}>
        <thead>
          <tr>
            <th>IPA</th>
            <th>Type</th>
            <th>Diacritics</th>
            <th>Allophone of</th>
            <th>
              Romanization
              <br />
              <button
                onClick={() => {
                  setCopyIpa(true);
                }}>
                Copy IPA
              </button>
              {copyIpa && (
                <Alert
                  title="Confirmation"
                  description={
                    'Are you sure you want to set ' +
                    'the romanizations of all phonemes ' +
                    'to their IPA values? This cannot be ' +
                    'undone.'
                  }
                  onDecline={() => {
                    setCopyIpa(false);
                  }}
                  onAccept={() => {
                    const newInventory = conlang.phonology.inventory;
                    conlang.phonology.inventory.forEach((item, index) => {
                      newInventory.splice(index, 1, {
                        ...item,
                        romanization: item.ipa
                      });
                    });
                    changeConlang(['phonology', 'inventory'], newInventory);
                    setCopyIpa(false);
                  }}
                />
              )}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <PhonemesList
            list={conlang.phonology.inventory}
            changePhoneme={changePhoneme}
            addPhoneme={addPhoneme}
            deletePhoneme={deletePhoneme}
            getPhoneme={getPhoneme}
          />
        </tbody>
      </table>
    </div>
  );
}

type PhonemesListProps = {
  list: Array<Phoneme>;
  changePhoneme: (id: string, property: string, newValue: unknown) => void;
  addPhoneme: (phoneme: Phoneme) => void;
  deletePhoneme: (id: string) => void;
  getPhoneme: (id: string) => Phoneme;
};
function PhonemesList({
  list,
  changePhoneme,
  addPhoneme,
  deletePhoneme,
  getPhoneme
}: PhonemesListProps) {
  return (
    <>
      {list.map((item) => (
        <PhonemeTr
          key={item.id}
          item={item}
          allophoneOf={item.allophoneOf}
          changePhoneme={changePhoneme}
          addPhoneme={addPhoneme}
          deletePhoneme={deletePhoneme}
          getPhoneme={getPhoneme}
        />
      ))}
    </>
  );
}

type PhonemeTrProps = {
  item: Phoneme;
  allophoneOf: string;
  changePhoneme: (id: string, property: string, newValue: unknown) => void;
  addPhoneme: (phoneme: Phoneme) => void;
  deletePhoneme: (id: string) => void;
  getPhoneme: (id: string) => Phoneme;
};
function PhonemeTr({
  item,
  allophoneOf,
  changePhoneme,
  addPhoneme,
  deletePhoneme,
  getPhoneme
}: PhonemeTrProps) {
  const conlang = useStoreState((s) => s.conlang);
  const diacriticOnChange = (
    diacritic: IpaConsonantDiacritic | IpaVowelDiacritic,
    index: 0 | 1
  ) => {
    if (item.type === 'consonant') {
      const diacritics = sortConsonantsDiacritics(
        item.diacritics[index === 0 ? 1 : 0],
        diacritic as IpaConsonantDiacritic
      );
      changePhoneme(
        item.id,
        'ipa',
        item.base +
          diacriticToChar(diacritics[0], 'ɱɳȵɲŋɽɻjɰɥɭȴᶑ'.includes(item.base)) +
          diacriticToChar(
            diacritics[1],
            'ɱɳȵɲŋɽɻjɰɥɭȴᶑ'.includes(item.base) ||
              [
                'syllabic',
                'breathy',
                'creaky',
                'linguolabial',
                'raised',
                'lowered',
                'dental',
                'apical',
                'laminal'
              ].includes(diacritics[0])
          )
      );
      changePhoneme(item.id, 'diacritics', diacritics);
    } else {
      const diacritics = sortVowelDiacritics(
        item.diacritics[index === 0 ? 1 : 0],
        diacritic as IpaVowelDiacritic
      );
      changePhoneme(
        item.id,
        'ipa',
        item.base +
          diacriticToChar(diacritics[0]) +
          diacriticToChar(diacritics[1])
      );
      changePhoneme(item.id, 'diacritics', diacritics);
    }
  };
  return (
    <tr key={item.id}>
      <td className="charis">{item.ipa}</td>
      <td>{item.type}</td>
      <td>
        <DiacriticSelect
          type={item.type}
          value={item.diacritics[0]}
          onChange={(value) => diacriticOnChange(value, 0)}
        />
        &nbsp;
        <DiacriticSelect
          type={item.type}
          value={item.diacritics[1]}
          onChange={(value) => diacriticOnChange(value, 1)}
        />
      </td>
      <td>
        <select
          onChange={(event) => {
            if (allophoneOf) {
              const newAllophones = getPhoneme(allophoneOf).allophones.filter(
                (x) => x !== item.id
              );
              changePhoneme(allophoneOf, 'allophones', newAllophones);
            }
            changePhoneme(item.id, 'allophoneOf', event.currentTarget.value);
            if (event.currentTarget.value) {
              const allophones = getPhoneme(
                event.currentTarget.value
              ).allophones;
              changePhoneme(event.currentTarget.value, 'allophones', [
                ...allophones,
                item.id
              ]);
            }
          }}
          value={allophoneOf}>
          <option value={''}>-</option>
          {conlang.phonology.inventory.map((x) => {
            if (x.id !== item.id) {
              return (
                <option
                  key={x.id}
                  value={x.id}>
                  {x.ipa}
                </option>
              );
            }
          })}
        </select>
      </td>
      <td>
        <input
          type="text"
          size={12}
          value={item.romanization}
          onInput={(event) => {
            changePhoneme(item.id, 'romanization', event.currentTarget.value);
          }}
        />
      </td>
      <td>
        <button
          onClick={() => {
            addPhoneme(item);
          }}>
          Duplicate
        </button>
        &nbsp;
        <button
          onClick={() => {
            deletePhoneme(item.id);
          }}>
          Delete
        </button>
      </td>
    </tr>
  );
}

type DiacriticSelectProps = {
  type: 'consonant' | 'vowel';
  value: IpaConsonantDiacritic | IpaVowelDiacritic;
  onChange: (value: IpaConsonantDiacritic | IpaVowelDiacritic) => void;
};
function DiacriticSelect({ type, value, onChange }: DiacriticSelectProps) {
  return (
    <select
      value={value}
      onChange={(event) => {
        onChange(
          event.currentTarget.value as IpaConsonantDiacritic | IpaVowelDiacritic
        );
      }}>
      <option value={''}>-</option>
      {type === 'consonant' ?
        <>
          <option value={'voiceless'}>Voiceless</option>
          <option value={'voiced'}>Voiced</option>
          <option value={'aspirated'}>Aspirated</option>
          <option value={'syllabic'}>Syllabic</option>
          <option value={'breathy'}>Breathy</option>
          <option value={'creaky'}>Creaky</option>
          <option value={'linguolabial'}>Linguolabial</option>
          <option value={'labialized'}>Labialized</option>
          <option value={'palatalized'}>Palatalized</option>
          <option value={'velarized'}>Velarized</option>
          <option value={'pharyngealized'}>Pharyngealized</option>
          <option value={'velarized/pharyngealized'}>
            Velarized or Pharyngealized (~)
          </option>
          <option value={'raised'}>Raised</option>
          <option value={'lowered'}>Lowered</option>
          <option value={'dental'}>Dental</option>
          <option value={'apical'}>Apical</option>
          <option value={'laminal'}>Laminal</option>
          <option value={'nasal release'}>Nasal Release</option>
          <option value={'dental release'}>Dental Release</option>
          <option value={'no audible release'}>No Audible Release</option>
        </>
      : <>
          <option value={'more rounded'}>More Rounded</option>
          <option value={'less rounded'}>Less Rounded</option>
          <option value={'advanced'}>Advanced</option>
          <option value={'retracted'}>Retracted</option>
          <option value={'centralized'}>Centralized</option>
          <option value={'mid-centralized'}>Mid-Centralized</option>
          <option value={'raised'}>Raised</option>
          <option value={'lowered'}>Lowered</option>
          <option value={'+ATR'}>Advanced Tongue Root (+ATR)</option>
          <option value={'-ATR'}>Retracted Tongue Root (-ATR)</option>
          <option value={'nonsyllabic'}>Nonsyllabic</option>
          <option value={'rhoticized'}>Rhoticized</option>
          <option value={'creaky'}>Creaky</option>
          <option value={'breathy'}>Breathy</option>
          <option value={'nasalized'}>Nasalized</option>
          <option value={'long'}>Long</option>
          <option value={'half-long'}>Half-Long</option>
          <option value={'extra-short'}>Extra-Short</option>
        </>
      }
    </select>
  );
}
