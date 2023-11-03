const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const Customer = require("./customer");
const Transport = require("./transport");

const Location = sequelize.define(
  "Location",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    driverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    transportId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Location",
    updatedAt: false,
  }
);

(async () => {
  await Location.sync({ force: false });
})();

Location.belongsTo(Customer, { foreignKey: "customerId" });
Location.belongsTo(Customer, { foreignKey: "driverId" });
Location.belongsTo(Transport, {
  foreignKey: "transportId",
  as: "transLocation",
});

module.exports = Location;
