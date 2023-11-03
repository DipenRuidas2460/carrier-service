const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const Customer = require("./customer");
const Transport = require("./transport");
const Commission = require("./commision");
const Payout = require("./payout");
const Wallet = require("./wallet");

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
    receiverId: {
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
    paymentStatus: {
      type: DataTypes.ENUM("success", "pending", "failed"),
      allowNull: false,
    },
  },
  {
    tableName: "Payment",
    updatedAt: false,
  }
);

(async () => {
  await Payment.sync({ force: false });
})();

Payment.belongsTo(Customer, { foreignKey: "customerId"});
Payment.belongsTo(Customer, { foreignKey: "receiverId"});

Payment.belongsTo(Transport, { foreignKey: "transportId", as: "paymentTrans" });

Payment.belongsTo(Payout);

Payment.belongsTo(Commission);

Payment.belongsTo(Wallet)

module.exports = Payment;