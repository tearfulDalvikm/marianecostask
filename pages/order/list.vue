<template>
	<view class="main tui">
		<scroll-view   style="height:100vh;padding: 0 15rpx;box-sizing: border-box;" scroll-y >
				<view class="uni-card" v-for="(orders,index) in orderList" :key="index">
					<view class="orders-list" style="justify-content: space-between;">
						<view class="" @tap="goPage('shop',orders.shop_id)" style="">{{orders.shopName}} ></view>
						<view  style="color: red;">
							<text v-if="orders.status!='0'">已付款</text>
							<text v-else class="">未付款</text>
						</view>
					</view>
					<view style="background: #F9F9F9;"  @tap="goPage('orderDetail',orders)">
						<view v-for="(item,key) in orders.data" :key="key" class="orders-list">
							<view style="flex: 1;">
								<text class="orders-title">{{item.title}}</text>
								<text class="orders-version" v-if="item.versionName">{{item.versionName}}</text>
							</view>
							<view class="orders-right" style="flex-direction: row;width: 150rpx;">
								<view>￥{{item.price}}</view>
								<view style="width: 100rpx;">x{{item.number}}</view>
							</view>
						</view>
					</view>
					<view class="orders-list flex" style="justify-content:flex-end;text-align:left">
						<text  style="">实付：￥{{orders.pay}}</text>
					</view>
					<view class="orders-list flex" style="justify-content:flex-end;align-self: flex-end;">
						<view v-if="orders.status!='0'" >
							<text  class="button border" style="margin-left:10upx;" @tap="deleteOrder(orders)" >删除订单</text>
							<text  class="button border" style="margin-left:10upx;" @tap="refund(orders)" >申请退款</text>
						</view>
						<view v-else >
							<text  class="button border" style="margin: 0 10upx;" @tap="cancelOrder(orders)" >取消订单</text>
							<text  class="button" style="background: #FF3030;color: #fff;" @tap="toPay(orders)" >去支付</text>
						</view>
					</view>

				</view>
		</scroll-view>

	</view>
</template>

<script>
	import Storage from "../../common/utils/Storage.js";
	import ajax from "../../request/ajax.js";
	// import orderData from "../../request/data/payOrder.js";
	import uniIcon from "../../components/template/icon/icon.vue";
	// const worker = wx.createWorker('workers/request/index.js') // 文件名指定 worker 的入口文件路径，绝对路径

	export default {
		 components: {uniIcon},
		data() {
			return {
				tableNumbers:'',//桌号
				number:'',//人数
				addrShow:false,
				// show: false,
				address: {},
				hasAddress: false,
				total: 0,
				orderList: [{
						id: 1,
						title: '新鲜芹菜 半斤',
						num: 4,
						price: 0.01
					},
					{
						id: 2,
						title: '素米 500g',
						num: 1,
						price: 0.03
					}
				]

			};
		},
		onLoad(e) {
			console.log("onload")
			console.log(e)
			// var orderData =Storage.get('payOrder') //读取购物车缓存数据
			// 请求服务器
			var self = this;
			ajax.get('orderList',(res)=>{
				
				var orderList=res.data.data ||{};
				self.orderList=orderList;
				console.log(res.data.data)
			})
			// this.orderData =orderData //读取订单数据

			// this.orders = orderData; //读取模拟数据
			// console.log(this.total)
			// console.log(orderData)
		},
		methods: {
			cancelOrder(){
				// 取消订单
				uni.showModal({
					title:"确认取消订单？",
					content:"订单一旦取消,获得的相关优惠将会全部取消。"
				})
			},
			refund(e){
				// 申请退款
				uni.showModal({
					title:"申请退款"
				})
			},
			deleteOrder(e){
				// 删除订单
				uni.showModal({
					title:"确认删除订单？",
					content:"删除之后订单无法恢复,无法处理您的售后问题,请您慎重考虑。"
				})
			},
			goPage(e,data){
				var  url ='../order/detail';
				switch (e){
					case "shop":
					url='../goods/shop?id='+data;
						break;
					default:
						break;
				}
				uni.navigateTo({
					url: url
				});
			},
			ceshi() {
				// 				worker.onMessage(function (res) {
				// 				  console.log(res)
				// 				})
				// 				
				// 				worker.postMessage({
				// 				  msg: 'hello worker'
				// 				})
				// 				
				// 				worker.terminate()
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
			toPay(order) {
				uni.showModal({
					title: '提示',
					content: '本系统只做演示，支付系统已屏蔽',
					text: 'center',
					complete() {
						uni.switchTab({
							url: '/page/pay/payment?'+order
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
/* 	.section {
		border-top: 1rpx solid #ededed;
		border-bottom: 1rpx solid #EDEDED;
		display: flex;
		justify-content: center;
	}
 */
	.orders-list view {

		/* padding: 0 20rpx; */
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

	/* .orders-right .orders-pro-price{
	display: flex;
	justify-content: space-between;
	flex-direction: row;
} */
	.orders-right view {
		align-self: flex-end;
		text-align: right;
	}

	.orders-list view {
		line-height: 60rpx;
	}

	.orders-footer {
		position: fixed;
		
		bottom: 0;
		left: 0;
		width: 100%;
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
