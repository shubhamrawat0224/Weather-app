const path= require('path')
const express = require('express')
const hbs = require('hbs')
const geocode =require('./utils/geocode')
const forecast=require('./utils/forecast')
const app = express()
// Define paths for Express config
const publicDiretory=path.join(__dirname, '../public')
const viewsPath= path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')
// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDiretory))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'shubham Rawat'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me!',
        name: 'Shubham'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        message: 'I am here to help you',
        name: 'shubham'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    
    geocode(req.query.address,(error,{ latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

    // res.send({
    //     forecast: 'it is snowing',
    //     location: 'Gurugram',
    //     address: req.query.address
    // })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: "you must provide a search term"
        })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        message: 'Help article not found',
        name: 'shubham'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        message: 'Page not found',
        name: 'shubham'
    })
})
// app.com

app.listen(3000,()=>{
    console.log('server is up on port 3000.')
})