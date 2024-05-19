const app = require('./app');
const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Metric Tracking System API',
    version: '1.0.0',
    description: 'API documentation for the Metric Tracking System',
  },
  servers: [
    {
      url: 'http://localhost:3000',
    },
  ],
  components: {
    schemas: {
      Metric: {
        type: 'object',
        properties: {
          userId: {
            type: 'string',
            description: 'The user id associated with the metric',
          },
          type: {
            type: 'string',
            description: 'The type of the metric (Distance or Temperature)',
          },
          value: {
            type: 'number',
            description: 'The value of the metric',
          },
          unit: {
            type: 'string',
            description: 'The unit of the metric',
          },
          date: {
            type: 'string',
            format: 'date-time',
            description: 'The date and time when the metric was recorded',
          },
        },
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};
const specs = swaggerJsdoc(options);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
});
