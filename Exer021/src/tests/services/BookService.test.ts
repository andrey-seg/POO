import { BookServices } from "../../services/BookRepository"
import { Book } from "../../models/Book";
import { BookStatus } from "../../enums/BookStatus";

const monkBookRepository = {
    findById: jest.fn(),
    findAll: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    findBy 
} 

describe("BookService", () => {

    let bookService = BookServices;

    beforeEach(() => {

    })
})