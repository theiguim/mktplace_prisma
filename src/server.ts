import expres from "express";
import { router } from "./router";
const app = expres();

app.use(expres.json());

app.use("/api", router);

app.listen(3000, ()=> console.log("Server rodando na porta 3000"));