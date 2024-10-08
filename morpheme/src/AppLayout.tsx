import ScreensLayout from './ScreensLayout.tsx';
import TopBar from './TopBar';
import Widgets from './Widgets';

export default function AppLayout() {
  // eslint-disable-next-line prefer-const
  return (
    <div
      style={{
        margin: '0',
        position: 'relative',
        top: '0',
        left: '0',
        height: '100vh',
        width: '100vw',
        display: 'grid',
        gridTemplateRows: '5em 3em 1fr 1em 1fr',
        gridTemplateColumns: '1fr 1em 1fr',
        gridTemplateAreas: `'a a a' 'b b b' 'a0 c a1' 'd d d' 'a2 e a3'`,
        overflow: 'scroll',
        backgroundColor: 'lightgray',
      }}>
      <TopBar />
      <Widgets />
      <ScreensLayout />
    </div>
  );
}
