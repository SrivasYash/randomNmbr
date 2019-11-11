const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Nmbr = require("./number");
const NmbrMsg = require('./nmbr_msg');

const app = express();
// set the view engine to ejs
app.set('view engine', 'ejs');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const port = process.env.PORT || 5000;

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))
app.get('/saveRandom/:param1', async function (req, res, next) {
  var json = {}

  for (i = 1; i <= req.params.param1; i++) {
    //get the response
    let nmbrMsg = await NmbrMsg.search({ number: i }).catch(e => next(e));
    if (nmbrMsg !== undefined) {
      json[i] = nmbrMsg[0].message
    }
  }
  //console.log(json);
  res.render('index', { data: json });

  //create an entry of response
  let numberObj = {
    number: req.params.param1,
    message: json,
    time: Date.now()
  }
  await Nmbr.create(numberObj).catch(e => next(e));

});
app.listen(port, () => console.log(`Server running on port ${port}`));