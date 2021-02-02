const News = (sequelize, S) => {
    const news = sequelize.define(
      "news",
      {
        idArticle: {
          type: S.STRING,
          allowNull: false,
          unique: true,
        },
        providerName: {
          type: S.STRING,
          allowNull: false,
        },
        providerScope: {
          type: S.STRING,
          allowNull: false,
        },
        category: {
          type: S.STRING,
          allowNull: false,
        },
        title: {
          type: S.STRING,
          allowNull: false,
          },
        description: {
          type: S.TEXT,
          allowNull: false, 
          },
        sourceUrl: {
          type: S.STRING,
          allowNull: false,
          },
        imageUrl: {
          type: S.STRING,
          allowNull: false,
          },
        publishedAt: {
          type: S.STRING,
          allowNull: false,
            },
      },
      {
        timestamps: false,
      }
    );
  
    return news;
  };
  
  module.exports = News;
