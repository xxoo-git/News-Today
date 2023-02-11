import request from '~/utils/request'
//获取所有频道列表
export const getAllChannels= () =>{
    return request({
        method:'GET',
        url:'/v1_0/channels',
        
    })
}
//设置用户的频道（部分覆盖）
export const addUserChannel= (data) =>{
    return request({
        method:'PATCH',
        url:'/v1_0/user/channels',
        data
    })
}
//删除指定用户频道
export const deleteUserChannel= (channelId) =>{
    return request({
        method:'DELETE',
        url:`/v1_0/user/channels/${channelId}`,
        
    })
}
