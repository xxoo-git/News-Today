import { createStore } from 'vuex'
import { getItem, setItem } from '~/utils/storage.js'
import { getUserInfo, getUserChannels, getUserProfile, getUserAttentionList, getUserFansList, getUserCollectList,getUserHistoryList } from '~/api/user.js'
import { getAllChannels } from '~/api/channel.js'

const TOKEN_KEY = 'NEWS_USER'
export default createStore({
  state: {
    user: getItem(TOKEN_KEY),
    // user:JSON.parse(window.localStorage.getItem(TOKEN_KEY))
    // 用户信息
    userInfo: {},
    // 用户频道列表
    channels: [],
    // 所有频道列表
    allChannels: [],
    // 文章详情
    article: {},
    //用户个人资料
    userProfile: {},
    //用户关注列表
    userAtt: [],
    //用户粉丝列表
    userFans: [],
    //用户收藏列表,
    userCollect: [],
    //用户阅读历史列表，
    userHistory:[]
  },
  mutations: {
    setUser(state, data) {
      state.user = data
      // 为了防止刷新丢失，我们需要把数据备份到本地存储
      // window.localStorage.setItem(TOKEN_KEY,JSON.stringify(state.user))
      setItem(TOKEN_KEY, state.user)
    },
    // 设置用户信息
    setUserInfo(state, users) {
      state.userInfo = users
    },
    // 设置频道列表
    setChannels(state, channelsList) {
      state.channels = channelsList
    },
    // 设置所有频道列表
    setAllChannels(state, allChannelsList) {
      state.allChannels = allChannelsList
    },
    // 设置文章详情
    setArticle(state, articleList) {
      state.article = articleList
    },
    //设置用户个人资料
    setUserProfile(state, userProfiles) {
      state.userProfile = userProfiles
    },
    //用户关注列表
    setUserAttention(state, userAttList) {
      state.userAtt = userAttList
    },
    //用户粉丝列表
    setUserFans(state, userFansList) {
      state.userFans = userFansList
    },
    //用户收藏列表
    setUserCollect(state, userCollectList) {
      state.userCollect = userCollectList
    },
    //用户阅读历史列表
    setUserHistory(state, userHistoryList) {
      state.userHistory = userHistoryList
    }
  },
  actions: {
    getInfo({ commit }) {
      return new Promise((resolve, reject) => {
        // 获取当前用户的信息
        getUserInfo().then((res) => {
          // 获取成功后，将数据存储在vuex 的setUserInfo对象中
          commit("setUserInfo", res.data.data)
          // console.log("用户信息",res.data.data);      
          resolve(res)
        }).catch((err) => {
          // 失败回调
          reject(err)
        });
      })
    },
    getChannels({ commit }) {
      return new Promise((resolve, reject) => {
        // 获取当前频道列表信息
        getUserChannels().then((res) => {
          // 获取成功后，将数据存储在vuex 的setUserInfo对象中
          commit("setChannels", res.data.data.channels)
          console.log("频道列表信息", res.data.data.channels);
          resolve(res)
        }).catch((err) => {
          // 失败回调
          reject(err)
        });
      })
    },
    getAllChnels({ commit }) {
      return new Promise((resolve, reject) => {
        // 获取所有频道列表
        getAllChannels().then((res) => {
          // 获取成功后，将数据存储在vuex 的setUserInfo对象中
          commit("setAllChannels", res.data.data.channels)
          console.log("所有频道列表信息", res.data.data.channels);
          resolve(res)
        }).catch((err) => {
          // 失败回调
          reject(err)
        });
      })
    },
    //用户个人资料
    getUserPro({ commit }) {
      return new Promise((resolve, reject) => {
        getUserProfile().then((res) => {
          commit('setUserProfile', res.data.data)
          console.log(res.data.data);
          resolve(res)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    //用户关注列表
    getUserAtt({ commit }) {
      return new Promise((resolve, reject) => {
        getUserAttentionList(1, 10).then((res) => {
          commit('setUserAttention', res.data.data.results)
          console.log(res.data.data.results);
          resolve(res)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    //用户粉丝列表
    getUserFans({ commit }) {
      return new Promise((resolve, reject) => {
        getUserFansList().then((res) => {
          commit('setUserFans', res.data.data.results)
          console.log(res.data.data.results);
          resolve(res)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    //用户收藏列表
    getUserCollect({ commit }) {
      return new Promise((resolve, reject) => {
        getUserCollectList({page:1,per_page:100}).then((res) => {
          commit('setUserCollect', res.data.data.results);
          console.log(res.data.data.results);
          resolve(res)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    //用户阅读历史列表
    getUserHistory({ commit }) {
      return new Promise((resolve, reject) => {
        getUserHistoryList({page:1,per_page:100}).then((res) => {
          commit('setUserHistory', res.data.data.results);
          console.log(res.data.data.results);
          resolve(res)
        }).catch((err) => {
          reject(err)
        })
      })
    },
  },
  modules: {
  }
})
