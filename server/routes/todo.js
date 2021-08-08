const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    console.log('HERE!');
    let sqlQuery = `
        -- We can write any SQL we want here!
        SELECT * FROM "todo";
    `;
    pool.query(sqlQuery)
        .then((dbRes) => {
            // Log the response data
            console.log(dbRes);
            res.send(dbRes.rows);
        })
        .catch((err) => {
            console.log('sql failed', err);
            res.sendStatus(500);
        });
    // res.send(musicLibrary);
});

router.post('/', (req, res) => {
    let sqlQuery = `
        -- Add a new song to the DB
        INSERT INTO "songs"
            ("artist", "track", "published", "rank")
        VALUES
        -- Use placeholders or SQL Parameters
        -- to prevent a SQL Injection attach
            ($1, $2, $3, $4);
        `;
    let sqlParams = [
        req.body.artist, // $1
        req.body.track,  // $2
        req.body.published, // $3
        req.body.rank // $4
    ]
     console.log('sqlQuery:', sqlQuery);

     pool.query(sqlQuery, sqlParams)
        .then((dbRes) => {
            // DB is happy,
            // We're happy
            // Everyone's happy
            // Don't need dbRes'
            res.send(201); // Created
        })
        .catch((err) => {
            console.log("post error", err);
            res.sendStatus(500);
        });
    // musicLibrary.push(req.body);
    // res.sendStatus(200);
});

module.exports = router;