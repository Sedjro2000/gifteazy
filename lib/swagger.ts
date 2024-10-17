import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Documentation',
    version: '1.0.0',
    description: 'Documentation de l\'API avec Swagger',
  },
  servers: [
    {
      url: 'http://localhost:3000', // URL de ton serveur
      description: 'Serveur local',
    },
  ],

  components: {
    schemas: {
      Filter: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'filter1' },
          name: { type: 'string', example: 'Taille' },
          type: { type: 'string', example: 'Sélection' },
          values: { type: 'array', items: { type: 'string' }, example: ["S", "M", "L"] },
          categories: {
            type: 'array',
            items: { type: 'string' },
            example: ["cat1", "cat2"]
          }
        }
      }
    }
  }
};

const options = {
  swaggerDefinition,
  apis: ['./app/api/**/*.ts'], 
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
