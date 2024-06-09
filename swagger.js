const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/userRoutes.js','./routes/authRoutes.js','./routes/exhibitRoutes.js' ,'./routes/virtualTourRoutes.js'];// Укажите путь к файлам, содержащим ваши эндпоинты

swaggerAutogen(outputFile, endpointsFiles);
