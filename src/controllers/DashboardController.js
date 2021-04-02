const Job = require('../models/Job')
const Profile = require('../models/Profile')
const JobUtils = require('../utils/JobUtils')

module.exports = {
    index(req, res) {
        const jobs = Job.get();
        const profile = Profile.get();

        const statusCount = {
            inprogress: 0,
            done: 0,
            total: jobs.length
        }

        let jobTotalHours = 0;

        const updatedJobs = jobs.map((job) => {
            const remaining = JobUtils.remainingDays(job)
            const status = remaining <= 0 ? "done" : "inprogress"

            statusCount[status] += 1;

            jobTotalHours = status === "inprogress" ? jobTotalHours += Number(job["daily-hours"]) : jobTotalHours

            return {
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile["value-hour"])
            }
        })

        const freeHours = profile["hours-per-day"] - jobTotalHours;

        return res.render('index', { 
            jobs: updatedJobs, 
            profile: profile, 
            statusCount: statusCount,
            freeHours: freeHours
         })
    }
}