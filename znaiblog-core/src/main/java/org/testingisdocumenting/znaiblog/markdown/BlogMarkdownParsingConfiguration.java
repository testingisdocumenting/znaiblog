package org.testingisdocumenting.znaiblog.markdown;

import org.testingisdocumenting.znai.core.ComponentsRegistry;
import org.testingisdocumenting.znai.parser.MarkupParser;
import org.testingisdocumenting.znai.parser.MarkupParsingConfiguration;
import org.testingisdocumenting.znai.parser.commonmark.MarkdownParser;
import org.testingisdocumenting.znai.structure.PageMeta;
import org.testingisdocumenting.znai.structure.TableOfContents;
import org.testingisdocumenting.znai.structure.TocItem;
import org.testingisdocumenting.znai.structure.TocNameAndOpts;
import org.testingisdocumenting.znai.utils.FileUtils;
import org.testingisdocumenting.znaiblog.PostEntry;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDate;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class BlogMarkdownParsingConfiguration implements MarkupParsingConfiguration {
    public static final String CONFIGURATION_NAME = "markdown-blog";

    private final Map<TocItem, Path> pathByTocItem = new HashMap<>();
    private final Path sourceRoot;

    public BlogMarkdownParsingConfiguration(Path sourceRoot) {
        this.sourceRoot = sourceRoot;
    }

    @Override
    public String configurationName() {
        return CONFIGURATION_NAME;
    }

    @Override
    public TableOfContents createToc(String docTitle, ComponentsRegistry componentsRegistry) {
        try (Stream<Path> pathStream = Files.walk(sourceRoot)
                .filter(Files::isRegularFile)
                .filter(p -> (!p.getParent().equals(sourceRoot) || p.getFileName().toString().equals("index.md")) &&
                        p.getFileName().toString().endsWith("." + filesExtension()))) {

            List<Path> blogEntries = pathStream.collect(Collectors.toList());
            return createToc(docTitle, blogEntries);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public MarkupParser createMarkupParser(ComponentsRegistry componentsRegistry) {
        return new MarkdownParser(componentsRegistry);
    }

    @Override
    public String tocItemResourceName(TocItem tocItem) {
        return pathByTocItem.get(tocItem).toString();
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

    private TableOfContents createToc(String docTitle, List<Path> blogEntries) {
        PostMetaExtractor metaExtractor = new PostMetaExtractor();

        TableOfContents toc = new TableOfContents();
        toc.addIndex();

        blogEntries.stream()
                .map(path -> createPostEntry(metaExtractor, path))
                .sorted(Comparator.comparing((PostEntry a) -> a.getPostMeta().getDate()))
                .forEach(postEntry -> {
                    TocItem tocItem = toc.addTocItem(new TocNameAndOpts(
                            postEntry.getPath().getParent().getFileName().toString()),
                            fileNameWithoutExtension(postEntry.getPath()));
                    tocItem.setPageMeta(new PageMeta());
                    tocItem.setViewOnRelativePath(buildViewOnPath(postEntry));
                    pathByTocItem.put(tocItem, postEntry.getPath());
                });

        return toc;
    }

    private static PostEntry createPostEntry(PostMetaExtractor metaExtractor, Path path) {
        PostMeta postMeta = path.getFileName().toString().equals("index.md") ?
                new PostMeta(LocalDate.now(), "") :
                metaExtractor.extract(FileUtils.fileTextContent(path));

        return new PostEntry(postMeta, path);
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
        return sourceRoot.relativize(postEntry.getPath()).toString()
                .replace('\\', '/');
    }
}
