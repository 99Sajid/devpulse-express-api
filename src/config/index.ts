import dotenv from "dotenv";
import path from "path";
dotenv.config({
    path: path.join(process.cwd(), ".env"),
});
const PORT = 8000;
const config = {
    connectionString: process.env.CONNECTIONSTRING as string,
    port: PORT,
}


export default config;