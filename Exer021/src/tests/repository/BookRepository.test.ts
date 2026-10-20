import { BookRepository } from "../../repositories/BookRepository";
import { Book } from "../../models/Book";

const mockBookRepository = {
    findById: jest.fn(),
    findAll: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    findByIsbn: jest.fn(),
    findByStatus: jest.fn(),
    findByAuthor: jest.fn()
} 

describe("BookRepository", () => {

    let bookRepository: BookRepository;

    beforeEach(() => {
        jest.clearAllMocks();
        bookRepository = new BookRepository(mockBookRepository as any);
    });

    describe("addBook", () => {

        it("Should add book successfully", async () => {
            mockBookRepository.findByIsbn.mockResolvedValue(null);
            mockBookRepository.save.mockImplementation((b: Book) => Promise.resolve(b));

            const result = await bookRepository.addBook("Clean Code", "Robert Martin", "978-01");

            expect(result.success).toBe(true);
            expect(result.data?.getTitle()).toBe("Clean Code");
            expect(result.data?.getIsbn()).toBe("978-01");
            expect(mockBookRepository.save).toHaveBeenCalledTimes(1);
        });

        it("Should return error for duplicate isbn", async () => {

            const existingBook = new Book("Clean Code", "Robert Martin", "978-01");
            mockBookRepository.findByIsbn.mockResolvedValue(existingBook);

            const result = await bookRepository.addBook("Clean Code", "Robert Martin", "978-01");

            expect(result.success).toBe(false);
            expect(result.error).toBe("Book is alredy registerd.");
            expect(mockBookRepository.save).not.toHaveBeenCalled();
        })
    })
})
