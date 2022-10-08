package org.testingisdocumenting.znaiblog;

public class ZnaiBlogCfg {
    public static final ZnaiBlogCfg cfg = new ZnaiBlogCfg();

    private ZnaiBlogCfg() {
    }

    public String getArticlesDirName() {
        return "entry";
    }
}
