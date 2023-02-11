import axios from "axios";
import store from '~/store'
import JSONbig from 'json-bigint'
const request= axios.create({
    baseURL:'http://toutiao.itheima.net',
    transformResponse:[function(data){
      try {
        return JSONbig.parse(data)
      } catch (err) {
        // console.log('转换失败',err);
        return data;
      }
    }]
})
// 添加请求拦截器
request.interceptors.request.use(function (config) {
    const {user}=store.state
    // 如果用户已登录，统一给接口设置token信息
    if(user){
        config.headers. Authorization=`Bearer ${user.token}`
        
    }
    // 处理完之后一定要把config返回，否则请求就会停在这里
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
//导出
export default request