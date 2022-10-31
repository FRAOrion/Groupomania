module.exports = (sequelize, Sequelize) => {
    const Likes = sequelize.define("like", {
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
    
    return Likes;
};