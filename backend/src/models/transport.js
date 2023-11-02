const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const Customer = require("./customer");
const Payment = require("./payment");

const Transport = sequelize.define(
  "Transport ",
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
    startLocation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    endLocation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fare: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "Transport ",
    updatedAt: false,
  }
);

(async () => {
  await Truck.sync({ force: false });
})();

Transport.hasOne(Payment);
Transport.belongsTo(Customer, { foreignKey: "customerId", as: "transCustomer" });
Transport.belongsTo(Customer, { foreignKey: "driverId", as: "transDriver" });

module.exports = Transport;