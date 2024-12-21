import express from "express";
import client from "./db";

const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  try {
    const result = await client.query("SELECT NOW()");
    res.json({ message: "Connection successful", time: result.rows[0] });
  } catch (err: any) {
    console.error("Error querying PostgreSQL:", err.stack);
    res.status(500).json({ error: "Database query failed" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
