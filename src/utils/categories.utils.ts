import { FetchedBooks } from "../types/data.types";

export const getCategoryCount = (categoryName: string, books: FetchedBooks[]) => {
    let result=0;
    books.forEach(book => {
        if(book.categories.includes(categoryName)) result+=1;
    })
    return result;
}