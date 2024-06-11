import { useState } from 'react';
import { NavSection } from '../../common/Components.tsx';
import {
    diacriticToChar,
    sortConsonantsDiacritics,
    sortVowelDiacritics
} from '../../common/Funcs.tsx';
import {
    IpaConsonantDiacritic,
    IpaVowelDiacritic
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
            <PhonemesList />
        </>
    );
}

function PhonemesList() {
    const conlang = useStoreState((s) => s.conlang);
    const changeConlang = useStoreState((s) => s.changeConlang);
    const time = new Date().getMilliseconds();
    const [copyIpa, setCopyIpa] = useState(false);
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
                        <th>
                            Romanization
                            <br />
                            {copyIpa ?
                                <button
                                    onClick={() => {
                                        const newInventory = conlang.inventory;
                                        conlang.inventory.forEach(
                                            (item, index) => {
                                                newInventory.splice(index, 1, {
                                                    ...item,
                                                    romanization: item.ipa
                                                });
                                            }
                                        );
                                    }}></button>
                            :   <button
                                    onClick={() => {
                                        setCopyIpa(true);
                                    }}>
                                    Copy IPA
                                </button>
                            }
                        </th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {conlang.inventory.map((item) => (
                        <tr key={item.id}>
                            <td className="charis">{item.ipa}</td>
                            <td>{item.type}</td>
                            <td>
                                <DiacriticSelect
                                    type={item.type}
                                    value={item.diacritics[0]}
                                    onChange={(
                                        diacritic:
                                            | IpaConsonantDiacritic
                                            | IpaVowelDiacritic
                                    ) => {
                                        const index =
                                            conlang.inventory.findIndex(
                                                (value) => value.id === item.id
                                            );
                                        const newInventory = conlang.inventory;
                                        if (index !== -1) {
                                            if (item.type === 'consonant') {
                                                const diacritics =
                                                    sortConsonantsDiacritics(
                                                        item.diacritics[1],
                                                        diacritic as IpaConsonantDiacritic
                                                    );
                                                newInventory.splice(index, 1, {
                                                    ...item,
                                                    ipa:
                                                        item.base +
                                                        diacriticToChar(
                                                            diacritics[0],
                                                            'ɱɳȵɲŋɽɻjɰɥɭȴᶑ'.includes(
                                                                item.base
                                                            )
                                                        ) +
                                                        diacriticToChar(
                                                            diacritics[1],
                                                            'ɱɳȵɲŋɽɻjɰɥɭȴᶑ'.includes(
                                                                item.base
                                                            ) ||
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
                                                                ].includes(
                                                                    diacritics[0]
                                                                )
                                                        ),
                                                    diacritics: diacritics
                                                });
                                            } else {
                                                const diacritics =
                                                    sortVowelDiacritics(
                                                        item.diacritics[1],
                                                        diacritic as IpaVowelDiacritic
                                                    );
                                                newInventory.splice(index, 1, {
                                                    ...item,
                                                    ipa:
                                                        item.base +
                                                        diacriticToChar(
                                                            diacritics[0]
                                                        ) +
                                                        diacriticToChar(
                                                            diacritics[1]
                                                        ),
                                                    diacritics: diacritics
                                                });
                                            }
                                            changeConlang(
                                                ['inventory'],
                                                newInventory
                                            );
                                        }
                                    }}
                                />
                                &nbsp;
                                <DiacriticSelect
                                    type={item.type}
                                    value={item.diacritics[1]}
                                    onChange={(
                                        diacritic:
                                            | IpaConsonantDiacritic
                                            | IpaVowelDiacritic
                                    ) => {
                                        const index =
                                            conlang.inventory.findIndex(
                                                (value) => value.id === item.id
                                            );
                                        const newInventory = conlang.inventory;
                                        if (index !== -1) {
                                            if (item.type === 'consonant') {
                                                const diacritics =
                                                    sortConsonantsDiacritics(
                                                        item.diacritics[0],
                                                        diacritic as IpaConsonantDiacritic
                                                    );
                                                newInventory.splice(index, 1, {
                                                    ...item,
                                                    ipa:
                                                        item.base +
                                                        diacriticToChar(
                                                            diacritics[0],
                                                            'ɱɳȵɲŋɽɻjɰɥɭȴᶑ'.includes(
                                                                item.base
                                                            )
                                                        ) +
                                                        diacriticToChar(
                                                            diacritics[1],
                                                            'ɱɳȵɲŋɽɻjɰɥɭȴᶑ'.includes(
                                                                item.base
                                                            ) ||
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
                                                                ].includes(
                                                                    diacritics[0]
                                                                )
                                                        ),
                                                    diacritics: diacritics
                                                });
                                            } else {
                                                const diacritics =
                                                    sortVowelDiacritics(
                                                        item.diacritics[0],
                                                        diacritic as IpaVowelDiacritic
                                                    );
                                                newInventory.splice(index, 1, {
                                                    ...item,
                                                    ipa:
                                                        item.base +
                                                        diacriticToChar(
                                                            diacritics[0]
                                                        ) +
                                                        diacriticToChar(
                                                            diacritics[1]
                                                        ),
                                                    diacritics: diacritics
                                                });
                                            }
                                            changeConlang(
                                                ['inventory'],
                                                newInventory
                                            );
                                        }
                                    }}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    size={12}
                                    value={item.romanization}
                                    onInput={(event) => {
                                        const index =
                                            conlang.inventory.findIndex(
                                                (value) => value.id === item.id
                                            );
                                        const newInventory = conlang.inventory;
                                        if (index !== -1) {
                                            newInventory.splice(index, 1, {
                                                ...item,
                                                romanization:
                                                    event.currentTarget.value
                                            });
                                            changeConlang(
                                                ['inventory'],
                                                newInventory
                                            );
                                        }
                                    }}
                                />
                            </td>
                            <td>
                                <button
                                    onClick={() => {
                                        const newInventory = conlang.inventory;
                                        console.log(item);
                                        console.log({
                                            ...item,
                                            id: time + '-' + item.base
                                        });
                                        newInventory.push({
                                            ...item,
                                            id: time + '-' + item.base
                                        });
                                        newInventory.sort((a, b) => {
                                            if (a.type === 'consonant') {
                                                if (b.type === 'consonant') {
                                                    return a.ipa < b.ipa ?
                                                            -1
                                                        :   1;
                                                } else {
                                                    return -1;
                                                }
                                            } else {
                                                if (b.type === 'consonant') {
                                                    return 1;
                                                } else {
                                                    return a.ipa < b.ipa ?
                                                            -1
                                                        :   1;
                                                }
                                            }
                                        });
                                        changeConlang(
                                            ['inventory'],
                                            newInventory
                                        );
                                    }}>
                                    Duplicate
                                </button>
                                &nbsp;
                                <button
                                    onClick={() => {
                                        let newInventory = conlang.inventory;
                                        newInventory = newInventory.filter(
                                            (x) => x.id !== item.id
                                        );
                                        newInventory.sort((a, b) => {
                                            if (a.type === 'consonant') {
                                                if (b.type === 'consonant') {
                                                    return a.ipa < b.ipa ?
                                                            -1
                                                        :   1;
                                                } else {
                                                    return -1;
                                                }
                                            } else {
                                                if (b.type === 'consonant') {
                                                    return 1;
                                                } else {
                                                    return a.ipa < b.ipa ?
                                                            -1
                                                        :   1;
                                                }
                                            }
                                        });
                                        changeConlang(
                                            ['inventory'],
                                            newInventory
                                        );
                                    }}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
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
                    event.currentTarget.value as
                        | IpaConsonantDiacritic
                        | IpaVowelDiacritic
                );
            }}>
            <option value={''}></option>
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
                    <option value={'no audible release'}>
                        No Audible Release
                    </option>
                </>
            :   <>
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
