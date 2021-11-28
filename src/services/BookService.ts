import prismaClient from "../prisma";

import { IBookDTO } from "../interfaces/book";


class BookService {
  async getAll() {
    const books = await prismaClient.book.findMany();
    return { books };
  }

  async create(bookPayload: IBookDTO) {
    bookPayload.release_date = new Date(bookPayload.release_date);

    return await prismaClient.book.create({
      data: bookPayload
    });
  }

  async update(bookPayload: IBookDTO) {
    const book = await prismaClient.book.findFirst({
      where: {
        id: bookPayload.id
      }
    });
    if (book.is_rented) {
      throw new Error("A book rented cannot be updated!");
    };

    bookPayload.release_date = new Date(bookPayload.release_date);

    return await prismaClient.book.update({
      data: bookPayload,
      where: { id: bookPayload.id }
    });
  }

  async delete(id: string) {
    console.log(id)
    const book = await prismaClient.book.findFirst({
      where: { id }
    });

    if (!book) {
      throw new Error("Book doesn't registered!");
    }

    if (book.is_rented) {
      throw new Error("The book is rented!");
    }

    return await prismaClient.book.delete({
      where: {
        id
      }
    });
  }


}

export { BookService };
