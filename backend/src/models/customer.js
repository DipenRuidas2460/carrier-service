const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const Wallet = require("./wallet");

const Customer = sequelize.define(
  "Customer",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("customer", "carrier", "admin"),
      defaultValue: "customer",
    },
    photo: {
      type: DataTypes.STRING,
      defaultValue:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    fpToken: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "Customer",
  }
);

(async () => {
  await Customer.sync({ force: false });
})();


module.exports = Customer;