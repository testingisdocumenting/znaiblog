import * as React from 'react';

import {Registry} from 'react-component-viewer';
import {ListOfBlogEntries} from './ListOfBlogEntries';

export function listOfBlogEntriesDemo(registry: Registry) {
    registry.add('default', () => (
        <ListOfBlogEntries tocItems={sampleData()}/>
    ));
}

function sampleData() {
    return [
        {
            "sectionTitle": "Entry",
            "pageTitle": "Entry A",
            "pageMeta": {"date": ["2019-10-26"], "summary": ["newer about blogging"]},
            "fileName": "entry-a",
            "dirName": "entry",
            "viewOnRelativePath": "article/entry-a.md",
            "pageSectionIdTitles": []
        },
        {
            "sectionTitle": "Entry",
            "pageTitle": "Entry B",
            "pageMeta": {"date": ["2019-09-16"], "summary": ["about blogging"], "category": "Testing"},
            "fileName": "entry-b",
            "dirName": "entry",
            "viewOnRelativePath": "article/entry-b.md",
            "pageSectionIdTitles": []
        },
        {
            "sectionTitle": "Entry",
            "pageTitle": "Entry C",
            "pageMeta": {"date": ["2019-08-11"], "summary": ["REST API testing"], "category": "Testing"},
            "fileName": "entry-c",
            "dirName": "entry",
            "viewOnRelativePath": "article/entry-c.md",
            "pageSectionIdTitles": []
        },
    ]
}
