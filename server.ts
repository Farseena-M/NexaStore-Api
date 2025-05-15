import dotenv from "dotenv";
import { connectDB } from "./src/db/dbConnection";
import app from "./app";
dotenv.config()


connectDB()

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})