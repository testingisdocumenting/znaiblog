import React from 'react';

import {TocItem} from '../model/TocItem';

import {renderDate} from '../utils/dateUtils';

import {documentationNavigation} from '../structure/documentationNavigation';

import './ListOfBlogEntries.css';

interface Props {
    tocItems: TocItem[];
}

export function ListOfBlogEntries({tocItems}: Props) {
    return (
        <div className="list-of-blog-entries">
            {tocItems.map(e => <SingleEntry key={e.pageTitle} {...e}/>)}
        </div>
    )
}

function SingleEntry(entry: TocItem) {
    return (
        <div className="blog-list-entry">
            <a className="blog-list-entry-link-wrapper"
               href={documentationNavigation.buildUrl(entry)}
               onClick={onBlogEntryClick(entry)}>
                <div className="blog-list-entry-title">{entry.pageTitle}</div>
                <div className="blog-list-entry-date">{renderDate(entry.pageMeta.date![0])}</div>
                <div className="blog-list-entry-summary">{entry.pageMeta.summary}</div>
            </a>
        </div>
    )
}

function onBlogEntryClick(entry: TocItem) {
    return (e: React.MouseEvent) => {
        e.preventDefault();
        documentationNavigation.navigateToPage(entry);
    }
}
