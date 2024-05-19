const { responseCode } = require('../base/responseCode');
const metricService = require('../services/metric.service');

const addMetric = async (req, res) => {
  try {
    const { userId, type, value, unit, date } = req.body;
    const metric = await metricService.addMetric({ userId, type, value, unit, date });

    res.success(metric, "Metric created successfully", responseCode.CREATED.code);
  } catch (err) {
    res.error(responseCode.SERVER.name, err.message, responseCode.SERVER.code);
  }
};

const getMetrics = async (req, res) => {
  try {
    const { userId, type, page = 1, limit = 10, unit } = req.query;
    const result = await metricService.getMetrics({ userId, type, page, limit, unit });

    res.success(result);
  } catch (err) {
    res.error(responseCode.SERVER.name, err.message, responseCode.SERVER.code);
  }
};

const getMetricsChart = async (req, res) => {
  try {
    const { userId, type, period, unit } = req.query;
    const result = await metricService.getMetricsChart({ userId, type, period, unit });

    res.success(result);
  } catch (err) {
    res.error(responseCode.SERVER.name, err.message, responseCode.SERVER.code);
  }
};

module.exports = {
  addMetric,
  getMetrics,
  getMetricsChart,
};
