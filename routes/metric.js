const express = require('express');
const router = express.Router();
const metricController = require('../controllers/metric.controller');
const { validateAddMetric, validateGetMetrics, validateGetMetricsChart } = require('../middlewares/metric-validator.middleware');
const { resultValidator } = require('../middlewares/validator.middleware');

/**
 * @swagger
 * tags:
 *   name: Metrics
 *   description: API for managing metrics
 */

/**
 * @swagger
 * /metrics:
 *   post:
 *     summary: Add a new metric
 *     tags: [Metrics]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Metric'
 *     responses:
 *       201:
 *         description: The created metric
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Metric'
 *       400:
 *         description: Bad request
 */
router.route('/').post(validateAddMetric(), resultValidator, metricController.addMetric);

/**
 * @swagger
 * /metrics:
 *   get:
 *     summary: Get all metrics by type
 *     tags: [Metrics]
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         required: true
 *         description: The type of the metric
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user
 *       - in: query
 *         name: unit
 *         schema:
 *           type: string
 *         required: false
 *         description: The unit to convert the values to
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: The page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: false
 *         description: The maximum number of metrics per page
 *     responses:
 *       200:
 *         description: The list of metrics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 metrics:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Metric'
 *                 total:
 *                   type: integer
 *                   description: The total number of metrics
 *                 totalPages:
 *                   type: integer
 *                   description: The total number of pages
 *                 currentPage:
 *                   type: integer
 *                   description: The current page
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.route('').get(validateGetMetrics(), resultValidator, metricController.getMetrics);

/**
 * @swagger
 * /metrics/chart:
 *   get:
 *     summary: Get metric data for chart
 *     tags: [Metrics]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           userId: string
 *         required: true
 *         description: The user get metrics
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         required: true
 *         description: The type of the metric
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *         required: true
 *         description: The time period for the chart (in months)
 *       - in: query
 *         name: unit
 *         schema:
 *           type: string
 *         required: false
 *         description: The unit to convert the values to
 *     responses:
 *       200:
 *         description: The metric data for the chart
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Metric'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.route('/chart').get(validateGetMetricsChart(), resultValidator, metricController.getMetricsChart);

module.exports = router;
