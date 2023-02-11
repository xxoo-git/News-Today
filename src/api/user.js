
import request from '~/utils/request'
// import store from '~/store'
// 登录注册验证
export const login = data => {
    return request({
        method: 'POST',
        url: '/v1_0/authorizations',
        data
    })
}
// 发送短信验证码
// 每手机号每分钟1次
export const sendSms = mobile => {
    return request({
        method: 'GET',
        url: `/v1_0/sms/codes/${mobile}`,

    })
}
// 获取用户自己信息
export const getUserInfo = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user'
        // headers:{
        //     // 注意：该接口需要授权才能访问
        //     Authorization:`Bearer ${store.state.user.token}`
        // }
    })
}
// 获取用户的频道
export const getUserChannels = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user/channels'
    })
}
// 关注用户
export const addFollow = target => {
    return request({
        method: 'POST',
        url: '/v1_0/user/followings',
        data: {
            target
        }
    })
}
// 取消关注用户
export const deleteFollow = target => {
    return request({
        method: 'DELETE',
        url: `/v1_0/user/followings/${target}`//userId目标用户（被取消关注的用户id）
    })
}

//获取用户个人资料
export const getUserProfile = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user/profile'
    })
}

//编辑用户个人资料
export const postUserProfile = (birthday, name, gender) => {
    return request({
        method: 'PATCH',
        url: '/v1_0/user/profile',
        data: {
            birthday,
            name,
            gender
        }
    })
}
// 获取用户关注列表
export const getUserAttentionList = (page, per_page) => {
    return request({
        method: 'GET',
        url: '/v1_0/user/followings',
        data: {
            page,
            per_page
        }
    })
}

//获取粉丝列表
export const getUserFansList = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user/followers',
    })
}
//获取用户收藏列表
export const getUserCollectList = (params) => {
    return request({
        method: 'GET',
        url: '/v1_0/article/collections',
        params
    })
}

//获取用户阅读历史列表
export const getUserHistoryList = (params) => {
    return request({
        method: 'GET',
        url: '/v1_0/user/histories',
        params
    })
}

//修改用户头像
export const patchUserPhoto= (params) => {
    return request({
        method: 'PATCH',
        url: '/v1_0/user/photo',
        params
    })
}
