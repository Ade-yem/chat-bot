import { connect, disconnect } from "mongoose";

const url = process.env.MONGO_URL || "";
console.log(url)

const connectMongo = async () => {
    try {
        await connect(url);
    } catch (error) {
        console.error(error);
        throw new Error("Unable to connect to mongoDB");
    }
}

const disconnectMongo = async () => {
    try {
        await disconnect()
    } catch (error) {
        console.error(error);
        throw new Error("Unable to connect to mongoDB");
    }
}

export {connectMongo, disconnectMongo};
