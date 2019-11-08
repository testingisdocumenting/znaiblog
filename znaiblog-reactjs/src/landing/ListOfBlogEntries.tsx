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
        <div className="list-of-blog-entries">
            {tocItems.map(e => <SingleEntry key={e.pageTitle} {...e}/>)}
        </div>
    )
}

function SingleEntry(entry: TocEntry) {
    return (
        <div className="blog-list-entry">
            <a className="blog-list-entry-link-wrapper" href={`${entry.dirName}/${entry.fileName}`}>
                <div className="blog-list-entry-title">{entry.pageTitle}</div>
                <div className="blog-list-entry-title">{entry.pageMeta.summary}</div>
                <div className="blog-list-entry-title">{entry.pageMeta.date}</div>
            </a>
        </div>
    )
}