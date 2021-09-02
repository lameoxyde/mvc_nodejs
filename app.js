//Node.js ==> Express Framework (SIMPLE SERVER)
const express = require("express"),
    Twig = require("twig")
let app = express();
//Port to listen on
const PORT = 8000;

const path = require("path");

const bodyParser = require("body-parser");

const fileUpload = require ('express-fileupload')

const bootstrap = require("./src/boostrap");

const cors = require('cors')

app.use(cors())

//Use a Custom Templating Engine
// This section is optional and used to configure twig.
app.set("twig options", {
    allow_async: true, // Allow asynchronous compiling
    strict_variables: false
});

app.set("views", path.resolve("./src/views"));

//Request Parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
//Create Express Router
const router = express.Router();

//global Middleware
var date = new Date(Date.now() * 1000);
// Hours part from the timestamp
var hours = date.getHours();
// Minutes part from the timestamp
var minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
var seconds = "0" + date.getSeconds();

// Will display time in 10:30:23 format
var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);


router.use(function(req, res, next) {
    console.log('Time:', formattedTime + ' : ' + req.protocol + '://' + req.get('host') + req.originalUrl);
    next();
});
app.use(router);

//fichier assert
app.use('/css', express.static('public/css'));
app.use('/js', express.static('public/js'));
app.use('/js', express.static('public/img'));
app.use('/css/images', express.static('public/css/img'));
app.use('/images', express.static('public/css/img'))
app.use('/material/', express.static('node_modules/material-design-lite/'));

bootstrap(app, router);

//Main Page (Home)
router.get("/", (req, res, next) => {
    return res.send('<a href="http://10.202.46.21:8000/voi">Lien VOI</a>');
});

router.use((err, req, res, next) => {
    if (err) {
        //Handle file type and max size of image
        return res.send(err.message);
    }
});
// app.use((req, res, next) => {
//     ///redirect when 404
//     return res.redirect('/voi');
//     return next(err);
//   });
app.listen(PORT, err => {
    if (err) return console.log(`Cannot Listen on PORT: ${PORT}`);
    console.log(`Server is Listening on: http://10.202.46.21:${PORT}/`);
});