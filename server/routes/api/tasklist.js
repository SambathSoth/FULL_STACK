const { text } = require('body-parser')
const express = require('express')
const mongodb = require('mongodb')

const router = express.Router()

// Get Task
router.get('/', async(req, res) => {
    const mytasks = await loadTasksCollection()
    res.send(await mytasks.find({}).toArray())
})

// Add Task
router.post('/', async(req, res) => {
    const mytasks = await loadTasksCollection()
    await mytasks.insertOne({
        task: req.body.task,
        dateCreated: new Date()
    })
    res.status(201).send()
})

// Delete Task
router.delete('/:id', async(req, res) => {
    const mytasks = await loadTasksCollection()
    await mytasks.deleteOne({ _id: new mongodb.ObjectID(req.params.id) })
    res.status(200).send()
})

async function loadTasksCollection() {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://Sambath:1234@my-tasklist.tjw7y.mongodb.net/Sambath?retryWrites=true&w=majority', {
            useNewUrlParser: true
        }
    )

    return client.db('my-tasklist').collection('mytasks')
}

module.exports = router