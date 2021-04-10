const Job = require('../models/Job')
const Profile = require('../models/Profile')
const JobUtils = require('../utils/JobUtils')

module.exports = {

    create(req, res) {
        return res.render('job')
    },

    async save(req, res) {
        await Job.create({
            name: req.body.name,
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"],
            created_at: Date.now(),
        })
        
        return res.redirect('/')
    },

    async findById(req, res) {
        const jobs = await Job.get();
        const profile = Profile.get();

        const jobId = req.params.id;

        const job = jobs.find(item => Number(item.id) === Number(jobId));
        if (!job) {
            return res.send(`Job with ID[${jobId}] not found`)
        }

        job.budget = JobUtils.calculateBudget(job, profile["value-hour"])

        return res.render('job-edit', { job })
    },

    async update(req, res) {
        const jobId = req.params.id;

        const updatedJob = {
            name: req.body.name,
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"]
        }

        await Job.update(updatedJob, jobId)

        return res.redirect(`/job/${jobId}`)
    },

    async delete(req, res) {
        const jobId = req.params.id;

        await Job.delete(jobId)

        return res.redirect('/')
    }
}