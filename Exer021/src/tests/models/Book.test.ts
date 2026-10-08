import { Book } from "../../models/Book";
import { Rating } from "../../feature/Rating";
import { Review } from "../../models/Review";
import { BookStatus } from "../../enums/BookStatus";

describe("Book" , () => {

    let book: Book;

    beforeEach(() => {
        book = new Book("noites brancas", "dostoievski","87897");
    })

    describe("borrow book", () => {

        it("should borrow book successfully", () => {
            book.borrow()
            expect(book.getStatus()).toBe(BookStatus.BORROWED);
        });
    });

    describe("Throw erro when book is alredy borrowed", () => {

        it("should throw error when borrowing unavailable book", () => {
            book.borrow();
            expect(() => book.borrow()).toThrow();
        });
    });

    describe("Return book", () => {

        it("should return book successfully", () => {
            book.borrow();
            book.returnBook();
            expect(book.getStatus()).toBe(BookStatus.AVAILABLE);
        });
    });

    describe("add review and calculate review", () => {

        it("should add review and calculate average rating", () => {
            book.addReview("memberId", 5, "commentary");
            expect(book.getReviews()).toHaveLength(1);
        });

        it("should calculate average rating", () => {
            book.addReview("memberId", 5, "commentary");
            expect(book.getAverageRating()).toBe(5);
        });
    });

    describe("Return false for unevailable books", () => {

        it("should return isAvailable false when borrowed", () => {
            book.borrow();
            expect(book.isAvailable()).toBe(false);
        });
    });
});