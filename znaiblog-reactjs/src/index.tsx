import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {BlogLayout} from './layout/BlogLayout';
import {ListOfBlogEntries} from './landing/ListOfBlogEntries';

import './index.css';
import {BlogPageTitle} from './layout/BlogPageTitle';

if (process.env.NODE_ENV === 'production') {
    // @ts-ignore
    themeRegistry.overrideElement('DocumentationLayout', BlogLayout);
    // @ts-ignore
    themeRegistry.overrideElement('ListOfBlogEntries', ListOfBlogEntries);
    // @ts-ignore
    themeRegistry.overrideElement('PageTitle', BlogPageTitle);
} else {
    const App = require('./App').App;
    ReactDOM.render(<App />, document.getElementById('root'));
}
