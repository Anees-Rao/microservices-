declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string;
            MONGODB_URI: string;
            JWT_SECRET: string;
        }
    }
}
declare module 'jsonwebtoken';
