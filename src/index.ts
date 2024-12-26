import express, { Request, Response } from "express";
import userRoutes from "./routes/userRoutes";
import creatureRoutes from "./routes/creatureRoutes";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", creatureRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Holy Crap API!");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
