module.exports = (sequelize, Sequelize) => {
    const Article = sequelize.define("article", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.STRING
      },
      imageUrl: {
        type: Sequelize.STRING
      },
      likes: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      dislikes: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      }
    });
    
    return Article;
};