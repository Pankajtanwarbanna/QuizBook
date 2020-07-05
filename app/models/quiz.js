var mongoose = require('mongoose');
var titlize = require('mongoose-title-case');
mongoose.set('useCreateIndex', true);

var quizSchema = new mongoose.Schema({
    quiz_name : {
        type : String,
        required : true
    },
    level : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    duration : {
        type : Number,
        required : true
    },
    questionsData : [{
        question : {
            type : String,
            required : true
        },
        optionsData : [{
            option : {
                type : String,
                required : true
            }
        }],
        correct_option : {
            type : Number,
            required : true
        },
        question_category : {
            type : String,
            required : true
        },
        question_mark : {
            type : String,
            required : true
        },
        explanation : {
            type : String,
            required : true
        }
    }],
    results : [{
        candidate_email : {
            type : String
        },
        timeLeftInSeconds : {
            type : Number
        },
        selected_answers : [{
            answer : {
                type : Number
            }
        }],
        total_score : {
            type : Number
        },
        timestamp : {
            type : Date
        }
    }],
    created_by : {
        type : String,
        required : true
    },
    timestamp : {
        type : Date,
        default : new Date()
    }
});

// Mongoose title case plugin
quizSchema.plugin(titlize, {
    paths: [ 'quiz_name'] // Array of paths
});

module.exports = mongoose.model('Quiz',quizSchema);
