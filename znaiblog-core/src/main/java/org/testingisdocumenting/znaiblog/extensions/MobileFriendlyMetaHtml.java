package org.testingisdocumenting.znaiblog.extensions;

import com.twosigma.znai.web.WebResource;
import com.twosigma.znai.web.extensions.WebSiteResourcesProvider;

import java.util.stream.Stream;

public class MobileFriendlyMetaHtml implements WebSiteResourcesProvider {
    @Override
    public Stream<WebResource> htmlHeadResources() {
        return Stream.of(WebResource.fromResource("mobile-meta.html"));
    }
}
