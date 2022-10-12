import React from 'react';

import {TocItem} from '../model/TocItem';

import {renderDate} from '../utils/dateUtils';

import {documentationNavigation} from '../znaiapi/documentationNavigation';

import './ListOfBlogEntries.css';

interface Props {
    tocItems: TocItem[];
}

export function CategorizedListOfBlogEntries({tocItems}: Props) {
    const reversedTocItems = [...tocItems].reverse();

    const byCategory: Record<string, Array<TocItem>> = groupByCategory();


    return (
      <div className="znaiblog-list-all-categories content-block">
          {Object.keys(byCategory).map((category) => {
              return (
                <div className="znaiblog-list-of-blog-entries-with-category" key={category}>
                    <div className="znaiblog-list-of-blog-entries-category">{category}</div>
                    <ListOfBlogEntries tocItems={byCategory[category]}/>
                </div>
              )
          })}
      </div>
    );

    function groupByCategory() {
        const result: Record<string, Array<TocItem>> = {};
        reversedTocItems.forEach(tocItem => {
            const existing = result[tocItem.pageMeta.category];
            if (existing) {
                existing.push(tocItem);
            } else {
                result[tocItem.pageMeta.category] = [tocItem];
            }
        })

        return result;
    }
}

function ListOfBlogEntries({tocItems}: Props) {
    return (
        <div className="znaiblog-list-of-blog-entries">
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
