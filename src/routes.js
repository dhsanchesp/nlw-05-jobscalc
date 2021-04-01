const express = require("express")
const routes = express.Router()

const views = `${__dirname}/views/`

const Profile = {
  data: {
    name: "Daniel Sanches",
    avatar: "https://github.com/dhsanchesp.png",
    "monthly-budget": 5400,
    "days-per-week": 5,
    "hours-per-day": 5,
    "vacation-per-year": 4,
    "value-hour": 75
  },

  controllers: {
    index(req, res) {
      return res.render(`${views}profile`, { profile: Profile.data })
    },

    update(req, res) {
      const data = req.body;

      const weeksPerYear = 52;

      const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12
      const weekTotalHours = data["hours-per-day"] * data["days-per-week"]

      const monthlyTotalHours = weekTotalHours * weeksPerMonth;

      const valueHour = data["monthly-budget"] / monthlyTotalHours

      Profile.data = {
        ...Profile.data,
        ...req.body,
        "value-hour": valueHour 
      }

      return res.redirect('/profile')
    }
  }
}

const Job = {
  data: [
    {
      id: 1,
      name: "Pizzaria Guloso",
      "daily-hours": 2,
      "total-hours": 1,
      budget: 4500,
      created_at: Date.now(),
    },
    {
      id: 2,
      name: "OneTwo Project",
      "daily-hours": 3,
      "total-hours": 47,
      budget: 4500,
      created_at: Date.now(),
    }
  ],
  controllers: {
      index(req, res) {
        const updatedJobs = Job.data.map((job) => {
          const remaining = Job.services.remainingDays(job)
          const status = remaining <= 0 ? "done" : "progress"
      
          return {
            ...job,
            remaining,
            status,
            budget: Job.services.calculateBudget(job, Profile.data["value-hour"])
          }
        })

        return res.render(`${views}index`, { jobs: updatedJobs, profile: Profile.data })
      },
      
      create(req, res) {
        return res.render(`${views}job`)
      },
      
      save(req, res) {

        const lastId = Job.data.length <= 0 ? 0 : Job.data[Job.data.length - 1].id

        Job.data.push({
          id: lastId + 1,
          name: req.body.name,
          "daily-hours": req.body["daily-hours"],
          "total-hours": req.body["total-hours"],
          created_at: Date.now(),
        })
        return res.redirect('/')
      },
      
      findById(req, res) {
        const jobId = req.params.id;

        const job = Job.data.find(item => Number(item.id) === Number(jobId));
        if (!job) {
          return res.send(`Job with ID[${jobId}] not found`)  
        }

        job.budget = Job.services.calculateBudget(job, Profile.data["value-hour"])

        return res.render(`${views}job-edit`, { job })
      },

      update(req, res) {
        const jobId = req.params.id;

        const jobFound = Job.data.find(item => Number(item.id) === Number(jobId));
        if (!jobFound) {
          return res.send(`Job with ID[${jobId}] not found`)  
        }

        const updatedJob = {
          ...jobFound,
          name: req.body.name,
          "daily-hours": req.body["daily-hours"],
          "total-hours": req.body["total-hours"]
        }

        Job.data = Job.data.map(job => { 
          if (Number(job.id) === Number(jobId)) {
            job = updatedJob
          }

          return job
        })

        return res.redirect(`/job/${jobId}`)
      },

      delete(req, res) {
        const jobId = req.params.id;

        Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId))
        console.log(`Job com ID[${jobId}] removido`)

        return res.redirect('/')
      }
  },
  services: {
    remainingDays(job) {
      const remaining = (job["total-hours"] / job["daily-hours"]).toFixed()

      const createdDate = new Date(job.created_at)
      const dueDay = createdDate.getDate() + Number(remaining)
      const dueDateInMs = createdDate.setDate(dueDay) 

      const timeDiffInMs = dueDateInMs - Date.now()
      
      // transformar milliseconds em dias
      const dayInMs = 24 * 60 * 60 * 1000
      const differenceInDays = Math.floor(timeDiffInMs / dayInMs)

      return differenceInDays;
    },
    calculateBudget(job, valueHour) {
      return valueHour * job["total-hours"]
    }
  },
}

routes.get('/', Job.controllers.index)
routes.get('/job', Job.controllers.create)
routes.post('/job', Job.controllers.save)
routes.get('/job/:id', Job.controllers.findById)
routes.post('/job/:id', Job.controllers.update)
routes.post('/job/delete/:id', Job.controllers.delete)
routes.get('/profile', Profile.controllers.index)
routes.post('/profile', Profile.controllers.update)

module.exports = routes