package org.testingisdocumenting.znaiblog.markdown;

import org.commonmark.ext.front.matter.YamlFrontMatterExtension;
import org.commonmark.ext.front.matter.YamlFrontMatterVisitor;
import org.commonmark.node.Node;
import org.commonmark.parser.Parser;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Map;

public class PostMetaExtractor {
    private final Parser parser;

    public PostMetaExtractor() {
        parser = Parser.builder().extensions(Collections.singletonList(YamlFrontMatterExtension.create())).build();
    }

    public PostMeta extract(String markdown) {
        Node node = parser.parse(markdown);

        YamlFrontMatterVisitor frontMatterVisitor = new YamlFrontMatterVisitor();
        node.accept(frontMatterVisitor);

        Map<String, List<String>> meta = frontMatterVisitor.getData();
        return new PostMeta(convertToDate(getRequired(meta, "date")), getRequired(meta, "summary"));
    }

    private static String getRequired(Map<String, List<String>> meta, String key) {
        List<String> values = meta.get(key);
        if (values == null || values.isEmpty()) {
            throw new RuntimeException('<' + key + "> is not found in the header");
        }

        return values.get(0);
    }

    private static LocalDate convertToDate(String yyyyMmDd) {
        return LocalDate.parse(yyyyMmDd);
    }
}
