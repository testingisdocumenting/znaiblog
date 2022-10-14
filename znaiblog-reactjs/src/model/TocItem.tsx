export interface TocItem {
    pageTitle: string;
    pageMeta: TocItemMeta;
    dirName: string;
    fileName: string;
    viewOnRelativePath: string;
    pageSectionIdTitles: PageSectionIdTitle[];
}

export interface PageSectionIdTitle {
    id: string;
    title: string;
}

export interface TocItemMeta {
    summary?: string[];
    category: string;
    date?: string[];
}
