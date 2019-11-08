package org.testingisdocumenting.znaiblog.extensions;

import com.twosigma.znai.core.ComponentsRegistry;
import com.twosigma.znai.extensions.PluginParams;
import com.twosigma.znai.extensions.PluginResult;
import com.twosigma.znai.extensions.include.IncludePlugin;
import com.twosigma.znai.parser.ParserHandler;
import com.twosigma.znai.structure.TocItem;

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
        List<TocItem> tocItems = componentsRegistry.docStructure().tableOfContents().getTocItems();

        return PluginResult.docElement("ListOfBlogEntries", Collections.singletonMap("tocItems",
                tocItems.stream()
                        .filter(tocItem -> !tocItem.isIndex())
                        .map(TocItem::toMap)
                        .collect(Collectors.toList())));
    }
}
