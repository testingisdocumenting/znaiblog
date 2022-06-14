import * as React from 'react';

import {DocMeta} from '../model/DocMeta';

import {ThemeSwitch} from './ThemeSwitch';

import {TocItem} from '../model/TocItem';

import './BlogLayout.css';

interface Props {
    previewTracker?: React.ReactNode,
    searchPopup?: React.ReactNode,
    renderedPage: React.ReactNode,
    renderedNextPrevNavigation?: React.ReactNode,
    renderedFooter?: React.ReactNode,
    docMeta: DocMeta,
    selectedTocItem: TocItem,
    toc: object,
    onHeaderClick(): void,
    onTocItemClick: any,
    onTocItemPageSectionClick: any,
    onNextPage: any,
    onPrevPage: any,
    textSelection: any,
    pageGenError?: string
}

export function BlogLayout({
                               previewTracker,
                               searchPopup,
                               renderedPage,
                               renderedNextPrevNavigation,
                               renderedFooter,
                               docMeta,
                               selectedTocItem,
                               toc,
                               onHeaderClick,
                               onTocItemClick,
                               onTocItemPageSectionClick,
                               onNextPage,
                               onPrevPage,
                               textSelection,
                               pageGenError
                           }: Props) {

    const pageGenErrorPanel = pageGenError ? (<div className="page-gen-error">{pageGenError}</div>) : null;

    return (
        <div className="blog-layout">
            <div className="znai-main-panel">
                <div className="blog-header">
                    <div className="blog-header-content">
                        <div className="blog-header-title" onClick={onHeaderClick}>
                            {docMeta.title}
                        </div>

                        <div className="blog-header-search">
                        </div>

                        <div className="blog-header-theme">
                            <ThemeSwitch/>
                        </div>
                    </div>
                </div>

                {renderedPage}

                <div className="page-bottom">
                    <Discuss docMeta={docMeta} tocItem={selectedTocItem}/>
                    {!isIndex(selectedTocItem) && renderedNextPrevNavigation}
                    {renderedFooter}
                </div>

                {pageGenErrorPanel}
            </div>
        </div>
    )
}

interface DiscussProps {
    docMeta: DocMeta;
    tocItem: TocItem;
}

function Discuss({docMeta, tocItem}: DiscussProps) {
    if (isIndex(tocItem)) {
        return null;
    }

    return (
        <div className="blog-discuss">
            <div className="blog-discuss-content">
                <div className="blog-discuss-twitter">
                    <a href={twitterUrl(docMeta, tocItem)} target="_blank" rel="noopener noreferrer">
                        Discuss On Twitter
                    </a>
                </div>

                <div className="blog-discuss-github">
                    <a href={`${docMeta.viewOn.link}/${tocItem.viewOnRelativePath}`} target="_blank"
                       rel="noopener noreferrer">
                        Edit On GitHub
                    </a>
                </div>
            </div>
        </div>
    );
}

function twitterUrl(docMeta: DocMeta, tocItem: TocItem): string {
    const articleUrl = `${window.location.protocol}//${window.location.hostname}/${docMeta.id}/${tocItem.dirName}/${tocItem.fileName}`;
    return 'https://mobile.twitter.com/search?q=' + encodeURIComponent(articleUrl);
}

function isIndex(tocItem: TocItem) {
    return tocItem.fileName === 'index';
}
