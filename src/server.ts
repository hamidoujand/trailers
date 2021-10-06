import app from "./app";
import config from "./config/index";

app.listen(config.port, () => console.log(`listening on ${config.port}`));
