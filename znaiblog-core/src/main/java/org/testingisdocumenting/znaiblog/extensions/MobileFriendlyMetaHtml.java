package org.testingisdocumenting.znaiblog.extensions;

import org.testingisdocumenting.znai.website.WebResource;
import org.testingisdocumenting.znai.website.WebSiteResourcesProvider;

import java.util.stream.Stream;

public class MobileFriendlyMetaHtml implements WebSiteResourcesProvider {
    @Override
    public Stream<WebResource> htmlHeadResources() {
        return Stream.of(WebResource.fromResource("mobile-meta.html"));
    }
}
