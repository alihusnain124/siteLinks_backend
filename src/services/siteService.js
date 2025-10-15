import { SiteLink } from '../database/models/index.js';
import { Op } from 'sequelize';
import { ApiError } from '../utils/responseHandler.js';

class SiteService {
  async createSite(siteData) {
    const { siteUrl, title, coverImage, category, description } = siteData;
    const site = await SiteLink.create({
      siteUrl,
      title,
      coverImage: coverImage || null,
      description,
      category,
    });
    return site.toJSON();
  }

  async getAllSites(filters = {}, pagination = {}) {
    const { category, search } = filters;
    const { page = 1, limit = 10 } = pagination;

    const offset = (page - 1) * limit;
    const whereClause = {};
    if (category) whereClause.category = category;
    if (search)
      whereClause[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
      ];

    const { rows: sites, count: total } = await SiteLink.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']],
    });

    return {
      sites: sites.map((site) => site.toJSON()),
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getSiteById(siteId) {
    const site = await SiteLink.findByPk(siteId);
    if (!site) throw ApiError(404, 'Site link not found');
    return site.toJSON();
  }

  async updateSite(siteId, updateData) {
    const site = await SiteLink.findByPk(siteId);
    if (!site) throw ApiError(404, 'Site link not found');
    await site.update(updateData);
    return site.toJSON();
  }

  async deleteSite(siteId) {
    const site = await SiteLink.findByPk(siteId);
    if (!site) throw ApiError(404, 'Site link not found');
    await site.destroy();
    return true;
  }
}

export default new SiteService();
