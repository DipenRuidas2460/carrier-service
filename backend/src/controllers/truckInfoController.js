const Customer = require("../models/customer");
const Truck = require("../models/truck");

const createTruckInfo = async function (req, res) {
  try {
    const { truckNumber, capacity } = req.body;

    if (!truckNumber || !capacity) {
      return res.status(400).send({
        status: false,
        msg: "truckNumber or capacity is required in send data.",
      });
    }

    const userData = await Customer.findOne({
      where: { id: req.person.id },
      attributes: ["id", "fullName", "email", "phoneNumber", "role", "photo"],
    });

    if (userData.role === "carrier" && userData.id === req.person.id) {
      const storeData = {
        carrierId: req.person.id,
        truckNumber,
        price,
        capacity,
      };

      const transportData = await Truck.create(storeData);
      return res.status(201).json({
        status: true,
        message: "Truck Data created Successfully!",
        transportData,
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(err.status || 500).send(err.message);
  }
};

const fetchTruckInfoById = async function (req, res) {
  try {
    const userData = await Customer.findOne({
      where: { id: req.person.id },
      attributes: ["id", "fullName", "email", "phoneNumber", "role", "photo"],
    });

    if (userData.role === "carrier" && userData.id === req.person.id) {
      const singleTransportData = await Truck.findAll({
        where: { carrierId: req.person.id },
        include: [
          {
            model: Customer,
            as: "truckDetails",
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

      if (singleTransportData.length === 0) {
        return res.status(404).send({ status: false, msg: "Data Not Found!" });
      }

      return res.status(200).json({
        status: true,
        singleTransportData,
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(err.status || 500).send(err.message);
  }
};

const fetchAllTruckInfo = async function (req, res) {
  try {
    const userData = await Customer.findOne({
      where: { id: req.person.id },
      attributes: ["id", "fullName", "email", "phoneNumber", "role", "photo"],
    });

    if (userData.role === "admin" && userData.id === req.person.id) {
      const allTransportData = await Truck.findAll({});

      if (allTransportData.length === 0) {
        return res.status(404).send({ status: false, msg: "Data Not Found!" });
      }

      return res.status(200).json({
        status: true,
        allTransportData,
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

const updateTruckInfo = async function (req, res) {
  try {
    const truckId = req.params.truckId;
    const userData = await Customer.findOne({
      where: { id: req.person.id },
      attributes: ["id", "fullName", "email", "phoneNumber", "role", "photo"],
    });

    if (userData.role === "carrier" && userData.id === req.person.id) {
      const transportData = await Truck.update(req.body, {
        where: { id: truckId },
      });
      return res.status(200).json({
        status: true,
        message: "Truck Data Updated Successfully!",
        transportData,
      });
    }

    return res.status(401).json({
      status: false,
      msg: "Not Authorized to Update!",
    });
  } catch (err) {
    console.error(err);
    return res.status(err.status || 500).send(err.message);
  }
};

const deleteTruckInfo = async function (req, res) {
  try {
    const truckId = req.params.truckId;
    const userData = await Customer.findOne({
      where: { id: req.person.id },
      attributes: ["id", "fullName", "email", "phoneNumber", "role", "photo"],
    });

    if (userData.role === "carrier" && userData.id === req.person.id) {
      const deletedData = await Truck.destroy({
        where: { id: truckId },
      });

      if (!deletedData) {
        return res
          .status(404)
          .send({ status: false, msg: "Truck Data already deleted!" });
      }
      return res.status(200).json({
        status: true,
        message: "Truck Data deleted Successfully!",
      });
    }

    return res.status(400).json({
      status: false,
      msg: "Not Authorized to delete Data!",
    });
  } catch (err) {
    console.error(err);
    return res.status(err.status || 500).send(err.message);
  }
};

module.exports = {
  createTruckInfo,
  fetchAllTruckInfo,
  fetchTruckInfoById,
  updateTruckInfo,
  deleteTruckInfo,
};