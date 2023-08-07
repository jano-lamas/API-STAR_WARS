import "dotenv/config";
import express from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import cors from "cors";
import { router } from "./routes";
import db from "./bd/config/mongo";
import updatedb from "./utils/updatedb";


const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

const swaggerDocument = YAML.load("./docs/openapi.yaml");
app.use(
  "/api-docs",
  swaggerUi.serveFiles(swaggerDocument, {}),
  swaggerUi.setup(swaggerDocument)
);
db().then(() => console.log("connection ready"));
updatedb();

app.listen(PORT, () => {
  console.log(`ready on port: ${PORT}`);
});
