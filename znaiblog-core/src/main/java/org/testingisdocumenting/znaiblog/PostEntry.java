package org.testingisdocumenting.znaiblog;

import org.testingisdocumenting.znaiblog.markdown.PostMeta;

import java.nio.file.Path;

public class PostEntry {
    private final PostMeta postMeta;
    private final Path path;

    public PostEntry(PostMeta postMeta, Path path) {
        this.postMeta = postMeta;
        this.path = path;
    }

    public PostMeta getPostMeta() {
        return postMeta;
    }

    public Path getPath() {
        return path;
    }
}
