import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,//登陆状态
		loginProvider: "",//登陆方式 如 微信
		openid: null //应用id
	},
	getters:{
		login(state){
			return  state.hasLogin;
        }
	},
	mutations: {
		login(state, provider) {
			state.hasLogin = true;
			state.loginProvider = provider;
		},
		logout(state) {
			state.hasLogin = false
			state.openid = null
		},
		setOpenid(state, openid) {
			state.openid = openid
		}
	},
	actions: {
// 		// lazy loading openid
// 		getUserOpenId: async function ({
// 			commit,
// 			state
// 		}) {
// 			return await new Promise((resolve, reject) => {
// 				if (state.openid) {
// 					resolve(state.openid)
// 				} else {
// 					uni.login({
// 						success: (data) => {
// 							commit('login')
// 							setTimeout(function () { //模拟异步请求服务器获取 openid
// 								const openid = '123456789'
// 								console.log('uni.request mock openid[' + openid + ']');
// 								commit('setOpenid', openid)
// 								resolve(openid)
// 							}, 1000)
// 						},
// 						fail: (err) => {
// 							console.log('uni.login 接口调用失败，将无法正常使用开放接口等服务', err)
// 							reject(err)
// 						}
// 					})
// 				}
// 			})
// 		},
		isLogin:async function(context){
			return await new Promise((resolve, reject) => {
		var hasLogin=context.state.hasLogin;
		console.log(context)
		if(!hasLogin){
			uni.showModal({
				title:"您还未登陆,立即登陆?",
				content:"请登陆后进行访问",
				success(e){
					if(e.confirm){
						//登陆
						uni.navigateTo({
							url:'../login/login'
						})	
					}else{
						context.commit('login',"退出")
						console.log(context.state)
						console.log("放弃登陆")
					}
				}
			})
			resolve(false)
		}else{
			resolve(true)
		}})
	
	}}
})

export default store
