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

//app.use('/api',require('./routes/api'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
    console.log(`Server is listening on port ${PORT}`);
});
