const Wallet = require("../models/wallet");
const Customer = require("../models/customer");

const createWalletData = async function (req, res) {
  try {
    const { balance } = req.body;

    const userData = await Customer.findOne({
      where: { id: req.person.id },
      attributes: ["id", "fullName", "email", "phoneNumber", "role", "photo"],
    });

    if (userData.role === "carrier" && userData.id === req.person.id) {
      const data = {
        userId: req.person.id,
        balance: balance,
      };

      const walletData = await Wallet.create(data);
      return res.status(201).json({
        status: true,
        message: "Wallet Data created Successfully!",
        walletData,
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(err.status || 500).send(err.message);
  }
};

const fetchWalletData = async function (req, res) {
  try {
    const userData = await Customer.findOne({
      where: { id: req.person.id },
      attributes: ["id", "fullName", "email", "phoneNumber", "role", "photo"],
    });

    if (userData.role === "carrier" && userData.id === req.person.id) {
      const walletData = await Wallet.findAll({
        where: {
          userId: req.person.id,
        },
        include: [
          {
            model: Customer,
            as: "wallet-money",
            attributes: [
              "id",
              "fullName",
              "email",
              "photo",
              "phoneNumber",
              "role",
            ],
          },
        ],
      });

      if (walletData.length === 0) {
        return res.status(400).send({ status: false, msg: "Data Not Found!" });
      }

      return res.status(200).json({
        status: true,
        walletData: walletData,
      });
    } else if (userData.role === "admin") {
      const allWalletData = await Wallet.findAll({});

      if (allWalletData.length === 0) {
        return res.status(404).send({ status: false, msg: "Data Not Found!" });
      }
      return res.status(200).json({
        status: true,
        allWalletData: allWalletData,
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(err.status || 500).send(err.message);
  }
};

module.exports = { createWalletData, fetchWalletData };
