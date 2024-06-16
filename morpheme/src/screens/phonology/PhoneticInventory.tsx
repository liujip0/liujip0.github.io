import { NavSection } from '../../common/Components.tsx';
import { useStoreState } from '../../common/Vals.tsx';

export default function PhoneticInventory() {
    const conlang = useStoreState((s) => s.conlang);
    console.log(conlang.inventory);
    return (
        <>
            <NavSection id="inventory">Phonetic Inventory</NavSection>
            <p>
                Select sounds to add to {conlang.name}&apos;s inventory. Use the
                next section to add diacritics and set romanizations.
            </p>
            <h2>Consonants</h2>
            <ConsonantsTable />
            <h2>Vowels</h2>
            <VowelsTable />
        </>
    );
}

function ConsonantsTable() {
    return (
        <div
            style={{
                overflowX: 'scroll'
            }}>
            <table
                style={{
                    width: 'min-content'
                }}>
                <thead>
                    <tr>
                        <td></td>
                        <th colSpan={2}>Bilabial</th>
                        <th colSpan={2}>Labiodental</th>
                        <th colSpan={2}>Dental</th>
                        <th colSpan={2}>Alveolar</th>
                        <th colSpan={2}>Postalveolar</th>
                        <th colSpan={2}>Retroflex</th>
                        <th colSpan={2}>Alveolopalatal</th>
                        <th colSpan={2}>Palatal</th>
                        <th colSpan={2}>Labiovelar</th>
                        <th colSpan={2}>Velar</th>
                        <th colSpan={2}>Uvular</th>
                        <th colSpan={2}>Pharyngeal</th>
                        <th colSpan={2}>Epiglottal</th>
                        <th colSpan={2}>Glottal</th>
                        <th colSpan={2}>Other</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Plosive</th>
                        <Phono>p</Phono>
                        <Phono>b</Phono>
                        <Phono>p̪</Phono>
                        <Phono>b̪</Phono>
                        <Phono>t̪</Phono>
                        <Phono>d̪</Phono>
                        <Phono>t</Phono>
                        <Phono>d</Phono>
                        <PhonoX />
                        <PhonoX />
                        <Phono>ʈ</Phono>
                        <Phono>ɖ</Phono>
                        <Phono>ȶ</Phono>
                        <Phono>ȡ</Phono>
                        <Phono>c</Phono>
                        <Phono>ɟ</Phono>
                        <PhonoX />
                        <PhonoX />
                        <Phono>k</Phono>
                        <Phono>g</Phono>
                        <Phono>q</Phono>
                        <Phono>ɢ</Phono>
                        <PhonoX />
                        <PhonoX />
                        <Phono>ʡ</Phono>
                        <PhonoX />
                        <Phono>ʔ</Phono>
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                    </tr>
                    <tr>
                        <th>Nasal</th>
                        <PhonoX />
                        <Phono>m</Phono>
                        <PhonoX />
                        <Phono>ɱ</Phono>
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <Phono>n</Phono>
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <Phono>ɳ</Phono>
                        <PhonoX />
                        <Phono>ȵ</Phono>
                        <PhonoX />
                        <Phono>ɲ</Phono>
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <Phono>ŋ</Phono>
                        <PhonoX />
                        <Phono>ɴ</Phono>
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                    </tr>
                    <tr>
                        <th>Trill</th>
                        <Phono>ʙ&#x0325;</Phono>
                        <Phono>ʙ</Phono>
                        <PhonoX />
                        <PhonoX />
                        <Phono>r&#x032a;&#x030a;</Phono>
                        <Phono>r&#x032a;</Phono>
                        <Phono>r&#x0325;</Phono>
                        <Phono>r</Phono>
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <Phono>ʀ&#x0325;</Phono>
                        <Phono>ʀ</Phono>
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                    </tr>
                    <tr>
                        <th>Tap or Flap</th>
                        <Phono>ⱱ&#x031f;&#x030a;</Phono>
                        <Phono>ⱱ&#x031f;</Phono>
                        <Phono>ⱱ&#x0325;</Phono>
                        <Phono>ⱱ</Phono>
                        <Phono>ɾ&#x032a;&#x030a;</Phono>
                        <Phono>ɾ&#x032a;</Phono>
                        <Phono>ɾ&#x0325;</Phono>
                        <Phono>ɾ</Phono>
                        <PhonoX />
                        <PhonoX />
                        <Phono>ɽ&#x030a;</Phono>
                        <Phono>ɽ</Phono>
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <Phono>q&#x0306;</Phono>
                        <Phono>ɢ&#x0306;</Phono>
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                    </tr>
                    <tr>
                        <th>Lateral Flap</th>
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <Phono>ɺ&#x032a;&#x030a;</Phono>
                        <Phono>ɺ&#x032a;</Phono>
                        <Phono>ɺ&#x0325;</Phono>
                        <Phono>ɺ</Phono>
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                    </tr>
                    <tr>
                        <th>Fricative</th>
                        <Phono>ɸ</Phono>
                        <Phono>β</Phono>
                        <Phono>f</Phono>
                        <Phono>v</Phono>
                        <Phono>θ</Phono>
                        <Phono>ð</Phono>
                        <Phono>s</Phono>
                        <Phono>z</Phono>
                        <Phono>ʃ</Phono>
                        <Phono>ʒ</Phono>
                        <Phono>ʂ</Phono>
                        <Phono>ʐ</Phono>
                        <Phono>ɕ</Phono>
                        <Phono>ʑ</Phono>
                        <Phono>ç</Phono>
                        <Phono>ʝ</Phono>
                        <PhonoX />
                        <PhonoX />
                        <Phono>x</Phono>
                        <Phono>ɣ</Phono>
                        <Phono>χ</Phono>
                        <Phono>ʁ</Phono>
                        <Phono>ħ</Phono>
                        <Phono>ʕ</Phono>
                        <Phono>ʜ</Phono>
                        <Phono>ʢ</Phono>
                        <Phono>h</Phono>
                        <Phono>ɦ</Phono>
                        <Phono>ɧ</Phono>
                        <PhonoX />
                    </tr>
                    <tr>
                        <th>Lateral fricative</th>
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <Phono>ɬ&#x032a;</Phono>
                        <Phono>ɮ&#x032a;</Phono>
                        <Phono>ɬ</Phono>
                        <Phono>ɮ</Phono>
                        <PhonoX />
                        <PhonoX />
                        <Phono>ꞎ</Phono>
                        <Phono>ɭ&#x031d;</Phono>
                        <PhonoX />
                        <PhonoX />
                        <Phono>ʎ&#x031d;&#x030a;</Phono>
                        <Phono>ʎ&#x031d;</Phono>
                        <PhonoX />
                        <PhonoX />
                        <Phono>ʟ&#x031d;&#x030a;</Phono>
                        <Phono>ʟ&#x031d;</Phono>
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                    </tr>
                    <tr>
                        <th>Approximant</th>
                        <Phono>β&#x031e;&#x030a;</Phono>
                        <Phono>β&#x031e;</Phono>
                        <Phono>ʋ&#x0325;</Phono>
                        <Phono>ʋ</Phono>
                        <Phono>ð&#x031e;&#x030a;</Phono>
                        <Phono>ð&#x031e;</Phono>
                        <Phono>ɹ&#x0325;</Phono>
                        <Phono>ɹ</Phono>
                        <PhonoX />
                        <PhonoX />
                        <Phono>ɻ&#x030a;</Phono>
                        <Phono>ɻ</Phono>
                        <PhonoX />
                        <PhonoX />
                        <Phono>j&#x030a;</Phono>
                        <Phono>j</Phono>
                        <Phono>ʍ</Phono>
                        <Phono>w</Phono>
                        <Phono>ɰ&#x030a;</Phono>
                        <Phono>ɰ</Phono>
                        <Phono>ʁ&#x0325;</Phono>
                        <Phono>ʁ</Phono>
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <Phono>ɥ&#x030a;</Phono>
                        <Phono>ɥ</Phono>
                    </tr>
                    <tr>
                        <th>Lateral approximant</th>
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <Phono>l&#x032a;&#x030a;</Phono>
                        <Phono>l&#x032a;</Phono>
                        <Phono>l&#x0325;</Phono>
                        <Phono>l</Phono>
                        <PhonoX />
                        <PhonoX />
                        <Phono>ɭ&#x030a;</Phono>
                        <Phono>ɭ</Phono>
                        <Phono>ȴ&#x030a;</Phono>
                        <Phono>ȴ</Phono>
                        <Phono>ʎ&#x0325;</Phono>
                        <Phono>ʎ</Phono>
                        <PhonoX />
                        <PhonoX />
                        <Phono>ʟ&#x0325;</Phono>
                        <Phono>ʟ</Phono>
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <Phono>ɫ&#x0325;</Phono>
                        <Phono>ɫ</Phono>
                    </tr>
                    <tr>
                        <th>Click</th>
                        <Phono colSpan={2}>ʘ</Phono>
                        <PhonoX colSpan={2} />
                        <Phono colSpan={2}>ǀ</Phono>
                        <Phono colSpan={2}>ǃ</Phono>
                        <PhonoX colSpan={2} />
                        <Phono colSpan={2}>‼</Phono>
                        <Phono colSpan={2}>ǁ</Phono>
                        <Phono colSpan={2}>ǂ</Phono>
                        <PhonoX colSpan={2} />
                        <Phono colSpan={2}>ʞ</Phono>
                        <PhonoX colSpan={2} />
                        <PhonoX colSpan={2} />
                        <PhonoX colSpan={2} />
                        <PhonoX colSpan={2} />
                        <PhonoX colSpan={2} />
                    </tr>
                    <tr>
                        <th>Implosive</th>
                        <Phono>ƥ</Phono>
                        <Phono>ɓ</Phono>
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <Phono>ƭ</Phono>
                        <Phono>ɗ</Phono>
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <Phono>ᶑ</Phono>
                        <PhonoX />
                        <PhonoX />
                        <Phono>ƈ</Phono>
                        <Phono>ʄ</Phono>
                        <PhonoX />
                        <PhonoX />
                        <Phono>ƙ</Phono>
                        <Phono>ɠ</Phono>
                        <Phono>ʠ</Phono>
                        <Phono>ʛ</Phono>
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
function VowelsTable() {
    return (
        <div
            style={{
                overflowX: 'scroll'
            }}>
            <table>
                <thead>
                    <tr>
                        <td></td>
                        <th colSpan={2}>Front</th>
                        <th colSpan={2}></th>
                        <th colSpan={2}>Central</th>
                        <th colSpan={2}></th>
                        <th colSpan={2}>Back</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Close</th>
                        <Phono vowel>i</Phono>
                        <Phono vowel>y</Phono>
                        <PhonoX />
                        <PhonoX />
                        <Phono vowel>ɨ</Phono>
                        <Phono vowel>ʉ</Phono>
                        <PhonoX />
                        <PhonoX />
                        <Phono vowel>ɯ</Phono>
                        <Phono vowel>u</Phono>
                    </tr>
                    <tr>
                        <th></th>
                        <PhonoX />
                        <PhonoX />
                        <Phono vowel>ɪ</Phono>
                        <Phono vowel>ʏ</Phono>
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <Phono vowel>ʊ</Phono>
                        <PhonoX />
                        <PhonoX />
                    </tr>
                    <tr>
                        <th>Close-mid</th>
                        <Phono vowel>e</Phono>
                        <Phono vowel>ø</Phono>
                        <PhonoX />
                        <PhonoX />
                        <Phono vowel>ɘ</Phono>
                        <Phono vowel>ɵ</Phono>
                        <PhonoX />
                        <PhonoX />
                        <Phono vowel>ɤ</Phono>
                        <Phono vowel>o</Phono>
                    </tr>
                    <tr>
                        <th></th>
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <Phono
                            colSpan={2}
                            vowel>
                            ə
                        </Phono>
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                    </tr>
                    <tr>
                        <th>Open-mid</th>
                        <Phono vowel>ɛ</Phono>
                        <Phono vowel>œ</Phono>
                        <PhonoX />
                        <PhonoX />
                        <Phono vowel>ɜ</Phono>
                        <Phono vowel>ɞ</Phono>
                        <PhonoX />
                        <PhonoX />
                        <Phono vowel>ʌ</Phono>
                        <Phono vowel>ɔ</Phono>
                    </tr>
                    <tr>
                        <th></th>
                        <Phono vowel>æ</Phono>
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <Phono vowel>ɐ</Phono>
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                    </tr>
                    <tr>
                        <th>Open</th>
                        <Phono vowel>a</Phono>
                        <Phono vowel>ɶ</Phono>
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <PhonoX />
                        <Phono vowel>ɑ</Phono>
                        <Phono vowel>ɒ</Phono>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

type PhonoProps = {
    colSpan?: number;
    vowel?: boolean;
    children: string;
};
function Phono({ colSpan, vowel = false, children }: PhonoProps) {
    const conlang = useStoreState((s) => s.conlang);
    const changeConlang = useStoreState((s) => s.changeConlang);
    const time = new Date().getMilliseconds();
    return (
        <td
            onClick={() => {
                let newInventory = conlang.inventory;
                if (newInventory.some((item) => item.base === children)) {
                    newInventory = newInventory.filter(
                        (item) => item.base !== children
                    );
                } else {
                    newInventory.push({
                        id: time + '-' + children,
                        ipa: children,
                        base: children,
                        romanization: '',
                        type: vowel ? 'vowel' : 'consonant',
                        diacritics: ['', ''],
                        allophones: [],
                        allophoneOf: ''
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
                }
                changeConlang(['inventory'], newInventory);
            }}
            colSpan={colSpan}
            className="charis"
            style={{
                backgroundColor:
                    conlang.inventory.some((item) => item.base === children) ?
                        'lightblue'
                    :   'white'
            }}>
            {children}
        </td>
    );
}

type PhonoXProps = {
    colSpan?: number;
};
function PhonoX({ colSpan }: PhonoXProps) {
    return (
        <td
            colSpan={colSpan}
            style={{ backgroundColor: 'gray', border: 'none' }}></td>
    );
}
