import request from '~/utils/request'
//获取联想建议（自动补全）
export const getSearchSuggestion= (q) =>{
    return request({
        method:'GET',
        url:'/v1_0/suggestion',
        params:{
            // 请求的前缀词句,联系建议的关键词
            q
        }
    })
}
//获取搜索结果
export const getSearchResult= (params) =>{
    return request({
        method:'GET',
        url:'/v1_0/search',
        params
    })
}