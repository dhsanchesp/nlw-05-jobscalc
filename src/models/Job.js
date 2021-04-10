const Database = require('../db/config')

module.exports = {
    async get() {
        const db = await Database()

        const jobs = await db.all(`SELECT * FROM job`)

        await db.close()
        return jobs.map(job => ({
            id: job.id,
            name: job.name,
            "daily-hours": job.daily_hours,
            "total-hours": job.total_hours,
            budget: job.budget,
            created_at: job.created_at
        }))
    },

    async update(newJob, jobId) {

        const db = await Database()

        db.run(`UPDATE job SET 
            name = "${newJob.name}",
            daily_hours = "${newJob["daily-hours"]}",
            total_hours =${newJob["total-hours"]} 
            WHERE id = ${jobId}`);

        await db.close()
    },

    async delete(jobId) {
        const db = await Database()

        await db.run(`DELETE FROM job WHERE id = ${jobId}`)

        await db.close()
    },

    async create(newJob) {
        const db = await Database()

        await db.run(`INSERT INTO job(
            name,
            daily_hours,
            total_hours,
            created_at
        ) VALUES (
            "${newJob.name}",
            ${newJob["daily-hours"]},
            ${newJob["total-hours"]},
            ${newJob.created_at}
        )`)

        await db.close()
    }
}