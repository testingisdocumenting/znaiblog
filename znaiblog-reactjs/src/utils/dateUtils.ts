export function renderDate(yyyyMmDd: string) {
    return new Date(yyyyMmDd).toDateString();
}