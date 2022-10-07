import * as React from 'react';

import {Registry, simpleAction} from 'react-component-viewer';
import {BlogPageTitle} from './BlogPageTitle';
import {TocItem} from '../model/TocItem';

const tocItem: TocItem = {
    pageTitle: 'Test Page Title',
    dirName: 'entry',
    fileName: 'test-page-title',
    viewOnRelativePath: 'article/test-page-title.md',
    pageMeta: {
        date: ['2019-11-02'],
        summary: ['sample summary'],
        category: "Testing"
    }
};

const onPresentationHandler = simpleAction('presentation');

export function blogPageTitleDemo(registry: Registry) {
    registry.add('default', () => (
        <BlogPageTitle tocItem={tocItem} onPresentationOpen={onPresentationHandler}/>
    ));
}
