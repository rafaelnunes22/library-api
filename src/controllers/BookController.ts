import { Request, Response } from "express";
import { BookService } from "../services/BookService";

class BookController {
  async getAll(request: Request, response: Response) {
    try {
      const service = new BookService();

      const result = await service.getAll();

      const reqResponse = {
        status: 200,
        message: "success"
      }
      return response.json({ result, reqResponse });
    } catch (err) {
      return response.json({ error: err.message });
    }
  }

  async create(request: Request, response: Response) {
    try {
      const service = new BookService();

      const result = await service.create(request.body);

      const reqResponse = {
        status: 201,
        message: "success"
      }

      return response.json({ result, reqResponse });
    } catch (err) {
      return response.json({ error: err.message });
    }
  }

  async update(request: Request, response: Response) {
    try {
      const service = new BookService();
      const result = await service.update(request.body);

      const reqResponse = {
        status: 201,
        message: "success"
      }
      return response.json({ result, reqResponse });
    } catch (err) {
      const reqResponse = {
        status: 400,
        message: err.message
      }
      return response.json({ reqResponse });
    }
  }

  async delete(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const service = new BookService();
      await service.delete(id);

      const reqResponse = {
        status: 200,
        message: "success"
      }
      return response.json({ reqResponse });
    } catch (err) {
      const reqResponse = {
        status: 400,
        message: err.message
      }
      return response.json({ reqResponse });
    }
  }
}

export { BookController };
