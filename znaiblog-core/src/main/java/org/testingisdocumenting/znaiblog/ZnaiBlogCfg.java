package org.testingisdocumenting.znaiblog;

import java.nio.file.Path;
import java.nio.file.Paths;

public class ZnaiBlogCfg {
    public static final ZnaiBlogCfg cfg = new ZnaiBlogCfg();

    private Path blogRoot = Paths.get("");

    public Path getBlogRoot() {
        return blogRoot;
    }
}
