const express = require('express')
const router = express.Router()
const {getGoals} = require('../controllers/goalController')
const {postGoals} = require('../controllers/goalController')
const {putGoals} = require('../controllers/goalController')
const {deleteGoals} = require('../controllers/goalController')


router.get('/', getGoals)

router.post('/', postGoals)

router.put('/:id', putGoals)

router.delete('/:id', deleteGoals)



module.exports = router;
