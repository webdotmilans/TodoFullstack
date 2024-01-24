import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";
//connection and listener
const PORT = process.env.PORT || 4000;
connectToDatabase()
    .then(() => {
    app.listen(PORT, () => console.log("server Open and connected to database"));
})
    .catch((err) => console.log(err));
//
// Tff5uzHTU9g0M70C
// thezen2
//# sourceMappingURL=index.js.map