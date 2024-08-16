import { RawDraftContentState } from 'draft-js';

export interface Conlang {
  name: string;
  autosave: number;
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
    inventory: Array<Consonant | Vowel>;
  };
  articles: {
    list: Array<Folder | Article>;
  };
  declensions: {
    properNounEqualsNoun: boolean;
    list: {
      // PartsOfSpeech
      noun: Array<Declension>;
      verb: Array<Declension>;
      adjective: Array<Declension>;
      adverb: Array<Declension>;
      pronoun: Array<PronounTable>;
      'proper noun': Array<Declension>;
      particle: Array<Declension>;
      adposition: Array<Declension>;
      conjunction: Array<Declension>;
      interjection: Array<Declension>;
    };
  };
  lexicon: Array<Word>;
  wordClasses: Array<WordClass>;
}
export type WordClass = {
  id: string;
  partOfSpeech: PartOfSpeech;
  gloss: string;
  name: string;
};
export type PronounTable = {
  id: string;
  type: 'pronountable';
};
export type Declension = {
  id: string;
  wordClasses: Array<string>;
  affixes: Array<Affix | '_'>;
};
export type Affix = {
  id: string;
  type: 'declension';
  name: string;
  gloss: Array<Array<string>>;
  affix: Array<string>;
};
export type Word = {
  id: string;
  romanization: string;
  ipa: string;
  ipaOverride: boolean;
  definitions: Array<string>;
  partOfSpeech: PartOfSpeech;
  wordClass: string;
};
export const PartOfSpeech_Arr = [
  // PartsOfSpeech
  'noun',
  'verb',
  'adjective',
  'adverb',
  'pronoun',
  'proper noun',
  'particle',
  'adposition',
  'conjunction',
  'interjection',
  '',
];
export type PartOfSpeech = (typeof PartOfSpeech_Arr)[number];
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
  contents: RawDraftContentState;
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
export type Vowel = {
  id: string;
  ipa: string;
  base: string;
  romanization: string;
  type: 'vowel';
  diacritics: [IpaVowelDiacritic, IpaVowelDiacritic];
  allophones: Array<string>;
  allophoneOf: string;
  height: Height;
  backness: Backness;
  rounded: boolean;
};
export const Height_Arr = [
  'close',
  'highclosemid',
  'closemid',
  'mid',
  'openmid',
  'lowopenmid',
  'open',
];
export type Height = (typeof Height_Arr)[number];
export const Backness_Arr = [
  'front',
  'frontcentral',
  'central',
  'centralback',
  'back',
];
export type Backness = (typeof Backness_Arr)[number];
export type Consonant = {
  id: string;
  ipa: string;
  base: string;
  romanization: string;
  type: 'consonant';
  diacritics: [IpaConsonantDiacritic, IpaConsonantDiacritic];
  allophones: Array<string>;
  allophoneOf: string;
  mannerOfArticulation: MannerOfArticulation;
  placeOfArticulation: PlaceOfArticulation;
  voiced: boolean;
};
export const MannerOfArticulation_Arr = [
  'plosive',
  'nasal',
  'trill',
  'tapflap',
  'lateralflap',
  'fricative',
  'lateralfricative',
  'approximant',
  'lateralapproximant',
  'click',
  'implosive',
];
export type MannerOfArticulation = (typeof MannerOfArticulation_Arr)[number];
export const PlaceOfArticulation_Arr = [
  'bilabial',
  'labiodental',
  'dental',
  'alveolar',
  'postalveolar',
  'retroflex',
  'alveolopalatal',
  'palatal',
  'labiovelar',
  'velar',
  'uvular',
  'pharyngeal',
  'epiglottal',
  'glottal',
  'other',
];
export type PlaceOfArticulation = (typeof PlaceOfArticulation_Arr)[number];

export type screenPosition = 0 | 1 | 2 | 3;
export type screenStr =
  | 'start'
  | 'home'
  | 'phonology'
  | 'articles'
  | 'declensions'
  | 'lexicon'
  | 'settings';
export type windowsArr = Array<string>;

export type submenuStr = 'add' | 'swap' | '';
export type submenusArr = Array<submenuStr>;
