export default function PhonologyScreen() {
    return (
        <>
            <h1>Phonology</h1>
            <h2>Pulmonic Consonants</h2>
            <PulmonicConsonantsTable />
            <h2>Non-Pulmonic Consonants</h2>
            <NonpulmonicConsonantsTable />
        </>
    );
}

function PulmonicConsonantsTable() {
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
                        <th colSpan={2}>Palatal</th>
                        <th colSpan={2}>Velar</th>
                        <th colSpan={2}>Uvular</th>
                        <th colSpan={2}>Pharyngeal</th>
                        <th colSpan={2}>Glottal</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Plosive</th>
                        <PhonoTd>p</PhonoTd>
                        <PhonoTd>b</PhonoTd>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <PhonoTd>t</PhonoTd>
                        <PhonoTd>d</PhonoTd>
                        <td></td>
                        <td></td>
                        <PhonoTd>ʈ</PhonoTd>
                        <PhonoTd>ɖ</PhonoTd>
                        <PhonoTd>c</PhonoTd>
                        <PhonoTd>ɟ</PhonoTd>
                        <PhonoTd>k</PhonoTd>
                        <PhonoTd>g</PhonoTd>
                        <PhonoTd>q</PhonoTd>
                        <PhonoTd>ɢ</PhonoTd>
                        <td></td>
                        <PhonoXTd />
                        <PhonoTd>ʔ</PhonoTd>
                        <td></td>
                    </tr>
                    <tr>
                        <th>Nasal</th>
                        <td></td>
                        <PhonoTd>m</PhonoTd>
                        <td></td>
                        <PhonoTd>ɱ</PhonoTd>
                        <td></td>
                        <td></td>
                        <td></td>
                        <PhonoTd>n</PhonoTd>
                        <td></td>
                        <td></td>
                        <td></td>
                        <PhonoTd>ɳ</PhonoTd>
                        <td></td>
                        <PhonoTd>ɲ</PhonoTd>
                        <td></td>
                        <PhonoTd>ŋ</PhonoTd>
                        <td></td>
                        <PhonoTd>ɴ</PhonoTd>
                        <PhonoXTd />
                        <PhonoXTd />
                        <PhonoXTd />
                        <PhonoXTd />
                    </tr>
                    <tr>
                        <th>Trill</th>
                        <td></td>
                        <PhonoTd>ʙ</PhonoTd>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <PhonoTd>r</PhonoTd>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <PhonoXTd />
                        <PhonoXTd />
                        <td></td>
                        <PhonoTd>ʀ</PhonoTd>
                        <td></td>
                        <td></td>
                        <PhonoXTd />
                        <PhonoXTd />
                    </tr>
                    <tr>
                        <th>Tap or Flap</th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <PhonoTd>ⱱ</PhonoTd>
                        <td></td>
                        <td></td>
                        <td></td>
                        <PhonoTd>ɾ</PhonoTd>
                        <td></td>
                        <td></td>
                        <td></td>
                        <PhonoTd>ɽ</PhonoTd>
                        <td></td>
                        <td></td>
                        <PhonoXTd />
                        <PhonoXTd />
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <PhonoXTd />
                        <PhonoXTd />
                    </tr>
                    <tr>
                        <th>Fricative</th>
                        <PhonoTd>ɸ</PhonoTd>
                        <PhonoTd>β</PhonoTd>
                        <PhonoTd>f</PhonoTd>
                        <PhonoTd>v</PhonoTd>
                        <PhonoTd>θ</PhonoTd>
                        <PhonoTd>ð</PhonoTd>
                        <PhonoTd>s</PhonoTd>
                        <PhonoTd>z</PhonoTd>
                        <PhonoTd>ʃ</PhonoTd>
                        <PhonoTd>ʒ</PhonoTd>
                        <PhonoTd>ʂ</PhonoTd>
                        <PhonoTd>ʐ</PhonoTd>
                        <PhonoTd>ç</PhonoTd>
                        <PhonoTd>ʝ</PhonoTd>
                        <PhonoTd>x</PhonoTd>
                        <PhonoTd>ɣ</PhonoTd>
                        <PhonoTd>χ</PhonoTd>
                        <PhonoTd>ʁ</PhonoTd>
                        <PhonoTd>ħ</PhonoTd>
                        <PhonoTd>ʕ</PhonoTd>
                        <PhonoTd>h</PhonoTd>
                        <PhonoTd>ɦ</PhonoTd>
                    </tr>
                    <tr>
                        <th>Lateral Fricative</th>
                        <PhonoXTd />
                        <PhonoXTd />
                        <PhonoXTd />
                        <PhonoXTd />
                        <td></td>
                        <td></td>
                        <PhonoTd>ɬ</PhonoTd>
                        <PhonoTd>ɮ</PhonoTd>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <PhonoXTd />
                        <PhonoXTd />
                        <PhonoXTd />
                        <PhonoXTd />
                    </tr>
                    <tr>
                        <th>Approximant</th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <PhonoTd>ʋ</PhonoTd>
                        <td></td>
                        <td></td>
                        <td></td>
                        <PhonoTd>ɹ</PhonoTd>
                        <td></td>
                        <td></td>
                        <td></td>
                        <PhonoTd>ɻ</PhonoTd>
                        <td></td>
                        <PhonoTd>j</PhonoTd>
                        <td></td>
                        <PhonoTd>ɰ</PhonoTd>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <PhonoXTd />
                        <PhonoXTd />
                    </tr>
                    <tr>
                        <th>Lateral Approximant</th>
                        <PhonoXTd />
                        <PhonoXTd />
                        <PhonoXTd />
                        <PhonoXTd />
                        <td></td>
                        <td></td>
                        <td></td>
                        <PhonoTd>l</PhonoTd>
                        <td></td>
                        <td></td>
                        <td></td>
                        <PhonoTd>ɭ</PhonoTd>
                        <td></td>
                        <PhonoTd>ʎ</PhonoTd>
                        <td></td>
                        <PhonoTd>ʟ</PhonoTd>
                        <td></td>
                        <td></td>
                        <PhonoXTd />
                        <PhonoXTd />
                        <PhonoXTd />
                        <PhonoXTd />
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

function NonpulmonicConsonantsTable() {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Clicks</th>
                        <th>Voiced Implosives</th>
                        <th>Ejectives</th>
                    </tr>
                </thead>
            </table>
        </div>
    );
}

type PhonoTdProps = {
    children?: string;
};
function PhonoTd({children}: PhonoTdProps) {
    return (
        <td>
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

function PhonoXTd() {
    return <td style={{backgroundColor: 'gray'}}></td>;
}
