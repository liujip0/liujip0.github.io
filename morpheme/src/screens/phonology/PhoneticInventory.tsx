import { NavSection } from '../../common/Components.tsx';
import { Phoneme } from '../../common/Types.tsx';
import { useStoreState } from '../../common/Vals.tsx';

export default function PhoneticInventory() {
  const conlang = useStoreState((s) => s.conlang);
  console.log(conlang.phonology.inventory);
  return (
    <>
      <NavSection id="inventory">Phonetic Inventory</NavSection>
      <p>
        Select sounds to add to {conlang.name}&apos;s inventory. Use the next
        section to add diacritics and set romanizations.
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
            <Phono
              mannerOfArticulation="plosive"
              placeOfArticulation="bilabial">
              p
            </Phono>
            <Phono
              mannerOfArticulation="plosive"
              placeOfArticulation="bilabial"
              voiced>
              b
            </Phono>
            <Phono
              mannerOfArticulation="plosive"
              placeOfArticulation="labiodental">
              p̪
            </Phono>
            <Phono
              mannerOfArticulation="plosive"
              placeOfArticulation="labiodental"
              voiced>
              b̪
            </Phono>
            <Phono
              mannerOfArticulation="plosive"
              placeOfArticulation="dental">
              t̪
            </Phono>
            <Phono
              mannerOfArticulation="plosive"
              placeOfArticulation="dental"
              voiced>
              d̪
            </Phono>
            <Phono
              mannerOfArticulation="plosive"
              placeOfArticulation="alveolar">
              t
            </Phono>
            <Phono
              mannerOfArticulation="plosive"
              placeOfArticulation="alveolar"
              voiced>
              d
            </Phono>
            <PhonoX />
            <PhonoX />
            <Phono
              mannerOfArticulation="plosive"
              placeOfArticulation="retroflex">
              ʈ
            </Phono>
            <Phono
              mannerOfArticulation="plosive"
              placeOfArticulation="retroflex"
              voiced>
              ɖ
            </Phono>
            <Phono
              mannerOfArticulation="plosive"
              placeOfArticulation="alveolopalatal">
              ȶ
            </Phono>
            <Phono
              mannerOfArticulation="plosive"
              placeOfArticulation="alveolopalatal"
              voiced>
              ȡ
            </Phono>
            <Phono
              mannerOfArticulation="plosive"
              placeOfArticulation="palatal">
              c
            </Phono>
            <Phono
              mannerOfArticulation="plosive"
              placeOfArticulation="palatal"
              voiced>
              ɟ
            </Phono>
            <PhonoX />
            <PhonoX />
            <Phono
              mannerOfArticulation="plosive"
              placeOfArticulation="velar">
              k
            </Phono>
            <Phono
              mannerOfArticulation="plosive"
              placeOfArticulation="velar"
              voiced>
              g
            </Phono>
            <Phono
              mannerOfArticulation="plosive"
              placeOfArticulation="uvular">
              q
            </Phono>
            <Phono
              mannerOfArticulation="plosive"
              placeOfArticulation="uvular"
              voiced>
              ɢ
            </Phono>
            <PhonoX />
            <PhonoX />
            <Phono
              mannerOfArticulation="plosive"
              placeOfArticulation="epiglottal">
              ʡ
            </Phono>
            <PhonoX />
            <Phono
              mannerOfArticulation="plosive"
              placeOfArticulation="glottal">
              ʔ
            </Phono>
            <PhonoX />
            <PhonoX />
            <PhonoX />
          </tr>
          <tr>
            <th>Nasal</th>
            <PhonoX />
            <Phono
              mannerOfArticulation="nasal"
              placeOfArticulation="bilabial"
              voiced>
              m
            </Phono>
            <PhonoX />
            <Phono
              mannerOfArticulation="nasal"
              placeOfArticulation="labiodental"
              voiced>
              ɱ
            </Phono>
            <PhonoX />
            <PhonoX />
            <PhonoX />
            <Phono
              mannerOfArticulation="nasal"
              placeOfArticulation="alveolar"
              voiced>
              n
            </Phono>
            <PhonoX />
            <PhonoX />
            <PhonoX />
            <Phono
              mannerOfArticulation="nasal"
              placeOfArticulation="retroflex"
              voiced>
              ɳ
            </Phono>
            <PhonoX />
            <Phono
              mannerOfArticulation="nasal"
              placeOfArticulation="alveolopalatal"
              voiced>
              ȵ
            </Phono>
            <PhonoX />
            <Phono
              mannerOfArticulation="nasal"
              placeOfArticulation="palatal"
              voiced>
              ɲ
            </Phono>
            <PhonoX />
            <PhonoX />
            <PhonoX />
            <Phono
              mannerOfArticulation="nasal"
              placeOfArticulation="velar"
              voiced>
              ŋ
            </Phono>
            <PhonoX />
            <Phono
              mannerOfArticulation="nasal"
              placeOfArticulation="uvular"
              voiced>
              ɴ
            </Phono>
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
            <Phono
              mannerOfArticulation="trill"
              placeOfArticulation="bilabial">
              ʙ&#x0325;
            </Phono>
            <Phono
              mannerOfArticulation="trill"
              placeOfArticulation="bilabial"
              voiced>
              ʙ
            </Phono>
            <PhonoX />
            <PhonoX />
            <Phono
              mannerOfArticulation="trill"
              placeOfArticulation="dental">
              r&#x032a;&#x030a;
            </Phono>
            <Phono
              mannerOfArticulation="trill"
              placeOfArticulation="dental"
              voiced>
              r&#x032a;
            </Phono>
            <Phono
              mannerOfArticulation="trill"
              placeOfArticulation="alveolar">
              r&#x0325;
            </Phono>
            <Phono
              mannerOfArticulation="trill"
              placeOfArticulation="alveolar"
              voiced>
              r
            </Phono>
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
            <Phono
              mannerOfArticulation="trill"
              placeOfArticulation="uvular">
              ʀ&#x0325;
            </Phono>
            <Phono
              mannerOfArticulation="trill"
              placeOfArticulation="uvular"
              voiced>
              ʀ
            </Phono>
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
            <Phono
              mannerOfArticulation="tapflap"
              placeOfArticulation="bilabial">
              ⱱ&#x031f;&#x030a;
            </Phono>
            <Phono
              mannerOfArticulation="tapflap"
              placeOfArticulation="bilabial"
              voiced>
              ⱱ&#x031f;
            </Phono>
            <Phono
              mannerOfArticulation="tapflap"
              placeOfArticulation="labiodental">
              ⱱ&#x0325;
            </Phono>
            <Phono
              mannerOfArticulation="tapflap"
              placeOfArticulation="labiodental"
              voiced>
              ⱱ
            </Phono>
            <Phono
              mannerOfArticulation="tapflap"
              placeOfArticulation="dental">
              ɾ&#x032a;&#x030a;
            </Phono>
            <Phono
              mannerOfArticulation="tapflap"
              placeOfArticulation="dental"
              voiced>
              ɾ&#x032a;
            </Phono>
            <Phono
              mannerOfArticulation="tapflap"
              placeOfArticulation="alveolar">
              ɾ&#x0325;
            </Phono>
            <Phono
              mannerOfArticulation="tapflap"
              placeOfArticulation="alveolar"
              voiced>
              ɾ
            </Phono>
            <PhonoX />
            <PhonoX />
            <Phono
              mannerOfArticulation="tapflap"
              placeOfArticulation="retroflex">
              ɽ&#x030a;
            </Phono>
            <Phono
              mannerOfArticulation="tapflap"
              placeOfArticulation="retroflex"
              voiced>
              ɽ
            </Phono>
            <PhonoX />
            <PhonoX />
            <PhonoX />
            <PhonoX />
            <PhonoX />
            <PhonoX />
            <PhonoX />
            <PhonoX />
            <Phono
              mannerOfArticulation="tapflap"
              placeOfArticulation="uvular">
              q&#x0306;
            </Phono>
            <Phono
              mannerOfArticulation="tapflap"
              placeOfArticulation="uvular"
              voiced>
              ɢ&#x0306;
            </Phono>
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
            <Phono
              mannerOfArticulation="lateralflap"
              placeOfArticulation="dental">
              ɺ&#x032a;&#x030a;
            </Phono>
            <Phono
              mannerOfArticulation="lateralflap"
              placeOfArticulation="dental"
              voiced>
              ɺ&#x032a;
            </Phono>
            <Phono
              mannerOfArticulation="lateralflap"
              placeOfArticulation="alveolar">
              ɺ&#x0325;
            </Phono>
            <Phono
              mannerOfArticulation="lateralflap"
              placeOfArticulation="alveolar"
              voiced>
              ɺ
            </Phono>
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
            <Phono mannerOfArticulation="fricative">ɸ</Phono>
            <Phono mannerOfArticulation="fricative">β</Phono>
            <Phono mannerOfArticulation="fricative">f</Phono>
            <Phono mannerOfArticulation="fricative">v</Phono>
            <Phono mannerOfArticulation="fricative">θ</Phono>
            <Phono mannerOfArticulation="fricative">ð</Phono>
            <Phono mannerOfArticulation="fricative">s</Phono>
            <Phono mannerOfArticulation="fricative">z</Phono>
            <Phono mannerOfArticulation="fricative">ʃ</Phono>
            <Phono mannerOfArticulation="fricative">ʒ</Phono>
            <Phono mannerOfArticulation="fricative">ʂ</Phono>
            <Phono mannerOfArticulation="fricative">ʐ</Phono>
            <Phono mannerOfArticulation="fricative">ɕ</Phono>
            <Phono mannerOfArticulation="fricative">ʑ</Phono>
            <Phono mannerOfArticulation="fricative">ç</Phono>
            <Phono mannerOfArticulation="fricative">ʝ</Phono>
            <PhonoX />
            <PhonoX />
            <Phono mannerOfArticulation="fricative">x</Phono>
            <Phono mannerOfArticulation="fricative">ɣ</Phono>
            <Phono mannerOfArticulation="fricative">χ</Phono>
            <Phono mannerOfArticulation="fricative">ʁ</Phono>
            <Phono mannerOfArticulation="fricative">ħ</Phono>
            <Phono mannerOfArticulation="fricative">ʕ</Phono>
            <Phono mannerOfArticulation="fricative">ʜ</Phono>
            <Phono mannerOfArticulation="fricative">ʢ</Phono>
            <Phono mannerOfArticulation="fricative">h</Phono>
            <Phono mannerOfArticulation="fricative">ɦ</Phono>
            <Phono mannerOfArticulation="fricative">ɧ</Phono>
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

function Phono({
  colSpan,
  vowel,
  height,
  backness,
  children
}: {
  colSpan?: number;
  vowel: true;
  children: string;
  height: string;
  backness: string;
}): React.ReactNode;
function Phono({
  colSpan,
  mannerOfArticulation,
  placeOfArticulation,
  children
}: {
  colSpan?: number;
  children: string;
  mannerOfArticulation: string;
  placeOfArticulation: string;
  voiced?: boolean;
}): React.ReactNode;
function Phono({
  colSpan,
  vowel = false,
  height,
  backness,
  mannerOfArticulation,
  placeOfArticulation,
  voiced = false,
  children
}: {
  colSpan: number;
  vowel?: boolean;
  height?: string;
  backness?: string;
  mannerOfArticulation?: string;
  placeOfArticulation?: string;
  voiced?: boolean;
  children?: string;
}) {
  const conlang = useStoreState((s) => s.conlang);
  const changeConlang = useStoreState((s) => s.changeConlang);
  const time = new Date().getMilliseconds();
  return (
    <td
      onClick={() => {
        let newInventory = conlang.phonology.inventory;
        if (newInventory.some((item) => item.base === children)) {
          newInventory = newInventory.filter((item) => item.base !== children);
        } else {
          newInventory.push(
            (vowel ?
              {
                id: time + '-' + children,
                ipa: children,
                base: children,
                romanization: '',
                type: 'vowel',
                diacritics: ['', ''],
                allophones: [],
                allophoneOf: '',
                height: height,
                backness: backness
              }
            : {
                id: time + '-' + children,
                ipa: children,
                base: children,
                romanization: '',
                type: 'consonant',
                diacritics: ['', ''],
                allophones: [],
                allophoneOf: '',
                mannerOfArticulation: mannerOfArticulation,
                placeOfArticulation: placeOfArticulation,
                voiced: voiced
              }) as Phoneme
          );
        }
        changeConlang(['phonology', 'inventory'], newInventory);
      }}
      colSpan={colSpan}
      className="charis"
      style={{
        backgroundColor:
          conlang.phonology.inventory.some((item) => item.base === children) ?
            'lightblue'
          : 'white'
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
