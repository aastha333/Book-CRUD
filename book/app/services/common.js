
const create = async (Model, profile) => {
  try {
    const data = new Model(profile).save();
    return data;
  } catch (err) {
    return false;
  }
};

const updateByCondition = async (Model, condition, content) => {
  try {
    const data = await Model.updateOne(condition, { $set: content });
    return data;
  } catch (err) {
    return false;
  }
};

const getByCondition = async (Model, condition) => {
  try {
    const data = await Model.findOne(condition).lean();
    return data || null;
  } catch (error) {
    return false;
  }
};

const deleteByField = async (Model, content) => {
  try {
    console.log(content);
    const data = await Model.findOneAndRemove(content);
    return data ? JSON.parse(JSON.stringify(data)) : null;
  } catch (error) {
    return false;
  }
};

const findAll = async (Model, query, projection) => {
  try {
    const data = await Model.find(query, projection).sort({ 'updatedAt': -1 }).lean();
    return data;
  } catch (error) {
    return false;
  }
};

module.exports = {
  create,
  updateByCondition,
  deleteByField,
  getByCondition,
  findAll
};
