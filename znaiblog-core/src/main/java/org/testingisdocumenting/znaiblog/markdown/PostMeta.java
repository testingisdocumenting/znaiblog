package org.testingisdocumenting.znaiblog.markdown;

import java.time.LocalDate;

public class PostMeta {
    private final LocalDate date;
    private final String summary;

    public PostMeta(LocalDate date, String summary) {
        this.date = date;
        this.summary = summary;
    }

    public LocalDate getDate() {
        return date;
    }

    public String getSummary() {
        return summary;
    }
}
