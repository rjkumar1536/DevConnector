const router = require("express").Router();
const auth = require("./../../middleware/auth")
const Profile = require('./../../models/Profile')
const User = require('./../../models/User')
const Post = require('./../../models/Post');
const { check, validationResult } = require('express-validator');

const request = require("request");
const config = require("config");

// @route GET api/profile/me
// @desc  GET current user profile
// @access Private 
router.get('/me', auth, async (req, res)=>{
    try{
        const profile = await Profile.findOne({ user : req.user.id}).populate('user', ['name', 'avatar']);
        if(!profile){
           return res.status(400).send('No profile Exists for the user')
        }
        return res.json(profile)
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

// @route GET api/profile/user/:user_id
// @desc  GET  user profile
// @access Public 
router.get('/user/:user_id', async (req, res)=>{
    try{
        const profile = await Profile.findOne({ user : req.params.user_id}).populate('user', ['name', 'avatar']);
        if(!profile){
           return res.status(400).send('No profile Exists for the user')
        }
        return res.json(profile)
    }
    catch(err){
        console.error(err.message);
        if(err.kind == 'ObjectId'){
            return res.status(400).send('No profile Exists for the user')
        }
        return res.status(500).send('Server Error')
    }
})

// @route POST api/profile
// @desc  create or update user profile
// @access private

router.post('/', [ auth,
   [check('status', 'status is required').not().isEmpty(),
    check('skills', 'skill is required').not().isEmpty()
]
], async(req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }
    const {
        company,
        website,
        location,
        status,
        skills,
        bio,
        githubusername,
        youtube,
        twitter,
        facebook,
        linkdln,
        instagram
    } = req.body;

    const profileFields = {}
    profileFields.user = req.user.id;
    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;
    if(githubusername) profileFields.githubusername = githubusername;

    profileFields.social = {};
    if(youtube) profileFields.social.youtube = youtube;
    if(twitter) profileFields.social.twitter = twitter;
    if(facebook) profileFields.social.facebook = facebook;
    if(linkdln) profileFields.social.linkdln = linkdln;
    if(instagram) profileFields.social.instagram = instagram;
    console.log(skills);
    profileFields.skills = skills.split(",").map(skill=>skill.trim());
    profileFields.status = status;


    try{
        let profile = await Profile.findOne({user : req.user.id});
        if(profile){
           profile =  await Profile.findOneAndUpdate({user : req.user.id},{$set : profileFields}, {new : true} );
           return res.json(profile);
        }
        else{
            profile = new Profile(profileFields);
            await profile.save();
            return res.json(profile)
        }
    }   
    catch(err){
        console.error(err.message);
        return res.status(500).send({msg : "server error"})
    }
})


// @route GET api/profile
// @desc  create or update user profile
// @access private

router.get('/', async (req, res)=>{
    try{
       let profiles = await Profile.find({}).populate('user', ['name','avatar'])
       res.json(profiles)
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
        
    }
});

// @route DELETE api/profiles/
// @desc  delete profile & user & post
// @access private

router.delete('/', auth, async (req, res)=>{
    try {
        await Post.deleteMany({user : req.user.id});
        await Profile.findOneAndDelete({user : req.user.id})
        await User.findOneAndDelete({_id : req.user.id})
        res.json({msg : "user deleted"})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error")
    }
});
// @route PUT api/profiles/experience
// @desc  add experience
// @access private

router.put('/experience',[ auth,
    [
        check('title', 'title is required').not().isEmpty(),
        check('from', 'start date is required').not().isEmpty()
    ]
], async (req, res)=>{
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    const {
        title,
        company,
        from ,
        to,
        location,
        current,
        description
    }= req.body;
    const newExp =  {
        title,
        company,
        from ,
        to,
        location,
        current,
        description
    }
    try {
        let profile = await Profile.findOne({user : req.user.id});
        if(!profile){
           return res.status(400).send("profile Doesn't exits for user");
        }
        profile.experience.unshift(newExp);
        await profile.save();
        return res.json(profile);

    } catch (error) {
        console.error(error.message);
        return res.status(500).send("server error")
        
    }

});


// @route PUT api/profiles/education
// @desc  add education
// @access private

router.put('/education',[ auth,
    [
        check('school', 'school name is required').not().isEmpty(),
        check('degree', 'degree name is required').not().isEmpty(),
        check('fieldofstudy', 'fieldofstudy is required').not().isEmpty(),
        check('from', 'start date is required').not().isEmpty()
    ]
], async (req, res)=>{
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    const {
        school,
        degree,
        fieldofstudy,
        from ,
        to,
        current,
        description
    }= req.body;
    const newEd =  {
        school,
        degree,
        fieldofstudy,
        from ,
        to,
        current,
        description
    }
    try {
        let profile = await Profile.findOne({user : req.user.id});
        if(!profile){
           return res.status(400).send("profile Doesn't exits for user");
        }
        profile.education.unshift(newEd);
        await profile.save();
        return res.json(profile);

    } catch (error) {
        console.error(error.message);
        return res.status(500).send("server error")
        
    }

});

// @route DELETE api/profiles/experience/:exp_id
// @desc  delete experience from profiles
// @access private

router.delete('/experience/:exp_id', auth, async (req, res)=>{
    try {
        let profile = await Profile.findOne({user : req.user.id});
        profile.experience = profile.experience.filter((exp)=>{
            return exp.id != req.params.exp_id
        });
        await profile.save();
        return res.json(profile)

    } catch (error) {
        console.error(error.message);
       return res.status(500).send("server error");
        
    }
})

// @route DELETE api/profiles/education/:edu_id
// @desc  delete experience from profiles
// @access private

router.delete('/education/:edu_id', auth, async (req, res)=>{
    try {
        let profile = await Profile.findOne({user : req.user.id});
        profile.education = profile.education.filter((edu)=>{
            return edu.id != req.params.edu_id
        });
        await profile.save();
        return res.json(profile)

    } catch (error) {
        console.error(error.message);
       return res.status(500).send("server error");
        
    }
})

// @route GET api/profiles/github/:username
// @desc  get repos from github account
// @access public

router.get('/github/:username', (req, res)=>{
    const url = `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get("githubClientId")}&client_secret=${config.get("githubClientSecret")}
`
    console.log(url)
    const options = {
        // method : "GET",
        headers : {'user-agent': 'node.js'}
        // uri : url
    }
    
    try {

        request.get(url,options, (error, response, body)=>{
            if(error){
                console.error(error);
            }
            if(response.statusCode != 200){
                return res.status(404).json({msg : "No user found"});
            }
            res.json(JSON.parse(body));
        })


    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
})

module.exports = router;