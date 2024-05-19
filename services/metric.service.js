const { convertUnit } = require('../helpers/metric.helper');
const Metric = require('../models/Metric');
const moment = require('moment');
const { Op } = require('sequelize');

const addMetric = async ({ userId, type, value, unit, date }) => {
  return await Metric.create({ userId, type, value, unit, date });
};

const getMetrics = async ({ userId, type, page, limit, unit }) => {
  const offset = (page - 1) * limit;

  const metrics = await Metric.findAndCountAll({
    where: { type, userId },
    limit: parseInt(limit),
    offset: parseInt(offset),
    order: [['date', 'DESC']],
  });

  const result = metrics.rows.map((metric) => {
    if (unit && metric.unit !== unit) {
      metric.value = convertUnit(metric.value, metric.unit, unit);
      metric.unit = unit;
    }
    return metric;
  });

  return {
    metrics: result,
    total: metrics.count,
    totalPages: Math.ceil(metrics.count / limit),
    currentPage: parseInt(page),
  };
};

const getMetricsChart = async ({ userId, type, period, unit }) => {
  const endDate = moment();
  const startDate = endDate.clone().subtract(Number(period), 'months');

  const metrics = await Metric.findAll({
    where: {
      type,
      date: {
        [Op.between]: [startDate.toDate(), endDate.toDate()],
      },
      userId,
    },
    order: [['date', 'ASC']],
  });

  const groupedMetrics = {};
  metrics.forEach((metric) => {
    const date = moment(metric.date).format('YYYY-MM-DD');
    if (!groupedMetrics[date] || moment(metric.date).isAfter(groupedMetrics[date].date)) {
      groupedMetrics[date] = metric;
    }
  });

  const result = Object.values(groupedMetrics).map((metric) => {
    if (unit && metric.unit !== unit) {
      metric.value = convertUnit(metric.value, metric.unit, unit);
      metric.unit = unit;
    }
    return metric;
  });

  return result.sort((a, b) => moment(a.date).diff(moment(b.date)));
};

module.exports = {
  addMetric,
  getMetrics,
  getMetricsChart,
};
