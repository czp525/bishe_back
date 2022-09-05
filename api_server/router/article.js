const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')
const {
  add_article_schema,
  delete_article_schema,
  get_article_schema,
  update_article_schema,
  // change_article_schema,
  search_article_schema,
  add_articlecomment_schema,
  get_articlecomment_schema,
} = require('../schema/article')
const article_handler = require('../router_hander/article')

router.get('/articles', article_handler.getArticles)
router.get('/deletearticle/:article_id', expressJoi(delete_article_schema), article_handler.deleteArticleById)
router.get('/article/:id', expressJoi(get_article_schema), article_handler.getArticleById)
router.get('/getpage', article_handler.getPage)
router.get('/changearticle/:article_id', article_handler.changeArticle)
router.get('/randarticle', article_handler.randArticle)
router.get('/articlelist', article_handler.articlelist)
router.post('/getarticlecomment', expressJoi(get_articlecomment_schema), article_handler.getArticleComment)
router.post('/addarticlecomment', expressJoi(add_articlecomment_schema), article_handler.addarticlecomment)
router.post('/addarticle', expressJoi(add_article_schema), article_handler.addArticles)
router.post('/updatearticle', article_handler.updateArticleById)
// router.post('/changearticle1', expressJoi(change_article_schema), article_handler.changeArticle1)
router.post('/search', expressJoi(search_article_schema), article_handler.searchArticle)

module.exports = router