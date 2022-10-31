module.exports = (sequelize, Sequelize) => {
    const Dislikes = sequelize.define("dislike", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
      articleId: {
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      }
    });
    
    return Dislikes;
};