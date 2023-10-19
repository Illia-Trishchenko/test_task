import { JwtPayload } from "jsonwebtoken";

export interface User {
  _id: number;
  username: string;
}


export interface UserJwtPayload extends JwtPayload {
  username: string;
}