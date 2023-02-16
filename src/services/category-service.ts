import { api } from "../api/config";
import { Category } from "../types/data.types";

export abstract class CategoryService{
    static async getCategories(): Promise<Category[]> {
        const response = await api.get('/api/categories').catch((err) => {
            throw new Error(
              JSON.stringify({ message: err.message, status: err.status, name: err.name, details: err.details })
            );
          });

        return response.data;
    }
}