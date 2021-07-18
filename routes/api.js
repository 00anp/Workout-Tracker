const router = require('express').Router();
const Workout = require('../models/workout.js');

// Add new exercises to a new workout plan
router.post('/api/workouts', ({ body }, res) => {
    Workout.create(body)
    .then(workoutData => {
        res.json(workoutData);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

//Add exercises to the most recent workout plan
router.put('/api/workouts/:id',({ body, params }, res) => {
    Workout.findByIdAndUpdate(
        params.id,
        { $push: {exercises:body}})
        .then(workoutData => {
            res.json(workoutData);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

// View the combined weight of multiple exercises from the past seven workouts on the stats page.
router.get('/api/workouts',(req,res) => {
    Workout.aggregate([
        {
            $addFields:{
                totalWeight:{
                    $sum: '$exercises.weight',
                },
            },
        },
    ])
    .then(workoutData => {
        res.json(workoutData);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

// View the total duration of each workout from the past seven workouts on the stats page
router.get('/api/workouts/range',(req,res) => {
    Workout.aggregate([
        {
            $addFields:{
                totalDuration:{
                    $sum: '$exercises.duration',
                },
            },
        },
    ])
    .sort({_id:-1})
    .limit(7)
    .then(workoutData => {
        res.json(workoutData);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

module.exports = router;