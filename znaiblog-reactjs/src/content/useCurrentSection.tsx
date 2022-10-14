import {useEffect, useRef, useState} from 'react';
import {PageSectionIdTitle, TocItem} from '../model/TocItem';

const emptyIdTitle: PageSectionIdTitle = {id: "", title: ""};

interface VisibleIdTitle {
  firstVisibleIdTitle: PageSectionIdTitle,
  previousNonVisibleTitle: PageSectionIdTitle
}

export function useCurrentAndPreviousSection(tocItem: TocItem, renderedPage: any) {
  const [visibleIdTitle, setVisibleIdTitle] = useState<VisibleIdTitle>(
    {firstVisibleIdTitle: emptyIdTitle, previousNonVisibleTitle: emptyIdTitle});

  const sectionNodesRef = useRef<HTMLDivElement[]>([]);
  const contentParentRef = useRef<HTMLDivElement>(null);

  const previousVisibleRef = useRef<VisibleIdTitle>({firstVisibleIdTitle: emptyIdTitle,
    previousNonVisibleTitle: emptyIdTitle});

  useEffect(() => {
    // @ts-ignore
    contentParentRef.current = document.querySelector(".znai-main-panel");
    // @ts-ignore
    sectionNodesRef.current = [...document.querySelectorAll(".znai-section-title")];

    window.addEventListener("scroll", updateVisibleSections)
    return () => window.removeEventListener("scroll", updateVisibleSections)

    function updateVisibleSections() {
      const newVisible = findFirstVisibleAndPreviousNonVisibleIdTitle();
      if (newVisible.previousNonVisibleTitle.id !== previousVisibleRef.current.previousNonVisibleTitle.id ||
        newVisible.firstVisibleIdTitle.id !== previousVisibleRef.current.firstVisibleIdTitle.id) {
        setVisibleIdTitle(newVisible);
      }

      previousVisibleRef.current = newVisible;
    }

    function findFirstVisibleAndPreviousNonVisibleIdTitle() {
      const hiddenExtraGap = -40;

      const combinedRectsAndTitles = combineSectionTitlesWithNodeRects(tocItem, sectionNodesRef.current);
      if (combinedRectsAndTitles.length === 0) {
        return {firstVisibleIdTitle: emptyIdTitle, previousNonVisibleTitle: emptyIdTitle}
      }

      // elements bound rect will be negative for sections that are above
      // and positive for the things on the screen and below
      // the most previous section has the smallest negative `top`
      // the current section on the screen (if present) has the smallest positive `top`

      let firstVisibleCandidate = combinedRectsAndTitles[0];
      let previousVisibleCandidate = combinedRectsAndTitles[0];

      for (let idx = 0; idx < combinedRectsAndTitles.length; idx++) {
        const rectAndTitle = combinedRectsAndTitles[idx];

        // above screen enough to have hidden text
        if (rectAndTitle.rect.top < hiddenExtraGap) {
          if (rectAndTitle.rect.top > previousVisibleCandidate.rect.top) {
            previousVisibleCandidate = rectAndTitle;
          }
        } else {
          // handle case when is already way above and therefore small negative value
          const firstVisibleCandidateTopAdjusted = firstVisibleCandidate.rect.top < hiddenExtraGap ?
            Number.MAX_VALUE :
            firstVisibleCandidate.rect.top;

          if (rectAndTitle.rect.top < firstVisibleCandidateTopAdjusted) {
            firstVisibleCandidate = rectAndTitle;
          }
        }
      }

      return {firstVisibleIdTitle: isRectVisible(firstVisibleCandidate.rect) ? firstVisibleCandidate.idTitle : emptyIdTitle,
        previousNonVisibleTitle: previousVisibleCandidate.rect.top < hiddenExtraGap ? previousVisibleCandidate.idTitle : emptyIdTitle}

      function isRectVisible(rect: ClientRect | DOMRect) {
        const height = window.innerHeight
        return rect.top > hiddenExtraGap && rect.top < height
      }
    }
  }, [tocItem, renderedPage]);

  return visibleIdTitle;
}

function combineSectionTitlesWithNodeRects(tocItem: TocItem, sectionNodes: HTMLDivElement[]) {
  const pageSections = tocItem.pageSectionIdTitles

  return sectionNodes
    .map((n, idx) => {
      return {idTitle: pageSections[idx], rect: n.getBoundingClientRect()}
    })
}


