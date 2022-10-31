module.exports = app => {
    const articles = require("../controllers/article.controller.js");
    const passport = require("passport");
    app.use(passport.initialize());
    require("../middlewares/passport");
    const verifyToken = passport.authenticate("jwt", { session: false });
    const path = require("path");
    const multer = require("multer");
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, '../backend/images')
        },
        filename: (req, file, cb) => {
            console.log(file)
            cb(null, Date.now() + path.extname(file.originalname))
        }
    });
    const upload = multer({ storage: storage });

    var router = require("express").Router();
  
    // Create a new Article
    router.post("/", verifyToken, upload.single("image"), articles.create);
  
    // Retrieve all Articles
    router.get("/", verifyToken, articles.findAll);
  
    // Update a Article with id
    router.put("/:id", verifyToken, upload.single("image"), articles.update);

    // Like an Article with id
    router.put("/like/:id", verifyToken, articles.like);

    // Get liked articles
    router.get("/liked", verifyToken, articles.getLiked);

    // Get disliked articles
    router.get("/disliked", verifyToken, articles.getDisliked);

    // Dislike an Article with id
    router.put("/dislike/:id", verifyToken, articles.dislike);
  
    // Delete a Article with id
    router.delete("/:id", verifyToken, articles.delete);
  
    app.use('/api/articles', router);
};