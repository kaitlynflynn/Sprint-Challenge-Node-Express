// import node modules
const router = require('express').Router();
const db = require('../data/helpers/actionModel');


// POST (add data) //Postman Test ok: http://localhost:5000/api/actions (able to created new TEST with ID 4)
router.post('/', (req, res) => {
    db
    .insert(req.body)
    .then(response => {
        res.status(201).json(response);
    })
    //If there's an error in retrieving the data from the database
    .catch(err => {
        if (err.errno === 19) {
        res.status(400).json({ ErrorMsg: 'All required fields must be completed.' });
        } else {
        res.status(500).json({ error: err });
        }
    });
});

// GET (retreive data) //Postman Test ok: http://localhost:5000/api/actions/ 
router.get('/', (req, res) => {
    db
    .get()
    .then(response => {
      res.json(response);
    })
    //If there's an error in retrieving the data from the database
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

//GET (retrieve by id) //Postman Test ok: http://localhost:5000/api/actions/2 
router.get('/:id', (req, res) => {
    const id = req.params.id;
    db
    .get(id)
    .then(response => {
      res.json(response);
    })
    //If there's an error in retrieving the data from the database
    .catch(err => {
      res.status(500).json({ ErrorMsg: 'Sorry - The action was not found.' });
    });
});

// PUT (update) //Postman Test ok: http://localhost:5000/api/actions/4 (Able to successfully update ID 4)
router.put('/:id', function(req, res) {
    const id = req.params.id;
    db
    .update(id, req.body)
    .then(response => {
      if (response !== null) {
        res.status(200).json(response);
      } else {
        res.status(404).json({ Errormsg: 'Sorry - The action could not be updated at this time.' });
      }
    })
    //If there's an error in retrieving the data from the database
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

// DELETE (remove data) //Postman Test ok: http://localhost:5000/api/actions/5 (was able to successfully delete TEST post I made with ID 5)
router.delete('/:id', function(req, res) {
    const id = req.params.id;
    db
    .get(id)
    .then(response => {
    db.remove(id)
    .then(status => {
        if (status === 0) {
            res.status(400).json({ ErrorMsg: 'Sorry - We cannot delete this action.' });
        } else {
            res.status(200).json(response);
          }
        });
    })
    //If there's an error in retrieving the data from the database
    .catch(err => {
      res.status(500).json({ ErrorMsg: 'Sorry - An error occured when deleting this action.' });
    });
});


//module export
module.exports = router;