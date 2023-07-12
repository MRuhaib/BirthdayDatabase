const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
const express = require('express');
const Birthday = require('./models/birthdays.js');
const { locales } = require('moment/moment.js');


const app = express();
app.set('view engine','ejs');
app.use(express.urlencoded({extended: true}));

const dbURI = "mongodb+srv://user1234:BDDB1234@cluster0.f2mbkws.mongodb.net/BirthdayDatabase?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(function(result){
        app.listen(3000);
    }).catch(function(err){
        console.log('error');
    });

//to get all entries:
app.get('/viewAll', function(req, res){
    Birthday.find()
    .then(function(result){
        res.render('viewBday', {result: result});
        console.log(result)
    })
    })

//to get a specific entry:
app.get('/viewOne', function(req, res){
    var statement = ''
    res.render('viewOne', {statement:statement});
});

app.post('/view', function(req, res){
    Birthday.find()
    .then(function(result){
        console.log(result)
        result.forEach(function(element){
            var Name = req.body.Person;
            if(element.Person === Name){
                var statement = Name + "'s birthday is on " + element.Birthday;
                res.render('viewOne', {statement: statement});
            } 
        })
    })
})

//to add an entry:
app.get('/addBday', function(req, res){
    res.render('addBday');
});

app.post('/add', function(req, res){
    console.log(req.body)
    const bday = new Birthday(req.body)
    bday.save()
        .then(function(result){
            res.redirect('viewAll');
        })

})

//to delete an entry:
app.get('/deleteBday', function(req, res){
    res.render('deleteBday');
});

app.post('/delete', function(req, res){
    Birthday.find()
    .then(function(result){
        result.forEach(function(element){
            var Name = req.body.Person;
            if(element.Person === Name){
                var id = element.id;
                Birthday.findByIdAndDelete(id).then(function(result){
                    res.redirect('viewAll');
                })
            } 
        })
    })
})

//to update an entry:
app.get('/updateBday', function(req, res){
    res.render('updateBday');
});

app.post('/update', function(req, res){
    Birthday.find()
    .then(function(result){
        result.forEach(function(element){
            var Name = req.body.Person;
            var BDay = req.body.Birthday;
            if(element.Person === Name){
                var id = element.id;
                Birthday.findByIdAndUpdate(id, {Birthday: BDay}).then(function(result){
                    res.redirect('viewAll');
                })
            } 
        })
    })
})

//to get the closest birthday:
app.get('/closestBday', function(req, res){
    Birthday.find()
    .then(function(result){
        
        var closestBday = Infinity;
        var closest = ''
        var today = new Date();
        console.log(today);
        var closestName = '';
        var diff = '';

        //simple bubble sort to get the closest date
        result.forEach(function(element){
            var Bday = new Date(element.Birthday)
            var diff1 = Math.abs(today - closestBday)
            var diff2 = Math.abs(today - Bday)
            console.log(diff1, diff2)
            if(diff2 < diff1){
                closestBday = Bday;
                closest = element.Birthday
                diff = Math.ceil(diff2/(1000 * 60 * 60 * 24))
            }
        })

        //to get the corresponding name
        result.forEach(function(element){
            if(element.Birthday === closest){
                closestName = element.Person;
            }
        })
        var statement = 'The closest birthday is ' + closestName + "'s on " + closest + ", which is nearly " + diff +' days away from today.'
        res.render('closestBday', {statement : statement});
    })
})
