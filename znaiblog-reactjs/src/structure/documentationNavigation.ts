import {TocItem} from '../model/TocItem';

export interface DocumentationNavigation {
    navigateToPage(entry: TocItem): void;
    buildUrl(entry: TocItem): string;
}

let documentationNavigation: DocumentationNavigation;

if (process.env.NODE_ENV === 'production') {
    // @ts-ignore
    documentationNavigation = global.documentationNavigation;
} else {
    const simpleAction = require('react-component-viewer').simpleAction;
    documentationNavigation = {
        buildUrl(entry: TocItem): string {
            return "#new-url-" + entry.dirName + '-' + entry.fileName;
        },

        navigateToPage: (entry: TocItem) => {
            const onPresentationHandler = simpleAction('navigated to ' + JSON.stringify(entry));
            onPresentationHandler();
        }
    } ;
}

export {documentationNavigation};
