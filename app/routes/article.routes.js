module.exports = app => {
    const articles = require("../controller/article.controller")

    var router = require("express").Router();

  // Create a new article
  router.post("/", articles.create);

  // Retrieve all articles
  router.get("/", articles.findAll);

  // Retrieve all published articles
  router.get("/published", articles.findAllPublished);

  // Retrieve a single article with id
  router.get("/:id", articles.findOne);

  // Update a article with id
  router.put("/:id", articles.update);

  // Delete a article with id
  router.delete("/:id", articles.delete);

  // Create a new article
  router.delete("/", articles.deleteAll);

  app.use('/api/articles', router);
}