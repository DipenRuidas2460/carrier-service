const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const Customer = require("./customer");

const Commission = sequelize.define(
  "Commission",
  {
    driverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rate: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: "Commission",
    updatedAt: false,
  }
);

(async () => {
  await Commission.sync({ force: false });
})();

Commission.belongsTo(Customer, { foreignKey: "driverId", as: "commisionPay" });

module.exports = Commission;
