const express = require("express");
const app = express();
const { Db } = require("mongodb");
const mongoose = require('mongoose');
const cors = require('cors')

//middleware application
app.use(express.json())
app.use(cors());


// movieSchema
let movieSchema =  new mongoose.Schema({
    "name": String,
    "universe": String,
    "genre": [String],
    "year": Number,
    "rating": Number,
    "revenue": Number,
    "posters": String,
    "actors": [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'actors'
    }]
})



// actor schema 
let actorSchema = new mongoose.Schema({
    "name": String,
    "age": Number,
    "Country": String,
    "moviesCount": Number,
    "posters": String
})

//movie model
const moviesModel = new mongoose.model("movies", movieSchema);

//actor model
const actorsModel = new mongoose.model("actors", actorSchema);


mongoose.connect("mongodb://127.0.0.1:27017/project_movies", { useNewUrlParser: true,  useUnifiedTopology: true }).then(()=>{
    console.log("Connected to MongoDB")
})


// request handling for movies
app.get('/api/v1/movies',(req,res)=>{
    // fetch all movies
    moviesModel.find().populate('actors').then((movies)=>{
        res.send(movies);
    });
})

app.get('/api/v1/movies/:id',(req,res) => {
    let id = req.params.id;
    moviesModel.findById(id).populate('actors').then((movie)=>{
        res.send(movie)
    })

})


// creation of movies
app.post('/api/v1/movies', (req,res)=>{
    let movie = req.body;
    let moviesObj = new moviesModel(movie);
    moviesObj.save().then(()=>{
        res.send({"message": "Movie created"})

    })

})

app.delete('/api/v1/movies/:id',async (req,res)=>{
    let id = req.params.id;
    moviesModel.deleteOne({"_id":id}).then(()=>{
        res.send({"message": "Movie Deleted"})
    })

})

app.put('/api/v1/movies/:id',async (req,res)=>{
    let id = req.params.id;
    let movie = req.body;
    moviesModel.updateOne({"_id": id}, movie).then(()=>{
        res.send({"message": "Movie Updated"})
    })
})







// request handling for actors
app.get('/api/v1/actors',   (req,res)=>{
    let actors  = actorsModel.find().then((actors)=>{
        res.send(actors);
    });
})

app.get('/api/v1/actors/:id', (req,res) => {
    let id = req.params.id;
    actorsModel.findById(id).then((actor)=>{
        res.send(actor)
    })

})


// creation of actors
app.post('/api/v1/actors', (req,res)=>{
    let actor = req.body;
    let actorObj = new actorsModel(actor);
    actorObj.save().then(()=>{
        res.send({"message": "actor created"})

    })

})

app.delete('/api/v1/actors/:id',async (req,res)=>{
    let id = req.params.id;
    actorsModel.deleteOne({"_id":id}).then(()=>{
        res.send({"message": "actor Deleted"})
    })

})

app.put('/api/v1/actors/:id',async (req,res)=>{
    let id = req.params.id;
    let actor = req.body;
    actorsModel.updateOne({"_id": id}, actor).then(()=>{
        res.send({"message": "actor Updated"})
    })
})


app.listen(3000, ()=>{
    console.log("Server is running")
}); 