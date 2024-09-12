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
};

const options = {
  swaggerDefinition,
  apis: ['./app/api/**/*.ts'], // Le chemin vers tes fichiers d'API
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
