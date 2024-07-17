import { NavSection } from '../../common/Components.tsx';
import { Consonant, Vowel } from '../../common/Types.tsx';
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
            <Phono
              mannerOfArticulation="fricative"
              placeOfArticulation="bilabial">
              ɸ
            </Phono>
            <Phono
              mannerOfArticulation="fricative"
              placeOfArticulation="bilabial"
              voiced>
              β
            </Phono>
            <Phono
              mannerOfArticulation="fricative"
              placeOfArticulation="labiodental">
              f
            </Phono>
            <Phono
              mannerOfArticulation="fricative"
              placeOfArticulation="labiodental"
              voiced>
              v
            </Phono>
            <Phono
              mannerOfArticulation="fricative"
              placeOfArticulation="dental">
              θ
            </Phono>
            <Phono
              mannerOfArticulation="fricative"
              placeOfArticulation="dental"
              voiced>
              ð
            </Phono>
            <Phono
              mannerOfArticulation="fricative"
              placeOfArticulation="alveolar">
              s
            </Phono>
            <Phono
              mannerOfArticulation="fricative"
              placeOfArticulation="alveolar"
              voiced>
              z
            </Phono>
            <Phono
              mannerOfArticulation="fricative"
              placeOfArticulation="postalveolar">
              ʃ
            </Phono>
            <Phono
              mannerOfArticulation="fricative"
              placeOfArticulation="postalveolar"
              voiced>
              ʒ
            </Phono>
            <Phono
              mannerOfArticulation="fricative"
              placeOfArticulation="retroflex">
              ʂ
            </Phono>
            <Phono
              mannerOfArticulation="fricative"
              placeOfArticulation="retroflex"
              voiced>
              ʐ
            </Phono>
            <Phono
              mannerOfArticulation="fricative"
              placeOfArticulation="alveolopalatal">
              ɕ
            </Phono>
            <Phono
              mannerOfArticulation="fricative"
              placeOfArticulation="alveolopalatal"
              voiced>
              ʑ
            </Phono>
            <Phono
              mannerOfArticulation="fricative"
              placeOfArticulation="palatal">
              ç
            </Phono>
            <Phono
              mannerOfArticulation="fricative"
              placeOfArticulation="palatal"
              voiced>
              ʝ
            </Phono>
            <PhonoX />
            <PhonoX />
            <Phono
              mannerOfArticulation="fricative"
              placeOfArticulation="velar">
              x
            </Phono>
            <Phono
              mannerOfArticulation="fricative"
              placeOfArticulation="velar"
              voiced>
              ɣ
            </Phono>
            <Phono
              mannerOfArticulation="fricative"
              placeOfArticulation="uvular">
              χ
            </Phono>
            <Phono
              mannerOfArticulation="fricative"
              placeOfArticulation="uvular"
              voiced>
              ʁ
            </Phono>
            <Phono
              mannerOfArticulation="fricative"
              placeOfArticulation="pharyngeal">
              ħ
            </Phono>
            <Phono
              mannerOfArticulation="fricative"
              placeOfArticulation="pharyngeal"
              voiced>
              ʕ
            </Phono>
            <Phono
              mannerOfArticulation="fricative"
              placeOfArticulation="epiglottal">
              ʜ
            </Phono>
            <Phono
              mannerOfArticulation="fricative"
              placeOfArticulation="epiglottal"
              voiced>
              ʢ
            </Phono>
            <Phono
              mannerOfArticulation="fricative"
              placeOfArticulation="glottal">
              h
            </Phono>
            <Phono
              mannerOfArticulation="fricative"
              placeOfArticulation="glottal"
              voiced>
              ɦ
            </Phono>
            <Phono
              mannerOfArticulation="fricative"
              placeOfArticulation="other">
              ɧ
            </Phono>
            <PhonoX />
          </tr>
          <tr>
            <th>Lateral fricative</th>
            <PhonoX />
            <PhonoX />
            <PhonoX />
            <PhonoX />
            <Phono
              mannerOfArticulation="lateralfricative"
              placeOfArticulation="dental">
              ɬ&#x032a;
            </Phono>
            <Phono
              mannerOfArticulation="lateralfricative"
              placeOfArticulation="dental"
              voiced>
              ɮ&#x032a;
            </Phono>
            <Phono
              mannerOfArticulation="lateralfricative"
              placeOfArticulation="alveolar">
              ɬ
            </Phono>
            <Phono
              mannerOfArticulation="lateralfricative"
              placeOfArticulation="alveolar"
              voiced>
              ɮ
            </Phono>
            <PhonoX />
            <PhonoX />
            <Phono
              mannerOfArticulation="lateralfricative"
              placeOfArticulation="retroflex">
              ꞎ
            </Phono>
            <Phono
              mannerOfArticulation="lateralfricative"
              placeOfArticulation="retroflex"
              voiced>
              ɭ&#x031d;
            </Phono>
            <PhonoX />
            <PhonoX />
            <Phono
              mannerOfArticulation="lateralfricative"
              placeOfArticulation="palatal">
              ʎ&#x031d;&#x030a;
            </Phono>
            <Phono
              mannerOfArticulation="lateralfricative"
              placeOfArticulation="palatal"
              voiced>
              ʎ&#x031d;
            </Phono>
            <PhonoX />
            <PhonoX />
            <Phono
              mannerOfArticulation="lateralfricative"
              placeOfArticulation="velar">
              ʟ&#x031d;&#x030a;
            </Phono>
            <Phono
              mannerOfArticulation="lateralfricative"
              placeOfArticulation="velar"
              voiced>
              ʟ&#x031d;
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
          </tr>
          <tr>
            <th>Approximant</th>
            <Phono
              mannerOfArticulation="approximant"
              placeOfArticulation="bilabial">
              β&#x031e;&#x030a;
            </Phono>
            <Phono
              mannerOfArticulation="approximant"
              placeOfArticulation="bilabial"
              voiced>
              β&#x031e;
            </Phono>
            <Phono
              mannerOfArticulation="approximant"
              placeOfArticulation="labiodental">
              ʋ&#x0325;
            </Phono>
            <Phono
              mannerOfArticulation="approximant"
              placeOfArticulation="labiodental"
              voiced>
              ʋ
            </Phono>
            <Phono
              mannerOfArticulation="approximant"
              placeOfArticulation="dental">
              ð&#x031e;&#x030a;
            </Phono>
            <Phono
              mannerOfArticulation="approximant"
              placeOfArticulation="dental"
              voiced>
              ð&#x031e;
            </Phono>
            <Phono
              mannerOfArticulation="approximant"
              placeOfArticulation="alveolar">
              ɹ&#x0325;
            </Phono>
            <Phono
              mannerOfArticulation="approximant"
              placeOfArticulation="alveolar"
              voiced>
              ɹ
            </Phono>
            <PhonoX />
            <PhonoX />
            <Phono
              mannerOfArticulation="approximant"
              placeOfArticulation="retroflex">
              ɻ&#x030a;
            </Phono>
            <Phono
              mannerOfArticulation="approximant"
              placeOfArticulation="retroflex"
              voiced>
              ɻ
            </Phono>
            <PhonoX />
            <PhonoX />
            <Phono
              mannerOfArticulation="approximant"
              placeOfArticulation="palatal">
              j&#x030a;
            </Phono>
            <Phono
              mannerOfArticulation="approximant"
              placeOfArticulation="palatal"
              voiced>
              j
            </Phono>
            <Phono
              mannerOfArticulation="approximant"
              placeOfArticulation="labiovelar">
              ʍ
            </Phono>
            <Phono
              mannerOfArticulation="approximant"
              placeOfArticulation="labiovelar"
              voiced>
              w
            </Phono>
            <Phono
              mannerOfArticulation="approximant"
              placeOfArticulation="velar">
              ɰ&#x030a;
            </Phono>
            <Phono
              mannerOfArticulation="approximant"
              placeOfArticulation="velar"
              voiced>
              ɰ
            </Phono>
            <Phono
              mannerOfArticulation="approximant"
              placeOfArticulation="uvular">
              ʁ&#x0325;
            </Phono>
            <Phono
              mannerOfArticulation="approximant"
              placeOfArticulation="uvular"
              voiced>
              ʁ
            </Phono>
            <PhonoX />
            <PhonoX />
            <PhonoX />
            <PhonoX />
            <PhonoX />
            <PhonoX />
            <Phono
              mannerOfArticulation="approximant"
              placeOfArticulation="other">
              ɥ&#x030a;
            </Phono>
            <Phono
              mannerOfArticulation="approximant"
              placeOfArticulation="other"
              voiced>
              ɥ
            </Phono>
          </tr>
          <tr>
            <th>Lateral approximant</th>
            <PhonoX />
            <PhonoX />
            <PhonoX />
            <PhonoX />
            <Phono
              mannerOfArticulation="lateralapproximant"
              placeOfArticulation="dental">
              l&#x032a;&#x030a;
            </Phono>
            <Phono
              mannerOfArticulation="lateralapproximant"
              placeOfArticulation="dental"
              voiced>
              l&#x032a;
            </Phono>
            <Phono
              mannerOfArticulation="lateralapproximant"
              placeOfArticulation="alveolar">
              l&#x0325;
            </Phono>
            <Phono
              mannerOfArticulation="lateralapproximant"
              placeOfArticulation="alveolar"
              voiced>
              l
            </Phono>
            <PhonoX />
            <PhonoX />
            <Phono
              mannerOfArticulation="lateralapproximant"
              placeOfArticulation="retroflex">
              ɭ&#x030a;
            </Phono>
            <Phono
              mannerOfArticulation="lateralapproximant"
              placeOfArticulation="retroflex"
              voiced>
              ɭ
            </Phono>
            <Phono
              mannerOfArticulation="lateralapproximant"
              placeOfArticulation="alveolopalatal">
              ȴ&#x030a;
            </Phono>
            <Phono
              mannerOfArticulation="lateralapproximant"
              placeOfArticulation="alveolopalatal"
              voiced>
              ȴ
            </Phono>
            <Phono
              mannerOfArticulation="lateralapproximant"
              placeOfArticulation="palatal">
              ʎ&#x0325;
            </Phono>
            <Phono
              mannerOfArticulation="lateralapproximant"
              placeOfArticulation="palatal"
              voiced>
              ʎ
            </Phono>
            <PhonoX />
            <PhonoX />
            <Phono
              mannerOfArticulation="lateralapproximant"
              placeOfArticulation="velar">
              ʟ&#x0325;
            </Phono>
            <Phono
              mannerOfArticulation="lateralapproximant"
              placeOfArticulation="velar"
              voiced>
              ʟ
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
              mannerOfArticulation="lateralapproximant"
              placeOfArticulation="other">
              ɫ&#x0325;
            </Phono>
            <Phono
              mannerOfArticulation="lateralapproximant"
              placeOfArticulation="other"
              voiced>
              ɫ
            </Phono>
          </tr>
          <tr>
            <th>Click</th>
            <Phono
              colSpan={2}
              mannerOfArticulation="click"
              placeOfArticulation="bilabial">
              ʘ
            </Phono>
            <PhonoX colSpan={2} />
            <Phono
              colSpan={2}
              mannerOfArticulation="click"
              placeOfArticulation="dental">
              ǀ
            </Phono>
            <Phono
              colSpan={2}
              mannerOfArticulation="click"
              placeOfArticulation="alveolar">
              ǃ
            </Phono>
            <PhonoX colSpan={2} />
            <Phono
              colSpan={2}
              mannerOfArticulation="click"
              placeOfArticulation="retroflex">
              ‼
            </Phono>
            <Phono
              colSpan={2}
              mannerOfArticulation="click"
              placeOfArticulation="alveolopalatal">
              ǁ
            </Phono>
            <Phono
              colSpan={2}
              mannerOfArticulation="click"
              placeOfArticulation="palatal">
              ǂ
            </Phono>
            <PhonoX colSpan={2} />
            <Phono
              colSpan={2}
              mannerOfArticulation="click"
              placeOfArticulation="velar">
              ʞ
            </Phono>
            <PhonoX colSpan={2} />
            <PhonoX colSpan={2} />
            <PhonoX colSpan={2} />
            <PhonoX colSpan={2} />
            <PhonoX colSpan={2} />
          </tr>
          <tr>
            <th>Implosive</th>
            <Phono
              mannerOfArticulation="implosive"
              placeOfArticulation="bilabial">
              ƥ
            </Phono>
            <Phono
              mannerOfArticulation="implosive"
              placeOfArticulation="bilabial"
              voiced>
              ɓ
            </Phono>
            <PhonoX />
            <PhonoX />
            <PhonoX />
            <PhonoX />
            <Phono
              mannerOfArticulation="implosive"
              placeOfArticulation="alveolar">
              ƭ
            </Phono>
            <Phono
              mannerOfArticulation="implosive"
              placeOfArticulation="alveolar"
              voiced>
              ɗ
            </Phono>
            <PhonoX />
            <PhonoX />
            <PhonoX />
            <Phono
              mannerOfArticulation="implosive"
              placeOfArticulation="retroflex"
              voiced>
              ᶑ
            </Phono>
            <PhonoX />
            <PhonoX />
            <Phono
              mannerOfArticulation="implosive"
              placeOfArticulation="palatal">
              ƈ
            </Phono>
            <Phono
              mannerOfArticulation="implosive"
              placeOfArticulation="palatal"
              voiced>
              ʄ
            </Phono>
            <PhonoX />
            <PhonoX />
            <Phono
              mannerOfArticulation="implosive"
              placeOfArticulation="velar">
              ƙ
            </Phono>
            <Phono
              mannerOfArticulation="implosive"
              placeOfArticulation="velar"
              voiced>
              ɠ
            </Phono>
            <Phono
              mannerOfArticulation="implosive"
              placeOfArticulation="uvular">
              ʠ
            </Phono>
            <Phono
              mannerOfArticulation="implosive"
              placeOfArticulation="uvular"
              voiced>
              ʛ
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
            <Phono
              vowel
              height="close"
              backness="front">
              i
            </Phono>
            <Phono
              vowel
              height="close"
              backness="front"
              rounded>
              y
            </Phono>
            <PhonoX />
            <PhonoX />
            <Phono
              vowel
              height="close"
              backness="central">
              ɨ
            </Phono>
            <Phono
              vowel
              height="close"
              backness="central"
              rounded>
              ʉ
            </Phono>
            <PhonoX />
            <PhonoX />
            <Phono
              vowel
              height="close"
              backness="back">
              ɯ
            </Phono>
            <Phono
              vowel
              height="close"
              backness="back"
              rounded>
              u
            </Phono>
          </tr>
          <tr>
            <th></th>
            <PhonoX />
            <PhonoX />
            <Phono
              vowel
              height="highclosemid"
              backness="frontcentral">
              ɪ
            </Phono>
            <Phono
              vowel
              height="highclosemid"
              backness="frontcentral"
              rounded>
              ʏ
            </Phono>
            <PhonoX />
            <PhonoX />
            <PhonoX />
            <Phono
              vowel
              height="highclosemid"
              backness="centralback"
              rounded>
              ʊ
            </Phono>
            <PhonoX />
            <PhonoX />
          </tr>
          <tr>
            <th>Close-mid</th>
            <Phono
              vowel
              height="closemid"
              backness="front">
              e
            </Phono>
            <Phono
              vowel
              height="closemid"
              backness="front"
              rounded>
              ø
            </Phono>
            <PhonoX />
            <PhonoX />
            <Phono
              vowel
              height="closemid"
              backness="central">
              ɘ
            </Phono>
            <Phono
              vowel
              height="closemid"
              backness="central"
              rounded>
              ɵ
            </Phono>
            <PhonoX />
            <PhonoX />
            <Phono
              vowel
              height="closemid"
              backness="back">
              ɤ
            </Phono>
            <Phono
              vowel
              height="closemid"
              backness="back"
              rounded>
              o
            </Phono>
          </tr>
          <tr>
            <th></th>
            <PhonoX />
            <PhonoX />
            <PhonoX />
            <PhonoX />
            <Phono
              colSpan={2}
              vowel
              height="mid"
              backness="central">
              ə
            </Phono>
            <PhonoX />
            <PhonoX />
            <PhonoX />
            <PhonoX />
          </tr>
          <tr>
            <th>Open-mid</th>
            <Phono
              vowel
              height="openmid"
              backness="front">
              ɛ
            </Phono>
            <Phono
              vowel
              height="openmid"
              backness="front"
              rounded>
              œ
            </Phono>
            <PhonoX />
            <PhonoX />
            <Phono
              vowel
              height="openmid"
              backness="central">
              ɜ
            </Phono>
            <Phono
              vowel
              height="openmid"
              backness="central"
              rounded>
              ɞ
            </Phono>
            <PhonoX />
            <PhonoX />
            <Phono
              vowel
              height="openmid"
              backness="back">
              ʌ
            </Phono>
            <Phono
              vowel
              height="openmid"
              backness="back"
              rounded>
              ɔ
            </Phono>
          </tr>
          <tr>
            <th></th>
            <Phono
              vowel
              height="lowopenmid"
              backness="front">
              æ
            </Phono>
            <PhonoX />
            <PhonoX />
            <PhonoX />
            <Phono
              vowel
              height="lowopenmid"
              backness="central">
              ɐ
            </Phono>
            <PhonoX />
            <PhonoX />
            <PhonoX />
            <PhonoX />
            <PhonoX />
          </tr>
          <tr>
            <th>Open</th>
            <Phono
              vowel
              height="open"
              backness="front">
              a
            </Phono>
            <Phono
              vowel
              height="open"
              backness="front"
              rounded>
              ɶ
            </Phono>
            <PhonoX />
            <PhonoX />
            <PhonoX />
            <PhonoX />
            <PhonoX />
            <PhonoX />
            <Phono
              vowel
              height="open"
              backness="back">
              ɑ
            </Phono>
            <Phono
              vowel
              height="open"
              backness="back"
              rounded>
              ɒ
            </Phono>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function Phono(props: {
  colSpan?: number;
  vowel: true;
  height: string;
  backness: string;
  rounded?: boolean;
  children: string;
}): React.ReactNode;
function Phono({
  colSpan,
  mannerOfArticulation,
  placeOfArticulation,
  voiced,
  children
}: {
  colSpan?: number;
  mannerOfArticulation: string;
  placeOfArticulation: string;
  voiced?: boolean;
  children: string;
}): React.ReactNode;
function Phono({
  colSpan,
  vowel,
  height,
  backness,
  rounded = false,
  mannerOfArticulation,
  placeOfArticulation,
  voiced = false,
  children
}: {
  colSpan?: number;
  vowel?: boolean;
  height?: string;
  backness?: string;
  rounded?: boolean;
  mannerOfArticulation?: string;
  placeOfArticulation?: string;
  voiced?: boolean;
  children?: string;
}): React.ReactNode {
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
            vowel ?
              ({
                id: time + '-' + children,
                ipa: children,
                base: children,
                romanization: '',
                type: 'vowel',
                diacritics: ['', ''],
                allophones: [],
                allophoneOf: '',
                height: height,
                backness: backness,
                rounded: rounded
              } as Vowel)
            : ({
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
              } as Consonant)
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
