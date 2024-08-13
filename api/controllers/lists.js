const listService = require("../services/lists");

const newList = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const list = await listService.newList(req.body);
      if (!list) {
        return res.status(401).json({ success: false, data: null, message: 'List creation failed.' });
      }
      res.status(200).json({ success: true, data: list, message: 'List created successfully.' });
    } catch (error) {
      res.status(500).json({ success: false, data: null, message: error.message });
    }
  } else {
    res.status(403).json({ success: false, data: null, message: 'Only admin can create a list!' });
  }
};

const updateList = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const list = await listService.updateList(req.params.id, req.body);
      if (!list) {
        return res.status(401).json({ success: false, data: null, message: 'List update failed.' });
      }
      res.status(200).json({ success: true, data: list, message: 'List updated successfully.' });
    } catch (error) {
      res.status(500).json({ success: false, data: null, message: error.message });
    }
  } else {
    res.status(403).json({ success: false, data: null, message: 'Only admin can update a list!' });
  }
};

const deleteList = async (req, res) => {
  if (!req.user.isAdmin) {
    res.status(403).json({ success: false, data: null, message: 'Only admin can delete lists!' });
    return;
  }
  try {
    const response = await listService.deleteList(req.params.id);
    if (!response) {
      return res.status(404).json({ success: false, data: null, message: 'List not found.' });
    }
    res.status(200).json({ success: true, data: null, message: 'List deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, data: null, message: error.message });
  }
};

const getList = async (req, res) => {
  try {
    const list = await listService.getList(req.params.id);
    if (!list) {
      return res.status(404).json({ success: false, data: null, message: 'List not found.' });
    }
    res.status(200).json({ success: true, data: list, message: 'List fetched successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, data: null, message: error.message });
  }
};

const getAllLists = async (req, res) => {
  if (!req.user.isAdmin) {
    res.status(403).json({ success: false, data: null, message: 'Only admin can fetch all lists!' });
    return;
  }
  try {
    const lists = await listService.getAllLists(req.query?.new);
    if (!lists) {
      return res.status(404).json({ success: false, data: null, message: 'Lists not found.' });
    }
    res.status(200).json({ success: true, data: lists, message: 'Lists fetched successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, data: null, message: error.message });
  }
};

const getListStats = async (req, res) => {
  try {
    const data = await listService.getListStats();
    if (!data) {
      return res.status(404).json({ success: false, data: null, message: 'List stats failed.' });
    }
    res.status(200).json({ success: true, data: data, message: 'List stats fetched successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, data: null, message: error.message });
  }
};

const getRandomList = async (req, res) => {
  try {
    const list = await listService.getRandomList(req.query.type);
    if (!list) {
      return res.status(404).json({ success: false, data: null, message: 'Random list not found.' });
    }
    res.status(200).json({ success: true, data: list, message: 'Random list fetched successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, data: null, message: error.message });
  }
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
