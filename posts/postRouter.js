const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  postDb.get()
  .then(post => {
    res.status(200).json(post)
  })
  .catch(err => {
    console.log(err)
    res.status(404).json({ errorMessage: "Trouble accessing the posts"})
  })
});

router.get('/:id', (req, res) => {
  // do your magic!
  const id = req.params.id;
  postDb.getById(id)
  .then(post => {
      res.status(200).json({post})
  })
  .catch(err => {
    console.log(err)
    res.status(404).json({errorMessage: "Could not retrieve specified ID"})
  })
});

router.delete('/:id', (req, res) => {
  // do your magic!
  const id = req.params.id
  postDb.remove(id)
    .then(post => {
      res.status(200).json({post})
    })
    .catch(err => {
      console.log(err)
      res.status(404).json({ message : "The post could not be removed."})
    })
});

router.put('/:id', (req, res) => {
  // do your magic!
  const id = req.params.id;
  const data = req.body;
    postDb.update(id, data)
      .then( post => {
        res.status(201).json({post})
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({ message: "Post was not updated"})
      })
});

// custom middleware
function validatePost(req, res, next) {
  const data = req.body;
  if(!data){
    res.status(400).json({ message: 'missing post data.'})
} else if(!data.text){
    res.status(400).json({ message: "missing  required text field"})
} else { 
  next();
  }
}

function validatePostId(req, res, next) {
  // do your magic!
  const id = req.params.id;
  postDb.getById(id)
  .then(post => {
    if(!post) {
      res.status(404).json({error: 'The specified ID does not exist.'})
    } else {
      next();
    }
  })
}

module.exports = router;
