package org.testingisdocumenting.znaiblog.overrides;

import org.testingisdocumenting.znai.web.WebResource;
import org.testingisdocumenting.znai.web.extensions.WebSiteResourcesProvider;

import java.util.stream.Stream;

public class ZnaiStyleOverride implements WebSiteResourcesProvider {
    private final WebResource jsBundleResource;
    private final WebResource cssStyleResource;

    public ZnaiStyleOverride() {
        jsBundleResource = WebResource.fromResource("static/blog-bundle.js");
        cssStyleResource = WebResource.fromResource("static/blog-style.css");
    }

    @Override
    public Stream<WebResource> jsResources() {
        return Stream.of(jsBundleResource);
    }

    @Override
    public Stream<WebResource> cssResources() {
        return Stream.of(cssStyleResource);
    }
}
