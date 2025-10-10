import  siteService from '../services/siteService.js';
import  aiService from '../services/aiService.js';
import { asyncHandler } from '../utils/errorHandler.js';
import { successResponse } from '../utils/responseHandler.js';

export const createSite = asyncHandler(async (req, res) => {
  const site = await siteService.createSite(req.body);
   return successResponse(res,201,'Site link created successfully',site)
});

export const getAllSites = asyncHandler(async (req, res) => {
  const { category, search, page, limit } = req.query;

  const filters = {};
  if (category) filters.category = category;
  if (search) filters.search = search;

  const pagination = {};
  if (page) pagination.page = page;
  if (limit) pagination.limit = limit;

  const result = await siteService.getAllSites(filters, pagination);
  return successResponse(res,200,'Sites retrieved successfully',result)

});

export const getSiteById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const site = await siteService.getSiteById(id);
  return successResponse(res,200,'Sites retrieved successfully',site)
});

export const updateSite = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const site = await siteService.updateSite(id, updateData);
  return successResponse(res,200,'Site updated successfully',site)
});

export const deleteSite = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await siteService.deleteSite(id);
  return successResponse(res,200,'Site deleted successfully',null)
});


/////ai

export const generateDesc = asyncHandler(async (req, res) => {
  const { siteUrl, title,  category } = req.body;
  const description = await aiService.generateDescription(title, category, siteUrl);
  return successResponse(res,200,'Description generated successfuly',description)
});