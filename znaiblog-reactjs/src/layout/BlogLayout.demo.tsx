import * as React from 'react';

import {Registry, simpleAction} from 'react-component-viewer';
import {BlogLayout} from './BlogLayout';
import {ListOfBlogEntries} from '../landing/ListOfBlogEntries';

const onHeaderClick = simpleAction('on header click');

export function blogLayoutDemo(registry: Registry) {
    const commonData = {
        docMeta: {
            id: 'test-blog',
            title: 'Blog About Green Nature',
            type: 'personal-blog',
            viewOn: {
                title: 'GitHub',
                link: 'https://github.com/testingisdocumenting/znaiblog/edit/master/znaiblog-example'
            }
        },
        onHeaderClick: onHeaderClick,
        selectedTocItem: {
            pageTitle: 'page title',
            pageMeta: {},
            dirName: 'entry',
            fileName: 'entry-a',
            viewOnRelativePath: 'article/entry-a.md'
        },
        toc: {},
        onTocItemClick: {},
        onTocItemPageSectionClick: {},
        onNextPage: {},
        onPrevPage: {},
        textSelection: {},
    };

    registry.add('default', () => (
        <BlogLayout
            renderedPage={<SamplePage/>}
            {...commonData}/>
    ));

    registry.add('small list of entries', () => (
        <BlogLayout renderedPage={<ListOfBlogEntries tocItems={genListOfEntries(4)}/>}
                    {...commonData}/>
    ));

    registry.add('large list of entries', () => (
        <BlogLayout renderedPage={<ListOfBlogEntries tocItems={genListOfEntries(40)}/>}
            {...commonData}/>
    ))
}

function SamplePage() {
    return (
        <div>dummy page content</div>
    )
}

function genListOfEntries(count: number) {
    return Array(count).fill(0).map((_, idx) => ({
        "sectionTitle": "Entry",
        "pageTitle": "Entry " + idx,
        "pageMeta": {"date": ["2019-09-16"], "summary": ["about blogging " + idx]},
        "fileName": "entry-b-" + idx,
        "dirName": "entry",
        "viewOnRelativePath": "articles/entry-b-" + idx + ".md",
        "pageSectionIdTitles": []
    }));
}
