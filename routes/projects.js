// import node modules
const router = require('express').Router();
const db = require('../data/helpers/projectModel');


// POST (add data)
router.post('/', (req, res) => {
    db.insert(req.body)
    .then(response => {
        res.status(201).json(response);
    })
    .catch(err => {
        if (err.errno === 19) {
        res.status(400).json({ msg: 'Please provide all required fields' });
        } else {
        res.status(500).json({ error: err });
        }
    });
});
    
// GET (retrieve data)
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

//GET (retrieve by id)
router.get('/:id', (req, res) => {
    const id = req.params.id;
    db
    .get(id)
    .then(response => {
        res.json(response);
    })
    //If there's an error in retrieving the data from the database
    .catch(err => {
        res.status(500).json({ message: 'Sorry - Project could not be found.' });
    });
});
    
// PUT (update project)
router.put('/:id', function(req, res) {
    const id = req.params.id;
    db
    .update(id, req.body)
    .then(response => {
        if (response !== null) {
        res.status(200).json(response);
        } else {
        res.status(404).json({ msg: 'Sorry - Project could not be modified.' });
        }
    })
    //If there's an error in retrieving the data from the database
    .catch(err => {
        res.status(500).json({ error: err });
    });
});
    
// DELETE (remove data)
router.delete('/:id', function(req, res) {
    const id = req.params.id;
    db
    .get(id)
    .then(response => {
        db.remove(id)
        .then(status => {
            if (status === 0) {
            res.status(400).json({ msg: 'Sorry - Project could not be deleted.' });
            } else {
            res.status(200).json(response);
            }
        });
    })
    //If there's an error in retrieving the data from the database
    .catch(err => {
        res.status(500).json({ error: 'Oops - An error occured when deleting this project.' });
    });
});


//module export
module.exports = router;