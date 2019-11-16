package org.testingisdocumenting.znaiblog.markdown;

import com.twosigma.znai.core.ComponentsRegistry;
import com.twosigma.znai.parser.MarkupParser;
import com.twosigma.znai.parser.MarkupParsingConfiguration;
import com.twosigma.znai.parser.commonmark.MarkdownParser;
import com.twosigma.znai.structure.PageMeta;
import com.twosigma.znai.structure.TableOfContents;
import com.twosigma.znai.structure.TocItem;
import com.twosigma.znai.utils.FileUtils;
import org.testingisdocumenting.znaiblog.PostEntry;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static org.testingisdocumenting.znaiblog.ZnaiBlogCfg.cfg;

public class BlogMarkdownParsingConfiguration implements MarkupParsingConfiguration {
    public static final String CONFIGURATION_NAME = "markdown-blog";

    private Map<TocItem, Path> pathByTocItem = new HashMap<>();

    @Override
    public String configurationName() {
        return CONFIGURATION_NAME;
    }

    @Override
    public TableOfContents createToc(ComponentsRegistry componentsRegistry) {
        try {
            List<Path> blogEntries = Files.walk(cfg.getBlogRoot().resolve(cfg.getArticlesDirName()))
                    .filter(Files::isRegularFile)
                    .filter(p -> p.getFileName().toString().endsWith("." + filesExtension()))
                    .collect(Collectors.toList());

            return createToc(blogEntries);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public MarkupParser createMarkupParser(ComponentsRegistry componentsRegistry) {
        return new MarkdownParser(componentsRegistry);
    }

    @Override
    public Path fullPath(ComponentsRegistry componentsRegistry, Path root, TocItem tocItem) {
        if (tocItem.isIndex()) {
            return root.resolve("index.md");
        }

        Path path = pathByTocItem.get(tocItem);

        if (path == null) {
            throw new IllegalStateException("can't find file associated with TOC Item: " + tocItem);
        }

        return root.resolve(path);
    }

    @Override
    public TocItem tocItemByPath(ComponentsRegistry componentsRegistry, TableOfContents tableOfContents, Path path) {
        return pathByTocItem.entrySet().stream()
                .filter(e -> path.endsWith(e.getValue()))
                .map(Map.Entry::getKey)
                .findFirst()
                .orElse(null);
    }

    private TableOfContents createToc(List<Path> blogEntries) {
        PostMetaExtractor metaExtractor = new PostMetaExtractor();

        TableOfContents toc = new TableOfContents();

        blogEntries.stream()
                .map(path -> new PostEntry(metaExtractor.extract(FileUtils.fileTextContent(path)), path))
                .sorted(Comparator.comparing((PostEntry a) -> a.getPostMeta().getDate()).reversed())
                .forEach(postEntry -> {
                    TocItem tocItem = toc.addTocItem("entry", fileNameWithoutExtension(postEntry.getPath()));
                    tocItem.setPageMeta(new PageMeta());
                    tocItem.setViewOnRelativePath(buildViewOnPath(postEntry));
                    pathByTocItem.put(tocItem, postEntry.getPath());
                });

        toc.addIndex();

        return toc;
    }

    private String filesExtension() {
        return "md";
    }

    private String fileNameWithoutExtension(Path path) {
        String fileName = path.getFileName().toString();
        int lastDotIdx = fileName.lastIndexOf('.');
        if (lastDotIdx == -1) {
            return fileName;
        }

        return fileName.substring(0, lastDotIdx);
    }

    private String buildViewOnPath(PostEntry postEntry) {
        return cfg.getBlogRoot().relativize(postEntry.getPath()).toString()
                .replace('\\', '/');
    }
}
