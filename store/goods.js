// import Vue from 'vue'
// import Vuex from 'vuex'
// 
// Vue.use(Vuex)
// // var CartMethod(arrCart,goods,method='+'){
// 	// 购物车加减方法，have=存在或不存在
// // 	var have=false
// // 	goods.number= goods.number || 1;
// // 	for(var i=0;i<arrCart.length;i++){
// // 		if(Cart[id]===arrCart[i][id]){
// // 			(arrCart[i].number)((method)(method));
// // 			have=true;
// // 		}
// // 	}
// // 	return {Cart:arrCart,have:have};
// // }
	export default{
	state: {

// 		shop_id:1,
// 		shop_name:"东方烧烤",
		shop:{id:1,shop_name:"东方烧烤"},
		cartTotal:0,//购物车有效商品 总价
		cartCount:0,//购物车有效商品 统计总数
		cartItemCount:0,//购物车有效商品 种目数
		cart:{1:{//购物车
				"id":"1",
				"title":"点心",
				"shop_id":"1",
				"image":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544799000&di=1610b5317bb15dbb6a36e4d57cf4eb3f&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fc995d143ad4bd1138854651451afa40f4bfb057f.jpg",
				"stock":"23",//库存
				"price":"88",//价格
				"total":88,//总价
				"selected":true,//选中状态
				"number":1,//购买数量
				"versionIndex":1,
				"versionName":"加糖",//版本选项名
			},
		},order:[{//订单
						id: 1,
						title: '新鲜芹菜 半斤',
						image: 'https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product3.jpg',
						num: 4,
						price: 0.01
					},
					{
						id: 2,
						title: '素米 500g',
						image: 'https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product3.jpg',
						num: 1,
						price: 0.03
					}
				],
		orderTotal:0,
	},
	getters:{
		cart(state){
			return state.cart;
		},cartCount(state){
			return state.cartCount
		},cartTotal(state){
			return state.cartTotal
		},cartTtemCount(state){
			return state.cartItemCount
		},order(state){
			return state.order
		},orderTotal(state){
			return state.orderTotal;
		}
	},
	mutations: {
		init(state,shop){
// 			state.shop_id=shop.id || 1;//商户id
// 			state.shop_name=shop.name || "未知";//商户名
			state.cartTotal=0;//总价
			state.cartCount=0;//商品统计总数
			state.cartItemCount=0;//商品项 种目数
			state.cart={};//购物车
		},
		cartCount(state){
			// 统计购物车
			var cart=state.cart;
			var total=0;//订单总价
			var count=0;//订单总数
			var itemCount=0;//订单总商品
			for(var i in cart){
				if(cart[i].selected) {                     // 判断选中才会计算价格
				if(!cart[i].number){
					cart[i].number=0;
				}
				count+=cart[i].number;
				itemCount++;
				total+=(cart[i].number*cart[i].price);
				}
				
			}
			state.cartCount=count;
			state.cartTotal=total.toFixed(2);
			state.cartItemCount=itemCount;
		},
		cart(state,Cart){
			state.cart=Cart;
			this.commit('cartCount')
		},
		order(state,order){
			state.order=order;
		},addCart(state,Obj){
			// 向购物车添加或删除商品
			var goods=Obj.goods;
			var method=Obj.methods;
			var id= Obj.id || 'id';
			var Cart=state.cart;	
			var total=0;//订单总价
			goods.number= goods.number || 0;
			
			if(typeof Cart!='object'){
				Cart={}
			}

			
			if(Cart[goods[id]]){
				if(method=='+'){
					if(Cart[goods[id]].number>=Cart[goods[id]].stock){
						uni.showToast({
							title: '库存不足',
							icon:"none",
							duration: 2000
						});
						return console.log("操作无效"+goods.number+method)
					}

					Cart[goods[id]].number++
					Cart[goods[id]].total=Cart[goods[id]].price*Cart[goods[id]].number;//总价
				}else if(Cart[goods[id]].number>0){
					Cart[goods[id]].number--
						Cart[goods[id]].total=Cart[goods[id]].price*Cart[goods[id]].number;//总价
				}else{
					uni.showToast({
						title: '不能再减了',
						icon:"none",
						duration: 2000
					});
					return console.log("操作无效"+goods.number+method)
				}
				
			}else{
				goods.number=1;
				goods.total=goods.price;
				Cart[goods[id]]=goods
			}
			
			// console.log(state)
			state.cart=Cart;
			this.commit('cartCount')
		}
	},
	actions: {},
	}