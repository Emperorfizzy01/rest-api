const express = require('express')
const router = express.Router();
// Post models
const Posts = require('../../models/Posts');

// GET request
router.get('/', async(req,res) => {
   try {
      const posts = await Posts.find();
      if(!posts) throw Error('No item found');
      res.status(200).json(posts);
   } catch(err) {
    res.status(400).json({ msg : err})
   }
});

// GET a specific user data
router.get('/:id', async(req,res) => {
   try {
      const post = await Posts.findById();
      if(!post) throw Error('No item found');
      res.status(200).json(post);
   } catch(err) {
    res.status(400).json({ msg : err})
   }
});

// DELETE request
router.delete('/:id', async(req,res) => {
   try {
      const post = await Posts.findByIdAndDelete(req.params.id);
      if(!post) throw Error('No post found');
      res.status(200).json({ status: true })
   } catch(err){
      res.status(400).json({ msg : err})
   }
});

// UPDATE request
router.patch('/:id', async(req,res) => {
   try {
      const post = await Posts.findByIdAndUpdate(req.params.id, req.body);
      if(!post) throw Error('Something went wrong while updating');
      res.status(200).json({ status: true })
   } catch(err) {
      res.status(400).json({ msg : err})
   }
})


// POST request
router.post('/', async (req,res) => {
   const newPost = new Posts(req.body);
   try {
      const post = await newPost.save();
      if(!post) throw Error('Something went wrong while saving the post');
      res.status(200).json(post);
   } catch(err) {
     res.status(400).json({ msg : err})
   }
});

module.exports = router;