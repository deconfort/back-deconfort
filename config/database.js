
const mongoose = require('mongoose');
const connection = async () => {
  try {
    //
    mongoose.set('strictQuery', true);
    mongoose.connect(process.env.DB, 
        // objeto con configuraciones de conexion
        {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("connected to dabase");
  } catch (err) {
    console.log(err.message);
  }
};
connection();
