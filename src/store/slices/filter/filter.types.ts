export const enum SortType {
    ASC = 'asc',
    DESC = 'desc'
}

export type FilterOptions = {
    activeGenre: number;
    inputValue: string;
    sortedType: SortType
}