import {NavSection} from '../../common/CommonFuncs.tsx';

export default function Phonemes() {
    return (
        <>
            <NavSection id="phonemes">Phonemes</NavSection>
            <p>Manage phonemes, allophones, etc.</p>
            <PhonemesList />
        </>
    );
}

function PhonemesList() {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <td></td>
                        <th>IPA</th>
                    </tr>
                </thead>
            </table>
        </div>
    );
}
