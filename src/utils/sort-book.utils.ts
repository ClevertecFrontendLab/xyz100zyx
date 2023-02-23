import {Category, FetchedBooks} from '../types/data.types';
import {SortType} from '../store/slices/filter/filter.types';

export const sortBooks = (activeGenre: number, sortedType: SortType, inputValue: string, genres: Category[],unfilteredBooks: FetchedBooks[]): FetchedBooks[] => {
    let sortedBooks;

    if (sortedType === SortType.ASC) {
        sortedBooks = [...unfilteredBooks].sort((cur, next) =>
            !cur.rating && !next.rating
                ? -1
                : !cur.rating
                    ? -1
                    : !next.rating
                        ? 1
                        : cur.rating - next.rating
                            ? cur.rating - next.rating
                            : -1
        );
    } else {
        sortedBooks = [...unfilteredBooks].sort((cur, next) =>
            !cur.rating && !next.rating
                ? -1
                : !cur.rating
                    ? 1
                    : !next.rating
                        ? -1
                        : cur.rating - next.rating
                            ? next.rating - cur.rating
                            : -1
        );
    }

    if (inputValue) {
        const buffer = sortedBooks.filter((book) => book.title.toLowerCase().includes(inputValue.toLocaleLowerCase()));
        sortedBooks = buffer;
    }

    if (activeGenre !== 0) {
        const activeGenreName = genres.find((item) => item.id === activeGenre)?.name;
        const filteredBooks = sortedBooks.filter((book) => book.categories.includes(activeGenreName!));
       return filteredBooks;
    }
    return sortedBooks

}
