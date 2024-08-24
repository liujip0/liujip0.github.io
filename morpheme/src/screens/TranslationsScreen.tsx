export default function TranslationsScreen() {
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
      }}>
      <Translations />
      <TranslationEditor />
    </div>
  );
}

function Translations() {
  return (
    <div
      style={{
        width: '12em',
        display: 'flex',
        backgroundColor: 'lightgray',
        flexDirection: 'column',
        padding: '0.5em',
      }}>
      <div
        style={{
          backgroundColor: 'white',
          marginBottom: '1em',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}></div>
      <div
        style={{
          backgroundColor: 'white',
          flex: '1',
          overflowY: 'scroll',
        }}>
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
          }}></div>
      </div>
    </div>
  );
}

function TranslationEditor() {
  return (
    <div
      style={{
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
      }}>
      <div
        style={{
          border: '1px solid black',
          margin: '1em',
          padding: '0.7em',
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'scroll',
        }}></div>
    </div>
  );
}
