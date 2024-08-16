import { useState } from 'react';
import {
  TbCopy,
  TbTrash,
  TbTriangle,
  TbTriangleInverted,
} from 'react-icons/tb';
import { Alert, IconButton, NavSection } from '../../common/Components.tsx';
import {
  createId,
  diacriticToChar,
  sortConsonantsDiacritics,
  sortVowelDiacritics,
} from '../../common/Funcs.tsx';
import { StringRes } from '../../common/Resources.tsx';
import {
  Consonant,
  IpaConsonantDiacritic,
  IpaVowelDiacritic,
  Vowel,
} from '../../common/Types.tsx';
import { useStoreState } from '../../common/Vals.tsx';

export default function Phonemes() {
  return (
    <>
      <NavSection id="phonemes">{StringRes.phonemesromanization}</NavSection>
      <p>{StringRes.managephonemes}</p>
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
        [property]: newValue,
      });
      changeConlang(['phonology', 'inventory'], newInventory);
    }
  };
  const addPhoneme = (phoneme: Consonant | Vowel) => {
    const newInventory = conlang.phonology.inventory;
    newInventory.push({
      ...phoneme,
      id: createId(phoneme.base),
    });
    changeConlang(['phoology', 'inventory'], newInventory);
  };
  const deletePhoneme = (id: string) => {
    let newInventory = conlang.phonology.inventory;
    newInventory = newInventory.filter((x) => x.id !== id);
    changeConlang(['phonology', 'inventory'], newInventory);
  };
  const moveUpPhoneme = (id: string) => {
    const index = conlang.phonology.inventory.findIndex((x) => x.id === id);
    if (index > 0) {
      const phoneme = conlang.phonology.inventory[index];
      const newInventory = conlang.phonology.inventory;
      newInventory.splice(index, 1);
      newInventory.splice(index - 1, 0, phoneme);
      changeConlang(['phonology', 'inventory'], newInventory);
    }
  };
  const moveDownPhoneme = (id: string) => {
    const index = conlang.phonology.inventory.findIndex((x) => x.id === id);
    if (index < conlang.phonology.inventory.length - 1) {
      const phoneme = conlang.phonology.inventory[index];
      const newInventory = conlang.phonology.inventory;
      newInventory.splice(index, 1);
      newInventory.splice(index + 1, 0, phoneme);
      changeConlang(['phonology', 'inventory'], newInventory);
    }
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
        overflowX: 'scroll',
      }}>
      <table
        style={{
          width: 'max-content',
        }}>
        <thead>
          <tr>
            <th>{StringRes.ipa}</th>
            <th>{StringRes.type}</th>
            <th>{StringRes.diacritics}</th>
            <th>{StringRes.allophoneof}</th>
            <th>
              {StringRes.romanization}
              <br />
              <button
                onClick={() => {
                  setCopyIpa(true);
                }}>
                {StringRes.copyipa}
              </button>
              {copyIpa && (
                <Alert
                  title={StringRes.confirmation}
                  description={StringRes.romanizationToIpa}
                  onDecline={() => {
                    setCopyIpa(false);
                  }}
                  onAccept={() => {
                    const newInventory = conlang.phonology.inventory;
                    conlang.phonology.inventory.forEach((item, index) => {
                      newInventory.splice(index, 1, {
                        ...item,
                        romanization: item.ipa,
                      });
                    });
                    changeConlang(['phonology', 'inventory'], newInventory);
                    setCopyIpa(false);
                  }}
                />
              )}
            </th>
            <th>{StringRes.actions}</th>
          </tr>
        </thead>
        <tbody>
          <PhonemesList
            list={conlang.phonology.inventory}
            changePhoneme={changePhoneme}
            addPhoneme={addPhoneme}
            deletePhoneme={deletePhoneme}
            moveUpPhoneme={moveUpPhoneme}
            moveDownPhoneme={moveDownPhoneme}
            getPhoneme={getPhoneme}
          />
        </tbody>
      </table>
    </div>
  );
}

type PhonemesListProps = {
  list: Array<Consonant | Vowel>;
  changePhoneme: (id: string, property: string, newValue: unknown) => void;
  addPhoneme: (phoneme: Consonant | Vowel) => void;
  deletePhoneme: (id: string) => void;
  moveUpPhoneme: (id: string) => void;
  moveDownPhoneme: (id: string) => void;
  getPhoneme: (id: string) => Consonant | Vowel;
};
function PhonemesList({
  list,
  changePhoneme,
  addPhoneme,
  deletePhoneme,
  moveUpPhoneme,
  moveDownPhoneme,
  getPhoneme,
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
          moveUpPhoneme={moveUpPhoneme}
          moveDownPhoneme={moveDownPhoneme}
          getPhoneme={getPhoneme}
        />
      ))}
    </>
  );
}

type PhonemeTrProps = {
  item: Consonant | Vowel;
  allophoneOf: string;
  changePhoneme: (id: string, property: string, newValue: unknown) => void;
  addPhoneme: (phoneme: Consonant | Vowel) => void;
  deletePhoneme: (id: string) => void;
  moveUpPhoneme: (id: string) => void;
  moveDownPhoneme: (id: string) => void;
  getPhoneme: (id: string) => Consonant | Vowel;
};
function PhonemeTr({
  item,
  allophoneOf,
  changePhoneme,
  addPhoneme,
  deletePhoneme,
  moveUpPhoneme,
  moveDownPhoneme,
  getPhoneme,
}: PhonemeTrProps) {
  const conlang = useStoreState((s) => s.conlang);
  const setLastInput = useStoreState((s) => s.setLastInput);
  const id = createId('phonemeInput');
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
                'laminal',
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
                item.id,
              ]);
            }
          }}
          value={allophoneOf}>
          <option value="">-</option>
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
          id={id}
          onFocus={() => {
            setLastInput(id);
          }}
        />
      </td>
      <td>
        <IconButton
          onClick={() => {
            addPhoneme(item);
          }}>
          <TbCopy size={18} />
        </IconButton>
        &nbsp;
        <IconButton
          onClick={() => {
            moveUpPhoneme(item.id);
          }}>
          <TbTriangle size={18} />
        </IconButton>
        &nbsp;
        <IconButton
          onClick={() => {
            moveDownPhoneme(item.id);
          }}>
          <TbTriangleInverted size={18} />
        </IconButton>
        &nbsp;
        <IconButton
          onClick={() => {
            deletePhoneme(item.id);
          }}>
          <TbTrash size={18} />
        </IconButton>
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
      <option value="">-</option>
      {type === 'consonant' ?
        <>
          <option value="voiceless">
            {StringRes.diacritic.consonant.voiceless}
          </option>
          <option value="voiced">{StringRes.diacritic.consonant.voiced}</option>
          <option value="aspirated">
            {StringRes.diacritic.consonant.aspirated}
          </option>
          <option value="syllabic">
            {StringRes.diacritic.consonant.syllabic}
          </option>
          <option value="breathy">
            {StringRes.diacritic.consonant.breathy}
          </option>
          <option value="creaky">{StringRes.diacritic.consonant.creaky}</option>
          <option value="linguolabial">
            {StringRes.diacritic.consonant.linguolabial}
          </option>
          <option value="labialized">
            {StringRes.diacritic.consonant.labialized}
          </option>
          <option value="palatalized">
            {StringRes.diacritic.consonant.palatalized}
          </option>
          <option value="velarized">
            {StringRes.diacritic.consonant.velarized}
          </option>
          <option value="pharyngealized">
            {StringRes.diacritic.consonant.pharyngealized}
          </option>
          <option value="velarized/pharyngealized">
            {StringRes.diacritic.consonant['velarized/pharyngealized']}
          </option>
          <option value="raised">{StringRes.diacritic.consonant.raised}</option>
          <option value="lowered">
            {StringRes.diacritic.consonant.lowered}
          </option>
          <option value="dental">{StringRes.diacritic.consonant.dental}</option>
          <option value="apical">{StringRes.diacritic.consonant.apical}</option>
          <option value="laminal">
            {StringRes.diacritic.consonant.laminal}
          </option>
          <option value="nasal release">
            {StringRes.diacritic.consonant['nasal release']}
          </option>
          <option value="dental release">
            {StringRes.diacritic.consonant['dental release']}
          </option>
          <option value="no audible release">
            {StringRes.diacritic.consonant['no audible release']}
          </option>
        </>
      : <>
          <option value="more rounded">
            {StringRes.diacritic.vowel['more rounded']}
          </option>
          <option value="less rounded">
            {StringRes.diacritic.vowel['less rounded']}
          </option>
          <option value="advanced">{StringRes.diacritic.vowel.advanced}</option>
          <option value="retracted">
            {StringRes.diacritic.vowel.retracted}
          </option>
          <option value="centralized">
            {StringRes.diacritic.vowel.centralized}
          </option>
          <option value="mid-centralized">
            {StringRes.diacritic.vowel['mid-centralized']}
          </option>
          <option value="raised">{StringRes.diacritic.vowel.raised}</option>
          <option value="lowered">{StringRes.diacritic.vowel.lowered}</option>
          <option value="+ATR">{StringRes.diacritic.vowel['+ATR']}</option>
          <option value="-ATR">{StringRes.diacritic.vowel['-ATR']}</option>
          <option value="nonsyllabic">
            {StringRes.diacritic.vowel.nonsyllabic}
          </option>
          <option value="rhoticized">
            {StringRes.diacritic.vowel.rhoticized}
          </option>
          <option value="creaky">{StringRes.diacritic.vowel.creaky}</option>
          <option value="breathy">{StringRes.diacritic.vowel.breathy}</option>
          <option value="nasalized">
            {StringRes.diacritic.vowel.nasalized}
          </option>
          <option value="long">{StringRes.diacritic.vowel.long}</option>
          <option value="half-long">
            {StringRes.diacritic.vowel['half-long']}
          </option>
          <option value="extra-short">
            {StringRes.diacritic.vowel['extra-short']}
          </option>
        </>
      }
    </select>
  );
}
