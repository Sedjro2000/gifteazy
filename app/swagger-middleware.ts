import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../lib/swagger'; // Assure-toi d'importer correctement ton fichier swagger

export default function swaggerDocs(req: any, res: any, next: any) {
  swaggerUi.setup(swaggerSpec)(req, res, next); // Ajoute 'next' ici
}
