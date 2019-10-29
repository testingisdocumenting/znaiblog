package org.testingisdocumenting.jbe.markdown

import org.junit.Test
import org.testingisdocumenting.znaiblog.markdown.PostMetaExtractor

import java.time.Month

class PostMetaExtractorTest {
    @Test
    void "should extract meta from front matter"() {
        def meta = new PostMetaExtractor().extract("""
---
date: 2019-08-26
summary: about blogging
---
""")

        meta.date.should == [year: 2019, month: Month.AUGUST, dayOfMonth: 26]
        meta.summary.should == 'about blogging'
    }
}
