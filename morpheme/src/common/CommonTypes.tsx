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
    inventory: {
        consonants: Array<string>;
        vowels: Array<string>;
    };
}

export type screenPosition = 0 | 1 | 2 | 3;
export type screenStr =
    | 'start'
    | 'home'
    | 'phonology'
    | 'grammar'
    | 'lexicon'
    | 'settings';
export type windowsArr = Array<string>;

export type submenuStr = 'add' | 'swap' | '';
export type submenusArr = Array<submenuStr>;
