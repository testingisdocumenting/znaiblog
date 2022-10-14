import * as React from 'react';
import {ComponentViewer, DropDowns, Registries} from 'react-component-viewer';
import {blogLayoutDemo} from './layout/BlogLayout.demo';
import {listOfBlogEntriesDemo} from './landing/ListOfBlogEntries.demo';
import {blogPageTitleDemo} from './layout/BlogPageTitle.demo';
import {articleDemo} from './content/Article.demo';

const registries = new Registries();

registries.add('layout')
    .registerAsTabs('Blog Layout', blogLayoutDemo)
    .registerAsRows('Blog Page Title', blogPageTitleDemo)
    .registerAsRows('Article', articleDemo);

registries.add('landing')
    .registerAsTabs('List Of Blog Entries', listOfBlogEntriesDemo);

export function BlogComponentViewer() {
    return (
        <ComponentViewer registries={registries} dropDowns={new DropDowns()}/>
    )
}