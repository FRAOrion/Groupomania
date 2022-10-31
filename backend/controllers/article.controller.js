const db = require("../models");
const Article = db.articles;
const Like = db.likes;
const Dislike = db.dislikes;
const fs = require("fs");

// Create and Save a new Article
exports.create = (req, res) => {

  // if no image sent
  if (req.body.image != undefined) {
    const article = {
      userId: req.body.userId,
      title: req.body.title,
      description: req.body.description
    };
    Article.create(article)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Article."
        });
    });

    // else image sent
  } else {
    const article = {
      userId: req.body.userId,
      title: req.body.title,
      description: req.body.description,
      imageUrl : `http://localhost:8080/images/${req.file.filename}`
    };
    Article.create(article)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Article."
        });
    });
  }
};

// Retrieve all Articles from the database.
exports.findAll = (req, res) => {
  Article.findAll({ order: [
    [ 'id', 'DESC' ]
  ] })
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

// Update an Article by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  if (req.body.image != undefined) {
    const article = {
      id: req.body.id,
      title: req.body.title,
      description: req.body.description
    };
    Article.update(article, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Article was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Article with id=${id}. Maybe Article was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Article with id=" + id
        });
    });
  } else {
    const ancientImageUrl = req.body.ancientImageUrl;
    const ancientImageUrlForUnlink = ancientImageUrl.substring(29);
    
    fs.unlink(`./images/${ancientImageUrlForUnlink}`, (err) => {
      if (err) {
        console.log(err);
      }
    });
    const article = {
      id: req.body.id,
      title: req.body.title,
      description: req.body.description,
      imageUrl : `http://localhost:8080/images/${req.file.filename}`
    };
    Article.update(article, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Article was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Article with id=${id}. Maybe Article was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Article with id=" + id
        });
    });
  }
};

// Like an Article by the id in the request
exports.like = (req, res) => {
  const articleId = req.params.id;
  const userId = req.body.userLiked;
  const postData = {
    userId: userId,
    articleId: articleId
  };

  Dislike.findOne({
    where: {
      articleId: articleId,
      userId: userId
    }
  })
  .then(articleDisliked => {
    if (articleDisliked !== null) {
      Dislike.destroy({
        where: {
          articleId: articleId,
          userId: userId
        }
      })
        .then(() => {}, Article.decrement('dislikes', { where: { id: articleId }}) )
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the like."
          });
      });
    };
  })
  .catch(err => {
    console.log(err);
  })

  Like.findOne({
    where: {
      articleId: articleId,
      userId: userId
    }
  })
  .then(articleLiked => {
    if (articleLiked === null) {      
      Like.create(postData)
        .then(data => {
          res.send(data);
        }, Article.increment('likes', { where: { id: articleId }}) )
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the like."
          });
      });
    } else {
      return res.status(401).send({ message: 'Article already liked' });
    };
  })
  .catch(err => {
    console.log(err);
  })
};

// Dislike an Article by the id in the request
exports.dislike = (req, res) => {
  const articleId = req.params.id;
  const userId = req.body.userDisliked;
  const postData = {
    userId: userId,
    articleId: articleId
  };

  Like.findOne({
    where: {
      articleId: articleId,
      userId: userId
    }
  })
  .then(articleLiked => {
    if (articleLiked !== null) {
      Like.destroy({
        where: {
          articleId: articleId,
          userId: userId
        }
      })
        .then(() => {}, Article.decrement('likes', { where: { id: articleId }}) )
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the like."
          });
      });
    };
  })
  .catch(err => {
    console.log(err);
  })

  Dislike.findOne({
    where: {
      articleId: articleId,
      userId: userId
    }
  })
  .then(articleDisliked => {
    if (articleDisliked === null) {
      Dislike.create(postData)
        .then(data => {
          res.send(data);
        }, Article.increment('dislikes', { where: { id: articleId }}) )
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the dislike."
          });
      });
    } else {
      return res.status(401).send({ message: 'Article already disliked' });
    };
  })
  .catch(err => {
    console.log(err);
  })
};

// Get liked articles
exports.getLiked = (req, res) => {
  Like.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving likes."
      });
  });
};

// Get disliked articles
exports.getDisliked = (req, res) => {
  Dislike.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving dislikes."
      });
  });
};

// Delete an Article with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Article.findOne({ where: { id: id }})
  .then(article => {
    if (article) {
      article.destroy();
      fs.unlink(`./images/${article.imageUrl.substring(29)}`, (err) => {
        if (err) {
          console.log(err);
        }
      })
      res.send({ message: 'Article was deleted successfully !' });
    } else {
      res.send({ message: 'Article not found' });
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).send({ message: "Could not delete Article with id=" + id });
  });
};