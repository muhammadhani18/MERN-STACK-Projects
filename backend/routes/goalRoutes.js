const express = require('express')
const router = express.Router()
const {getGoals} = require('../controllers/goalController')
const {postGoals} = require('../controllers/goalController')
const {putGoals} = require('../controllers/goalController')
const {deleteGoals} = require('../controllers/goalController')
const {protect} = require('../middleware/authMiddleware')

router.get('/', protect,getGoals)

router.post('/', protect,postGoals)

router.put('/:id', protect,putGoals)

router.delete('/:id', protect,deleteGoals)



module.exports = router;
