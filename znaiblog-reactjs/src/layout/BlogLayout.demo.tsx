import * as React from 'react';

import {Registry} from 'react-component-viewer';
import {BlogLayout} from './BlogLayout';

export function blogLayoutDemo(registry: Registry) {
    registry.add('default', () => (
        <BlogLayout
            renderedPage={<SamplePage/>}
            docMeta={{}}
            selectedTocItem={{}}
            toc={{}}
            onHeaderClick={{}}
            onTocItemClick={{}}
            onTocItemPageSectionClick={{}}
            onNextPage={{}}
            onPrevPage={{}}
            textSelection={{}}/>
    ));
}

function SamplePage() {
    return (
        <div>dummy page content</div>
    )
}