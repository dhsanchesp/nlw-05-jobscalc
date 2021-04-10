const Job = require('../models/Job')
const Profile = require('../models/Profile')
const JobUtils = require('../utils/JobUtils')

module.exports = {

    create(req, res) {
        return res.render('job')
    },

    save(req, res) {
        const jobs = Job.get();

        const lastId = jobs.length <= 0 ? 0 : jobs[jobs.length - 1].id

        Job.create({
            id: lastId + 1,
            name: req.body.name,
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"],
            created_at: Date.now(),
        })
        
        return res.redirect('/')
    },

    findById(req, res) {
        const jobs = Job.get();
        const profile = Profile.get();

        const jobId = req.params.id;

        const job = jobs.find(item => Number(item.id) === Number(jobId));
        if (!job) {
            return res.send(`Job with ID[${jobId}] not found`)
        }

        job.budget = JobUtils.calculateBudget(job, profile["value-hour"])

        return res.render('job-edit', { job })
    },

    update(req, res) {
        const jobs = Job.get();

        const jobId = req.params.id;

        const jobFound = jobs.find(item => Number(item.id) === Number(jobId));
        if (!jobFound) {
            return res.send(`Job with ID[${jobId}] not found`)
        }

        const updatedJob = {
            ...jobFound,
            name: req.body.name,
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"]
        }

        const newJobs = jobs.map(job => {
            if (Number(job.id) === Number(jobId)) {
                job = updatedJob
            }

            return job
        })

        Job.update(newJobs)

        return res.redirect(`/job/${jobId}`)
    },

    delete(req, res) {
        const jobId = req.params.id;

        Job.delete(jobId)

        return res.redirect('/')
    }
}