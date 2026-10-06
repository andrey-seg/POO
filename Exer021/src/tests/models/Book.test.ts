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
        })
    })
})