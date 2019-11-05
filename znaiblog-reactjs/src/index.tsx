import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {SimpleTextOverride} from './SimpleTextOverride';

// @ts-ignore
if (!global['elementsLibrary']) {
    // @ts-ignore
    global['elementsLibrary'] = {};
}

// @ts-ignore
const elementsLibrary = global['elementsLibrary'];

elementsLibrary.SimpleText = SimpleTextOverride;

// @ts-ignore
global.testZnaiOverrides = () => {
    ReactDOM.render(<SimpleTextOverride text="todo text"/>, document.getElementById('root'));
};

if (process.env.NODE_ENV !== 'production') {
    const App = require('./App').App;
    ReactDOM.render(<App />, document.getElementById('root'));
}
