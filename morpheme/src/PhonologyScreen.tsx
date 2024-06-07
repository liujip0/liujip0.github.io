import {NavBar} from './CommonFuncs.tsx';
import {useStoreState} from './CommonVals.tsx';

export default function PhonologyScreen() {
    const conlang = useStoreState((s) => s.conlang);
    return (
        <>
            <NavBar
                sections={[
                    {id: 'inventory', label: 'Phonetic Inventory'},
                    {id: 'orthography', label: 'Orthography & Romanization'},
                    {id: 'phonotactics', label: 'Phonotactics'}
                ]}
            />
            <h1 id="inventory">Phonetic Inventory</h1>
            <p>Select sounds to add to {conlang.name}&apos;s inventory.</p>
            <h2>Consonants</h2>
            <ConsonantsTable />
            <h1 id="orthography">Orthography &amp; Romanization</h1>
            <h1 id="phonotactics">Phonotactics</h1>
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
                        <Phono>m&#x0325;</Phono>
                        <Phono>m</Phono>
                        <Phono>ɱ&#x030a;</Phono>
                        <Phono>ɱ</Phono>
                        <Phono>n&#x032a;&#x030a;</Phono>
                        <Phono>n&#x032a;</Phono>
                        <Phono>n&#x0325;</Phono>
                        <Phono>n</Phono>
                        <PhonoX />
                        <PhonoX />
                        <Phono>ɳ&#x030a;</Phono>
                        <Phono>ɳ</Phono>
                        <Phono>ȵ&#x030a;</Phono>
                        <Phono>ȵ</Phono>
                        <Phono>ɲ&#x030a;</Phono>
                        <Phono>ɲ</Phono>
                        <PhonoX />
                        <PhonoX />
                        <Phono>ŋ&#x030a;</Phono>
                        <Phono>ŋ</Phono>
                        <Phono>ɴ&#x0325;</Phono>
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
                        <Phono>ʁ&#x030a;</Phono>
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
                        <Phono>ƭ&#x032a;</Phono>
                        <Phono>ɗ&#x032a;</Phono>
                        <Phono>ƭ</Phono>
                        <Phono>ɗ</Phono>
                        <PhonoX />
                        <PhonoX />
                        <Phono>ᶑ&#x030a;</Phono>
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

type PhonoProps = {
    colSpan?: number;
    children?: string;
};
function Phono({colSpan, children}: PhonoProps) {
    return (
        <td colSpan={colSpan}>
            <button
                style={{
                    border: 'none',
                    backgroundColor: 'transparent'
                }}>
                {children}
            </button>
        </td>
    );
}

type PhonoXProps = {
    colSpan?: number;
};
function PhonoX({colSpan}: PhonoXProps) {
    return (
        <td
            colSpan={colSpan}
            style={{backgroundColor: 'lightgray'}}></td>
    );
}
