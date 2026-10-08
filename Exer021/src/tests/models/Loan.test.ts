import { loanStatus } from "../../enums/LoanStatus";
import { MemberRole } from "../../enums/MemberRole";
import { Book } from "../../models/Book";
import { Loan } from "../../models/Loan"
import { Member } from "../../models/Member";

describe("Loan", () => {

    let loan: Loan;
    let book: Book;
    let member: Member;

    beforeEach(() => {
        book = new Book("noites brancas", "dostoievski","87897");
        member = new Member("Alice", "Alice@email.com", "senha", MemberRole.MEMBER);
        loan = new Loan(book, member, "2026-10-08");
    });

    describe("Loan", () => {

        it("should return loan successfully", () => {
            loan.returnLoan();
            expect(loan.getStatus()).toBe(loanStatus.RETURNED);
        });

        it("should mark loan as overdue", () => {
            loan.markOverdue();
            expect(loan.getStatus()).toBe(loanStatus.OVERDUE);
        });

        it("should return isOverdue true when past due date", () => {
            const pastLoan = new Loan(book, member, "2020-01-01");
            expect(pastLoan.isOverdue()).toBe(true);
        });

        it("should calculate days remaning correctly", () => {
            const futureLoan = new Loan(book, member, "2030-01-01");
            expect(futureLoan.getDaysRemaining()).toBeGreaterThan(0);
        });
    })
})