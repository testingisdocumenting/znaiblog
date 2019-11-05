import * as React from 'react';

interface Props {
    previewTracker?: React.ReactNode,
    searchPopup?: React.ReactNode,
    renderedPage?: React.ReactNode,
    renderedNextPrevNavigation?: React.ReactNode,
    renderedFooter?: React.ReactNode,
    docMeta: object,
    selectedTocItem: object,
    toc: object,
    onHeaderClick: any,
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
            {previewTracker}

            <div className="blog-entry">
                <div className="main-panel">
                    {renderedPage}
                </div>
            </div>

            {pageGenErrorPanel}
        </div>
    )
}