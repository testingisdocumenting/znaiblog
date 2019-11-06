import * as React from 'react';
import {ComponentViewer, DropDowns, Registries} from 'react-component-viewer';
import {blogLayoutDemo} from './layout/BlogLayout.demo';

const registries = new Registries();

registries.add('layout')
    .registerAsTabs('Blog Layout', blogLayoutDemo);

export function BlogComponentViewer() {
    return (
        <ComponentViewer registries={registries} dropDowns={new DropDowns()}/>
    )
}