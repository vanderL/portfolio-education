const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("view", { 
    express: server,
    autoescape: false,
    noCache: true
})

server.get("/", function (req, res){
    const about = {
        avatar_url: "https://avatars2.githubusercontent.com/u/12676148?s=460&u=504ebfc6d45040522a5dfbb5e8446a32b6aea105&v=4",
        name: '<a href="https://github.com/vanderL" target="_blank"> Vander Lima de Andrade </a>',
        role: "Developer JavaScript",
        description: "Developer without a path, learning a little of everything, but focusing on the web! - Student at the Federal University of Ceará",
        links: [
            { name: "Github", url: "https://github.com/vanderL"},
            { name: "Facebook", url: "https://www.facebook.com/vander.wander"},
            { name: "Instagram", url: "https://www.instagram.com/vander_1/"}

        ]
    }
    return res.render("about", {about})
})
server.get('/lessons', function(req, res) {
    
    return res.render("portfolio", { items: videos})
})

server.get('/video', function(req, res) {
    const id = req.query.id

    const video = videos.find(function(video) {
        return video.id == id
    })

    if(!video){
        return res.send("Video not found")
    }

    return res.render("video", { item: video })
})

server.listen(3000, function (){
    console.log('server is running')
})