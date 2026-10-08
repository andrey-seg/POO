import { BookServices } from "../../services/BookService"
import { Book } from "../../models/Book";
import { BookStatus } from "../../enums/BookStatus";

const monkBookRepository = {
    findById: jest.fn(),
    findAll: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    findByIsbn: jest.fn(),
    findByStatus: jest.fn(),
    findByAuthor: jest.fn()
} 

describe("BookService", () => {

    let bookService = BookServices;

    beforeEach(() => {

    })
})