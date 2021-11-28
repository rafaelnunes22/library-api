import { Request, Response } from "express";
import { UserService } from "../services/UserService";

class UserController {
  async authenticate(request: Request, response: Response) {
    try {
      const { username, password } = request.body;
      const service = new UserService();
      const result = await service.authenticate(username, password);

      const reqResponse = {
        status: 200,
        message: "success"
      }
      return response.json({ result, reqResponse });
    } catch (err) {
      const reqResponse = {
        status: 401,
        message: err.message
      }
      return response.json({ reqResponse });
    }
  }

  async generateUser(request: Request, response: Response) {
    try {
      const service = new UserService();
      const result = await service.generateUser();
      return response.json({ result });
    } catch (err) {
      return response.json({ error: err.message });
    }
  }
}

export { UserController };
