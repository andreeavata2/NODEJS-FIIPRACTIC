const router = require("express").Router();
const multer = require('multer');

const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: "dycuxfu0d",
    api_key: "243877244827548",
    api_secret: "dXt67Mpbes8lasAylV91A_AQBhc",
  });

const upload = multer({
    storage: multer.memoryStorage(),
});

const auth = require("./auth");
const product = require("./product");
const cart = require("./cart");

router.use("/auth", auth);

const { requireAuth } = require('../middlewares');

router.use(requireAuth);

router.post('/file', upload.single('avatar'), (req, res) => {
    console.log(req.file);

    const fs = require('fs');

    fs.writeFileSync(`./files/${req.file.originalname}`, req.file.buffer);

    // cloudinary.uploader.upload(`./files/${req.file.path}`, (error, response) => {
    //     if(error) {
    //         console.log(error);
    //     }

    //     console.log(response);
    // });
});

router.use("/products", product);
router.use("/carts", cart);

module.exports = router;
