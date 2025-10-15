import siteService from '../services/siteService.js';
import aiService from '../services/aiService.js';
import { successResponse } from '../utils/responseHandler.js';
import { errorResponse } from '../utils/responseHandler.js';

export const createSite = async (req, res) => {
  try {
    const site = await siteService.createSite(req.body);
    return successResponse(res, 201, 'Site link created successfully', site);
  } catch (error) {
    return errorResponse(res, error);
  }
};

export const getAllSites = async (req, res) => {
  try {
    const { category, search, page, limit } = req.query;
    const filters = {};
    if (category) filters.category = category;
    if (search) filters.search = search;

    const pagination = {};
    if (page) pagination.page = page;
    if (limit) pagination.limit = limit;

    const result = await siteService.getAllSites(filters, pagination);
    return successResponse(res, 200, 'Sites retrieved successfully', result);
  } catch (error) {
    return errorResponse(res, error);
  }
};

export const getSiteById = async (req, res) => {
  try {
    const { id } = req.params;
    const site = await siteService.getSiteById(id);
    return successResponse(res, 200, 'Sites retrieved successfully', site);
  } catch (error) {
    errorResponse(res, error);
  }
};

export const updateSite = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const site = await siteService.updateSite(id, updateData);
    return successResponse(res, 200, 'Site updated successfully', site);
  } catch (error) {
    return errorResponse(res, error);
  }
};

export const deleteSite = async (req, res) => {
  try {
    const { id } = req.params;
    await siteService.deleteSite(id);
    return successResponse(res, 200, 'Site deleted successfully', null);
  } catch (error) {
    return errorResponse(res, error);
  }
};

/////ai

export const generateDesc = async (req, res) => {
  try {
    const { siteUrl, title, category } = req.body;
    const description = await aiService.generateDescription(title, category, siteUrl);
    return successResponse(res, 200, 'Description generated successfuly', description);
  } catch (error) {
    return errorResponse(res, error);
  }
};
