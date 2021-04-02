module.exports = {
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
}