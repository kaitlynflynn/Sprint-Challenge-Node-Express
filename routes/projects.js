// import node modules
const router = require('express').Router();
const db = require('../data/helpers/projectModel');


// POST (add data) //Postman Test ok: http://localhost:5000/api/projects
router.post('/', (req, res) => {
    const {project_id, description, notes} = req.body;
        if ((notes.length === 0) || description.length === 0 || description.length > 128 || !(typeof descriptioin === 'string') || !(typeof notes === 'string') || !(typeof project_id === 'number')) {
            res.status(404).json({ errorMsg: 'Description must be under 128 characters.' })
        } else
    db.insert(req.body)
    .then(response => {
        res.status(201).json(response);
    })
    .catch(err => {
        if (err.errno === 19) {
        res.status(400).json({ msg: 'Please provide all required fields.' });
        } else {
        res.status(500).json({ error: err });
        }
    });
});
    
// GET (retrieve data) //Postman Test ok: http://localhost:5000/api/projects
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

//GET (retrieve by id) //Postman Test ok: http://localhost:5000/api/projects/2 (created test with ID 2)
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
    
// PUT (update project) //Postman Test ok: http://localhost:5000/api/projects/2 (Made update to Test ID 2)
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
    
// DELETE (remove data) //Postman Test ok: http://localhost:5000/api/projects/3 (Successully able to delete ID 3 I created)
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