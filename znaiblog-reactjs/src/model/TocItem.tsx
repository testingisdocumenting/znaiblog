export interface TocItem {
    pageTitle: string;
    pageMeta: TocItemMeta;
    dirName: string;
    fileName: string;
}

export interface TocItemMeta {
    summary?: string[];
    date?: string[];
}
