import {NavSection} from '../../common/CommonFuncs.tsx';
import {useStoreState} from '../../common/CommonVals.tsx';

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
    return (
        <div
            style={{
                overflowX: 'scroll'
            }}>
            <table>
                <thead>
                    <tr>
                        <th>IPA</th>
                        <th>Type</th>
                        <th>Diacritics</th>
                        <th>Romanization</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {conlang.inventory.map((item) => (
                        <tr>
                            <td className="charis">{item.ipa}</td>
                            <td>{item.type}</td>
                            <td>
                                <DiacriticSelect type={item.type} />
                                <DiacriticSelect type={item.type} />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    size={5}
                                />
                            </td>
                            <td>
                                <button>Duplicate</button>
                                <button>Delete</button>
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
};
function DiacriticSelect({type}: DiacriticSelectProps) {
    if (type === 'consonant') {
        return (
            <select>
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
            </select>
        );
    } else {
        return (
            <select>
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
            </select>
        );
    }
}
