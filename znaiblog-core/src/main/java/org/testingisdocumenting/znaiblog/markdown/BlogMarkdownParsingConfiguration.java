package org.testingisdocumenting.znaiblog.markdown;

import com.twosigma.znai.core.ComponentsRegistry;
import com.twosigma.znai.parser.MarkupParser;
import com.twosigma.znai.parser.commonmark.MarkdownParser;
import com.twosigma.znai.structure.TableOfContents;
import com.twosigma.znai.structure.TocItem;
import com.twosigma.znai.utils.FileUtils;
import com.twosigma.znai.website.markups.MarkupParsingConfiguration;
import org.testingisdocumenting.znaiblog.PostEntry;

import java.io.File;
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
    private Map<TocItem, Path> pathByTocItem = new HashMap<>();

    @Override
    public String configurationName() {
        return "markdown-blog";
    }

    @Override
    public TableOfContents createToc(ComponentsRegistry componentsRegistry) {
        try {
            List<Path> blogEntries = Files.walk(cfg.getBlogRoot())
                    .filter(Files::isRegularFile)
                    .filter(p -> p.endsWith(filesExtension()))
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
    public Path fullPath(ComponentsRegistry componentsRegistry, Path path, TocItem tocItem) {
        return componentsRegistry.resourceResolver().fullPath(tocItem.getDirName()
                + (tocItem.getDirName().isEmpty() ? "" : File.separator) +
                (tocItem.getFileNameWithoutExtension() + "." + filesExtension()));
    }

    private TableOfContents createToc(List<Path> blogEntries) {
        PostMetaExtractor metaExtractor = new PostMetaExtractor();


        TableOfContents toc = new TableOfContents(filesExtension());

        blogEntries.stream()
                .map(path -> new PostEntry(metaExtractor.extract(FileUtils.fileTextContent(path)), path))
                .sorted(Comparator.comparing(a -> a.getPostMeta().getDate()))
                .forEach(e -> {
                  toc.addTocItem("entry", e.getPath().getFileName().);
                });

        return toc;
    }

    private String filesExtension() {
        return ".md";
    }

}
