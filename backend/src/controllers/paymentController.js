const Customer = require("../models/customer");
const Payment = require("../models/payment");

const createPaymentData = async function (req, res) {
  try {
    const { truckId, transactionId, paymentStatus, currency, amount } =
      req.body;

    if (!truckId || !transactionId || !paymentStatus || !currency || !amount) {
      return res.status(400).send({
        status: false,
        msg: "truckId/transactionId/amount/currency/paymentStatus is required in send data.",
      });
    }

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

const fetchPaymentDataById = async function (req, res) {
  try {
    const transportId = req.params.transportId;
    if (!transportId) {
      return res.status(400).send({
        status: false,
        msg: "TransportId is required in params.",
      });
    }
    const singleTransportData = await Truck.findOne({
      where: { id: transportId },
      include: [
        {
          model: Customer,
          as: "transport",
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

    if (!singleTransportData) {
      return res.status(400).send({ status: false, msg: "Data Not Found!" });
    }

    return res.status(200).json({
      status: true,
      singleTransportData,
    });
  } catch (err) {
    console.error(err);
    return res.status(err.status || 500).send(err.message);
  }
};

const fetchAllPaymentData = async function (req, res) {
  try {
    const userData = await Customer.findOne({
      where: { id: req.person.id },
      attributes: ["id", "fullName", "email", "phoneNumber", "role", "photo"],
    });

    if (userData.role === "admin" && userData.id === req.person.id) {
      const allPaymentData = await Payment.findAll({});

      if (allPaymentData.length === 0) {
        return res.status(404).send({ status: false, msg: "Data Not Found!" });
      }
      return res.status(200).json({
        status: true,
        allPaymentData,
      });
    }

    return res.status(401).json({
      status: false,
      msg: "Not Authorized to Access hole Data!",
    });
  } catch (err) {
    console.error(err);
    return res.status(err.status || 500).send(err.message);
  }
};

module.exports = {
  createPaymentData,
  fetchAllPaymentData,
  fetchPaymentDataById,
};
