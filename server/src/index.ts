import app from "./app.js"
import { connectMongo } from "./db/connection.js";

const port = process.env.PORT || 3000;

connectMongo().then(() => {
  app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
  });
}). catch((err) => console.error(err))

