import { createApp } from 'vue'
import '~/styles/style.less'
import App from '~/App.vue'

import 'amfe-flexible'
import router from "./router"
import store from './store'
import '~/assets/fonts/iconfont.css'
import dayjs from 'dayjs'

const app=createApp(App);
app.use(store).use(router).mount('#app')
app.config.globalProperties.$filters={
    format(value){
        if (value) {
            return dayjs(value).format('YYYY-MM-DD')
        } else {
            return ''
        }

    }
}
