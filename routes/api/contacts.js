const express = require("express");
const ctrl = require("../../controllers");
const router = express.Router();

console.log(ctrl.contacts.listContacts);

router.get("/", ctrl.contacts.listContacts);

router.get("/:contactId", ctrl.contacts.getContactById);

router.post("/", ctrl.contacts.addContact);

router.delete("/:contactId", ctrl.contacts.removeContact);

router.put("/:contactId", ctrl.contacts.updateContact);

router.patch("/:contactId/favorite", ctrl.contacts.updateStatusContact);

module.exports = router;
