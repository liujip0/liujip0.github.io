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
}

export type ScreenPosition = 0 | 1 | 2 | 3

export type Screen = 'start' | 'home' | 'phonology' | 'grammar' | 'lexicon' | 'settings';