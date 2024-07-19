import {
  AtomicBlockUtils,
  ContentBlock,
  Editor,
  EditorState,
  Modifier,
  RawDraftContentState,
  RichUtils,
  convertFromRaw
} from 'draft-js';
import React, { MouseEventHandler, useRef, useState } from 'react';
import {
  TbAlignCenter,
  TbAlignJustified,
  TbAlignLeft,
  TbAlignRight,
  TbArrowBackUp,
  TbArrowForwardUp,
  TbBlockquote,
  TbBold,
  TbCheck,
  TbChevronDown,
  TbClearFormatting,
  TbCode,
  TbFileCode,
  TbH1,
  TbH2,
  TbH3,
  TbH4,
  TbH5,
  TbH6,
  TbHeading,
  TbHeadingOff,
  TbItalic,
  TbList,
  TbListNumbers,
  TbPhoto,
  TbSeparator,
  TbStrikethrough,
  TbSubscript,
  TbSuperscript,
  TbUnderline
} from 'react-icons/tb';
import { CodeBlock, HorizontalRule, TextAlign } from './WysiwygComponents.tsx';

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

type WysiwygProps = {
  value: RawDraftContentState;
  setValue: (value: EditorState) => void;
};
export default function Wysiwyg({ value, setValue }: WysiwygProps) {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(convertFromRaw(value))
  );
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
  const insertComponent = (
    componentType: string,
    data?: Record<string, unknown>
  ) => {
    const stateWithEntity = editorState
      .getCurrentContent()
      .createEntity(componentType, 'IMMUTABLE', data);
    const entityKey = stateWithEntity.getLastCreatedEntityKey();
    const newEditorState = AtomicBlockUtils.insertAtomicBlock(
      editorState,
      entityKey,
      '-'
    );
    handleEditorChange(
      EditorState.forceSelection(
        newEditorState,
        newEditorState.getCurrentContent().getSelectionAfter()
      )
    );
  };
  const blockRendererFn = (contentBlock: ContentBlock) => {
    console.log(contentBlock.getType());
    switch (contentBlock.getType()) {
      case 'atomic': {
        const entity = editorState
          .getCurrentContent()
          .getEntity(contentBlock.getEntityAt(0));
        switch (entity.getType()) {
          case 'horizontal-rule':
            return {
              component: HorizontalRule,
              editable: false
            };
          case 'image':
            return {
              component: Image,
              editable: false
            };
          default:
            return null;
        }
      }
      case 'code-block':
        return {
          component: CodeBlock,
          editable: true
        };
      case 'align-left':
        return {
          component: TextAlign,
          editable: true,
          props: {
            align: 'left'
          }
        };
      case 'align-center':
        return {
          component: TextAlign,
          editable: true,
          props: {
            align: 'center'
          }
        };
      case 'align-right':
        return {
          component: TextAlign,
          editable: true,
          props: {
            align: 'right'
          }
        };
      case 'align-justify':
        return {
          component: TextAlign,
          editable: true,
          props: {
            align: 'justify'
          }
        };
      default:
        return null;
    }
  };

  const imageSrcInput = useRef<HTMLInputElement>(null);

  return (
    <div
      style={{
        margin: '1em',
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
            <TbBold />
          </WysiwygIcon>
          <WysiwygIcon
            onClick={(event) => {
              event.preventDefault();
              toggleInlineStyle('ITALIC');
            }}>
            <TbItalic />
          </WysiwygIcon>
          <WysiwygIcon
            onClick={(event) => {
              event.preventDefault();
              toggleInlineStyle('UNDERLINE');
            }}>
            <TbUnderline />
          </WysiwygIcon>
          <WysiwygIcon
            onClick={(event) => {
              event.preventDefault();
              toggleInlineStyle('STRIKETHROUGH');
            }}>
            <TbStrikethrough />
          </WysiwygIcon>
          <WysiwygIcon
            onClick={(event) => {
              event.preventDefault();
              toggleInlineStyle('SUPERSCRIPT');
            }}>
            <TbSuperscript />
          </WysiwygIcon>
          <WysiwygIcon
            onClick={(event) => {
              event.preventDefault();
              toggleInlineStyle('SUBSCRIPT');
            }}>
            <TbSubscript />
          </WysiwygIcon>
        </WysiwygSection>

        <WysiwygSection>
          <WysiwygIcon
            onClick={(event) => {
              event.preventDefault();
              toggleInlineStyle('CODE');
            }}>
            <TbCode />
          </WysiwygIcon>
          <WysiwygIcon
            onClick={(event) => {
              event.preventDefault();
              toggleBlockType('code-block');
            }}>
            <TbFileCode />
          </WysiwygIcon>
          <WysiwygIcon
            onClick={(event) => {
              event.preventDefault();
              toggleBlockType('blockquote');
            }}>
            <TbBlockquote />
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
          <WysiwygSubmenu icon={<TbAlignLeft />}>
            <WysiwygSection>
              <WysiwygIcon
                onClick={(event) => {
                  event.preventDefault();
                  toggleBlockType('align-left');
                }}>
                <TbAlignLeft />
              </WysiwygIcon>
              <WysiwygIcon
                onClick={(event) => {
                  event.preventDefault();
                  toggleBlockType('align-center');
                }}>
                <TbAlignCenter />
              </WysiwygIcon>
              <WysiwygIcon
                onClick={(event) => {
                  event.preventDefault();
                  toggleBlockType('align-right');
                }}>
                <TbAlignRight />
              </WysiwygIcon>
              <WysiwygIcon
                onClick={(event) => {
                  event.preventDefault();
                  toggleBlockType('align-justify');
                }}>
                <TbAlignJustified />
              </WysiwygIcon>
            </WysiwygSection>
          </WysiwygSubmenu>
          <WysiwygIcon
            onClick={(event) => {
              event.preventDefault();
              toggleBlockType('unordered-list-item');
            }}>
            <TbList />
          </WysiwygIcon>
          <WysiwygIcon
            onClick={(event) => {
              event.preventDefault();
              toggleBlockType('ordered-list-item');
            }}>
            <TbListNumbers />
          </WysiwygIcon>
        </WysiwygSection>

        <WysiwygSection>
          <WysiwygSubmenu icon={<TbPhoto />}>
            <WysiwygSection>
              <input
                ref={imageSrcInput}
                style={{
                  margin: '0.3em'
                }}
                onClick={(event) => {
                  event.stopPropagation();
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    document.getElementById('imageSrcButton')?.click();
                  }
                }}
                placeholder="Image URL"
                type="url"
              />
              <WysiwygIcon
                id={'imageSrcButton'}
                onClick={(event) => {
                  event.preventDefault();
                  if (imageSrcInput.current) {
                    insertComponent('image', {
                      src: imageSrcInput.current.value
                    });
                  }
                }}>
                <TbCheck />
              </WysiwygIcon>
            </WysiwygSection>
          </WysiwygSubmenu>
          <WysiwygIcon
            onClick={(event) => {
              event.preventDefault();
              insertComponent('horizontal-rule');
            }}>
            <TbSeparator />
          </WysiwygIcon>
        </WysiwygSection>

        <WysiwygSection>
          <WysiwygIcon
            onClick={(event) => {
              event.preventDefault();
              handleEditorChange(EditorState.undo(editorState));
            }}>
            <TbArrowBackUp />
          </WysiwygIcon>
          <WysiwygIcon
            onClick={(event) => {
              event.preventDefault();
              handleEditorChange(EditorState.redo(editorState));
            }}>
            <TbArrowForwardUp />
          </WysiwygIcon>
          <WysiwygIcon
            onClick={(event) => {
              event.preventDefault();
              toggleBlockType('unstyled');
              const stylesToRemove = editorState
                .getCurrentInlineStyle()
                .toArray();
              handleEditorChange(
                EditorState.push(
                  editorState,
                  stylesToRemove.reduce((state, style) => {
                    return Modifier.removeInlineStyle(
                      state,
                      editorState.getSelection(),
                      style
                    );
                  }, editorState.getCurrentContent()),
                  'change-block-type'
                )
              );
            }}>
            <TbClearFormatting />
          </WysiwygIcon>
        </WysiwygSection>
      </div>
      <div
        style={{
          overflowY: 'scroll',
          flex: '1',
          border: '1px solid black',
          padding: '1em'
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
  id?: string;
  children?: React.ReactNode;
};
function WysiwygIcon({ onClick, id, children }: WysiwygIconProps) {
  return (
    <button
      onClick={onClick}
      id={id}
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
      style={{
        marginLeft: '0.3em',
        marginTop: 'auto',
        marginBottom: 'auto',
        position: 'relative',
        width: '2em',
        height: '1.5em',
        alignItems: 'center'
      }}>
      <button
        onClick={(event) => {
          event.preventDefault();
          setOpen(open ? false : true);
        }}
        style={{
          cursor: 'pointer',
          backgroundColor: 'transparent',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          width: '100%',
          height: '100%',
          padding: '0',
          fontSize: '18px'
        }}>
        {icon}
        <TbChevronDown />
      </button>
      {open && (
        <div
          style={{
            zIndex: '10',
            position: 'absolute',
            top: '1.6em',
            left: '-3em'
          }}>
          {children}
        </div>
      )}
    </div>
  );
}