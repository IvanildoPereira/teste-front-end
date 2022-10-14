import UserAuth from "../src/models/UserAuth";

declare module 'express-session' {
    interface SessionData {
      user: UserAuth | null;
    }
}