import { AuthServices } from "../../services/AuthService";
import { User } from "../../models/User";
import { UserRole } from "../../enums/UserRole";

const mockUserRepository = {
    findByEmail: jest.fn(),
    findById: jest.fn(),
    save: jest.fn(),
    findAll: jest.fn(),
    delete: jest.fn()
};

describe("AuthService", () => {

    let authService: AuthServices;

    beforeEach(() => {
        jest.clearAllMocks();
        authService = new AuthServices(mockUserRepository as any);
    });

    describe("register", () => {

        it("Should register a new user sucefalli", async () => {
            mockUserRepository.findByEmail.mockResolvedValue(null);
            mockUserRepository.save.mockImplementation((user: User) => Promise.resolve(user));

            const result = await authService.register("teste", "teste@email.com", "P@$$W0RD");

            expect(result.success).toBe(true);
            expect(result.data?.getName()).toBe("teste");
            expect(result.data?.getEmail()).toBe("teste@email.com");
            expect(result.data?.getRole()).toBe(UserRole.CUSTUMER);
        });

        it("Should return erro for duplicate email", async () => {

            //criando o usuario para testar
            const createdUser = new User("Teste da silva", "testeSilva@email.com", "P@$$W0RD", UserRole.CUSTUMER);
            mockUserRepository.findByEmail.mockResolvedValue(createdUser);

            const result = await authService.register("Maria teste silva", "testeSilva@email.com", "P@$$W0RD");

            expect(result.success).toBe(false);
            expect(result.error).toBe("User alredy register");
            expect(mockUserRepository.save).not.toHaveBeenCalled();
        });
    });

    describe("login", () => {

        it("Should login with correct credentials os user", async () => {

            const createdUser = new User("Teste da silva", "testeSilva@email.com", "P@$$W0RD", UserRole.CUSTUMER);
            mockUserRepository.findByEmail.mockResolvedValue(createdUser);

            const result = await authService.login("testeSilva@email.com", "P@$$W0RD");

            expect(result.success).toBe(true);
            expect(result.data?.getName()).toBe("Teste da silva");
            expect(result.data?.getEmail()).toBe("testeSilva@email.com");
        });

        it("Should return erro for wrong password", async () => {

            const createdUser = new User("Teste da silva", "testeSilva@email.com", "P@$$W0RD", UserRole.CUSTUMER);
            mockUserRepository.findByEmail.mockResolvedValue(createdUser);

            const result = await authService.login("testeSilva@email.com", "NOTTHEP@$$W0RD");

            expect(result.success).toBe(false);
            expect(result.error).toBe("User or password incorrect.");
        });

        it("Should return erro for wrong email", async () => {
            
            mockUserRepository.findByEmail.mockResolvedValue(null);

            const result = await authService.login("NãoEtesteSilva@email.com", "P@$$W0RD");

            expect(result.success).toBe(false);
            expect(result.error).toBe("User or password incorrect.");
        });
    });

    describe("getProfile", () => {

        it("Should return sucess when user is find", async () => {

            const createdUser = new User("Teste da silva", "testeSilva@email.com", "P@$$W0RD", UserRole.CUSTUMER);
            mockUserRepository.findById.mockResolvedValue(createdUser);

            const result = await authService.getProfile(createdUser.getId());

            expect(result.success).toBe(true);
            expect(result.data?.getId()).toBe(createdUser.getId());
        });

        it("Should return erro when user is not found", async () => {

            //Não e estou criando um usuario pq estou buscando erro pra testar.
            mockUserRepository.findById.mockResolvedValue(null);

            const result = await authService.getProfile("ID Invalido");

            expect(result.success).toBe(false);
            expect(result.error).toBe("User not found.")
        })
    })
})