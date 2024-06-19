import {
  ContentBlock,
  Editor,
  EditorState,
  RawDraftContentState,
  RichUtils,
  convertFromRaw
} from 'draft-js';
import React, { MouseEventHandler, useEffect, useState } from 'react';
import {
  MdCode,
  MdExpandMore,
  MdFormatAlignCenter,
  MdFormatAlignJustify,
  MdFormatAlignLeft,
  MdFormatAlignRight,
  MdFormatBold,
  MdFormatClear,
  MdFormatIndentDecrease,
  MdFormatIndentIncrease,
  MdFormatItalic,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdFormatQuote,
  MdFormatUnderlined,
  MdHorizontalRule,
  MdRedo,
  MdStrikethroughS,
  MdSubscript,
  MdSuperscript,
  MdUndo
} from 'react-icons/md';
import { RiFileCodeLine } from 'react-icons/ri';
import {
  TbH1,
  TbH2,
  TbH3,
  TbH4,
  TbH5,
  TbH6,
  TbHeading,
  TbHeadingOff
} from 'react-icons/tb';

const inlineMap = {
  CODE: {
    backgroundColor: 'lightgray',
    padding: '4px 6px',
    borderRadius: '4px',
    fontFamily: `'Roboto Mono', 'Courier New', Courier, monospace`
  },
  SUPERSCRIPT: {
    fontSize: '0.83em',
    verticalAlign: 'super'
  },
  SUBSCRIPT: {
    fontSize: '0.83em',
    verticalAlign: 'sub'
  }
};
interface CustomCodeBlockProps {
  block: ContentBlock;
  contentState: unknown;
}
const CustomCodeBlock: React.FC<CustomCodeBlockProps> = ({ block }) => {
  const text = block.getText();
  return (
    <pre
      style={{
        backgroundColor: 'lightgray',
        padding: '4px 6px',
        borderRadius: '4px'
      }}>
      <code className="monospace">{text}</code>
    </pre>
  );
};
const blockRendererFn = (contentBlock: ContentBlock) => {
  if (contentBlock.getType() === 'code-block') {
    return {
      component: CustomCodeBlock,
      editable: true
    };
  }
  return null;
};

type WysiwygProps = {
  value: RawDraftContentState;
  setValue: (value: EditorState) => void;
};
export default function Wysiwyg({ value, setValue }: WysiwygProps) {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  useEffect(() => {
    setEditorState(EditorState.createWithContent(convertFromRaw(value)));
  }, [value]);
  const handleEditorChange = (state: EditorState) => {
    setEditorState(state);
    setValue(state);
  };
  const handleKeyCommand = (command: string, state: EditorState) => {
    const newState = RichUtils.handleKeyCommand(state, command);
    if (newState) {
      handleEditorChange(newState);
      return 'handled';
    }
    return 'not-handled';
  };
  const toggleInlineStyle = (style: string) => {
    handleEditorChange(RichUtils.toggleInlineStyle(editorState, style));
  };
  const toggleBlockType = (blockType: string) => {
    handleEditorChange(RichUtils.toggleBlockType(editorState, blockType));
  };
  return (
    <div
      style={{
        border: '1px solid black',
        margin: '1em',
        padding: '0.7em',
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'scroll'
      }}>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          marginBottom: '1em'
        }}>
        <WysiwygSection>
          <WysiwygIcon
            onClick={(event) => {
              event.preventDefault();
              toggleInlineStyle('BOLD');
            }}>
            <MdFormatBold />
          </WysiwygIcon>
          <WysiwygIcon
            onClick={(event) => {
              event.preventDefault();
              toggleInlineStyle('ITALIC');
            }}>
            <MdFormatItalic />
          </WysiwygIcon>
          <WysiwygIcon
            onClick={(event) => {
              event.preventDefault();
              toggleInlineStyle('UNDERLINE');
            }}>
            <MdFormatUnderlined />
          </WysiwygIcon>
          <WysiwygIcon
            onClick={(event) => {
              event.preventDefault();
              toggleInlineStyle('STRIKETHROUGH');
            }}>
            <MdStrikethroughS />
          </WysiwygIcon>
          <WysiwygIcon
            onClick={(event) => {
              event.preventDefault();
              toggleInlineStyle('SUPERSCRIPT');
            }}>
            <MdSuperscript />
          </WysiwygIcon>
          <WysiwygIcon
            onClick={(event) => {
              event.preventDefault();
              toggleInlineStyle('SUBSCRIPT');
            }}>
            <MdSubscript />
          </WysiwygIcon>
        </WysiwygSection>

        <WysiwygSection>
          <WysiwygIcon
            onClick={(event) => {
              event.preventDefault();
              toggleInlineStyle('CODE');
            }}>
            <MdCode />
          </WysiwygIcon>
          <WysiwygIcon
            onClick={(event) => {
              event.preventDefault();
              toggleBlockType('code-block');
            }}>
            <RiFileCodeLine />
          </WysiwygIcon>
          <WysiwygIcon
            onClick={(event) => {
              event.preventDefault();
              toggleBlockType('blockquote');
            }}>
            <MdFormatQuote />
          </WysiwygIcon>
        </WysiwygSection>

        <WysiwygSection>
          <WysiwygSubmenu
            icon={
              <WysiwygIcon>
                <TbHeading />
              </WysiwygIcon>
            }>
            <WysiwygSection>
              <WysiwygIcon
                onClick={(event) => {
                  event.preventDefault();
                  toggleBlockType('unstyled');
                }}>
                <TbHeadingOff />
              </WysiwygIcon>
              <WysiwygIcon
                onClick={(event) => {
                  event.preventDefault();
                  toggleBlockType('header-one');
                }}>
                <TbH1 />
              </WysiwygIcon>
              <WysiwygIcon
                onClick={(event) => {
                  event.preventDefault();
                  toggleBlockType('header-two');
                }}>
                <TbH2 />
              </WysiwygIcon>
              <WysiwygIcon
                onClick={(event) => {
                  event.preventDefault();
                  toggleBlockType('header-three');
                }}>
                <TbH3 />
              </WysiwygIcon>
              <WysiwygIcon
                onClick={(event) => {
                  event.preventDefault();
                  toggleBlockType('header-four');
                }}>
                <TbH4 />
              </WysiwygIcon>
              <WysiwygIcon
                onClick={(event) => {
                  event.preventDefault();
                  toggleBlockType('header-five');
                }}>
                <TbH5 />
              </WysiwygIcon>
              <WysiwygIcon
                onClick={(event) => {
                  event.preventDefault();
                  toggleBlockType('header-six');
                }}>
                <TbH6 />
              </WysiwygIcon>
            </WysiwygSection>
          </WysiwygSubmenu>
        </WysiwygSection>

        <WysiwygSection>
          <WysiwygSubmenu icon={<MdFormatAlignLeft />}>
            <WysiwygSection>
              <WysiwygIcon>
                <MdFormatAlignLeft />
              </WysiwygIcon>
              <WysiwygIcon>
                <MdFormatAlignCenter />
              </WysiwygIcon>
              <WysiwygIcon>
                <MdFormatAlignRight />
              </WysiwygIcon>
              <WysiwygIcon>
                <MdFormatAlignJustify />
              </WysiwygIcon>
            </WysiwygSection>
          </WysiwygSubmenu>
          <WysiwygIcon
            onClick={(event) => {
              event.preventDefault();
              toggleBlockType('unordered-list-item');
            }}>
            <MdFormatListBulleted />
          </WysiwygIcon>
          <WysiwygIcon
            onClick={(event) => {
              event.preventDefault();
              toggleBlockType('ordered-list-item');
            }}>
            <MdFormatListNumbered />
          </WysiwygIcon>
          <WysiwygIcon>
            <MdFormatIndentIncrease />
          </WysiwygIcon>
          <WysiwygIcon>
            <MdFormatIndentDecrease />
          </WysiwygIcon>
        </WysiwygSection>

        <WysiwygSection>
          <WysiwygIcon>
            <MdHorizontalRule />
          </WysiwygIcon>
        </WysiwygSection>

        <WysiwygSection>
          <WysiwygIcon>
            <MdUndo />
          </WysiwygIcon>
          <WysiwygIcon>
            <MdRedo />
          </WysiwygIcon>
          <WysiwygIcon>
            <MdFormatClear />
          </WysiwygIcon>
        </WysiwygSection>
      </div>
      <div
        style={{
          overflowY: 'scroll',
          flex: '1'
        }}>
        <Editor
          customStyleMap={inlineMap}
          blockRendererFn={blockRendererFn}
          handleKeyCommand={handleKeyCommand}
          editorState={editorState}
          onChange={handleEditorChange}
        />
      </div>
    </div>
  );
}

type WysiwygSectionProps = {
  children?: React.ReactNode;
};
function WysiwygSection({ children }: WysiwygSectionProps) {
  return (
    <div
      style={{
        display: 'flex',
        border: '1px solid black',
        backgroundColor: 'white'
      }}>
      {children}
    </div>
  );
}

type WysiwygIconProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
};
function WysiwygIcon({ onClick, children }: WysiwygIconProps) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '1.5em',
        height: '1.5em',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        cursor: 'pointer',
        backgroundColor: 'transparent',
        border: 'none',
        fontSize: '18px',
        padding: '0'
      }}>
      {children}
    </button>
  );
}

type WysiwygSubmenuProps = {
  icon: React.ReactNode;
  children?: React.ReactNode;
};
function WysiwygSubmenu({ icon, children }: WysiwygSubmenuProps) {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => {
        if (open) {
          setOpen(false);
        } else {
          setOpen(true);
        }
      }}
      style={{
        position: 'relative',
        width: '2em',
        height: '1.5em',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginLeft: '0.3em',
        cursor: 'pointer',
        backgroundColor: 'transparent',
        border: 'none',
        fontSize: '18px',
        padding: '0'
      }}>
      {icon}
      <MdExpandMore />
      {open && (
        <div
          style={{
            zIndex: '10',
            position: 'absolute',
            top: '1.5em'
          }}>
          {children}
        </div>
      )}
    </div>
  );
}
