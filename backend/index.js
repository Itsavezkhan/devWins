import express from "express";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import githubRotes from "./routes/githubRoutes.js";
import domainRoutes from "./routes/domainRoutes.js";
import fieldRoutes from "./routes/fieldRoutes.js";
import valueRoutes from "./routes/valueRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const PORT = 5001;
const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.get("/posts", (req, res) => {
  res.json({ message: "okay bhao" });
});

app.use("/auth", userRoutes);
app.use("/user", githubRotes);
app.use("/api/domains", domainRoutes);
app.use("/api/fields", fieldRoutes);
app.use("/api/values", valueRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
