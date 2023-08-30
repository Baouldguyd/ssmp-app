const Tasks = require("../models/tasks");

const getAllTask = async (req,res) =>{
    try {
        const task = await Tasks.find();
        if (!task) {
            return res.status(400).send({
                responseCode: "96",
                responseMessage: "No task could be fetched",
                data: null
            })
        }
        
        res.status(200).send({
            responseCode: "00",
            responseMessage: "Tasks fetched successfully",
            data: task
        })
    } catch (error) {
        res.status(500).send({
            responseCode: "96",
            responseMessage: "internal server error",
            data: null,
          });
          console.log(error);
    }
}

module.exports = getAllTask