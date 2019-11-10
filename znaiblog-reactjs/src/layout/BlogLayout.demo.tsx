import * as React from 'react';

import {Registry} from 'react-component-viewer';
import {BlogLayout} from './BlogLayout';
import {ListOfBlogEntries} from '../landing/ListOfBlogEntries';

export function blogLayoutDemo(registry: Registry) {
    const commonData = {
        docMeta: {},
        selectedTocItem: {},
        toc: {},
        onHeaderClick: {},
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
        "fileName": "entry-b",
        "dirName": "entry",
        "pageSectionIdTitles": []
    }));
}
