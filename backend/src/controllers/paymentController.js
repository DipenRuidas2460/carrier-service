const Customer = require("../models/customer");
const Payment = require("../models/payment");
const { Op } = require("sequelize");

const createPaymentData = async function (req, res) {
  try {
    const { truckId, transactionId, paymentStatus, currency, amount } =
      req.body;

    const userData = await Customer.findOne({
      where: { id: req.person.id },
      attributes: ["id", "fullName", "email", "phoneNumber", "role", "photo"],
    });

    if (userData.role === "customer" && userData.id === req.person.id) {
      const data = {
        customerId: req.person.id,
        truckId,
        transactionId,
        amount,
        currency,
        paymentStatus,
      };

      const paymentData = await Payment.create(data);
      return res.status(201).json({
        status: true,
        message: "Payment Data created Successfully!",
        paymentData,
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(err.status || 500).send(err.message);
  }
};

const fetchPaymentData = async function (req, res) {
  try {
    const userData = await Customer.findOne({
      where: { id: req.person.id },
      attributes: ["id", "fullName", "email", "phoneNumber", "role", "photo"],
    });

    if (userData.role !== "admin" && userData.id === req.person.id) {
      const paymentData = await Payment.findAll({
        where: {
          [Op.or]: [
            { customerId: req.person.id },
            { receiverId: req.person.id },
          ],
        },
        include: [
          {
            model: Customer,
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

      if (paymentData.length === 0) {
        return res.status(400).send({ status: false, msg: "Data Not Found!" });
      }

      return res.status(200).json({
        status: true,
        paymentData: paymentData,
      });
    } else {
      const allPaymentData = await Payment.findAll({});

      if (allPaymentData.length === 0) {
        return res.status(404).send({ status: false, msg: "Data Not Found!" });
      }
      return res.status(200).json({
        status: true,
        allPaymentData: allPaymentData,
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(err.status || 500).send(err.message);
  }
};


module.exports = {
  createPaymentData,
  fetchPaymentData,
};