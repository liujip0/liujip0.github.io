import { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { IconButton } from '../common/Components.tsx';
import { useStoreState } from '../common/Vals.tsx';

export default function LexiconScreen() {
  const conlang = useStoreState((s) => s.conlang);
  const changeConlang = useStoreState((s) => s.changeConlang);
  const [currentWord, setCurrentWord] = useState('');
  const createAlphabetMap = (
    alphabetArray: Array<string>
  ): Map<string, number> => {
    const alphabetMap = new Map();
    for (let i = 0; i < alphabetArray.length; i++) {
      alphabetMap.set(alphabetArray[i], i);
    }
    return alphabetMap;
  };
  const alphabeticalOrder = createAlphabetMap(
    conlang.phonology.inventory.map((x) => x.romanization)
  );
  const customComparator = (alphabetMap: Map<string, number>) => {
    return (a: string, b: string) => {
      let indexA, indexB;
      let i = 0,
        j = 0;
      while (i < a.length && j < b.length) {
        let foundA = false,
          foundB = false;
        for (const [key, value] of alphabetMap.entries()) {
          if (a.startsWith(key, i)) {
            indexA = value;
            foundA = true;
          }
          if (b.startsWith(key, j)) {
            indexB = value;
            foundB = true;
          }
          if (foundA && foundB) break;
        }
        if (!foundA) indexA = -1;
        if (!foundB) indexB = -1;
        if (indexA !== indexB) {
          return indexA! - indexB!;
        }
        i += Math.max(a.startsWith(key, i) ? key.length : 1, 1);
        j += Math.max(b.startsWith(key, j) ? key.length : 1, 1);
      }
      return a.length - b.length; // If all parts are the same, compare by length
    };
  };
  const sortLexicon = () => {
    const newLexicon = conlang.lexicon;
    newLexicon.sort((a, b) => {});
    changeConlang(['lexicon'], newLexicon);
  };
  const changeWord = (id: string, property: string, newValue: unknown) => {
    const index = conlang.articles.list.findIndex((value) => value.id === id);
    const newArticles = conlang.articles.list;
    if (index !== -1) {
      newArticles.splice(index, 1, {
        ...conlang.articles.list[index],
        [property]: newValue
      });
      changeConlang(['articles', 'list'], newArticles);
      sortLexicon();
    }
  };
  return (
    <div
      style={{
        display: 'flex',
        height: '100%'
      }}>
      <Words
        currentWord={currentWord}
        setCurrentWord={setCurrentWord}
      />
    </div>
  );
}

type WordsProps = {
  currentWord: string;
  setCurrentWord: (value: string) => void;
};
function Words({ currentWord, setCurrentWord }: WordsProps) {
  const conlang = useStoreState((s) => s.conlang);
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
        <IconButton onClick={() => {}}>
          <MdAdd />
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
          {conlang.lexicon.map((item) => {
            return (
              <div
                style={{
                  backgroundColor:
                    item.id === currentWord ? 'darkgray' : 'white'
                }}
                onClick={() => {
                  setCurrentWord(item.id);
                }}></div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
