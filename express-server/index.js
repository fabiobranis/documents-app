import Express from "express";
import BodyParser from "body-parser";

const port = 3000;
const app = Express();
app.use(BodyParser.json());
app.use(
    BodyParser.urlencoded({
        extended: false
    })
);

app.get("/", (req, res) => {
    res.json({ status: "Server is running" });
});

app.listen(port, () => {
    console.log(`Server is running at localhost:${port}`);
});
