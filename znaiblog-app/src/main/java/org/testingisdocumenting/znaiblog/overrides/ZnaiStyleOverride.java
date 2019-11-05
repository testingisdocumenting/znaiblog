package org.testingisdocumenting.znaiblog.overrides;

import com.twosigma.znai.web.WebResource;
import com.twosigma.znai.web.extensions.WebSiteResourcesProvider;

import java.util.stream.Stream;

public class ZnaiStyleOverride implements WebSiteResourcesProvider {
    private WebResource jsBundleResource;

    public ZnaiStyleOverride() {
        jsBundleResource = WebResource.fromResource("static/blog-bundle.js");
    }

    @Override
    public Stream<WebResource> jsResources() {
        return Stream.of(jsBundleResource);
    }
}
