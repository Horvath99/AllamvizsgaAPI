const { 
    createUser,
    getUsersForAdmin,
    getUsers,
    getUsersById,
    updateUser,
    deleteUser,
    login,
    passwordChange,
    getAdminList,
    adminLogin
 } = require("../controllers/userController");
const router = require("express").Router();
const {checkToken} = require("../auth/token_validation");
const { getAdmins } = require("../services/user.service");

router.post("/",createUser);

router.get("/",checkToken,getUsers);

router.get("/admin",getUsersForAdmin);

router.get("/getAdmins",getAdminList);

router.get("/:id",checkToken,getUsersById);

router.put("/:id",updateUser);

router.put("/passwordChange/:id",passwordChange)

router.delete("/:id",deleteUser);

router.post("/login",login);
router.post("/admin/login",adminLogin);

module.exports = router;