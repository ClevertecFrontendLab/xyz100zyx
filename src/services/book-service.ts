import { api } from '../api/config';
import { FetchedBook, FetchedBooks } from '../types/data.types';

export abstract class BookService {
  static async getBooks(): Promise<FetchedBooks[]> {
    const response = await api.get('/api/books').catch((err) => {
      throw new Error(
        JSON.stringify({ message: err.message, status: err.status, name: err.name, details: err.details })
      );
    });
    return response.data;
  }

  static async getBookById(id: number): Promise<FetchedBook> {
    const response = await api.get(`/api/books/${id}`).catch((err) => {
      throw new Error(
        JSON.stringify({ message: err.message, status: err.status, name: err.name, details: err.details })
      );
    });
    return response.data;
  }
}
