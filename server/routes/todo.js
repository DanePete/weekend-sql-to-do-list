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
    console.log('req body', req.body);
    let sqlQuery = `
        -- Add a new to to the DB
        INSERT INTO "todo"
            ("todo", "completed", "notes", "completed_date", "date_added")
        VALUES
        -- Use placeholders or SQL Parameters
        -- to prevent a SQL Injection attach
            ($1, $2, $3, $4, $5);
        `;
    let sqlParams = [
        req.body.val, // $1
        req.body.val2,  // $2
        req.body.val3, // $3
        req.body.val4, // $4
        req.body.val5 // $5
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


router.delete('/', (req, res) => {
    console.log('got them to delete', req.params.id);
    let idToDelete = req.params.id
    let sqlQuery = 'TRUNCATE TABLE todo'
    // let sqlParams = [idToDelete]
    pool.query(sqlQuery )
        .then((dbRes) => {
            res.sendStatus(200)
        }).catch((err) => {
            console.log('DELETE error', err);
            res.sendStatus(500)
        })
})

router.delete('/:id', (req, res) => {
    console.log('HERE DELETE');
    console.log('params', req.params);
    let sqlQuery = `
      DELETE FROM todo WHERE id=$1;
    `;
  
    let sqlParams = [
      req.params.id, // $1
    ]
  
    pool.query(sqlQuery, sqlParams)
      .then((dbRes) => {
          res.send(201);
      })
      .catch((err) => {
          console.log("post error", err);
          res.sendStatus(500);
      });
  });
  

module.exports = router;