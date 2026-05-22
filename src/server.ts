import app from "./app";
import config from "./config";
import { dataFromdb } from './db';
const main = () => {
    dataFromdb.initUserdb();
    dataFromdb.initIssuedb();
    app.listen(config.port, () => {
  console.log(`App runing on Port ${config.port} Successfully!`);
});
}
main();