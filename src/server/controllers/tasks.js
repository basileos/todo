const {db} = require('./../index');
const {ObjectId} = require('mongodb');

module.exports = {
    post: async (req, res) => {
        const {description, dueDate} = req.body;
        if(!description || !dueDate) {
            res.status(400).json({message: 'Invalid request'});
            return;
        }
        const task = await db.collection('tasks').insertOne({description, dueDate: new Date(dueDate), userId: req.userId} );
        res.send(task);
    },
    get: async (req, res) => {
        const task = await db.collection('tasks').findOne({id: ObjectId(req.params.id)});
        res.send(task);
    },
    put: async (req, res) => {
        const {description, dueDate} = req.body;
        const task = await db.collection('tasks').findOneAndUpdate({_id: ObjectId(req.params.id)}, {$set: {description, dueDate}});
        res.send(task);
    },
    delete: async (req, res) => {
        const result = await db.collection('tasks').findOneAndDelete({_id: ObjectId(req.params.id)});
        res.send(result);
    },
    getAll: async (req, res) => {
        const tasks = await db.collection('tasks').find({userId: ObjectId(req.userId)}).toArray();
        res.send({items: tasks, total: tasks.length});
    }
};
