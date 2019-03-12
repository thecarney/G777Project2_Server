// imports
const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
const { Client, Query } = require('pg');
// set port
const port = 3002;
// make CORS compatible
app.use(cors());
// db setup
var username = "postgres" // ADD FEATURE: multiple rolls
//var password = "yourPassword" // read only privileges on our table
var host = "localhost:5432"
var database = "tsp" // database name
var conString = "postgres://"+username+":"+"@"+host+"/"+database; // Your Database Connection






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
        "row_to_json((id, tsname, tsdesc, tsaccess)) As properties FROM ts_lawn As fg" +
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
        "row_to_json((id, tsname, tsdesc, tsaccess)) As properties FROM ts_mulch As fg" +
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
        "row_to_json((id, tsname, tsdesc, tsaccess)) As properties FROM ts_pavement As fg" +
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
        "row_to_json((id, tsname, tsdesc, tsaccess)) As properties FROM ts_playground As fg" +
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
        "row_to_json((id, tsname, tsdesc, tsaccess)) As properties FROM ts_sandbox As fg" +
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