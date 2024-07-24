import { TbPlus } from 'react-icons/tb';
import { IconButton } from '../common/Components.tsx';

export default function DeclensionsScreen() {
  return (
    <div
      style={{
        display: 'flex',
        height: '100%'
      }}>
      <Declensions />
    </div>
  );
}

function Declensions() {
  return (
    <div
      style={{
        width: '12em',
        display: 'flex',
        backgroundColor: 'lightgray',
        flexDirection: 'column',
        padding: '0.5em'
      }}>
      <div
        style={{
          backgroundColor: 'white',
          marginBottom: '1em',
          display: 'flex',
          justifyContent: 'space-around'
        }}>
        <IconButton>
          <TbPlus size={20} />
        </IconButton>
      </div>
    </div>
  );
}
