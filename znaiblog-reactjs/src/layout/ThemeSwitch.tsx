import React from 'react';
import {themeRegistry} from '../znaiapi/themeRegistry';

import './ThemeSwitch.css';

export class ThemeSwitch extends React.Component<{}, {}> {
    render() {
        return (
            <div className="znaiblog-theme-switch">
                <div className="znaiblog-theme-switch-action" onClick={this.switchTheme}>
                    switch to {this.switchToLabel()}
                </div>
            </div>
        );
    }

    switchTheme = () => {
        const newTheme = themeRegistry.currentTheme.name === 'default' ? 'znai-dark' : 'default';

        themeRegistry.selectTheme(newTheme);
        this.forceUpdate();
    };

    switchToLabel = () => {
        return themeRegistry.currentTheme.name === 'default' ? 'dark' : 'light';
    }
}
