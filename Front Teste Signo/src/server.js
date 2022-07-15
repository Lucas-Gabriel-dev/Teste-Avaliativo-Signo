const express = require('express')
const routes = require("./routes")
const path = require('path')
const cors = require('cors')

const app = express();

app.use(cors())
app.use(express.json());

app.set('view engine', 'ejs')

app.use(express.static("public"))

app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({extended: true}))

app.use(routes)

app.listen(4000, () => console.log("Server is running"));