import { Fragment, useState } from 'react';
import {
    MdOutlineCreateNewFolder,
    MdOutlineDelete,
    MdOutlineDriveFileRenameOutline,
    MdOutlineFolder,
    MdOutlineInsertDriveFile,
    MdOutlineNoteAdd
} from 'react-icons/md';
import { Alert, IconButton } from '../common/Components.tsx';
import { findArticleChildren } from '../common/Funcs.tsx';
import { Article, Folder } from '../common/Types.tsx';
import { useStoreState } from '../common/Vals.tsx';

export function ArticlesScreen() {
    return (
        <div
            style={{
                display: 'flex',
                border: '1px solid black',
                height: '100%'
            }}>
            <Articles />
            <ArticlesEditor />
        </div>
    );
}

function Articles() {
    const conlang = useStoreState((s) => s.conlang);
    const changeConlang = useStoreState((s) => s.changeConlang);
    const [currentArticle, setCurrentArticle] = useState('root');
    console.log(currentArticle);
    console.log(conlang.articles.list);
    const [deleteArticle, setDeleteArticle] = useState(false);
    const [renameArticle, setRenameArticle] = useState(false);
    const sortArticles = () => {
        const newArticles = conlang.articles.list;
        newArticles.sort((a, b) => {
            if (conlang.articles.foldersOnTop) {
                if (a.type === 'folder') {
                    if (b.type === 'folder') {
                        return a.name < b.name ? -1 : 1;
                    } else {
                        return -1;
                    }
                } else {
                    if (b.type === 'folder') {
                        return 1;
                    } else {
                        return a.name < b.name ? -1 : 1;
                    }
                }
            } else {
                return a.name < b.name ? -1 : 1;
            }
        });
        changeConlang(['articles', 'list'], newArticles);
    };
    const changeArticle = (id: string, property: string, newValue: unknown) => {
        const index = conlang.articles.list.findIndex(
            (value) => value.id === id
        );
        const newArticles = conlang.articles.list;
        if (index !== -1) {
            newArticles.splice(index, 1, {
                ...conlang.articles.list[index],
                [property]: newValue
            });
            changeConlang(['articles', 'list'], newArticles);
            sortArticles();
        }
    };
    const addArticle = (article: Folder | Article) => {
        const datetime = new Date();
        const id =
            article.type +
            datetime.getHours() +
            '-' +
            datetime.getMinutes() +
            '-' +
            datetime.getSeconds() +
            '-' +
            datetime.getMilliseconds();
        const newArticles = conlang.articles.list;
        newArticles.push({
            ...article,
            id: id
        });
        changeConlang(['articles', 'list'], newArticles);
        sortArticles();
        return id;
    };
    const getArticle = (id: string) => {
        const index = conlang.articles.list.findIndex(
            (value) => value.id === id
        );
        return conlang.articles.list[index];
    };
    return (
        <div
            style={{
                border: '1px solid red',
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
                <IconButton
                    onClick={() => {
                        if (currentArticle) {
                            const id = addArticle({
                                type: 'article',
                                name: 'Untitled',
                                contents: '',
                                id: '',
                                path: [
                                    ...getArticle(currentArticle).path,
                                    currentArticle
                                ]
                            });
                            changeArticle(currentArticle, 'contents', [
                                ...getArticle(currentArticle).contents,
                                id
                            ]);
                        }
                    }}>
                    <MdOutlineNoteAdd size={20} />
                </IconButton>
                <IconButton
                    onClick={() => {
                        if (currentArticle) {
                            const id = addArticle({
                                type: 'folder',
                                name: 'Untitled',
                                contents: [],
                                id: '',
                                path: [
                                    ...getArticle(currentArticle).path,
                                    currentArticle
                                ]
                            });
                            changeArticle(currentArticle, 'contents', [
                                ...getArticle(currentArticle).contents,
                                id
                            ]);
                        }
                    }}>
                    <MdOutlineCreateNewFolder size={20} />
                </IconButton>
                <IconButton
                    onClick={() => {
                        if (currentArticle) {
                            if (renameArticle) {
                                setRenameArticle(false);
                            } else {
                                setRenameArticle(true);
                            }
                        }
                    }}>
                    <MdOutlineDriveFileRenameOutline size={20} />
                </IconButton>
                <IconButton
                    onClick={() => {
                        if (
                            currentArticle !== '' &&
                            currentArticle !== 'root'
                        ) {
                            setDeleteArticle(true);
                        }
                    }}>
                    <MdOutlineDelete size={20} />
                </IconButton>
                {deleteArticle && (
                    <Alert
                        title="Confirmation"
                        description={
                            'Are you sure you want to delete ' +
                            getArticle(currentArticle).name +
                            ' and its contents? This cannot be undone.'
                        }
                        onDecline={() => {
                            setDeleteArticle(false);
                        }}
                        onAccept={() => {
                            setDeleteArticle(false);
                            const article = getArticle(currentArticle);
                            if (article.path.length > 0) {
                                const newContents = (
                                    getArticle(
                                        article.path[article.path.length - 1]
                                    ) as Folder
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
                                conlang.articles.list.filter(
                                    (x) => !articles.includes(x.id)
                                )
                            );
                        }}
                    />
                )}
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
                    <ArticlesList
                        list={conlang.articles.list}
                        depth={0}
                        value={currentArticle}
                        onChange={setCurrentArticle}
                        renameArticle={renameArticle ? currentArticle : null}
                        changeArticle={changeArticle}
                        setRenameArticle={setRenameArticle}
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
    renameArticle: string | null;
    changeArticle: (id: string, property: string, newValue: unknown) => void;
    setRenameArticle: (value: boolean) => void;
};
function ArticlesList({
    list,
    depth,
    value,
    onChange,
    renameArticle,
    changeArticle,
    setRenameArticle
}: ArticlesListProps) {
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
                                    backgroundColor:
                                        item.id === value ?
                                            'darkgray'
                                        :   'white',
                                    paddingLeft:
                                        Math.max(0, depth - 1) * 0.3 +
                                        Math.max(0, depth - 2) * 0.8 +
                                        'em'
                                }}>
                                {depth > 1 ?
                                    index === list.length - 1 ?
                                        '└'
                                    :   '├'
                                :   ''}
                                &nbsp;
                                {item.id !== 'root' &&
                                    (item.type === 'article' ?
                                        <MdOutlineInsertDriveFile />
                                    :   <MdOutlineFolder />)}
                                &nbsp;
                                {renameArticle && item.id === renameArticle ?
                                    <input
                                        type="text"
                                        value={item.name}
                                        onInput={(event) => {
                                            changeArticle(
                                                item.id,
                                                'name',
                                                event.currentTarget.value
                                            );
                                        }}
                                        onKeyDown={(event) => {
                                            if (event.key === 'Enter') {
                                                event.preventDefault();
                                                setRenameArticle(false);
                                            }
                                        }}
                                        style={{
                                            width: 'calc(100% - 3em)'
                                        }}
                                    />
                                :   item.name}
                            </div>
                            {item.type === 'folder' && (
                                <ArticlesList
                                    list={conlang.articles.list.filter((x) =>
                                        item.contents.includes(x.id)
                                    )}
                                    depth={depth + 1}
                                    value={value}
                                    onChange={onChange}
                                    renameArticle={renameArticle}
                                    changeArticle={changeArticle}
                                    setRenameArticle={setRenameArticle}
                                />
                            )}
                        </>
                    )}
                </Fragment>
            ))}
        </>
    );
}

function ArticlesEditor() {
    return (
        <div
            style={{
                border: '2px solid aquamarine',
                flex: '1'
            }}></div>
    );
}
