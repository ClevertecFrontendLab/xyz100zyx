import { FetchedError, Category } from "../../../types/data.types";

export interface INavState{
    activeDirectory: number,
    activeGenre: number,
    isHiddenGenres: boolean,
    genres: Category[],
    status: 'pending' | 'fulfilled' | 'rejected' | null,
    error: FetchedError | null,
    isErrorOpen: boolean;
}