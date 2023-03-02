const asyncHandler = require('express-async-handler')
const Goal = require('../model/goalModel.js');
const User = require('../model/userModel.js');

// @desc Get Goals
// @route GET api/goals
// @access Private
const getGoals = asyncHandler(async (req,res) => {
    const goals = await Goal.find({ user: req.user.id });
    res.status(200).json(goals);
})

// @desc Post Goals
// @route POST api/goals
// @access Private
const postGoals = asyncHandler(async (req,res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error("Please add text field")
        console.log("Please add text field")

    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id,
    })
    res.status(200).json(goal);
})

// @desc Put Goals
// @route PUT api/goals/:id
// @access Private
const putGoals = asyncHandler(async (req,res) => {
    
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error("Goal not found")
    }

    const user = await User.findById(req.user.id)
    if(!user) {
        res.status(401)
        throw new Error("User not found")
    }
    if(goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error("User not authorized")
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedGoal)
})

// @desc delete Goals
// @route DELETE api/goals/:id
// @access Private
const deleteGoals = asyncHandler(async (req,res) => {
    const goal = await Goal.findById(req.params.id)
    if(!goal) {
        res.status(400);
        throw new Error("Goal not found")
    }

    const user = await User.findById(req.user.id)
    if(!user) {
        res.status(401)
        throw new Error("User not found")
    }
    if(goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error("User not authorized")
    }
    await goal.remove()

    res.status(200).json({
        id: req.params.id,
    })
})


module.exports = {
    getGoals,
    postGoals,
    putGoals,
    deleteGoals,
}
