import { LoanRepository } from "../../repositories/LoanRepository";
import { Loan } from "../../models/Loan";
import { Book } from "../../models/Book";
import { Member } from "../../models/Member";
import { BookStatus } from "../../enums/BookStatus";
import { MemberRole } from "../../enums/MemberRole";
import { loanStatus } from "../../enums/LoanStatus";

const mockLoanService = {
    findById: jest.fn(),
    findAll: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    findByMember: jest.fn(),
    findByBook: jest.fn(),
    findActive: jest.fn()
}

const mockBookService = {
    findById: jest.fn(),
    findAll: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    findByIsbn: jest.fn(),
    findByStatus: jest.fn(),
    findByAuthor: jest.fn()
}

const mockMemberService = {
    findById: jest.fn(),
    findAll: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    findByEmail: jest.fn()
}

describe("LoanRepository", () => {

    let loanRepository: LoanRepository;
    let book: Book;
    let member: Member;

    beforeEach(() => {
        jest.clearAllMocks();
        loanRepository = new LoanRepository(mockLoanService as any, mockBookService as any, mockMemberService as any);
        book = new Book("Clean Code", "Robert Martin", "978-01");
        member = new Member("Alice", "alice@email.com", "123456", MemberRole.MEMBER);
    });

    describe("createLoan", () => {

        it("should create loan successfully", async () => {
            mockMemberService.findById.mockResolvedValue(member);
            mockBookService.findById.mockResolvedValue(book);
            mockLoanService.save.mockImplementation((l: Loan) => Promise.resolve(l));

            const result = await loanRepository.createLoan(member.getId(), book.getId(), "2026-11-01");

            expect(result.success).toBe(true);
            expect(result.data?.getStatus()).toBe(loanStatus.ACTIVE);
            expect(result.data?.getBook()).toBe(book);
            expect(result.data?.getMember()).toBe(member);
            expect(book.getStatus()).toBe(BookStatus.BORROWED);
            expect(member.getActiveLoan()).toBe(1);
            expect(mockLoanService.save).toHaveBeenCalledTimes(1);
        });

        it("should return error when member is not found", async () => {
            mockMemberService.findById.mockResolvedValue(null);
            mockBookService.findById.mockResolvedValue(book);

            const result = await loanRepository.createLoan("invalid-id", book.getId(), "2026-11-01");

            expect(result.success).toBe(false);
            expect(result.error).toBe("Member not found!.");
            expect(mockLoanService.save).not.toHaveBeenCalled();
        });

        it("should return error when book is not found", async () => {
            mockMemberService.findById.mockResolvedValue(member);
            mockBookService.findById.mockResolvedValue(null);

            const result = await loanRepository.createLoan(member.getId(), "invalid-id", "2026-11-01");

            expect(result.success).toBe(false);
            expect(result.error).toBe("Member not found!.");
            expect(mockLoanService.save).not.toHaveBeenCalled();
        });

        it("should return error when member cannot borrow more books", async () => {
            member.incrementLoan();
            member.incrementLoan();
            member.incrementLoan();

            mockMemberService.findById.mockResolvedValue(member);
            mockBookService.findById.mockResolvedValue(book);

            const result = await loanRepository.createLoan(member.getId(), book.getId(), "2026-11-01");

            expect(result.success).toBe(false);
            expect(result.error).toBe("Member cannot borrow more books.");
            expect(mockLoanService.save).not.toHaveBeenCalled();
        });

        it("should return error when book is not available", async () => {
            book.borrow();

            mockMemberService.findById.mockResolvedValue(member);
            mockBookService.findById.mockResolvedValue(book);

            const result = await loanRepository.createLoan(member.getId(), book.getId(), "2026-11-01");

            expect(result.success).toBe(false);
            expect(result.error).toBe("Book is not available. ");
            expect(mockLoanService.save).not.toHaveBeenCalled();
        });
    });

    describe("returnLoan", () => {

        it("should return loan successfully", async () => {
            book.borrow();
            member.incrementLoan();

            const loan = new Loan(book, member, "2026-11-01");
            mockLoanService.findById.mockResolvedValue(loan);

            const result = await loanRepository.returnLoan(loan.getId());

            expect(result.success).toBe(true);
            expect(result.data?.getStatus()).toBe(loanStatus.RETURNED);
            expect(book.getStatus()).toBe(BookStatus.AVAILABLE);
            expect(member.getActiveLoan()).toBe(0);
        });

        it("should return error when loan is not found", async () => {
            mockLoanService.findById.mockResolvedValue(null);

            const result = await loanRepository.returnLoan("invalid-id");

            expect(result.success).toBe(false);
            expect(result.error).toBe("Loan not found.");
        });
    });

    describe("getMemberLoans", () => {

        it("should return member loans", async () => {
            const loan = new Loan(book, member, "2026-11-01");
            mockLoanService.findByMember.mockResolvedValue([loan]);

            const result = await loanRepository.getMemberLoans(member.getId());

            expect(result.success).toBe(true);
            expect(result.data).toHaveLength(1);
            expect(result.data?.[0]).toBe(loan);
            expect(mockLoanService.findByMember).toHaveBeenCalledWith(member.getId());
        });

        it("should return error when member has no loans", async () => {
            mockLoanService.findByMember.mockResolvedValue([]);

            const result = await loanRepository.getMemberLoans(member.getId());

            expect(result.success).toBe(false);
            expect(result.error).toBe("Cannot find member loans. ");
        });
    });

    describe("getOverDueLoans", () => {

        it("should return overdue loans", async () => {
            const overdueLoan = new Loan(book, member, "2020-01-01");
            overdueLoan.markOverdue();

            mockLoanService.findAll.mockResolvedValue([overdueLoan]);

            const result = await loanRepository.getOverDueLoans();

            expect(result.success).toBe(true);
            expect(result.data).toHaveLength(1);
            expect(result.data?.[0]?.getStatus()).toBe(loanStatus.OVERDUE);
        });

        it("should return error when there is no overdue loans", async () => {
            const activeLoan = new Loan(book, member, "2030-01-01");
            mockLoanService.findAll.mockResolvedValue([activeLoan]);

            const result = await loanRepository.getOverDueLoans();

            expect(result.success).toBe(false);
            expect(result.error).toBe("Cannot find overdue loans.");
        });

        it("should return error when there is no loans", async () => {
            mockLoanService.findAll.mockResolvedValue([]);

            const result = await loanRepository.getOverDueLoans();

            expect(result.success).toBe(false);
            expect(result.error).toBe("Cannot find books");
        });
    });

    describe("renewLoan", () => {

        it("should renew loan successfully", async () => {
            const loan = new Loan(book, member, "2026-11-01");
            mockLoanService.findById.mockResolvedValue(loan);
            mockLoanService.save.mockImplementation((l: Loan) => Promise.resolve(l));

            const result = await loanRepository.renewLoan(loan.getId(), "2026-12-01");

            expect(result.success).toBe(true);
            expect(result.data?.getDueDate()).toBe("2026-12-01");
            expect(mockLoanService.save).toHaveBeenCalledTimes(1);
        });

        it("should return error when loan is not found", async () => {
            mockLoanService.findById.mockResolvedValue(null);

            const result = await loanRepository.renewLoan("invalid-id", "2026-12-01");

            expect(result.success).toBe(false);
            expect(result.error).toBe("Cannot find loan.");
        });
    });
})
