
// 5
const db = require("../models");
const Article = db.articles;
const Op = db.Sequelize.Op;

// Create and SAve a new article
exports.create = (req, res) => {
    // Validate request 
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return
    }

    const article = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    };

    // Save article in the database
    Article.create(article)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the article."
        })
    })

}

// Retrieve all articles from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

    Article.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: 
                err.message || "Some error occurred while retrieving articles."
            });
        });
};

// Find a single article with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Article.findByPk(id) 
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find articles with id=${id}.`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving article with id=" + id
            });
        });
};

// Update a article by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Article.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "article was updated successfully."
                })
            } else {
                res.send({
                    message: `Cannot update article with id=${id}. Maybe article was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating article with id=" + id
            })
        })
}

// Delete a article with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Article.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "article was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete article with id=${id}. Maybe article was not found!`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete article with id=" + id
            });
        });
  
};

// Delete all articles from the database.
exports.deleteAll = (req, res) => {
    Article.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} articles were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all articles."
          });
        });
};

// Find all published articles
exports.findAllPublished = (req, res) => {
    Article.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving articles."
      });
    });
};