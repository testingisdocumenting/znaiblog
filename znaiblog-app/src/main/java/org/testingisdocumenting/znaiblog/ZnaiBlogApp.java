package org.testingisdocumenting.znaiblog;

import com.twosigma.znai.console.ConsoleOutputs;
import com.twosigma.znai.console.ansi.AnsiConsoleOutput;
import com.twosigma.znai.html.HtmlPage;
import com.twosigma.znai.html.reactjs.ReactJsBundle;
import com.twosigma.znai.server.preview.DocumentationPreview;
import com.twosigma.znai.web.WebResource;
import com.twosigma.znai.website.WebSite;
import org.testingisdocumenting.znaiblog.markdown.BlogMarkdownParsingConfiguration;

import java.nio.file.Files;
import java.nio.file.Path;

import static org.testingisdocumenting.znaiblog.ZnaiBlogCfg.cfg;

public class ZnaiBlogApp {
    private final ReactJsBundle reactJsBundle;
    private Path sourceRoot;
    private Path deployRoot;
    private WebSite webSite;

    public static void main(String[] args) {
        ConsoleOutputs.add(new AnsiConsoleOutput());

        ZnaiBlogApp znaiBlogApp = new ZnaiBlogApp();
        znaiBlogApp.start();
    }

    ZnaiBlogApp() {
        reactJsBundle = new ReactJsBundle();
        sourceRoot = cfg.getBlogRoot();
        deployRoot = sourceRoot.resolve("deployed");
    }

    public void start() {
        generateBlog();
        preview();
    }

    private void generateBlog() {
        Path userDefinedFavicon = sourceRoot.resolve("favicon.png");
        WebResource favIconResource = Files.exists(userDefinedFavicon) ?
                WebResource.withPath(userDefinedFavicon, HtmlPage.FAVICON_PATH):
                WebResource.fromResource(HtmlPage.FAVICON_PATH);

        WebSite.Configuration webSiteCfg = WebSite.withRoot(sourceRoot).
                withReactJsBundle(reactJsBundle).
                withId(getDocId()).
                withDocumentationType(BlogMarkdownParsingConfiguration.CONFIGURATION_NAME).
                withMetaFromJsonFile(sourceRoot.resolve("meta.json")).
                withFileWithLookupPaths("lookup-paths").
                withFooterPath(sourceRoot.resolve("footer.md")).
                withExtensionsDefPath(sourceRoot.resolve("extensions.json")).
                withWebResources(favIconResource).
                withEnabledPreview(isPreviewMode());

        webSite = webSiteCfg.deployTo(deployRoot);
    }

    private void preview() {
        DocumentationPreview preview = new DocumentationPreview(sourceRoot, deployRoot);
        preview.start(webSite, 3333);
    }

    private boolean isPreviewMode() {
        return true;
    }

    private String getDocId() {
        return "todo-blog";
    }
}
