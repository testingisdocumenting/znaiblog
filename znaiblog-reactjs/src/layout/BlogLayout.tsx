import * as React from 'react';

import {DocMeta} from '../model/DocMeta';

import {ThemeSwitch} from './ThemeSwitch';

import './BlogLayout.css';

interface Props {
    previewTracker?: React.ReactNode,
    searchPopup?: React.ReactNode,
    renderedPage: React.ReactNode,
    renderedNextPrevNavigation?: React.ReactNode,
    renderedFooter?: React.ReactNode,
    docMeta: DocMeta,
    selectedTocItem: object,
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

            <div className="blog-body">
                {previewTracker}

                <div className="blog-entry">
                    <div className="main-panel">
                        {renderedPage}
                    </div>
                </div>
            </div>

            {pageGenErrorPanel}
        </div>
    )
}