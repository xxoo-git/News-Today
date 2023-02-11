import request from '~/utils/request'
// 获取文章新闻推荐
export const getArticles= params =>{
    return request({
        method:'GET',
        url:'/v1_0/articles',
        params
    })
}
// 获取新闻详情
export const getArticleById= article_id =>{
    return request({
        method:'GET',
        url:`/v1_0/articles/${article_id}`,       
    })
}
// 收藏文章
export const addCollect= articleId =>{
    return request({
        method:'POST',
        url:`/v1_0/article/collections`, 
        data:{
            target: articleId
        }      
    })
}
// 取消收藏文章
export const deleteCollect= articleId =>{
    return request({
        method:'DELETE',
        url:`/v1_0/article/collections/${articleId}`,       
    })
}
// 对文章点赞
export const addLike= articleId =>{
    return request({
        method:'POST',
        url:`/v1_0/article/likings`, 
        data:{
            target: articleId
        }      
    })
}
// 取消对文章点赞
export const deleteLike= articleId =>{
    return request({
        method:'DELETE',
        url:`/v1_0/article/likings/${articleId}`,       
    })
}