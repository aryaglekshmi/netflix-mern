const List = require("../models/lists");

const newList = async (list) => {
  const newList = new List(list);
  return await newList.save();
};

const updateList = async (id, list) => {
  const updatedList = await List.findByIdAndUpdate(id, { $set: list }, { new: true });
  if (updatedList) return updatedList;
  return null;
};

const deleteList = async (id) => {
  return await List.findByIdAndDelete(id);
};

const getList = async (id) => {
  return await List.findById(id);
};

const getAllLists = async (query) => {
  return await query ? List.find().sort({ _id: -1 }).limit(query) : List.find();
};

const getListStats = async () => {
  const data = await List.aggregate([
    {
      $project: {
        month: { $month: "$createdAt" }
      }
    },
    {
      $group: {
        _id: "$month",
        total: { $sum: 1 }
      }
    },
    {
      $sort: { _id: 1 } // Sort by month in ascending order
    }
  ]);

  return data;
};

const getRandomList = async (type) => {
  const isSeries = type?.toLowerCase() === 'series';
  return await List.aggregate([{ $match: { type: isSeries ? 'series' : { $ne: 'series' } } }, { $sample: { size: 1 } }]);
};

module.exports = {
  newList,
  updateList,
  deleteList,
  getList,
  getAllLists,
  getListStats,
  getRandomList
};
