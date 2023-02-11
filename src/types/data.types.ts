export type Book = {
    id: number,
    picture: any[],
    rating: number | null,
    title: string,
    author: Array<string>,
    year: number,
    isAvailable: boolean,
    city: string,
    pages: number,
    binding: string,
    genre: string,
    weight: number,
    isbn: string,
    manufacturer: string,
    reviews: Array<Review>,
    format: string,
    description: string,
    busyUntil?: string,
    inCard?: true
}

export type Review = {
    author: string,
    avatar: any,
    comment: string,
    rating: number,
    date: string,
}