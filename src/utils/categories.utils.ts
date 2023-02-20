import {Category, FetchedBooks} from "../types/data.types";

export const getCategoryCount = (categoryName: string, books: FetchedBooks[]) => {
    let result=0;
    books.forEach(book => {
        if(book.categories.includes(categoryName)) result+=1;
    })
    return result;
}

export const getCategoryName = (path: string, categories: Category[]) => {
    const category =  categories.find((item) => item.path === path);
    return category ? category.name : '...'
}
