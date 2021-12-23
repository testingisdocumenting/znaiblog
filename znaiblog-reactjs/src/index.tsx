import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {BlogLayout} from './layout/BlogLayout';
import {ListOfBlogEntries} from './landing/ListOfBlogEntries';
import {BlogPageTitle} from './layout/BlogPageTitle';

import {themeRegistry} from './znaiapi/themeRegistry';

import './index.css';

if (process.env.NODE_ENV === 'production') {
    themeRegistry.overrideElement('DocumentationLayout', BlogLayout);
    themeRegistry.overrideElement('ListOfBlogEntries', ListOfBlogEntries);
    themeRegistry.overrideElement('PageTitle', BlogPageTitle);
    // @ts-ignore
    window.znaiTheme.setExplicitlyIfNotSetAlready('znai-dark');
} else {
    const App = require('./App').App;
    ReactDOM.render(<App />, document.getElementById('root'));
}
