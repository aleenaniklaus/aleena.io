'use strict'

const fs = require('fs')
const express = require('express')
const server = express()

server.get('/', function(req, res){
    res.redirect('/index')
})

// Regular expression to pull in text from template.html
// and turn it into content pulled from page specific files
server.get('/:page([a-z]+)', function(req, res) {
    let template = fs.readFileSync('template.html').toString()

    // If page requested does not exist, end the connection
    if(fs.existsSync(req.params.page + '.html') === false){
        return res.end()
    }

    // Set up <title> and pull in data to page to fill in 
    // main content of each page
    let content = fs.readFileSync(req.params.page + '.html')
    let title = req.params.page
    let page = template.split('CONTENT').join(content)

    page = page.split('(title)').join(title)

    res.send(page) 
})

server.use('/', express.static(__dirname + '/'))
server.listen(process.env.PORT || 4300)