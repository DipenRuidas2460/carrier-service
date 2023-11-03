const Customer = require("../models/customer");
const Location = require("../models/location");
const { Op } = require("sequelize");

const createLocationData = async function (req, res) {
  try {
    const { driverId, transportId, latitude, longitude, address } = req.body;

    const userData = await Customer.findOne({
      where: { id: req.person.id },
      attributes: ["id", "fullName", "email", "phoneNumber", "role", "photo"],
    });

    if (userData.role === "customer" && userData.id === req.person.id) {
      const data = {
        customerId: req.person.id,
        driverId,
        transportId,
        latitude,
        longitude,
        address,
      };

      const locationData = await Location.create(data);
      return res.status(201).json({
        status: true,
        message: "Location Data created Successfully!",
        locationData,
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(err.status || 500).send(err.message);
  }
};

const fetchLocationData = async function (req, res) {
  try {
    const userData = await Customer.findOne({
      where: { id: req.person.id },
      attributes: ["id", "fullName", "email", "phoneNumber", "role", "photo"],
    });

    if (userData.role !== "admin" && userData.id === req.person.id) {
      const locationData = await Location.findAll({
        where: {
          [Op.or]: [{ customerId: req.person.id }, { driverId: req.person.id }],
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

      if (locationData.length === 0) {
        return res.status(400).send({ status: false, msg: "Data Not Found!" });
      }

      return res.status(200).json({
        status: true,
        locationData: locationData,
      });
    } else {
      const allLocationData = await Location.findAll({});

      if (allLocationData.length === 0) {
        return res.status(404).send({ status: false, msg: "Data Not Found!" });
      }
      return res.status(200).json({
        status: true,
        allLocationData: allLocationData,
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(err.status || 500).send(err.message);
  }
};

module.exports = {
  createLocationData,
  fetchLocationData,
};
