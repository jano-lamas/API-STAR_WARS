import { describe, expect, test, jest } from "@jest/globals";
import { AuthCtrl } from "../controllers/auth";
import httpMocks from "node-mocks-http";

const mockResponse = httpMocks.createResponse();
mockResponse.status = jest.fn(() => mockResponse);
mockResponse.json = jest.fn(() => mockResponse);

let mockRequest = httpMocks.createRequest({
  body: {
    name: "user2",
    lastName: "user test",
    email: "user@emai2l.com",
    password: "password",
    type: ["Administrador"],
  },
});

jest.mock("../service/auth", () => ({
  registerNewUser: jest.fn(),
}));

describe("AuthController", () => {
  describe("/register", () => {
    test("should runs succesfully", async () => {
      const data = {
        name: "user2",
        lastName: "user test",
        email: "user@emai2l.com",
        password:
          "$2a$08$UEGAJKCz.S6igkVMXzhW8.fcammpdkHaOqB3cz65V0CVqnShrsXUi",
        type: ["Administrador"],
        _id: "64d0310d2140f59d545fd009",
        createdAt: "2023-08-06T23:47:25.316Z",
        updatedAt: "2023-08-06T23:47:25.316Z",
      };

      const registerNewUser =
        require("../service/auth").registerNewUser.mockResolvedValue(data);

      await AuthCtrl.register(mockRequest, mockResponse);

      expect(mockResponse.status).toBeCalledWith(200);
      expect(mockResponse.json).toBeCalledWith({ data });
      expect(registerNewUser).toBeCalledWith(mockRequest.body);
    });
    test("should catch errror", async () => {
      const registerNewUser =
        require("../service/auth").registerNewUser.mockRejectedValue(
          "Error bd"
        );

      await AuthCtrl.register(mockRequest, mockResponse);

      expect(mockResponse.status).toBeCalledWith(500);
      expect(mockResponse.json).toBeCalledWith({ message: "Error bd" });
    });
  });
});
