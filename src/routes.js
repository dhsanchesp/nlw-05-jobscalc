const express = require("express")
const routes = express.Router()

const views = `${__dirname}/views/`

const profile = {
    name: "Daniel Sanches",
    avatar: "https://github.com/dhsanchesp.png",
    "monthly-budget": 5400,
    "days-per-week": 5,
    "hours-per-day": 8,
    "vacation-per-year": 5
}

routes.get('/', (request, response) => response.render(`${views}index`))
routes.get('/job', (request, response) => response.render(`${views}job`))
routes.post('/job', (request, response) => {
  console.log(request.body)
})
routes.get('/job/edit', (request, response) => response.render(`${views}job-edit`))
routes.get('/profile', (request, response) => response.render(`${views}profile`, { profile }))

module.exports = routes