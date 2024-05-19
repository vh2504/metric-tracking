const { body, query } = require('express-validator');
const { MetricType, DistanceUnit, TemperatureUnit } = require('../types/metric.type');

const validateAddMetric = () => {
  return [
    body('type').custom((value, { req }) => {
      if (!Object.values(MetricType).includes(value)) {
        throw new Error('Invalid metric type');
      }

      if (value === MetricType.Distance) {
        const unit = req.body.unit;
        if (!Object.values(DistanceUnit).includes(unit)) {
          throw new Error('Invalid unit for Distance metric');
        }
      }

      if (value === MetricType.Temperature) {
        const unit = req.body.unit;
        if (!Object.values(TemperatureUnit).includes(unit)) {
          throw new Error('Invalid unit for Temperature metric');
        }
      }

      return true;
    }),
    body('date').isString().notEmpty().withMessage("Date is required")
      .isISO8601().toDate().withMessage('Invalid date format'),
    body('value').isNumeric().withMessage('Value must be numeric'),
    body('unit').notEmpty().withMessage('Unit is required'),
  ];
};

const validateGetMetricsChart = () => {
  return [
    query('userId').isString().notEmpty().withMessage('User ID is required'),
    query('type').custom((value) => {
      if (!Object.values(MetricType).includes(value)) {
        throw new Error('Invalid metric type');
      }
      return true;
    }),
    query('period').isNumeric().withMessage('Period must be numeric'),
    query('unit').optional().isString().custom((value, { req }) => {
      const type = req.query.type;
      if (type === MetricType.Distance && !Object.values(DistanceUnit).includes(value)) {
        throw new Error('Invalid unit for Distance metric');
      }
      if (type === MetricType.Temperature && !Object.values(TemperatureUnit).includes(value)) {
        throw new Error('Invalid unit for Temperature metric');
      }
      return true;
    }),
  ];
};

const validateGetMetrics = () => {
  return [
    query('userId').isString().notEmpty().withMessage('User ID is required'),
    query('type').custom((value) => {
      if (!Object.values(MetricType).includes(value)) {
        throw new Error('Invalid metric type');
      }
      return true;
    }),
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
    query('unit').optional().isString().custom((value, { req }) => {
      const type = req.query.type;
      if (type === MetricType.Distance && !Object.values(DistanceUnit).includes(value)) {
        throw new Error('Invalid unit for Distance metric');
      }
      if (type === MetricType.Temperature && !Object.values(TemperatureUnit).includes(value)) {
        throw new Error('Invalid unit for Temperature metric');
      }
      return true;
    }),
  ];
};

module.exports = {
  validateAddMetric,
  validateGetMetricsChart,
  validateGetMetrics,
};
