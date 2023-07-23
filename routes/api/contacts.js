const express = require("express");
const ctrl = require("../../controllers");
const authenticate = require("../../middlewares");
const router = express.Router();

router.get("/", authenticate, ctrl.contacts.listContacts);

router.get("/:contactId", authenticate, ctrl.contacts.getContactById);

router.post("/", authenticate, ctrl.contacts.addContact);

router.delete("/:contactId", authenticate, ctrl.contacts.removeContact);

router.put("/:contactId", authenticate, ctrl.contacts.updateContact);

router.patch(
  "/:contactId/favorite",
  authenticate,
  ctrl.contacts.updateStatusContact
);

module.exports = router;
