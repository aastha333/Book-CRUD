const Joi = require('joi');
const { orderingKeys } = require('../constant/common');

const search = Joi.string().trim().optional();

const sortOrder = Joi.string().trim().valid(orderingKeys.ASC, orderingKeys.DESC).optional().default(orderingKeys.DESC);

const objIdRgx = { rgx: /^[0-9a-fA-F]{24}$/ };

const requiredId = Joi.string().min(24).max(24).pattern(new RegExp(objIdRgx)).required()
  .messages({
    'string.pattern.base': 'id must be a valid objectId',
    'string.min': 'id must be objectId of length 24',
    'string.max': 'id must be objectId of length 24'
  });

const requireId = Joi.object({
  id: requiredId
});

const addBook = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  summary: Joi.string().required()

});

const editBook = Joi.object({
  title: Joi.string().optional(),
  author: Joi.string().optional(),
  summary: Joi.string().optional()
});

module.exports = { search, sortOrder, addBook, requireId, editBook };
