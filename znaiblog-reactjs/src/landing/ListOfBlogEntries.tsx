import React from 'react';
import './ListOfBlogEntries.css';

interface TocEntry {
    pageTitle: string;
    pageMeta: TocMeta;
    dirName: string;
    fileName: string;
}

interface TocMeta {
    summary?: string[];
    date?: string[];
}

interface Props {
    tocItems: TocEntry[];
}

export function ListOfBlogEntries({tocItems}: Props) {
    return (
        <div className="list-of-blog-entries content-block">
            {tocItems.map(e => <SingleEntry key={e.pageTitle} {...e}/>)}
        </div>
    )
}

function SingleEntry(entry: TocEntry) {
    return (
        <div className="blog-list-entry">
            <a className="blog-list-entry-link-wrapper" href={`${entry.dirName}/${entry.fileName}`}>
                <div className="blog-list-entry-title">{entry.pageTitle}</div>
                <div className="blog-list-entry-date">{renderDate(entry.pageMeta.date![0])}</div>
                <div className="blog-list-entry-summary">{entry.pageMeta.summary}</div>
            </a>
        </div>
    )
}

function renderDate(yyyyMmDd: string) {
    return new Date(yyyyMmDd).toDateString();
}