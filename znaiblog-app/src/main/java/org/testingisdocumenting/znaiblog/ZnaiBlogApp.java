package org.testingisdocumenting.znaiblog;

import org.testingisdocumenting.znai.console.ConsoleOutputs;
import org.testingisdocumenting.znai.console.ansi.AnsiConsoleOutput;
import org.testingisdocumenting.znai.html.HtmlPage;
import org.testingisdocumenting.znai.html.reactjs.ReactJsBundle;
import org.testingisdocumenting.znai.parser.MarkupParsingConfigurations;
import org.testingisdocumenting.znai.server.preview.DocumentationPreview;
import org.testingisdocumenting.znai.website.WebResource;
import org.testingisdocumenting.znai.website.WebSite;
import org.testingisdocumenting.znaiblog.markdown.BlogMarkdownParsingConfiguration;

import java.net.InetAddress;
import java.net.UnknownHostException;
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
                withGlobalReferencesPath(cliConfig.getSourceRoot().resolve("references.csv")).
                withFooterPath(cliConfig.getSourceRoot().resolve("footer.md")).
                withExtensionsDefPath(cliConfig.getSourceRoot().resolve("extensions.json")).
                withWebResources(favIconResource).
                withEnabledPreview(cliConfig.isPreview());

        webSite = webSiteCfg.deployTo(deployPath);
    }

    private void preview() {
        DocumentationPreview preview = new DocumentationPreview(cliConfig.getDeployRoot());
        int port = 3333;
        preview.start(webSite, port, () -> {
            reportHostPort(port);
        });
    }

    private static void reportHostPort(int port) {
        try {
            ConsoleOutputs.out("http://", InetAddress.getLocalHost().getHostName(), ":", port, "/preview");
        } catch (UnknownHostException e) {
            ConsoleOutputs.err("Cannot extract host name");
        }
    }
}
