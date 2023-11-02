const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const Customer = require("./customer");

const Truck = sequelize.define(
  "Truck",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    carrierId: {
      type: DataTypes.INTEGER,
    },
    truckNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Truck",
    updatedAt: false,
  }
);

(async () => {
  await Truck.sync({ force: false });
})();

Customer.hasMany(Truck, { foreignKey: "carrierId", as: "truckDetails" });
Truck.belongsTo(Customer, { foreignKey: "carrierId", as: "truckDetails" });

module.exports = Truck;