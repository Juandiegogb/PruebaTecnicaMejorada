import record from "../models/recordModel.js";
const controller = {};

controller.createRecord = async (req, res) => {
  const owner = req.params.id;
  const dateTime = new Date();
  const date = dateTime.toLocaleDateString();
  const time = dateTime.toLocaleTimeString();
  const recordController = "".concat(owner, date);
  await record
    .create({ owner, date, time, recordController })
    .then(() => {
      res.status(200).json({ message: "Record created" });
    })
    .catch((error) => {
      const code = error.errorResponse.code;
      console.log(error);
      if (code === 11000)
        res.status(400).json({ message: "Daily record alredy exist" });
    });
};

controller.getRecords = async (req, res) => {
  const owner = req.params.ownerid;
  try {
    const records = await record.find({ owner });
    console.log(records)
    res.status(200).json(records);

  } catch (error) {
    console.log(error);
  }
};

export default controller;
