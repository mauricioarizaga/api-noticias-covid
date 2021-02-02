const api = require("../config/api.config");
const axios =require("axios");
const { Op } = require("sequelize");
const db = require("../models");
const News = db.news;

//Construccion Url Consulta API
let urlApi = api.url+api.key+"&search=";
    api.words.forEach((word,i) => {
      if(i==0){
        urlApi =urlApi + word
      } else{
        urlApi = urlApi +"+"+word
      }
   })
   urlApi = urlApi+"&categories="
   api.categories.forEach((category, i)=>{
    if(i==0){
      urlApi =urlApi + category
    } else{
      urlApi =urlApi +","+category
    }
  })

exports.getNewsList = async (req, res) => {

await axios.get(urlApi).then(news => {
news.data.articles && news.data.articles.forEach(async (article)=>{
 let articleNewsLocal = await News.findOne({
    where:{
      idArticle: article._id
    }
  })
   !articleNewsLocal && News.create({
    idArticle: article._id,
    providerName: article.provider.name ,
    providerScope:article.provider.scope,
    category:article.category,
    title: article.title,
    description: article.description ,
    sourceUrl: article.sourceUrl,
    imageUrl: article.imageUrl,
    publishedAt: article.publishedAt,
  }).then(response=>{
    console.log(response.data)
  }).catch(err =>{
    console.log(err)
  })
})

});
};

exports.cleanFiveDaysDB = async (req, res) => {
  const date = new Date(new Date() - 120 * 60 * 60 * 1000)
  const formatted_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()

  
News.delete({    
    where:{
      publishedAt: {
        [Op.substring]: formatted_date, 
      force: true
    }
  }
    }).then(response=>{
      console.log(response.data)
    }).catch(err =>{
      console.log(err)
    })


  };