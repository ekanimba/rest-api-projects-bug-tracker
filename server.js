const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbConfig = require('./db.config')

const app = express();

const db = require("./models");
const { mongoose } = require('./models');
const Role = db.role;

mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

var corsOptions = {
    origin: "http://localhost:8081"
}

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));


require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

const PORT = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3000;
app.listen(PORT, function() {
    console.log(`Server is listening on port ${PORT}`);
});

function initial() {

    Role.estimatedDocumentCount((err, count) => {
        if(!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if(err) {
                    console.log("error", err);
                }
                console.log("added 'user' to roles collection");
            });
            new Role({
                name: "manager"
            }).save(err => {
                if(err) {
                    console.log("error", err);
                }
                console.log("added 'manager' to roles collection");
            });
            new Role({
                name: "admin"
            }).save(err => {
                if(err) {
                    console.log("error", err);
                }
                console.log("added 'admin' to roles collection");
            });
        }
    })
}