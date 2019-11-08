import * as React from 'react';
import {ComponentViewer, DropDowns, Registries} from 'react-component-viewer';
import {blogLayoutDemo} from './layout/BlogLayout.demo';
import {listOfBlogEntriesDemo} from './landing/ListOfBlogEntries.demo';

const registries = new Registries();

registries.add('layout')
    .registerAsTabs('Blog Layout', blogLayoutDemo);

registries.add('landing')
    .registerAsTabs('List Of Blog Entries', listOfBlogEntriesDemo);

export function BlogComponentViewer() {
    return (
        <ComponentViewer registries={registries} dropDowns={new DropDowns()}/>
    )
}