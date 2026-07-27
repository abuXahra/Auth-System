const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/connectDb");
const errorMiddleware = require("./middleware/error.middleware");
const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");

const app = express();
dotenv.config();
connectDb();

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
