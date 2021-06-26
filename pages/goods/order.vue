<template>
	<view class="page-body tui"  >
		<scroll-view class=""  :style="{height:contentHeight + 'px'}" style="padding:0 15upx;box-sizing:border-box;" scroll-y  >
				<view class="uni-card">
					<view v-for="(item,key) in orders" :key="key" class="orders-list column">

						<view class="tui-item tui-flex">
							<view style="flex: 1;">
								<text class="orders-title">{{item.title}}</text>
								<text class="orders-version" v-if="item.versionName">{{item.versionName}}</text>
							</view>
							<!-- <image class="orders-thumb" :src="item.image"></image> -->
							<view class="orders-right" style="flex-direction: row;width: 150upx;">
								<view>￥{{item.price}}</view>
								<view style="width: 100upx;">x{{item.number}}</view>
							</view>
						</view>
						<view v-if="item.note" class="tui-item" style="width: 100%;font-size:0.6em;opacity:0.5;height: 1em;line-height: 1em;">
							备注:{{item.note}}
						</view>
					</view>
					<view class="orders-list">
						<view class="">订单备注</view>
						<input class="tui-border" placeholder="给商家留言,可填写注意事项,特殊要求等" :focus="focus" />
					</view>
				</view>
				<view class="tui-flex tui-center" style="">
					<view class="" style="padding: 0 30upx;"  >
						<text class="tui-item tui-center" style="color: #1482D1;" @tap="switchTab(0)" v-if="!addrShow">外卖送餐</text>
						<text class="tui-item tui-center tui-bt-a"  style="color: #1482D1;" @tap="switchTab(1)" v-else >店内就餐</text>
					</view>
					<view class="" v-if="addrShow" style="color: #1482D1;" @tap="refreshAddress()">刷新地址</view>

				</view>
				<view class="uni-card">
					<view v-if="addrShow" class="">
						<button  @tap="goPage('address')" v-if="address.name" class="tui-flex tui-padding tui-relative tui-column" style="padding:20upx 30upx">
							<view class="tui-flex tui-item" style="text-align: left;">
								<text class="tui-item">收货人: {{address.name}}</text>
								<text class="tui-item">电话: {{address.phone}}</text>
							</view>

							<view class="tui-item" style="text-align: left;">
							{{address.address}}
							</view>
							<view class="tui-absolute tui-flex " style=" font-size:1.3em ; align-items: center;justify-content: flex-end; right: 20upx;top:0;bottom:0;height: 95%;">
								<icon class="iconfont icon-jinrujiantouxiao1" style="color:#999;"></icon>
							</view>
							
						</button>
						
						<view v-else class="tui-center">
							<button  @tap="goPage('address')"  class="flex padding relative column" style="padding:20upx 30upx">
								
							<view class="tui-item">
								添加您的地址
							</view>
							<view class="tui-absolute tui-flex " style=" font-size:1em ; align-items: center;justify-content: flex-end; right: 20upx;top:0;bottom:0;height: 95%;">
								 <icon class="iconfont icon-jinrujiantouxiao1" style="color:#999;"></icon>
							</view>
							</button>

						</view>

					</view>
					<view v-else class="orders-list">
						<view class="uni-flex ">
							<view class="">人数</view>
							<input  class="tui-border" v-model="number" :focus="focus" />
							<view class="">人</view>
						</view>
						<view class="uni-flex ">
							<view class="">桌号</view>
							<input  class="tui-border" v-model="tableNumbers" :focus="focus" /><view class="">号</view>
						</view>
					</view>
				</view>

		</scroll-view>
		<nav class="tui-bottom-nav tui-flex " style="background: #F9F9F9;z-index: 99;text-align: left;padding-left: 30upx;">
			<view class="tui-item tui-flex " style="font-size: 1.2em;" >支付金额：<text style="color:red">￥{{total}}</text></view>
			<button type="warn" @tap="toPay" size="mini"  style="line-height:100upx;padding: 0 15upx;">去付款</button>
		</nav>
	</view>
</template>

<script>
	import Storage from "../../common/utils/Storage.js";
	// import ajax from "../../request/ajax.js";
	import uniIcon from "../../components/template/icon/icon.vue";
	export default {
		 components: {uniIcon},
		data() {
			return {
				winHeight:0,
				contentHeight:0,
				tableNumbers:'',//桌号
				number:'',//人数
				addrShow:false,
				// address: {},
				hasAddress: false,
				total: 0,
				orders: [{
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
				]

			};
		},computed:{
			address(){
				return this.$store.getters.address;
			}
		},onLoad(e) {
			console.log("onload")
			console.log(e)
			let winHeight = uni.getSystemInfoSync().windowHeight;
			//创建节点选择器 获取底部导航高度 
				this.contentHeight=(winHeight-uni.upx2px(140));
				this.winHeight = winHeight;
			var orderData =Storage.get('order') //读取购物车缓存数据

// 			// 请求服务器
// 			var self = this;
// 			ajax.get('orders',(res)=>{
// 				
// 				var orders=res.data.data ||{};
// 				self.orders=orders;
// 				// console.log(res.data.data)
// 			})
			this.orders = orderData; //读数据
			// console.log(this.total)
			// console.log(self.orders)
		},
		methods: {
			switchTab(e){
				if(e==0){
					this.addrShow=true;
					this.refreshAddress()
				}else if(e==1){
					this.addrShow=false;
				}
				
			},refreshAddress(){
				var self=this;
				var address=Storage.get('address');
				// console.log(address)
				if(address && typeof address==='object'){
					for(let i=0;i<address.length;i++){
						if(address[i].selected){
							this.$store.commit('address',address[i]);
							// console.log(this.address)
						}
					}
				}else{
					uni.showModal({
							title:"添加默认地址？",
							content:"请先添加默认地址,然后刷新地址",
							success: function (res) {
									if (res.confirm) {
										self.goPage()
										console.log('用户点击确定');
									} else if (res.cancel) {
										console.log('用户点击取消');
									}
								}
					})
				}
			},

			ceshi() {
				// uni-app暂时不支持worker
				// 				worker.onMessage(function (res) {
				// 				  console.log(res)
				// 				})
				// 				worker.postMessage({
				// 				  msg: 'hello worker'
				// 				})
				// 				worker.terminate()
			},
			goPage(){
				uni.navigateTo({
					url:"../user/address"
				}) 
				
			},
			/**
			 * 计算总价
			 */
			getTotalPrice() {
				let orders = this.orders;
				let total = 0;
				for (let i in orders) {
					total += orders[i].number * orders[i].price;
				}
				this.total = total;
			},
			toPay() {
				uni.showModal({
					title: '提示',
					content: '本系统只做演示，支付系统已屏蔽',
					text: 'center',
					complete() {
						uni.switchTab({
							url: '/page/pay/payment'
						})
					}
				})
			}
		},
		mounted: function() {
			this.getTotalPrice();
			// el渲染完成触发
// 			this.$nextTick(function() {
// 				// const self = this;
// 				// this.refreshAddress()
// 
// 			})
		}
	}
</script>

<style>
	page{
		/* overflow-y:scroll; */
	}

	.orders-list view {

		padding: 0 20upx;
	}

	.orders-list input {
		padding-top:4upx ;
		flex: 1;
		/* border: 1upx solid #7f7f7f; */

	}

	.orders-address {
		position: relative;
		padding: 20upx 50upx 20upx 35upx;
		font-size: 14px;
		line-height: 25px;
		border-bottom: 20upx solid #ededed;
		color: #adadad;
	}

	.orders-address::after {
		position: absolute;
		right: 30upx;
		top: 60upx;
		content: '';
		width: 8px;
		height: 8px;
		border-top: 4upx solid #7f7f7f;
		border-right: 4upx solid #7f7f7f;
		-webkit-transform: rotate(45deg);
		transform: rotate(45deg);
	}

	.orders-address-name {
		display: inline-block;
		width: 300upx;
	}

	.orders-no-address {
		position: relative;
		height: 90upx;
		line-height: 90upx;
		color: #adadad;
		border-bottom: 20upx solid #ededed;
		text-align: center;
	}

	.orders-no-address::after {
		position: absolute;
		right: 30upx;
		top: 34upx;
		content: '';
		width: 16upx;
		height: 16upx;
		border-top: 4upx solid #7f7f7f;
		border-right: 4upx solid #7f7f7f;
		-webkit-transform: rotate(45deg);
		transform: rotate(45deg);
	}


	.orders-box {
		padding-bottom: 105upx;
	}

	.orders-list {
		display: flex;
		padding: 15upx;
		border-bottom: 1upx solid #ededed;
	}

	.orders-thumb {
		padding: 0 20upx;
		width: 100upx;
		height: 100upx;
	}

	.orders-right {
		text-align: right;
		box-sizing: border-box;
		display: flex;
		justify-content: flex-end;
		/* flex-direction: column; */
		/* flex: 1; */
		/* position:relative; */
	}

	.orders-title {
		padding-right: 10upx;
		color: #333;
		/* font-weight:bold; */
	}

	.orders-version {

		background: hsla(30, 100%, 0%, 0.1);
		padding: 2upx 5upx;
		font-size: 0.8em;
		border-radius: 10upx;
	}

	.orders-tip {
		text-align: right;
		right: 15upx;
		position: absolute;
	}
	.orders-right view {
		align-self: flex-end;
		text-align: right;
	}

	.orders-list view {
		line-height: 60upx;
	}

	.orders-footer {
		bottom: 0;
		height: 95upx;
		line-height: 95upx;
		border-top: 1upx solid #ededed;
	}

	.orders-footer .orders-footer-total {
		align-self: center;
		text-align: left;
		flex: 1;
		padding-left: 30upx;
		box-sizing: border-box;
		color: red;
	}

	.orders-footer .orders-footer-btn {
		width: 240upx;
		text-align: center;
		color: #fff;
		background: #AB956D;
	}
</style>
