import {Registry} from 'react-component-viewer';
import {BlogLayout} from '../layout/BlogLayout';
import {layoutDemoCommonProps, SampleFooter} from '../layout/BlogLayout.demo';
import * as React from 'react';

export function articleDemo(registry: Registry) {
  const commonProps = layoutDemoCommonProps();
  commonProps.tocItem = {
    pageTitle: 'page title',
    pageMeta: {category: "Testing"},
    dirName: 'entry',
    fileName: 'entry-a',
    viewOnRelativePath: 'article/entry-a.md',
    pageSectionIdTitles: [
      {id: "section-one", title: "Section One Section One Section One Section One Section One Section One Section One Section One Section One Section One Section One Section One Section One Section One "},
      {id: "section-two", title: "Section Two"},
      {id: "section-three", title: "Section Three"},
    ]
  }

  registry.add("section display", () => <BlogLayout
    renderedPage={<PageWithSections/>}
    renderedFooter={<SampleFooter/>}
    {...commonProps}/>)
}

function PageWithSections() {
  return (
    <div className="page-content">
      dummy page content

      <h1 className="znai-section-title">Section One</h1>
      <DummyContent/>
      <h1 className="znai-section-title">Section Two</h1>
      <DummyContent/>
      <h1 className="znai-section-title">Section Three</h1>
      <DummyContent/>
    </div>
  )
}

function DummyContent() {
  let content = []
  for (let idx = 0; idx < 20; idx++) {
    content.push(<p key={idx}>dummy line number {idx}</p>)
  }

  return (
    <div className="content-block">
      {content}
    </div>
  )
}