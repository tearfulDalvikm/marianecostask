<template>
	<view class="main tui">
		<view class="uni-card" style="margin-bottom: 120rpx;">
				<view class="uni-card">
					<view v-for="(item,key) in orders" :key="key" class="orders-list">
						<view style="flex: 1;">
							<text class="orders-title">{{item.title}}</text>
							<text class="orders-version" v-if="item.versionName">{{item.versionName}}</text>
						</view>
						<!-- <image class="orders-thumb" :src="item.image"></image> -->
						<view class="orders-right" style="flex-direction: row;width: 150rpx;">
							<view>￥{{item.price}}</view>
							<view style="width: 100rpx;">x{{item.number}}</view>
						</view>
					</view>
					<view class="orders-list">
						<view class="">备注</view>
						<input class="border" placeholder="给商家留言,可填写注意事项,特殊要求等" :focus="focus" />
					</view>
				</view>
				<view class="uni-card">
					<view v-if="addrShow" class="uni-card">
						<button  @tap="goPage('address')" v-if="address.name" class="uni-card flex padding relative column" style="padding:20rpx 30rpx">
							<view class="flex item" style="text-align: left;">
								<text class="item">收货人: {{address.name}}</text>
								<text class="item">电话: {{address.phone}}</text>
							</view>

							<view class="item" style="text-align: left;">
							{{address.detail}}
							</view>
							<view class="absolute flex " style=" font-size:1.3em ; align-items: center;justify-content: flex-end; right: 20rpx;top:0;bottom:0;height: 95%;">
								<icon class="iconfont icon-jinrujiantouxiao1" style="color:#999;"></icon>
							</view>
							
						</button>
						<view v-else class="center">
							<button  @tap="goPage('address')"  class="uni-card flex padding relative column" style="padding:20rpx 30rpx">
								
							<view class="item">
								添加您的地址
							</view>
							<view class="absolute flex " style=" font-size:1em ; align-items: center;justify-content: flex-end; right: 20rpx;top:0;bottom:0;height: 95%;">
								<icon class="iconfont icon-jinrujiantouxiao1" style="color:#999;"></icon>
							</view>
							</button>

						</view>
						<button class=" center" @tap="refreshAddress()">刷新地址<uni-icon type="refresh center" size="20"></uni-icon></button>
					</view>
					<view v-else class="orders-list">
						<view class="uni-flex ">
							<view class="">人数</view>
							<input  class="border" v-model="number" :focus="focus" />
							<view class="">人</view>
						</view>
						<view class="uni-flex ">
							<view class="">桌号</view>
							<input  class="border" v-model="tableNumbers" :focus="focus" /><view class="">号</view>
						</view>
					</view>
				</view>
					<button type="" class="flex center" @tap="addrShow=!addrShow">
						<text class="item center" type="arrowright" v-if="!addrShow">送餐</text>
						<text class="item center" type="arrowright" v-else >店内就餐</text>
							<uni-icon class="item center" style="" type="loop" size="20"></uni-icon>
					</button>
		</view>
		<nav class="bottom-nav flex " style="background: #F9F9F9;z-index: 99;text-align: left;padding-left: 30rpx;">
			<view class="item flex " style="font-size: 1.2em;" >支付金额：<text style="color:red">￥{{total}}</text></view>
			<button type="warn" @tap="toPay" >立即支付</button>
		</nav>
	</view>
</template>

<script>
	import Storage from "../../common/utils/Storage.js";
	import orderData from "../../request/data/order.js";
	import uniIcon from "../../components/template/icon/icon.vue";
	// const worker = wx.createWorker('workers/request/index.js') // 文件名指定 worker 的入口文件路径，绝对路径

	export default {
		 components: {uniIcon},
		data() {
			return {
				tableNumbers:'',//桌号
				number:'',//人数
				addrShow:false,
				address: {},
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
		},
		onLoad(e) {
			console.log("onload")
			console.log(e)
			var orderData =Storage.get('order') //读取购物车缓存数据

			// this.orders =orderData //读取订单数据

			this.orders = orderData; //读取模拟数据
			console.log(this.total)
			console.log(orderData)
		},
		methods: {
			
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
			},refreshAddress(){
				var address=Storage.get('address');
				// console.log(address)
				if(address && typeof address==='object'){
					for(let i=0;i<address.length;i++){
						if(address[i].selected){
							this.address=address[i];
							console.log(this.address)
						}
					}
				}
			}
		},
		mounted: function() {
			this.getTotalPrice();
			// el渲染完成触发
			this.$nextTick(function() {
				// const self = this;
				this.refreshAddress()
// 				uni.getStorage({
// 					key: 'address',
// 					success(res) {
// 						self.address = res.data;
// 						self.hasAddress = true
// 					}
// 				})
			})
		}
	}
</script>

<style>
	page{
		overflow-y:scroll;
	}
/* 	.section {
		border-top: 1rpx solid #ededed;
		border-bottom: 1rpx solid #EDEDED;
		display: flex;
		justify-content: center;
	}
 */
	.orders-list view {

		padding: 0 20rpx;
	}

	.orders-list input {
		padding-top:4rpx ;
		flex: 1;
		/* border: 1rpx solid #7f7f7f; */

	}

	.orders-address {
		position: relative;
		padding: 20rpx 50rpx 20rpx 35rpx;
		font-size: 14px;
		line-height: 25px;
		border-bottom: 20rpx solid #ededed;
		color: #adadad;
	}

	.orders-address::after {
		position: absolute;
		right: 30rpx;
		top: 60rpx;
		content: '';
		width: 8px;
		height: 8px;
		border-top: 4rpx solid #7f7f7f;
		border-right: 4rpx solid #7f7f7f;
		-webkit-transform: rotate(45deg);
		transform: rotate(45deg);
	}

	.orders-address-name {
		display: inline-block;
		width: 300rpx;
	}

	.orders-no-address {
		position: relative;
		height: 90rpx;
		line-height: 90rpx;
		color: #adadad;
		border-bottom: 20rpx solid #ededed;
		text-align: center;
	}

	.orders-no-address::after {
		position: absolute;
		right: 30rpx;
		top: 34rpx;
		content: '';
		width: 16rpx;
		height: 16rpx;
		border-top: 4rpx solid #7f7f7f;
		border-right: 4rpx solid #7f7f7f;
		-webkit-transform: rotate(45deg);
		transform: rotate(45deg);
	}


	.orders-box {
		padding-bottom: 105rpx;
	}

	.orders-list {
		display: flex;
		padding: 15rpx;
		border-bottom: 1rpx solid #ededed;
	}

	.orders-thumb {
		padding: 0 20rpx;
		width: 100rpx;
		height: 100rpx;
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
		padding-right: 10rpx;
		color: #333;
		/* font-weight:bold; */
	}

	.orders-version {

		background: hsla(30, 100%, 0%, 0.1);
		padding: 2rpx 5rpx;
		font-size: 0.8em;
		border-radius: 10rpx;
	}

	.orders-tip {
		text-align: right;
		right: 15rpx;
		position: absolute;
	}
	.orders-right view {
		align-self: flex-end;
		text-align: right;
	}

	.orders-list view {
		line-height: 60rpx;
	}

	.orders-footer {
		bottom: 0;
		height: 95rpx;
		line-height: 95rpx;
		border-top: 1rpx solid #ededed;
	}

	.orders-footer .orders-footer-total {
		align-self: center;
		text-align: left;
		flex: 1;
		padding-left: 30rpx;
		box-sizing: border-box;
		color: red;
	}

	.orders-footer .orders-footer-btn {
		width: 240rpx;
		text-align: center;
		color: #fff;
		background: #AB956D;
	}
</style>
