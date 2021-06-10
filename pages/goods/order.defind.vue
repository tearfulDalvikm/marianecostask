<template>
<view class="main">
    <navigator url="../address/address">
        <view v-if="hasAddress" class="orders-address">
            <text class="orders-address-name">收货人: {{address.name}}</text>
            <text class="orders-address-phone">电话: {{address.phone}}</text>
            <view class="orders-address-detail">{{address.detail}}</view>
        </view>
        <view v-else class="orders-no-address">添加收货地址</view>
    </navigator>

    <view class="orders-box">
        <view v-for="(item,key) in orders" :key="key" class="orders-list">
            <image class="orders-thumb" :src="item.image"></image>
						<view class="orders-right">
							<view class="orders-title">{{item.title}}</view>
							<view v-if="item.versionName" class="orders-version">
								<text>{{item.versionName}}</text>
							</view>
							<view class="orders-tip">
								<view class="orders-count-num">×{{item.number}}</view>
								<view class="orders-count-num">￥{{item.price}}</view>
							</view>
						</view>
        </view>
    </view>

    <view class="orders-footer">
        <view class="orders-footer-total">付款合计：￥{{total}}</view>
        <view class="orders-footer-btn" bindtap="toPay">去付款</view>
    </view>
</view>
</template>

<script>
	import Storage from "../../common/utils/Storage.js";
	import orderData from "../../request/data/order.js";
	// const worker = wx.createWorker('workers/request/index.js') // 文件名指定 worker 的入口文件路径，绝对路径

	export default {
		data() {
			return { 
					address:{},
					hasAddress: false,
					total:0,
					orders:[
						{id:1,title:'新鲜芹菜 半斤',image:'https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product3.jpg',num:4,price:0.01},
						{id:2,title:'素米 500g',image:'https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product3.jpg',num:1,price:0.03}
					  ]
				
			};
		},onLoad(e) {
		console.log("onload")
		console.log(e)
		// var orderData =Storage.get('order') //读取购物车缓存数据
		
		// this.orders =orderData //读取订单数据
		this.orders=orderData;//读取模拟数据
		
		console.log(orderData)
		},
		methods:{
			ceshi(){
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
				for(let i = 0; i < orders.length; i++) {
				  total += orders[i].num * orders[i].price;
				}
				this.total=total;
			  },
			  toPay() {
				uni.showModal({
				  title: '提示',
				  content: '本系统只做演示，支付系统已屏蔽',
				  text:'center',
				  complete() {
					uni.switchTab({
					  url: '/page/component/user/user'
					})
				  }
				})
			  }
		},
		mounted: function (){
			 this.getTotalPrice();
			// el渲染完成触发
			this.$nextTick(function () {
				const self = this;
				uni.getStorage({
				  key:'address',
				  success(res) {
					self.address= res.data;
					self.hasAddress= true
				  }
				})
			})
		}
	}
</script>

<style>

.orders-address{
    position: relative;
    padding: 20rpx 50rpx 20rpx 35rpx;
    font-size: 14px;
    line-height: 25px;
    border-bottom: 20rpx solid #ededed;
    color: #adadad;
}
.orders-address::after{
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
.orders-address-name{
    display: inline-block;
    width: 300rpx;
}

.orders-no-address{
    position: relative;
    height: 90rpx;
    line-height: 90rpx;
    color: #adadad;
    border-bottom: 20rpx solid #ededed;
    text-align: center;
}
.orders-no-address::after{
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


.orders-box{
    padding-bottom: 105rpx;
}
.orders-list{
	display: flex;
	padding: 15rpx;
	border-bottom: 1rpx solid #ededed;
}
.orders-thumb{
	padding:0  20rpx;
	width: 100rpx;
	height: 100rpx;
}
.orders-right{
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	flex: 1;
	position:relative;
}
.orders-title{
	font-weight:bold;
}
.orders-version text{
	background: hsla(30, 100%, 0%,0.1);
	padding:2rpx 5rpx;
	font-size:0.8em ;
	border-radius: 10rpx;
}
.orders-tip{
	text-align: right;
	right: 15rpx;
	position:absolute;
}
.orders-right .orders-pro-price{
	display: flex;
	justify-content: space-between;
	flex-direction: row;
}
.orders-list view{
    line-height: 60rpx;
}

.orders-footer{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 95rpx;
    line-height: 95rpx;
    border-top: 1rpx solid #ededed;
}
.orders-footer .orders-footer-total{
    display: inline-block;
    width: 510rpx;
    padding-left: 30rpx;
    box-sizing: border-box;
    color: #a55350;
}
.orders-footer .orders-footer-btn{
    display: inline-block;
    width: 240rpx;
    text-align: center;
    color: #fff;
    background: #AB956D;
}
</style>
