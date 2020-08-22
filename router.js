import Vue from 'vue'

import User from './components/user/user.vue'
import Login from "./components/user/login.vue";
import Register from "./components/user/register.vue";

import Home from './components/home/Home.vue'
import List from './components/home/list.vue'
import Personal from './components/home/Personal.vue'

import Newtopic from './components/home/newtopic.vue'
import TopicDetail from './components/home/topicdetail.vue'

import Userset from './components/home/set/set.vue'
import Profile from './components/home/set/profile.vue'
import Admin from './components/home/set/Admin.vue'


Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        { path: '/', redirect: '/home' },
        {
            path: '/home',
            component: Home,
            //Home子组件
            children: [{
                    path: 'list',
                    component: List
                },
                {
                    path: 'newtopic',
                    component: Newtopic
                },
                {
                    name: 'Personal',
                    path: 'personal',
                    component: Personal
                },
                {
                    name: 'TopicDetail',
                    path: 'topicDetail',
                    component: TopicDetail
                },
                {
                    path: 'userset',
                    component: Userset,
                    //Userset子组件
                    children: [{
                            path: 'profile',
                            component: Profile,
                        }, {
                            path: 'admin',
                            component: Admin,
                        },
                        {
                            path: '',
                            component: Profile
                        }
                    ]
                },
                {
                    path: '',
                    component: List
                }
            ]
        },
        {
            path: '/user',
            component: User,
            children: [{
                    path: 'login',
                    component: Login
                },
                {
                    // 当 /user/:id/posts 匹配成功
                    // UserPosts 会被渲染在 User 的 <router-view> 中
                    path: 'register',
                    component: Register
                },
                {
                    path: '',
                    component: Login
                }
            ]
        }
    ]
})