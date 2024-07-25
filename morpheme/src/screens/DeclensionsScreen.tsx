import { useState } from 'react';
import {
  TbPlus,
  TbTrash,
  TbTriangle,
  TbTriangleInverted
} from 'react-icons/tb';
import { IconButton, NavBar } from '../common/Components.tsx';
import { useStoreState } from '../common/Vals.tsx';

export default function DeclensionsScreen() {
  const [currentDeclension, setCurrentDeclension] = useState('');
  return (
    <>
      <NavBar sections={[{ id: 'noundeclensions', label: 'Nouns' }]} />
      <div
        style={{
          display: 'flex',
          height: '100%'
        }}>
        <Declensions
          currentDeclension={currentDeclension}
          setCurrentDeclension={setCurrentDeclension}
        />
      </div>
    </>
  );
}

type DeclensionsProps = {
  currentDeclension: string;
  setCurrentDeclension: (value: string) => void;
};
function Declensions({
  currentDeclension,
  setCurrentDeclension
}: DeclensionsProps) {
  const conlang = useStoreState((s) => s.conlang);
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
        <IconButton>
          <TbTriangle size={20} />
        </IconButton>
        <IconButton>
          <TbTriangleInverted size={20} />
        </IconButton>
        <IconButton>
          <TbTrash size={20} />
        </IconButton>
      </div>
      <div
        style={{
          backgroundColor: 'white',
          flex: '1',
          overflowY: 'scroll'
        }}>
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column'
          }}>
          {conlang.declensions.list.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor:
                  item.id === currentDeclension ? 'darkgray' : 'white',
                paddingLeft: '0.3em',
                cursor: 'pointer'
              }}
              onClick={() => {
                setCurrentDeclension(item.id);
              }}>
              {item.id}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
