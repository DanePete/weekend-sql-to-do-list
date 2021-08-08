const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    let sqlQuery = `
        -- We can write any SQL we want here!
        SELECT * FROM "todo" ORDER BY id DESC;
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
});

router.post('/', (req, res) => {
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

     pool.query(sqlQuery, sqlParams)
        .then((dbRes) => {
            res.send(201); // Created
        })
        .catch((err) => {
            console.log("post error", err);
            res.sendStatus(500);
        });
});

/**
 * Router PUT
 * Sends a put request to the server to update the completed cell and completed date for a specific record
 */
 router.put('/:id', (req, res) => {
    let sqlQuery = `
      UPDATE todo SET "completed" =$1, "completed_date" =$2  WHERE id =$3;
    `;
  
    let sqlParams = [
      req.body.transferData, // $1
      req.body.completedDate, // $2
      req.params.id //3
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


router.delete('/', (req, res) => {
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