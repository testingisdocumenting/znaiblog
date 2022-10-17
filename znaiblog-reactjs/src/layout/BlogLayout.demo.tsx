import * as React from 'react';

import {Registry, simpleAction} from 'react-component-viewer';
import {BlogLayout} from './BlogLayout';
import {ListOfBlogEntries} from '../landing/ListOfBlogEntries';

const onHeaderClick = simpleAction('on header click');

export function blogLayoutDemo(registry: Registry) {
    const commonProps = layoutDemoCommonProps();

    registry.add('default', () => (
        <BlogLayout
            renderedPage={<SamplePage/>}
            renderedFooter={<SampleFooter/>}
            {...commonProps}/>
    ));

    registry.add('small list of entries', () => (
        <BlogLayout renderedPage={<ListOfBlogEntries tocItems={genListOfEntries(4)}/>}
                    {...commonProps}
                    renderedFooter={<SampleFooter/>}/>
    ));

    registry.add('large list of entries', () => (
        <BlogLayout renderedPage={<ListOfBlogEntries tocItems={genListOfEntries(40)}/>}
            {...commonProps}/>
    ))
}

export function layoutDemoCommonProps() {
    return {
        docMeta: {
            id: 'test-blog',
            title: 'Blog About Green Nature',
            type: 'personal-blog',
            viewOn: {
                title: 'GitHub',
                link: 'https://github.com/testingisdocumenting/znaiblog/edit/master/znaiblog-example'
            }
        },
        tocItem: {
            pageTitle: 'page title',
            pageMeta: {category: "Testing"},
            dirName: 'entry',
            fileName: 'entry-a',
            viewOnRelativePath: 'article/entry-a.md',
            pageSectionIdTitles: [
                {id: "section-one", title: "Section One"}
            ]
        },
        onHeaderClick: onHeaderClick,
        selectedTocItem: {
            pageTitle: 'page title',
            pageMeta: {category: "Testing"},
            dirName: 'entry',
            fileName: 'entry-a',
            viewOnRelativePath: 'article/entry-a.md',
            pageSectionIdTitles: []
        },
        toc: {},
        onTocItemClick: {},
        onTocItemPageSectionClick: {},
        onNextPage: {},
        onPrevPage: {},
        textSelection: {},
    };
}

function SamplePage() {
    return (
        <div className="page-content">dummy page content</div>
    )
}

export function SampleFooter() {
    return (
        <div className="footer">dummy footer</div>
    )
}

function genListOfEntries(count: number) {
    return Array(count).fill(0).map((_, idx) => ({
        "sectionTitle": "Entry",
        "pageTitle": "Entry " + idx,
        "pageMeta": {"date": ["2019-09-16"], "summary": ["about blogging " + idx], "category": "Testing"},
        "fileName": "entry-b-" + idx,
        "dirName": "entry",
        "viewOnRelativePath": "articles/entry-b-" + idx + ".md",
        "pageSectionIdTitles": []
    }));
}
