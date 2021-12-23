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
        // TODO subscribe to OS theme switchs
        // @ts-ignore
        const newTheme = window.znaiTheme.name === 'default' ? 'znai-dark' : 'default';

        // @ts-ignore
        window.znaiTheme.setExplicitly(newTheme);
        this.forceUpdate();
    };

    switchToLabel = () => {
        // @ts-ignore
        return window.znaiTheme.name === 'default' ? 'dark' : 'light';
    }
}
