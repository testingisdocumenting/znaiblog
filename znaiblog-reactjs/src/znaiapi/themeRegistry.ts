export interface ThemeRegistry {
    currentTheme: Theme;
    selectTheme(name: string): void;
    selectThemeIfNeverSelected(name: string): void;
    overrideElement(id: string, element: object): void;
}

export interface Theme {
    name: string;
}

let themeRegistry: ThemeRegistry;

if (process.env.NODE_ENV === 'production') {
    // @ts-ignore
    themeRegistry = global.themeRegistry;
} else {
    const simpleAction = require('react-component-viewer').simpleAction;

    let theme = 'default';
    themeRegistry = {
        get currentTheme() {
            return {name: theme}
        },
        selectTheme: (name: string) => {
            simpleAction('selected theme ' + name);
            theme = name;
        },
        selectThemeIfNeverSelected: (name: string) => {
            simpleAction('selected theme if never selected ' + name);
        },

        overrideElement(id: string, element: object): void {
        }
    };
}

export {themeRegistry};