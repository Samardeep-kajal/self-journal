const path = require("path");
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./backend/config/db");
console.log("Connecting to database....");
const { errorHandler } = require("./backend/middleware/errorMiddleware");
const app = express();
console.log("Database connected successfully");
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./backend/routes/userRoutes"));
console.log("User routes initialized");
app.use("/api/journals", require("./backend/routes/journalRoutes"));
console.log("journal routes are initialized");

//Serve frontend/client
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "./", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}

app.use(errorHandler);
console.log("Error handler is initialized");

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
console.log("Server is listening on port ", port);
