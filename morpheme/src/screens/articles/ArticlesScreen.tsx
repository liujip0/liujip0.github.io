import { EditorState, convertToRaw } from 'draft-js';
import { Fragment, useState } from 'react';
import {
  TbFile,
  TbFolder,
  TbPlus,
  TbTrash,
  TbTriangle,
  TbTriangleInverted,
} from 'react-icons/tb';
import { Alert, IconButton } from '../../common/Components.tsx';
import { createId, findArticleChildren } from '../../common/Funcs.tsx';
import { StringRes } from '../../common/Resources.tsx';
import { Article, Folder } from '../../common/Types.tsx';
import { useStoreState } from '../../common/Vals.tsx';
import Wysiwyg from './Wysiwyg.tsx';

export function ArticlesScreen() {
  const conlang = useStoreState((s) => s.conlang);
  const changeConlang = useStoreState((s) => s.changeConlang);
  const [currentArticle, setCurrentArticle] = useState('root');
  const changeArticle = (id: string, property: string, newValue: unknown) => {
    const index = conlang.articles.list.findIndex((value) => value.id === id);
    const newArticles = conlang.articles.list;
    if (index !== -1) {
      newArticles.splice(index, 1, {
        ...conlang.articles.list[index],
        [property]: newValue,
      });
      changeConlang(['articles', 'list'], newArticles);
    }
  };
  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
      }}>
      <Articles
        currentArticle={currentArticle}
        setCurrentArticle={setCurrentArticle}
        changeArticle={changeArticle}
      />
      <ArticleEditor
        currentArticle={currentArticle}
        changeArticle={changeArticle}
      />
    </div>
  );
}

type ArticlesProps = {
  currentArticle: string;
  setCurrentArticle: (value: string) => void;
  changeArticle: (id: string, property: string, newValue: unknown) => void;
};
function Articles({
  currentArticle,
  setCurrentArticle,
  changeArticle,
}: ArticlesProps) {
  const conlang = useStoreState((s) => s.conlang);
  const changeConlang = useStoreState((s) => s.changeConlang);
  const [deleteArticle, setDeleteArticle] = useState(false);
  const addArticle = (article: Folder | Article) => {
    const id = createId(article.type);
    const newArticles = conlang.articles.list;
    newArticles.push({
      ...article,
      id: id,
    });
    changeConlang(['articles', 'list'], newArticles);
    return id;
  };
  const getArticle = (id: string) => {
    const index = conlang.articles.list.findIndex((value) => value.id === id);
    return conlang.articles.list[index];
  };
  const moveUpArticle = (id: string) => {
    const index = conlang.articles.list.findIndex((value) => value.id === id);
    if (index > 0) {
      const article = conlang.articles.list[index];
      const newArticles = conlang.articles.list;
      newArticles.splice(index, 1);
      newArticles.splice(index - 1, 0, article);
      changeConlang(['articles', 'list'], newArticles);
    }
  };
  const moveDownArticle = (id: string) => {
    const index = conlang.articles.list.findIndex((value) => value.id === id);
    if (index < conlang.articles.list.length - 1) {
      const article = conlang.articles.list[index];
      const newArticles = conlang.articles.list;
      newArticles.splice(index, 1);
      newArticles.splice(index + 1, 0, article);
      changeConlang(['articles', 'list'], newArticles);
    }
  };
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
        }}>
        <IconButton
          onClick={() => {
            if (
              currentArticle &&
              getArticle(currentArticle).type === 'folder'
            ) {
              const id = addArticle({
                type: 'article',
                name: StringRes.untitled,
                contents: convertToRaw(
                  EditorState.createEmpty().getCurrentContent()
                ),
                id: '',
                path: [...getArticle(currentArticle).path, currentArticle],
              });
              changeArticle(currentArticle, 'contents', [
                ...(getArticle(currentArticle) as Folder).contents,
                id,
              ]);
            }
          }}>
          <TbPlus size={12} />
          <TbFile size={18} />
        </IconButton>
        <IconButton
          onClick={() => {
            if (
              currentArticle &&
              getArticle(currentArticle).type === 'folder'
            ) {
              const id = addArticle({
                type: 'folder',
                name: StringRes.untitled,
                contents: [],
                id: '',
                path: [...getArticle(currentArticle).path, currentArticle],
              });
              changeArticle(currentArticle, 'contents', [
                ...(getArticle(currentArticle) as Folder).contents,
                id,
              ]);
            }
          }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}>
            <TbPlus size={12} />
            <TbFolder size={18} />
          </div>
        </IconButton>
        <IconButton
          onClick={() => {
            moveUpArticle(currentArticle);
          }}>
          <TbTriangle size={18} />
        </IconButton>
        <IconButton
          onClick={() => {
            moveDownArticle(currentArticle);
          }}>
          <TbTriangleInverted size={18} />
        </IconButton>
        <IconButton
          onClick={() => {
            if (currentArticle !== '' && currentArticle !== 'root') {
              setDeleteArticle(true);
            }
          }}>
          <TbTrash size={18} />
        </IconButton>
        {deleteArticle && (
          <Alert
            title={StringRes.confirmation}
            description={StringRes.deletearticle.replace(
              '$1',
              getArticle(currentArticle).name
            )}
            onDecline={() => {
              setDeleteArticle(false);
            }}
            onAccept={() => {
              setDeleteArticle(false);
              const article = getArticle(currentArticle);
              currentArticle = article.path[article.path.length - 1];
              if (article.path.length > 0) {
                const newContents = (
                  getArticle(article.path[article.path.length - 1]) as Folder
                ).contents.filter((x) => x !== article.id);
                changeArticle(
                  article.path[article.path.length - 1],
                  'contents',
                  newContents
                );
              }
              const articles = findArticleChildren(
                article.id,
                conlang.articles.list
              );
              changeConlang(
                ['articles', 'list'],
                conlang.articles.list.filter((x) => !articles.includes(x.id))
              );
            }}
          />
        )}
      </div>
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
          }}>
          <ArticlesList
            list={conlang.articles.list}
            depth={0}
            value={currentArticle}
            onChange={setCurrentArticle}
          />
        </div>
      </div>
    </div>
  );
}

type ArticlesListProps = {
  list: Array<Folder | Article>;
  depth: number;
  value: string;
  onChange: (value: string) => void;
};
function ArticlesList({ list, depth, value, onChange }: ArticlesListProps) {
  const conlang = useStoreState((s) => s.conlang);
  return (
    <>
      {list.map((item, index) => (
        <Fragment key={item.id}>
          {item.path.length === depth && (
            <>
              <div
                onClick={() => {
                  onChange(item.id);
                }}
                style={{
                  backgroundColor: item.id === value ? 'darkgray' : 'white',
                  paddingLeft:
                    Math.max(0, depth - 1) * 0.3 +
                    Math.max(0, depth - 2) * 0.8 +
                    'em',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                }}>
                <div
                  style={{
                    marginRight: '0.2em',
                  }}>
                  {depth > 1 ?
                    index === list.length - 1 ?
                      '└'
                    : '├'
                  : ''}
                </div>
                {item.id !== 'root' &&
                  (item.type === 'article' ? <TbFile /> : <TbFolder />)}
                <div
                  style={{
                    marginLeft: '0.2em',
                  }}>
                  {item.name}
                </div>
              </div>
              {item.type === 'folder' && (
                <ArticlesList
                  list={conlang.articles.list.filter((x) =>
                    item.contents.includes(x.id)
                  )}
                  depth={depth + 1}
                  value={value}
                  onChange={onChange}
                />
              )}
            </>
          )}
        </Fragment>
      ))}
    </>
  );
}

type ArticleEditorProps = {
  currentArticle: string;
  changeArticle: (id: string, property: string, newValue: unknown) => void;
};
function ArticleEditor({ currentArticle, changeArticle }: ArticleEditorProps) {
  const conlang = useStoreState((s) => s.conlang);
  const setLastInput = useStoreState((s) => s.setLastInput);
  const article = conlang.articles.list.find((x) => x.id === currentArticle)!;
  if (!article) {
    return null;
  }
  const id = createId('articleTitle');
  return (
    <div
      style={{
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
      }}>
      <div
        style={{
          width: '100%',
          textAlign: 'center',
          padding: '1em',
        }}>
        <label>
          {StringRes.name.b}&nbsp;
          <input
            type="text"
            size={30}
            value={article.name}
            onInput={(event) => {
              changeArticle(article.id, 'name', event.currentTarget.value);
            }}
            disabled={article.id === 'root'}
            id={id}
            onFocus={() => {
              setLastInput(id);
            }}
          />
        </label>
      </div>
      {article.type === 'article' && (
        <Wysiwyg
          value={article.contents}
          setValue={(editorState) => {
            const content = convertToRaw(editorState.getCurrentContent());
            changeArticle(article.id, 'contents', content);
          }}
        />
      )}
    </div>
  );
}
