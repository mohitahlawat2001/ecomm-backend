import mongoose from "mongoose";
import app from "./app.js";
import config from "./config/index.js";


(async () => {
    try {
        await mongoose.connect(config.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        });
        console.log("Mongoose connected !");

        app.on("error", (error) => {
            console.log(error);
            throw error;
        });

        const onListening = () => {
            console.log(`Server is running on port ${config.PORT}`);
        }

        app.listen(5000, onListening);
    } catch (error) {
        console.log(error);
        throw error;
    }
})();