import { FetchedError, Genre } from "../../../types/data.types";

export interface INavState{
    activeDirectory: number,
    activeGenre: number,
    isHiddenGenres: boolean,
    genres: Genre[],
    status: 'pending' | 'fulfilled' | 'rejected' | null,
    error: FetchedError | null,
    isErrorOpen: boolean;
}