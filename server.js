require("dotenv").config();
const express = require("express")
const PORT = process.env.PORT || 3465 ;
const sequelize = require("./database/database.js");
const userRouter = require("./routes/router.js")

const app = express();
app.use(express.json());
app.use(userRouter)

const DBConnect = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connected successfully")
    }catch (error){
        console.error("Unable to connect to the database:", error.message)
    }

    }

    DBConnect()

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});