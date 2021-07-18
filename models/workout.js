// Import mongoose package
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create schema 
const workoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now()
  },
  exercises: [
    {
      name : {
        type : String,
        trim : true,
        required : "Please enter exercise name"
      },
      type : {
        type: String,
        trim : true,
        required : "Please select exercise type"
      },
      distance : {
        type : Number
      },
      duration : {
        type : Number,
        required : "Please enter exercise duration"
      },
      weight: {
        type : Number
      },
      sets: {
        type : Number
      },
      reps: {
        type : Number
      }
    }
  ]
});

const Workout = mongoose.model("workout", workoutSchema);

module.exports = Workout;