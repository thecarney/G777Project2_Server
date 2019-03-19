// imports
const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
const { Client, Query } = require('pg');
const multer = require("multer");
var Jimp = require('jimp');
// set port
const port = 3002;
// make CORS compatible
app.use(cors());

app.use(express.static(__dirname + '/public'));

// db setup
var username = "postgres" // ADD FEATURE: multiple rolls
//var password = "yourPassword" // read only privileges on our table
var host = "localhost:5432"
var database = "tsp" // database name
var conString = "postgres://"+username+":"+"@"+host+"/"+database; // Your Database Connection

// for multer
const handleError = (err, res) => {
    res
        .status(500)
        .contentType("text/plain")
        .end("Oops! There was an error!");
};

// for photo upload
var storage = multer.diskStorage({
    destination: 'photos/',
    filename: function (req, file, cb) {
        cb(null, "pid_" + Date.now() + ".jpg")
    }
});

var upload = multer({
    storage: storage,
    limits: {
        limits: {
            fields: 10,
            fileSize: 2500000,
            files: 1,
            parts: 11
        }
    }
});



// REPORTS ROUTES
app.get('/p2/reports', function (req, res) {
    // server note
    console.log("GET request for reports json");

    var sqlQuery =
        "SELECT * FROM ts_report";

    // connect to db
    var client = new Client(conString);
    client.connect();
    var query = client.query(new Query(sqlQuery));
    query.on("row", function(row, result){
        result.addRow(row);
    });
    query.on("end", function(result){
        //res.send(result.rows[0].row_to_json);
        res.json(result);
        //res.send(result.rows[]);
        res.end();
        client.end();
    });
});

// PHOTOS ROUTES
app.get('/p2/photos', function (req, res) {
    // server note
    console.log("GET request for photos json");

    var sqlQuery =
        "SELECT row_to_json(fc) FROM ( " +
        "SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features FROM (" +
        "SELECT 'Feature' As type, ST_AsGeoJSON(fg.geom)::json As geometry, " +
        "row_to_json((id, tscaption, tsdate, tsfilenm, tshead)) As properties FROM ts_photos As fg" +
        ") As f" +
        ") As fc";

    // connect to db
    var client = new Client(conString);
    client.connect();
    var query = client.query(new Query(sqlQuery));
    query.on("row", function(row, result){
        result.addRow(row);
    });
    query.on("end", function(result){
        res.send(result.rows[0].row_to_json);
        res.end();
        client.end();
    });
});

app.post('/p2/postPhoto', upload.single("photo"), function (req, res, next) {
    console.log("POST request for photos");
    console.log(req.file.filename);
    let fileName = req.file.filename;
    Jimp.read("photos/"+req.file.filename)
        .then(photo => {
            return photo
                .resize(256, 256) // resize
                .quality(60) // set JPEG quality
                .write("public/images/"+req.file.filename); // save
        });




    let caption = req.body.caption;
    let heading = req.body.facing;
    let latlonString = req.body.latlon.replace(/\s/g,"");
    let latlonArr = latlonString.split(",");
    let lat = latlonArr[0];
    let lon = latlonArr[1];

    let pointString = "ST_GeomFromText('MULTIPOINT(" + lon + " " + lat + ")', 4326)";

    let queryText = "INSERT INTO ts_photos (id, tscaption, tsfilenm, tshead, geom) VALUES (default, $1, $2, $3, " + pointString + ") RETURNING *";
    let values = [caption, fileName, heading];

    var client = new Client(conString);
    client.connect();
    client.query(queryText, values, (err, res2) => {
        if (err) {
            console.log(err.stack)
        } else {
            console.log(res2.rows[0])
            res.send("point added to database");
            res.end();
            client.end();
        }
    });
});

// BBCOURT ROUTES
app.get('/p2/bbcourt', function (req, res) {
    // server note
    console.log("GET request for bbcourt json");

    var sqlQuery =
        "SELECT row_to_json(fc) FROM ( " +
        "SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features FROM (" +
        "SELECT 'Feature' As type, ST_AsGeoJSON(fg.geom)::json As geometry, " +
        "row_to_json((id, tsname, tsdesc, tsaccess)) As properties FROM ts_bbcourt_linework As fg" +
        ") As f" +
        ") As fc";

    // connect to db
    var client = new Client(conString);
    client.connect();
    var query = client.query(new Query(sqlQuery));
    query.on("row", function(row, result){
        result.addRow(row);
    });
    query.on("end", function(result){
        res.send(result.rows[0].row_to_json);
        res.end();
        client.end();
    });
});

// BENCHES ROUTES
app.get('/p2/benches', function (req, res) {
    // server note
    console.log("GET request for benches json");

    var sqlQuery =
        "SELECT row_to_json(fc) FROM ( " +
        "SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features FROM (" +
        "SELECT 'Feature' As type, ST_AsGeoJSON(fg.geom)::json As geometry, " +
        "row_to_json((id, tsname, tsdesc, tsaccess)) As properties FROM ts_benches As fg" +
        ") As f" +
        ") As fc";

    // connect to db
    var client = new Client(conString);
    client.connect();
    var query = client.query(new Query(sqlQuery));
    query.on("row", function(row, result){
        result.addRow(row);
    });
    query.on("end", function(result){
        res.send(result.rows[0].row_to_json);
        res.end();
        client.end();
    });
});

// EQUIPMENT ROUTES
app.get('/p2/equipment', function (req, res) {
    // server note
    console.log("GET request for equipment json");

    var sqlQuery =
        "SELECT row_to_json(fc) FROM ( " +
        "SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features FROM (" +
        "SELECT 'Feature' As type, ST_AsGeoJSON(fg.geom)::json As geometry, " +
        "row_to_json((id, tsname, tsdesc, tsaccess)) As properties FROM ts_equipment As fg" +
        ") As f" +
        ") As fc";

    // connect to db
    var client = new Client(conString);
    client.connect();
    var query = client.query(new Query(sqlQuery));
    query.on("row", function(row, result){
        result.addRow(row);
    });
    query.on("end", function(result){
        res.send(result.rows[0].row_to_json);
        res.end();
        client.end();
    });
});

// LAWN AREA ROUTES
app.get('/p2/lawn', function (req, res) {
    // server note
    console.log("GET request for lawn json");

    var sqlQuery =
        "SELECT row_to_json(fc) FROM ( " +
        "SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features FROM (" +
        "SELECT 'Feature' As type, ST_AsGeoJSON(fg.geom)::json As geometry, " +
        "row_to_json((id, tsname, tsdesc, tsaccess, tstype)) As properties FROM ts_lawn As fg" +
        ") As f" +
        ") As fc";

    // connect to db
    var client = new Client(conString);
    client.connect();
    var query = client.query(new Query(sqlQuery));
    query.on("row", function(row, result){
        result.addRow(row);
    });
    query.on("end", function(result){
        res.send(result.rows[0].row_to_json);
        res.end();
        client.end();
    });
});

// MULCHED AREA ROUTES
app.get('/p2/mulch', function (req, res) {
    // server note
    console.log("GET request for mulch json");

    var sqlQuery =
        "SELECT row_to_json(fc) FROM ( " +
        "SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features FROM (" +
        "SELECT 'Feature' As type, ST_AsGeoJSON(fg.geom)::json As geometry, " +
        "row_to_json((id, tsname, tsdesc, tsaccess, tstype)) As properties FROM ts_mulch As fg" +
        ") As f" +
        ") As fc";

    // connect to db
    var client = new Client(conString);
    client.connect();
    var query = client.query(new Query(sqlQuery));
    query.on("row", function(row, result){
        result.addRow(row);
    });
    query.on("end", function(result){
        res.send(result.rows[0].row_to_json);
        res.end();
        client.end();
    });
});

// PAVEMENT AREA ROUTES
app.get('/p2/pavement', function (req, res) {
    // server note
    console.log("GET request for pavement json");

    var sqlQuery =
        "SELECT row_to_json(fc) FROM ( " +
        "SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features FROM (" +
        "SELECT 'Feature' As type, ST_AsGeoJSON(fg.geom)::json As geometry, " +
        "row_to_json((id, tsname, tsdesc, tsaccess, tstype)) As properties FROM ts_pavement As fg" +
        ") As f" +
        ") As fc";

    // connect to db
    var client = new Client(conString);
    client.connect();
    var query = client.query(new Query(sqlQuery));
    query.on("row", function(row, result){
        result.addRow(row);
    });
    query.on("end", function(result){
        res.send(result.rows[0].row_to_json);
        res.end();
        client.end();
    });
});

// PLAYGROUND AREA ROUTES
app.get('/p2/playground', function (req, res) {
    // server note
    console.log("GET request for playground json");

    var sqlQuery =
        "SELECT row_to_json(fc) FROM ( " +
        "SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features FROM (" +
        "SELECT 'Feature' As type, ST_AsGeoJSON(fg.geom)::json As geometry, " +
        "row_to_json((id, tsname, tsdesc, tsaccess, tstype)) As properties FROM ts_playground As fg" +
        ") As f" +
        ") As fc";

    // connect to db
    var client = new Client(conString);
    client.connect();
    var query = client.query(new Query(sqlQuery));
    query.on("row", function(row, result){
        result.addRow(row);
    });
    query.on("end", function(result){
        res.send(result.rows[0].row_to_json);
        res.end();
        client.end();
    });
});

// RUNNING LOOP ROUTES
app.get('/p2/parkloop', function (req, res) {
    // server note
    console.log("GET request for parkloop json");

    var sqlQuery =
        "SELECT row_to_json(fc) FROM ( " +
        "SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features FROM (" +
        "SELECT 'Feature' As type, ST_AsGeoJSON(fg.geom)::json As geometry, " +
        "row_to_json((id, tsname, tsdesc, tsaccess)) As properties FROM ts_parkloop As fg" +
        ") As f" +
        ") As fc";

    // connect to db
    var client = new Client(conString);
    client.connect();
    var query = client.query(new Query(sqlQuery));
    query.on("row", function(row, result){
        result.addRow(row);
    });
    query.on("end", function(result){
        res.send(result.rows[0].row_to_json);
        res.end();
        client.end();
    });
});

// SANDBOX AREA ROUTES
app.get('/p2/sandbox', function (req, res) {
    // server note
    console.log("GET request for sandbox json");

    var sqlQuery =
        "SELECT row_to_json(fc) FROM ( " +
        "SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features FROM (" +
        "SELECT 'Feature' As type, ST_AsGeoJSON(fg.geom)::json As geometry, " +
        "row_to_json((id, tsname, tsdesc, tsaccess, tstype)) As properties FROM ts_sandbox As fg" +
        ") As f" +
        ") As fc";

    // connect to db
    var client = new Client(conString);
    client.connect();
    var query = client.query(new Query(sqlQuery));
    query.on("row", function(row, result){
        result.addRow(row);
    });
    query.on("end", function(result){
        res.send(result.rows[0].row_to_json);
        res.end();
        client.end();
    });
});

// PICNIC TABLES ROUTES
app.get('/p2/picnic', function (req, res) {
    // server note
    console.log("GET request for picnic tables json");

    var sqlQuery =
        "SELECT row_to_json(fc) FROM ( " +
        "SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features FROM (" +
        "SELECT 'Feature' As type, ST_AsGeoJSON(fg.geom)::json As geometry, " +
        "row_to_json((id, tsname, tsdesc, tsaccess)) As properties FROM ts_tables As fg" +
        ") As f" +
        ") As fc";

    // connect to db
    var client = new Client(conString);
    client.connect();
    var query = client.query(new Query(sqlQuery));
    query.on("row", function(row, result){
        result.addRow(row);
    });
    query.on("end", function(result){
        res.send(result.rows[0].row_to_json);
        res.end();
        client.end();
    });
});

// TREE CANOPY ROUTES
app.get('/p2/trees', function (req, res) {
    // server note
    console.log("GET request for trees json");

    var sqlQuery =
        "SELECT row_to_json(fc) FROM ( " +
            "SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features FROM (" +
                "SELECT 'Feature' As type, ST_AsGeoJSON(fg.geom)::json As geometry, " +
                "row_to_json((id, tsname)) As properties FROM ts_trees As fg" +
           ") As f" +
        ") As fc";

    // connect to db
    var client = new Client(conString);
    client.connect();
    var query = client.query(new Query(sqlQuery));
    query.on("row", function(row, result){
        result.addRow(row);
    });
    query.on("end", function(result){
       res.send(result.rows[0].row_to_json);
       res.end();
       client.end();
    });
});

// ROOT ROUTE
app.get('/p2', (req, res) => res.send('Hello World!'));

// TEST ROUTE
app.get('/p2/firstRun', function (req, res) {
    // server note
    console.log("GET request for initial page load");
    res.send("RESULTS!!!");




});

// PRINT ON SERVER START
app.listen(port, () => console.log(`P2APP listening on port ${port}!`));