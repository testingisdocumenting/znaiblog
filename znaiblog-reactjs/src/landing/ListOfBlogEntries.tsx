import React from 'react';

import {TocItem} from '../model/TocItem';

import {renderDate} from '../utils/dateUtils';

import {documentationNavigation} from '../znaiapi/documentationNavigation';

import './ListOfBlogEntries.css';

interface Props {
    tocItems: TocItem[];
}

export function ListOfBlogEntries({tocItems}: Props) {
    return (
        <div className="znaiblog-list-of-blog-entries content-block">
            {tocItems.map(e => <SingleEntry key={e.pageTitle} {...e}/>)}
        </div>
    )
}

function SingleEntry(entry: TocItem) {
    return (
        <div className="znaiblog-list-entry">
            <a className="znaiblog-list-entry-link-wrapper"
               href={documentationNavigation.buildUrl(entry)}
               onClick={onBlogEntryClick(entry)}>
                <div className="znaiblog-list-entry-title">{entry.pageTitle}</div>
                <div className="znaiblog-list-entry-date">{renderDate(entry.pageMeta.date![0])}</div>
                <div className="znaiblog-list-entry-summary">{entry.pageMeta.summary}</div>
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
