import React, {useEffect, useState} from 'react';

import {TocItem} from '../model/TocItem';
import {useCurrentAndPreviousSection} from './useCurrentSection';

import "./ArticleSectionSelection.css";

interface Props {
  tocItem: TocItem;
  renderedPage: any;

  onSectionSelect(id: string): void;
}

export function ArticleSectionSelection({tocItem, renderedPage, onSectionSelect}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const currentAndPreviousSections = useCurrentAndPreviousSection(tocItem, renderedPage);

  useEffect(() => {
    if (isExpanded) {
      document.body.className += " znaiblog-body-no-scroll";
    } else {
      document.body.className = document.body.className.replace(" znaiblog-body-no-scroll", "");
    }
  }, [isExpanded]);

  if (!currentAndPreviousSections.previousNonVisibleTitle.id) {
    return null;
  }

  const className = "znaiblog-article-section-selection " + (isExpanded ? "expanded" : "collapsed");

  if (!isExpanded) {
    return (
      <div className={className} onClick={expandSectionSelection}>
        <div className="znaiblog-article-section-selection-current">
          {currentAndPreviousSections.previousNonVisibleTitle.title}
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      <div className="znaiblog-article-section-selection-title-area">
        <div className="znaiblog-article-section-selection-title">
          {tocItem.pageTitle}
        </div>

        <div className="znaiblog-article-section-selection-close" onClick={closeSectionSelection}>
          (close)
        </div>
      </div>

      <div className="znaiblog-article-section-selection-sections-list">
        {tocItem.pageSectionIdTitles.map((idTitle) => {
          const className = "znaiblog-article-section-selection-section" +
            (isSelected() ? " selected" : "");

          return (
            <div key={idTitle.id} className={className} onClick={() => onSectionSelect(idTitle.id)}>
              {idTitle.title}
            </div>
          )

          function isSelected() {
            if (currentAndPreviousSections.firstVisibleIdTitle.id !== "") {
              return idTitle.id === currentAndPreviousSections.firstVisibleIdTitle.id
            }

            return idTitle.id === currentAndPreviousSections.previousNonVisibleTitle.id
          }
        })}
      </div>
    </div>
  )

  function expandSectionSelection() {
    setIsExpanded(false); // TODO make it work properly
  }

  function closeSectionSelection() {
    setIsExpanded(false);
  }
}