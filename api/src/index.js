const express = require('express');
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:5173",
};

const app = express();
app.use(cors(corsOptions));



const route = require('./routes');
const db = require('./config/db');

// Connect db
db.connect();

const port = 3003;

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// Route init
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
