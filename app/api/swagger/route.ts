import { NextResponse } from 'next/server';

export async function GET() {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Swagger UI</title>
        <link href="/swagger-ui/swagger-ui.css" rel="stylesheet">
      </head>
      <body>
        <div id="swagger-ui"></div>
        <script src="/swagger-ui/swagger-ui-bundle.js"></script>
        <script src="/swagger-ui/swagger-ui-standalone-preset.js"></script>
        <script>
          window.onload = function() {
            window.ui = SwaggerUIBundle({
              url: '/api/swagger/json', // Lien vers le JSON de Swagger
              dom_id: '#swagger-ui',
              presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
              layout: 'StandaloneLayout'
            });
          };
        </script>
      </body>
    </html>
  `;

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}
