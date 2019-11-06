import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {BlogLayout} from './layout/BlogLayout';

if (process.env.NODE_ENV === 'production') {
    // @ts-ignore
    themeRegistry.overrideElement('DocumentationLayout', BlogLayout);
} else {
    const App = require('./App').App;
    ReactDOM.render(<App />, document.getElementById('root'));
}
