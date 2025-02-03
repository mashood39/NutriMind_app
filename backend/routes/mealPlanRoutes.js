const express = require('express');
const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary')

const { createMealPlan, getMealPlans, getMealPlan, deleteMealPlan, updateMealPlan } = require('../controllers/mealPlanController');

const router = express.Router();

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'mealPlans', // Folder in Cloudinary
        public_id: (req, file) => Date.now() + '-' + file.originalname.replace(/\s+/g, '-'),
    },
})

const upload = multer({ storage })

router.post('/', upload.single('image'), createMealPlan)

router.get('/', getMealPlans)

router.get('/:id', getMealPlan)

router.delete('/:id', deleteMealPlan)

router.put('/:id', updateMealPlan)

module.exports = router