import dotenv from "dotenv";
import path from "path";
dotenv.config({
    path: path.join(process.cwd(), ".env"),
});
const PORT = 8000;
const config = {
    connectionString: process.env.CONNECTIONSTRING as string,
    port: PORT ,
    accessTokenSecret : process.env.ACCESS_TOKEN_SECRET as string,
    refreshTokenSecret : process.env.REFRESH_TOKEN_SECRET as string,
}


export default config;