const express = require("express");
const Util = require("./util");
const util = new Util();
const app = express();
const port = 3000;

app.use(express.json());
app.get("/", (req, res) => {
    res.send("hello world");
});
app.get("/test", async (req, res) => {
    console.log("request recieved");
    const data = await util.getEmployees();
    console.log(data);
    res.send(data);
});

app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});
