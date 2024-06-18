export interface Conlang {
  name: string;
  widgets: {
    charInsert: {
      enabled: boolean;
      chars: Array<string>;
    };
    dictSearch: {
      enabled: boolean;
    };
    cxs: {
      enabled: boolean;
    };
  };
  phonology: {
    inventory: Array<Phoneme>;
  };
  articles: {
    list: Array<Folder | Article>;
    foldersOnTop: boolean;
  };
}
export type Folder = {
  id: string;
  name: string;
  type: 'folder';
  path: Array<string>;
  contents: Array<string>;
};
export type Article = {
  id: string;
  name: string;
  type: 'article';
  path: Array<string>;
  contents: string;
};
export type IpaVowelDiacritic =
  | ''
  | 'more rounded'
  | 'less rounded'
  | 'advanced'
  | 'retracted'
  | 'centralized'
  | 'mid-centralized'
  | 'raised'
  | 'lowered'
  | '+ATR'
  | '-ATR'
  | 'nonsyllabic'
  | 'rhoticized'
  | 'creaky'
  | 'breathy'
  | 'nasalized'
  | 'long'
  | 'half-long'
  | 'extra-short';

export type IpaConsonantDiacritic =
  | ''
  | 'voiceless'
  | 'voiced'
  | 'aspirated'
  | 'syllabic'
  | 'breathy'
  | 'creaky'
  | 'linguolabial'
  | 'labialized'
  | 'palatalized'
  | 'velarized'
  | 'pharyngealized'
  | 'velarized/pharyngealized'
  | 'raised'
  | 'lowered'
  | 'dental'
  | 'apical'
  | 'laminal'
  | 'nasal release'
  | 'dental release'
  | 'no audible release';
export type Phoneme =
  | {
      id: string;
      ipa: string;
      base: string;
      romanization: string;
      type: 'vowel';
      diacritics: [IpaVowelDiacritic, IpaVowelDiacritic];
      allophones: Array<string>;
      allophoneOf: string;
    }
  | {
      id: string;
      ipa: string;
      base: string;
      romanization: string;
      type: 'consonant';
      diacritics: [IpaConsonantDiacritic, IpaConsonantDiacritic];
      allophones: Array<string>;
      allophoneOf: string;
    };

export type screenPosition = 0 | 1 | 2 | 3;
export type screenStr =
  | 'start'
  | 'home'
  | 'phonology'
  | 'articles'
  | 'lexicon'
  | 'settings';
export type windowsArr = Array<string>;

export type submenuStr = 'add' | 'swap' | '';
export type submenusArr = Array<submenuStr>;
