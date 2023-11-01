const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const Customer = require("./customer");

const Payment = sequelize.define(
    "Payment",
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
      transportId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      transactionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        trim: true,
      },
      currency: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("success", "pending", "failed"),
        allowNull: false,
      },
    },
    {
      tableName: "Payment",
      updatedAt:false,
    }
  );
  
  (async () => {
    await Payment.sync({ force: false });
  })();

  Payment.belongsTo(Customer, { foreignKey: "customerId", as: "pay" });

  module.exports = Payment;