export interface Page<T> {
    results: Array<T>;
    page: number;
    size: number;
    totalPages: number;
}