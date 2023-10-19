import { User } from "@/types";
import http from "./index";

class AuthService {
  static async login({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    return http.post("/auth/login", { username, password });
  }

  static async logout() {
    return http.get("/auth/logout");
  }

  static async me(): Promise<{ data: User; message: string }> {
    return http.get("/auth/me");
  }
}

export default AuthService;
