import express from "express";
import cookieParser from "cookie-parser";
import dotEnv from "dotenv";
import router from "./routes/index.js";
import LogMiddleware from "./middlewares/log.middleware.js";
import ErrorHandlingMiddleware from "./middlewares/error-handling.middleware.js";

//.env에 있는 여러 값들을, prosess.env 객체 안에 추가하게 된다.
dotEnv.config();

const app = express();
const port = 4001;

app.use(LogMiddleware);
app.use(express.json());
app.use(cookieParser());

app.use("/api", router);
app.use(ErrorHandlingMiddleware);

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});
