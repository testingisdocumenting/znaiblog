package org.testingisdocumenting.znaiblog;

import com.twosigma.znai.console.ConsoleOutputs;
import com.twosigma.znai.console.ansi.AnsiConsoleOutput;
import com.twosigma.znai.html.HtmlPage;
import com.twosigma.znai.html.reactjs.ReactJsBundle;
import com.twosigma.znai.parser.MarkupParsingConfigurations;
import com.twosigma.znai.server.preview.DocumentationPreview;
import com.twosigma.znai.web.WebResource;
import com.twosigma.znai.website.WebSite;
import org.testingisdocumenting.znaiblog.markdown.BlogMarkdownParsingConfiguration;

import java.nio.file.Files;
import java.nio.file.Path;

public class ZnaiBlogApp {
    private final ReactJsBundle reactJsBundle;
    private final Path deployPath;
    private final ZnaiBlogCliConfig cliConfig;
    private WebSite webSite;

    public static void main(String[] args) {
        ConsoleOutputs.add(new AnsiConsoleOutput());

        ZnaiBlogApp znaiBlogApp = new ZnaiBlogApp(new ZnaiBlogCliConfig(args));
        znaiBlogApp.start();
    }

    private ZnaiBlogApp(ZnaiBlogCliConfig cliConfig) {
        this.cliConfig = cliConfig;
        reactJsBundle = new ReactJsBundle();
        deployPath = cliConfig.getDeployRoot().resolve(cliConfig.getDocId());
    }

    private void start() {
        generateBlog();
        if (cliConfig.isPreview()) {
            preview();
        }
    }

    private void generateBlog() {
        MarkupParsingConfigurations.add(new BlogMarkdownParsingConfiguration(cliConfig.getSourceRoot()));

        Path userDefinedFavicon = cliConfig.getSourceRoot().resolve("favicon.png");
        WebResource favIconResource = Files.exists(userDefinedFavicon) ?
                WebResource.withPath(userDefinedFavicon, HtmlPage.FAVICON_PATH):
                WebResource.fromResource(HtmlPage.FAVICON_PATH);

        WebSite.Configuration webSiteCfg = WebSite.withRoot(cliConfig.getSourceRoot()).
                withReactJsBundle(reactJsBundle).
                withId(cliConfig.getDocId()).
                withDocumentationType(BlogMarkdownParsingConfiguration.CONFIGURATION_NAME).
                withMetaFromJsonFile(cliConfig.getSourceRoot().resolve("meta.json")).
                withFileWithLookupPaths("lookup-paths").
                withFooterPath(cliConfig.getSourceRoot().resolve("footer.md")).
                withExtensionsDefPath(cliConfig.getSourceRoot().resolve("extensions.json")).
                withWebResources(favIconResource).
                withEnabledPreview(isPreviewMode());

        webSite = webSiteCfg.deployTo(deployPath);
    }

    private void preview() {
        DocumentationPreview preview = new DocumentationPreview(cliConfig.getSourceRoot(), cliConfig.getDeployRoot());
        preview.start(webSite, 3333);
    }

    private boolean isPreviewMode() {
        return true;
    }
}
