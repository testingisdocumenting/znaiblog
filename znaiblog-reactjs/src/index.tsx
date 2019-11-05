import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {BlogLayout} from './BlogLayout';

// @ts-ignore
themeRegistry.overrideElement('DocumentationLayout', BlogLayout);

if (process.env.NODE_ENV !== 'production') {
    const App = require('./App').App;
    ReactDOM.render(<App />, document.getElementById('root'));
}
