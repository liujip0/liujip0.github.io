/* eslint-disable react-refresh/only-export-components */
import { CXStoIPA, IPAtoCXS } from './ConlangXSampa.tsx';
import {
  Article,
  Folder,
  IpaConsonantDiacritic,
  IpaVowelDiacritic,
  PartOfSpeech,
} from './Types.tsx';

export async function getFile(options: object) {
  if (!window.showOpenFilePicker) {
    throw Error('File System Access API not supported');
  }
  const fileHandles = await window.showOpenFilePicker(options);
  const fileHandle = fileHandles[0] as FileSystemFileHandle;
  const fileData = await fileHandle.getFile();
  const contents = await fileData.text();
  return {
    contents: contents,
    fileHandle: fileHandle,
  };
}

export async function writeFile(
  fileHandle: FileSystemFileHandle,
  contents: string
) {
  console.log(fileHandle);
  const writeable = await fileHandle.createWritable();
  await writeable.write(contents);
  await writeable.close();
}

export async function createFile(options: object) {
  if (!window.showSaveFilePicker) {
    throw Error('File System Access API not supported');
  }
  const fileHandle = (await window.showSaveFilePicker(
    options
  )) as FileSystemFileHandle;
  return fileHandle;
}

type NestedObject = { [key: string]: unknown };
export function deepUpdate<T>(obj: T, path: string[], value: unknown): T {
  if (path.length === 0) {
    return value as T;
  }
  const [head, ...rest] = path;
  return {
    ...obj,
    [head]: deepUpdate(((obj as NestedObject)[head] as T) || {}, rest, value),
  };
}

export function parseCxs(input: string): string {
  const cxs = input;
  const ipa: Array<string> = [];
  for (let i = 0; i < cxs.length; i++) {
    const current = cxs[i];
    if (current === '`' || current === '\\') {
      const x = ipa.pop();
      if (x) {
        ipa.push(CXStoIPA[x + current]);
        continue;
      }
    } else if (cxs[i - 1] === '_') {
      ipa.pop();
      if (!'<'.includes(current)) {
        ipa.push(CXStoIPA['_' + current]);
      } else {
        const x = ipa.pop();
        if (x) {
          ipa.push(CXStoIPA[x + '_' + current]);
          continue;
        } else {
          ipa.push('_');
        }
      }
      continue;
    } else if (current === ')' && cxs[i - 2]) {
      const x = ipa.pop();
      ipa.push('\u0361');
      ipa.push(x!);
      continue;
    }
    ipa.push(current in CXStoIPA ? CXStoIPA[current] : current);
  }
  return ipa.join('');
}

export function unparseCxs(ipa: string): string {
  let cxs = '';
  for (let i = 0; i < ipa.length; i++) {
    cxs += ipa[i] in IPAtoCXS ? IPAtoCXS[ipa[i]] : ipa[i];
  }
  return cxs;
}

export function sortConsonantsDiacritics(
  a: IpaConsonantDiacritic,
  b: IpaConsonantDiacritic
): [IpaConsonantDiacritic, IpaConsonantDiacritic] {
  if (a === 'voiceless' || b === '') {
    return [a, b];
  } else if (b === 'voiceless' || a === '') {
    return [b, a];
  } else {
    return [a, b];
  }
}

export function sortVowelDiacritics(
  a: IpaVowelDiacritic,
  b: IpaVowelDiacritic
): [IpaVowelDiacritic, IpaVowelDiacritic] {
  if (b === '') {
    return [a, b];
  } else if (a === '') {
    return [b, a];
  } else {
    return [a, b];
  }
}

export function diacriticToChar(
  diacritic: IpaConsonantDiacritic | IpaVowelDiacritic,
  descender: boolean = false
) {
  switch (diacritic) {
    case '': {
      return '';
    }
    case '+ATR': {
      return '\u0318';
    }
    case '-ATR': {
      return '\u0319';
    }
    case 'advanced': {
      return '\u031f';
    }
    case 'apical': {
      return '\u033a';
    }
    case 'aspirated': {
      return 'ʰ';
    }
    case 'breathy': {
      return '\u0324';
    }
    case 'centralized': {
      return '\u0308';
    }
    case 'creaky': {
      return '\u0330';
    }
    case 'dental': {
      return '\u032a';
    }
    case 'dental release': {
      return 'ⁿ';
    }
    case 'extra-short': {
      return '\u0306';
    }
    case 'half-long': {
      return 'ˑ';
    }
    case 'labialized': {
      return 'ʷ';
    }
    case 'laminal': {
      return '\u033b';
    }
    case 'less rounded': {
      return '\u031c';
    }
    case 'linguolabial': {
      return '\u033c';
    }
    case 'long': {
      return 'ː';
    }
    case 'lowered': {
      return '\u031e';
    }
    case 'mid-centralized': {
      return '\u033d';
    }
    case 'more rounded': {
      return '\u0339';
    }
    case 'nasal release': {
      return 'ⁿ';
    }
    case 'nasalized': {
      return '\u0303';
    }
    case 'no audible release': {
      return '˺';
    }
    case 'nonsyllabic': {
      return '\u032f';
    }
    case 'palatalized': {
      return 'ʲ';
    }
    case 'pharyngealized': {
      return 'ˤ';
    }
    case 'raised': {
      return '\u031d';
    }
    case 'retracted': {
      return '\u0331';
    }
    case 'rhoticized': {
      return '\u02de';
    }
    case 'syllabic': {
      return '\u0329';
    }
    case 'velarized': {
      return 'ˠ';
    }
    case 'velarized/pharyngealized': {
      return '\u0334';
    }
    case 'voiced': {
      return '\u032c';
    }
    case 'voiceless': {
      return descender ? '\u030a' : '\u0325';
    }
  }
}

export function findArticleChildren(
  id: string,
  articles: Array<Folder | Article>
): Array<string> {
  const article = articles.find((x) => x.id === id)!;
  let res: Array<string> = [];
  res.push(id);
  if (article.type === 'folder') {
    article.contents.forEach((item) => {
      res = res.concat(
        findArticleChildren(articles.find((x) => x.id === item)!.id, articles)
      );
    });
  }
  return res;
}

export function romanizationToIpa(
  romanization: string,
  mapping: Array<[string, string]>
): string {
  console.log(mapping);
  let ipa = romanization;
  for (let i = 0; i < mapping.length; i++) {
    ipa = ipa.replaceAll(mapping[i][0], mapping[i][1]);
  }
  return ipa;
}

export function createId(type: string): string {
  const datetime = new Date();
  return (
    type +
    '-' +
    datetime.getHours() +
    '-' +
    datetime.getMinutes() +
    '-' +
    datetime.getSeconds() +
    '-' +
    datetime.getMilliseconds()
  );
}

export function partOfSpeechAbbreviation(partOfSpeech: PartOfSpeech) {
  switch (partOfSpeech) {
    case 'noun':
      return 'N';
    case 'verb':
      return 'V';
    case 'adjective':
      return 'Adj';
    case 'adverb':
      return 'Adv';
    case 'pronoun':
      return 'Pron';
    case 'proper noun':
      return 'PropN';
    case 'particle':
      return 'Ptcl';
    case 'adposition':
      return 'Adp';
    case 'conjunction':
      return 'Conj';
    case '':
      return '';
  }
}
