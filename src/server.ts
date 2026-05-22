import app from "./app";
import config from "./config";
import { initdb } from './db';
const main = () => {
    initdb();
    app.listen(config.port, () => {
  console.log(`App runing on Port ${config.port} Successfully!`);
});
}
main();