const Society = require('../models/society.model');

const createSociety = async (societyData) => {
  return await Society.create(societyData);
};

const byid = async (id) => {
  return await Society.findById(id);
}

const updateunit = async (id, Residentid) => {
    return await Society.findByIdAndUpdate(id,
      {
        $inc: { unit: 1 },
        $push: { resident: Residentid },
      },
      { new: true }
    )
}

const getSociety = async () => {
  return await Society.find();
};

const updateunitRemove = async (societyId, residentId) => {
  try {
    return updatedSociety = await Society.findByIdAndUpdate(
      societyId,
      {
        $pull: { resident: residentId },
        $inc: { unit: -1 },
      },
      { new: true }
    );
  } catch (error) {
    console.error("🚀 ~ updateunitRemove ~ error:", error);
    throw new Error("Failed to update society");
  }
};

module.exports = {
  createSociety,
  byid,
  updateunit,
  getSociety,
  updateunitRemove,
};
