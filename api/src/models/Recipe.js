const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image:{
      type: DataTypes.STRING(1234),
      allowNull: false
    },
    summary: {
      type: DataTypes.STRING(1234),
      allowNull: false
    },
    spoonacularScore: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    healthScore: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    instructions: {
      type: DataTypes.STRING(1234),
      allowNull: true
    },
    dishTypes: {
      type: DataTypes.STRING,
      allowNull: true
    },
    created: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    }
  });
};
