//引入安装好的axios插件
import axios from "axios";
const get = (url, params) => {
    return axios.get(url, { params });
};

const post = (url, data) => {
    return axios.post(url, data);
};
const patch = (url, data) => {
    return axios.patch(url, data);
};

//将二次封装好的axios导出
export { get, post ,patch}