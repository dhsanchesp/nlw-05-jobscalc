const express = require("express")
const routes = express.Router()

const views = `${__dirname}/views/`

const profile = {
    name: "Daniel Sanches",
    avatar: "https://avatars.githubusercontent.com/u/33469510?s=400&u=d4e21a021ff2c72300086e3f1bccfa6d58dad906&v=4",
    "monthly-budget": 5400,
    "days-per-week": 5,
    "hours-per-day": 8,
    "vacation-per-year": 5
}

routes.get('/', (request, response) => response.render(`${views}index`))
routes.get('/job', (request, response) => response.render(`${views}job`))
routes.get('/job/edit', (request, response) => response.render(`${views}job-edit`))
routes.get('/profile', (request, response) => response.render(`${views}profile`, { profile }))

module.exports = routes