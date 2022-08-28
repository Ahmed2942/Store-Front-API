import { User, UserModel } from '../../models/user'

const usersModel = new UserModel();
const initUser: User = {
    first_name: "Ahmed",
    last_name: "Heaba",
    password: "qwerty123"
}
let user: User;
let user_id: number;

describe("Testing : User Model", () => {
    it("should have a create method", () => {
        expect(usersModel.create).toBeDefined();
    });
    it("testing create method with user sample", async () => {
        user = await usersModel.create(initUser);
        expect({
            first_name: user.first_name,
            last_name: user.last_name,
        }).toEqual({
            first_name: initUser.first_name,
            last_name: initUser.last_name,
        });
        user_id = user.id!;
    });
    it("should have an index method", () => {
        expect(usersModel.index).toBeDefined();
    });
    it("index method should return list of users", async () => {
        const users = await usersModel.index();
        expect(users).toContain(user);
    })
    it("should have a show method", () => {
        expect(usersModel.show).toBeDefined();
    });
    it("show method should return the requested user", async () => {
        const requestedUser = await usersModel.show(user_id);
        expect(requestedUser).toEqual(user);
    })
})