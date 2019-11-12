import {TocItem} from '../model/TocItem';
import * as React from 'react';

import {renderDate} from '../utils/dateUtils';

import './BlogPageTitle.css';

interface Props {
    tocItem: TocItem;
    onPresentationOpen(): void;
}

export function BlogPageTitle({tocItem, onPresentationOpen}: Props) {
    if (tocItem.fileName === 'index') {
        return null;
    }

    return (
        <div className="blog-page-title">
            <div className="blog-page-title-title">{tocItem.pageTitle}</div>

            <div className="blog-page-title-meta">
                <div className="blog-page-title-date">{renderDate(tocItem.pageMeta.date![0])}</div>
                <div className="blog-page-title-presentation" onClick={onPresentationOpen}>(Presentation Mode)</div>
            </div>
        </div>
    )
}