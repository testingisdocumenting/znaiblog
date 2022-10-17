package org.testingisdocumenting.znaiblog.extensions;

import org.testingisdocumenting.znai.core.ComponentsRegistry;
import org.testingisdocumenting.znai.extensions.PluginParams;
import org.testingisdocumenting.znai.extensions.PluginResult;
import org.testingisdocumenting.znai.extensions.include.IncludePlugin;
import org.testingisdocumenting.znai.parser.ParserHandler;
import org.testingisdocumenting.znai.structure.TocItem;

import java.nio.file.Path;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class ListOfBlogEntriesIncludePlugin implements IncludePlugin {
    @Override
    public String id() {
        return "list-of-blog-entries";
    }

    @Override
    public IncludePlugin create() {
        return new ListOfBlogEntriesIncludePlugin();
    }

    @Override
    public PluginResult process(ComponentsRegistry componentsRegistry,
                                ParserHandler parserHandler,
                                Path path,
                                PluginParams pluginParams) {
        String category = pluginParams.getFreeParam();
        List<TocItem> tocItems = componentsRegistry.docStructure().tableOfContents().getTocItems();

        return PluginResult.docElement("ListOfBlogEntries", Collections.singletonMap("tocItems",
                tocItems.stream()
                        .filter(tocItem -> tocItem.getDirName().equals(category))
                        .map(TocItem::toMap)
                        .collect(Collectors.toList())));
    }
}
