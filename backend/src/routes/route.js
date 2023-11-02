const express = require("express");
const router = express.Router();

const {
  login,
  addUser,
  forgetPass,
  fpUpdatePass,
  logOut,
  updateUser,
  getUserById,
  updatePassword,
  getAllUsers,
} = require("../controllers/customerController");

const {
  allMessages,
  sendMessage,
} = require("../controllers/messageController");

const { accessChat, fetchChats } = require("../controllers/chatController");

const { createTruckInfo, fetchTruckInfoById, fetchAllTruckInfo, updateTruckInfo, deleteTruckInfo } = require("../controllers/truckInfoController");

const { validateTokenMiddleware } = require("../middleware/auth");

// -------------------- Customer Profile Route ----------------------------------------------------------------------------------

router.post("/customer/register", addUser);
router.post("/customer/login", login);
router.get("/customer/logout", logOut);
router.post("/customer/forgotpass", forgetPass);
router.post("/customer/resetpass", fpUpdatePass);
router.put("/customer/update", validateTokenMiddleware, updateUser);
router.patch(
  "/customer/updatePassword",
  validateTokenMiddleware,
  updatePassword
);
router.get("/customer/getUserById", validateTokenMiddleware, getUserById);
router.get("/customergetAllUsers", validateTokenMiddleware, getAllUsers);

// --------------------- Chat Routes ----------------------------------------------------------------------------------------------

router.post("/chat", validateTokenMiddleware, accessChat);
router.get("/chat", validateTokenMiddleware, fetchChats);

// --------------------- Message Routes -------------------------------------------------------------------------------------------

router.post("/message", validateTokenMiddleware, sendMessage);
router.get("/message/:chatId", validateTokenMiddleware, allMessages);

// ---------------------- Truck Routes ----------------------------------------------------------------------------------------

router.post("/create-transport", validateTokenMiddleware, createTruckInfo);
router.get("/transport-by-carrierId", validateTokenMiddleware, fetchTruckInfoById);
router.get("/transport", validateTokenMiddleware, fetchAllTruckInfo);
router.put("/transport/:truckId", validateTokenMiddleware, updateTruckInfo);
router.delete("/transport/:truckId", validateTokenMiddleware, deleteTruckInfo);

module.exports = router;