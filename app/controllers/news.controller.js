const api = require("../config/api.config");
const axios =require("axios");
const { Op } = require("sequelize");
const db = require("../models");
const News = db.news;
const regExDate = /^(19|20|21)\d{2}\-(0\d{1}|1[0-2])\-([0-2]\d{1}|3[0-1])/;

//Construccion Url Consulta API
let urlApi = api.url+api.key+"&search=";
    api.words.forEach((word,i) => {
      if(i==0){
        urlApi =urlApi + word
      } else{
        urlApi = urlApi +" "+word
      }
   })

//Url Providers
let urlApiProviders = api.urlProviders+api.key


//Trae las noticias por una fecha dada


exports.newsListbyDate = (req, res) => {

const {dateNews}=req.body
const {userIdToken} =req;

//Chequea que el user exista
if(userIdToken){

//Chequea la fecha tenga el formato y la cantidad de caracteres apropiado
if(!dateNews || dateNews.length !==10 || !dateNews.match(regExDate)) res.status(500).send("Esta fecha no es valida. Debe contener 10 carácteres y con formato YYYY-MM-DD")

//Consulta a la base de datos local
News.findAll({
      where:{
        publishedAt: {
        [Op.substring]: dateNews,
  }}
}).then(async (news) =>{
if(news.length !== 0){
 
  res.send(news)

}else{

//Construccion Url Consulta API
let urlApi = api.url+api.key+"&search=";
    api.words.forEach((word,i) => {
      if(i==0){
        urlApi =urlApi + word
      } else{
        urlApi = urlApi +" "+word
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

//Construccion URL
urlApi = urlApi+"&startDate="+dateNews+"&endDate="+dateNews

//Consulta a la Api
const newsApiDate= await axios.get(urlApi);
 if(newsApiDate.data.articles) {
 newsApiDate.data.articles.forEach((article) => {

//Inserta las noticias
    News.create({
    idArticle: article._id,
    providerName: article.provider.name ,
    providerScope:article.provider.scope,
    category:article.category,
    title: article.title,
    description: article.description ,
    sourceUrl: article.sourceUrl,
    imageUrl: article.imageUrl,
    publishedAt: article.publishedAt,
  }) 
})
if(newsApiDate.data.articles.length !== 0) { 

  res.send(newsApiDate.data.articles)

}else{

  res.json({mensaje: "No hay noticias para la fecha "+ dateNews})

}
}
}
}).catch((err) =>{
  
    res.send(err)
})
}else{
  res.json({mensaje: "Esta acción no esta permitida. "})
}
}


//Buscar Noticias


exports.newsSearch=  (req, res) => {
const {userIdToken} =req;

// Buscar por provider, título, descripcion, fecha
const {title, description, provider, dateNews } =req.body
let {orderBy, pagination} =req.body

//Seteo valores por defecto si vienen vacios
if(!orderBy) orderBy = "DESC"
if(!pagination) pagination = 5
if(userIdToken){

//Noticias según título y descripcion
if(title || description){
  orderBy.toUpperCase()
   News.findAll({
    where:{
      [Op.or]:{ title: {
      [Op.substring]: title,
      [Op.substring]: description,
    }}},
    order: [ ['publishedAt', orderBy]],
    offset: pagination
}).then(async news => {

  if(news.length !== 0){
 //Si hay noticias devuelvo las noticias ordenadas y paginadas
    res.send(news)
  
  }else{
  

   //Armo url api para buscar dentro de las noticias el título y descripcion enviado
   if(!title) urlApi = urlApi+' "'+description+'"'+"&categories="
   if(!description) urlApi = urlApi+' "'+title+'"'+"&categories="
   if(description && title) urlApi = urlApi+' "'+title+'"'+' "'+description+'"'+"&categories="  
   
   console.log(urlApi, "con titulo")

   api.categories.forEach((category, i)=>{
    if(i==0){
      urlApi =urlApi + category
    } else{
      urlApi =urlApi +","+category
    }
  })
  

//Consulta a la Api
await axios.get(urlApi).then( newsApi =>{
  
  if(newsApi.data.articles.length !== 0) { 
  
    res.send(newsApi.data.articles)
  
  }else{
  
    res.json({mensaje: "No hay noticias para el título "+ title+ " y/o la descripción" + title})
  
  }
});
  }
}).catch(err => {

  console.log(err);

})
}


// Buscar noticias por fecha 



if(dateNews.length ==10 && dateNews.match(regExDate)) {
 
//Consulta a la base de datos local
News.findAll({
      where:{
        publishedAt: {
        [Op.substring]: dateNews,
        }},
    order: [ ['publishedAt', orderBy] ],
    offset: pagination,

  }).then((news) =>{
   
  if(news.length !== 0){
  
  res.send(news)

}else{

//Consulta a la Api por noticias para la fecha dada

//Construccion URL
urlApi = urlApi+"&categories="
   api.categories.forEach((category, i)=>{
    if(i==0){
      urlApi =urlApi + category
    } else{
      urlApi =urlApi +","+category
    }
  })

urlApi = urlApi+"&startDate="+dateNews+"&endDate="+dateNews

//Consulta API
axios.get(urlApi).then(newsApiDate =>{
 
if(newsApiDate.data.articles.length !== 0) { 

  res.send(newsApiDate.data.articles)

}else{

  res.json({mensaje: "No hay noticias para la fecha "+ dateNews})

}
})
}
}).catch((err) =>{
  
  res.send(err)
})

}


//Buscar por provider 

//urlProvider
if(provider){
let providers =api.url+api.key+"&providers=";
let arrayProvidersFront = provider.split(",");
 axios.get(urlApiProviders).then((apiProviders) =>{
  
  apiProviders.data.providers.forEach((apiProvider) =>{
  arrayProvidersFront.forEach((arrayProviderF,i) =>{
if(apiProvider._id ==  arrayProviderF){

  if(i==0){ 
  providers = providers + apiProvider.name 
  }else{
  providers = providers +","+ apiProvider.name 
  }
}
})
})
}).catch( err =>{
  res.send(err)
})

 axios.get(providers).then(newsByProviders =>{


if(newsByProviders.data.articles.length!==0){

  res.send(newsByProviders.data.articles)
}else{

res.json({mensaje: "No hay noticias para los medios indicados."}) 

}

}).catch(err =>{
  res.send(err)
})
}

} else{

  res.json({mensaje: "Esta acción no esta permitida. "})
}
}
