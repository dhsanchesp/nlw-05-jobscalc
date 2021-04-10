let data = [
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
];

module.exports = {
    get() {
        return data
    },

    update(newJobs) {
        data = newJobs
    },

    delete(jobId) {
        data = data.filter(job => Number(job.id) !== Number(jobId))
    },

    create(newJob) {
        data.push(newJob)
    }
}