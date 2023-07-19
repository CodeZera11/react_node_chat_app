const express = require("express");
const cors = require("cors");
const { default: axios } = require("axios");

const app = express();
app.use(express.json());
app.use(cors({origin: true}));

app.post("/authenticate", async (req,res)=>{
    const { username } = req.body;

    try {
        const response = await axios.put(
            "https://api.chatengine.io/users/",
            {username, secret: username, first_name: username},
            { headers: { "private-key": "4cd20ec1-217d-4620-b374-5860f13e44fc" } }
        )

        return res.status(response.status).json(response.data);
    } catch (error) {
        return res.status(error.response.status).json(error.response.data);
    }

    return res.json({ username: username, secret: "secret"});
})

const PORT = process.env.PORT || 3001

app.listen(PORT);