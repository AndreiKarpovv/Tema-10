const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const exhibitRoutes = require('./routes/exhibitRoutes');
const virtualTourRoutes = require('./routes/virtualTourRoutes'); 
const { sequelize } = require('./models');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger_output.json');


const app = express();

app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/exhibit', exhibitRoutes);
app.use('/virtual-tours', virtualTourRoutes); 

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
