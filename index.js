const express = require("express");
const Util = require("./util");
const util = new Util();
const app = express();
const port = 3000;

app.use(express.json());
app.post("/identity", async (req, res) => {
    const [email, phoneNumber] = [req.body.email, req.body.phoneNumber];
    if (email === null && phoneNumber === null) {
        console.log("invalid request");
        return res.status(400).json({});
    }
    try {
        const pcid = await util.handleRequest(email, phoneNumber);
        const data = await util.generateResponse(pcid);
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});
