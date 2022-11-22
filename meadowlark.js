const express = require('express')
const {engine} = require('express-handlebars')


const app = express()

const port = process.env.port || 3000

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static(__dirname + '/public'))

const fortunes = [
    "Победи свои страхи, или они победят тебя.",
    "Рекам нужны истоки.",
    "Не бойся неведомого.",
    "Тебя ждет приятный сюрприз.",
    "Будь проще везде, где только можно.",
   ]

app.get('/', (req,res)=> {res.render('home')})

app.get('/about', (req,res)=> {
    const randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)]
    res.render('about', {fortune: randomFortune})})

app.use((req,res) => {
    res.status(404)
    res.render('404')
})

app.use((err,req,res,next) => {
    console.error(err.message)
    res.status(500)
    res.render('500')
})

app.listen(port, () => console.log(
    `Express запущен на localhost:${port}`
))