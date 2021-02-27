const { Router } = require("express");
const {
  handleTest1Example,
  handleTest2Example,
  handleTest3Example,
} = require("./controller");
const router = Router();

router.post("/test1", handleTest1Example);
router.post("/test2", handleTest2Example);
router.post("/test3", handleTest3Example);

module.exports = router;
