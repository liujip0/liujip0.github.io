import { ContentBlock, ContentState } from 'draft-js';

type CustomBlockProps = {
  block: ContentBlock;
  contentState: ContentState;
};

export function CodeBlock({ block }: CustomBlockProps) {
  return (
    <pre
      style={{
        backgroundColor: 'lightgray',
        padding: '4px 6px',
        borderRadius: '4px',
      }}>
      <code className="monospace">{block.getText()}</code>
    </pre>
  );
}

type TextAlignProps = {
  blockProps: {
    align: 'left' | 'center' | 'right' | 'justify';
  };
};
export function TextAlign({
  block,
  blockProps,
}: CustomBlockProps & TextAlignProps) {
  const { align } = blockProps;
  return (
    <div
      style={{
        textAlign: align,
      }}>
      {block.getText()}
    </div>
  );
}

export function HorizontalRule() {
  console.log('hr');
  return <hr />;
}

export function Image({ block, contentState }: CustomBlockProps) {
  const entity = contentState.getEntity(block.getEntityAt(0));
  const { src } = entity.getData();
  return <img src={src} />;
}
