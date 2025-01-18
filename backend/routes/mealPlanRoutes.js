const express = require('express');
const multer = require('multer')
const { createMealPlan, getMealPlans, getMealPlan } = require('../controllers/mealPlanController');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/mealPlans')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage })

router.post('/', upload.single('image'), createMealPlan)

router.get('/', getMealPlans)

router.get('/:id', getMealPlan)

module.exports = router