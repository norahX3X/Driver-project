require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT
const mongoose = require('mongoose');
const Company = require('./models/company'); 
const Driver = require('./models/driver'); 
const Car = require('./models/car'); 
app.set('view engine','ejs')
mongoose.connect('mongodb://localhost/company',{useNewUrlParser: true})
.then(()=> console.log('running'))

app.use(express.static('public')); //tells express to try to match requests with files in the directory called 'public'
app.use((req, res, next) => {
    console.log('I run for all routes');
    next();
});
app.use(express.urlencoded({extended:false}));
//include the method-override package
const methodOverride = require('method-override');
//...
//after app has been defined
//use methodOverride.  We'll be adding a query parameter to our delete form named _method
app.use(methodOverride('_method'));

//index
app.get('/companys/', (req, res) => {
    Company.find()
        .then((companys)=>{
          res.render('index', {companys});
        // res.send("hello")
    })
    .catch(err => console.log(err))
});

//car index
app.get('/cars/', (req, res) => {
  Car.find()
      .then((cars)=>{
        // res.render('index', {cars});
      res.send(cars)
  })
  .catch(err => console.log(err))
});

//new form 
app.get('/companys/new', (req, res) => {
    res.render('new');
});

app.post('/companys/', (req, res) => {
    console.log(req.body)
    // if (req.body.readyToEat === 'on') { // if checked, req.body.readyToEat is set to 'on'
    //   data.readyToEat = true
    // } else { // if not checked, req.body.readyToEat is undefined
    //   data.readyToEat = false
    // }
    let company = new Company(req.body)
    company.save()
    .then(()=>{
    console.log('done')    
    res.redirect('/companys')
    })
  })
  //new driver
  app.post('/companys/driver', (req, res) => {
    console.log(req.body)
    let driver = new Driver(req.body)
    driver.save()
    .then(()=>{
      res.status(204).send(driver);
    })
  })
  
// new car form 
app.get('/cars/new', (req, res) => {
  res.render('car/new');
});

app.post('/cars/', (req, res) => {
  console.log(req.body)
  let company = new Company(req.body)
  company.save()
  .then(()=>{
  console.log('done')    
  res.redirect('/companys')
  })
})

//show
app.get('/companys/:index', (req, res) => {
    // if (Number(req.params.index)){
      Company.findById(req.params.index).then((company)=>
    {
      res.render('show', {company});

    })
});
// //edit 
// app.get('/company/:index/edit', (req, res)=>{
//   Company.findById(req.params.index).then((company)=>
//   {
//     res.render(
//       'edit.ejs', //render views/edit.ejs
//       { //pass in an object that contains
//         company: company, //the Company object
//         index: company._id //... and its index in the array
//       }
//     )
//   })
// })

// //update 
// app.put('/company/:index', (req, res) => { // :index is the index of our company array that we want to change


//   let data = {
//     name: req.body.name,
//     color: req.body.color
//   }
//     if (req.body.readyToEat === 'on') { // if checked, req.body.readyToEat is set to 'on'
//       data.readyToEat = true
//     } else { // if not checked, req.body.readyToEat is undefined
//       data.readyToEat = false
//     }

// 	company[req.params.index] = req.body //in our company array, find the index that is specified in the url (:index).  Set that element to the value of req.body (the input data)


//     // let Company =  Company.find((Company)=>{

//     // })

//     company.save()
//     .then(()=>{
//     res.redirect('/company'); //redirect to the index page
//   })
// })
// //delete 
// app.delete('/company/:index', (req, res) => {
// 	company.splice(req.params.index, 1); //remove the item from the array
// 	res.redirect('/company');  //redirect back to index route
// });


//listener
app.listen(port, () => {
    console.log(`listening to ${port}`);
});
