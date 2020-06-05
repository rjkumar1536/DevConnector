const router = require("express").Router();
const auth = require('./../../middleware/auth');
const {check, validationResult} = require('express-validator');
const Post = require('./../../models/Post');
const User = require('./../../models/User')

// @route POST api/posts
// @desc  create a post
// @access private

router.post('/', [ auth,
    [
        check('text', 'text is required to post').not().isEmpty()
    ]
], async (req, res)=>{
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    const user = req.user.id;
    try {
        let myuser = await User.findById({_id : user}).select('-password')
        const name = myuser.name;
        const avatar = myuser.avatar;
        const {
            text
        } = req.body;
        const postDetails = {
            text,
            user,
            name,
            avatar
        }
        let post = new Post(postDetails);
        await post.save();
        return res.status(201).json(post);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server Error');
        
    }
})

// @route api/posts
// @desc  get all posts
//access  private

router.get('/', auth, async (req, res)=>{
    try {
        let posts = await Post.find({});
        return res.json(posts);
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
})

// @route api/posts/:id
// @desc  get post by id
//access  private

router.get('/:id', auth, async (req, res)=>{
    try {
        let post = await Post.findById(req.params.id)
        if(!post){
            return res.status(404).send('Post Not Found');
        }
        return res.json(post);
    } catch (error) {
        if(error.kind === 'ObjectId'){
            return res.status(404).send('Post Not Found');
        }
        return res.status(500).send('Internal Server Error');
    }
})

// @route DELETE api/posts/:id
// @desc  delete post by id
//access  private

router.delete('/:id', auth, async (req, res)=>{
    try {
        let post = await Post.findById(req.params.id);
        if(post.user.toString() != req.user.id){
           return res.status(401).send('User Not Authorized');
        }
        await post.remove()
        if(!post){
            return res.status(404).send('Post Not Found');
        }
        return res.json({msg : 'Post Removed'});
    } catch (error) {
        if(error.kind === 'ObjectId'){
            return res.status(404).send('Post Not Found');
        }
        return res.status(500).send('Internal Server Error');
    }
})

// @route PUT api/posts/like/:id
// @desc  like a post using id
// @access  private

router.put('/like/:id', auth, async(req, res)=>{
    try {
        let post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).send('Post Not found')
        }
        if(post.likes.filter((like)=> like.user.toString() == req.user.id).length > 0){
            return res.status(400).json({msg : 'Post Alreday Liked'})
        }
        post.likes.unshift({user : req.user.id});
        await post.save();
        return res.json(post.likes)
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
        
    }
})

// @route Unlike api/posts/unlike/:id
// @desc  like a post using id
// @access  private

router.put('/unlike/:id', auth, async(req, res)=>{
    try {
        let post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).send('Post Not found')
        }
        if(post.likes.filter((like)=> like.user.toString() == req.user.id).length == 0){
            return res.status(400).json({msg : 'Post has not yet been liked'})
        };
        let likes = post.likes.filter((like)=> like.user.toString() != req.user.id);
        post.likes = likes;
        // post.likes.unshift({user : req.user.id});
        await post.save();
        return res.json(post.likes)
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
        
    }
});


// @route POST api/posts/comment/:id
// @desc  create a comment on post
// @access private

router.post('/comment/:id', [ auth,
    [
        check('text', 'text is required to post').not().isEmpty()
    ]
], async (req, res)=>{
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    const user = req.user.id;
    try {
        let myuser = await User.findById({_id : user}).select('-password')
        const name = myuser.name;
        const avatar = myuser.avatar;
        const {
            text,
            date
        } = req.body;
        const commentDetails = {
            text,
            user,
            name,
            avatar
        }
        let post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).send("Post Not found");
        }
        post.comments.unshift(commentDetails);
        // let post = new Post(postDetails);
        await post.save();
        return res.status(201).json(post.comments);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server Error');
        
    }
});

// @route DELETE api/posts/comment/:id/:comment_id
// @desc  delete comment by id
// @access  private

router.delete('/comment/:id/:comment_id', auth, async (req, res)=>{
    try {
        let post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).send("Post not Found");
        }
        let comment = post.comments.find((comment)=> comment.id.toString() == req.params.comment_id);
        if(!comment){
            return res.status(404).send('Comment Not Found');
        }
        if(comment.user != req.user.id){
            return res.status(401).send('User Not Authorized');
        }
        post.comments = post.comments.filter((comment)=> comment.id.toString() != req.params.comment_id);
        await post.save();
        return res.json(post.comments);
    } catch (error) {
        if(error.kind === 'ObjectId'){
            return res.status(404).send('Id Not Found');
        }
        return res.status(500).send('Internal Server Error');
    }
})
module.exports = router;