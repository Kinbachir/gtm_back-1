import swaggerJSDoc from "swagger-jsdoc"

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "GTM API's documentation",
      version: "1.0.0",
      license: {
        name: "https://www.devtest21-api.g2m-tn.com"
      },
    },
    components: {
      securitySchemes: {
        jwt: {
          type: "http",
          scheme: "bearer",
          in: "header",
          bearerFormat: "JWT"
        },
      }
    }
    ,
    security: [{
      jwt: []
    }],
  },
  apis: [
    'src/api/*/*Routes.js',
    './api/*/*Routes.js',
  ]
}
export const swaggerSpec = swaggerJSDoc(options)