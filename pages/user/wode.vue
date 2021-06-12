<template>
<view class="main tui">
    <view class="header">
        <image :src="thumb" class="thumb"></image>
        <text class="nickname">{{nickname}}</text>
        <text class="about">关于我们</text>
    </view>
		<view v-if="addrShow" class="uni-card  flex">
			<navigator v-if="address.name" class="flex column" url="../user/address" >
				<view class="flex between uni-list">
						<view class="uni-list-cell-navigate uni-navigate-right">
								<view class="item">收货人: {{address.name}}</view>
								<view class="item">电话: {{address.phone}}</view>
						</view>
						<view class="uni-list-cell-navigate item">{{address.detail}}</view>
				</view>
				
			</navigator>
			<view v-else class="uni-list">
				<navigator  url="../user/address">
				<view class="uni-list-cell" hover-class="uni-list-cell-hover">
					<view class="uni-list-cell-navigate uni-navigate-right">
						
						地址管理
						
					</view>
				</view>
				</navigator>

			</view>
			<!-- <button class=" center" @tap="refreshAddress()">刷新地址<uni-icon type="refresh center" size="20"></uni-icon></button> -->
		</view>

    <view class="orders-box">
<!--        <view class="orders">我的订单</view>
        <view class="orders-list" v-for="(item,key) in orders" :key="key">
            <view class="orders-number">订单编号：{{item.number}}</view>
            <view class="orders-detail">
                <image :src="item.thumb"></image>
                <view class="">{{item.name}}</view>
                <view class="">{{item.count}}</view>
                <text class="orders-status">{{item.status}}</text>
            </view>
            <view class="orders-footer">
                <text>实付：￥{{item.money}}</text>
                <button size="mini" class="orders-btn" @tap="payOrders">付款</button>
            </view>
        </view> -->
    </view>
</view>
</template>

<script>
	import Storage from "../../common/utils/Storage.js";
	import templateAddress from '../../components/pages/address.vue';
	export default {
		data() {
			return {
				addrShow:false,
				address: {},
				hasAddress: false,

				thumb:'',
				nickname:'',
				orders:[]
			};
		},mounted:function(){
			var self = this;
			// el渲染完成触发
			this.$nextTick(function() {
				this.refreshAddress()

			})
				/**
				 * 获取用户信息
				 */
				uni.getUserInfo({
				  success: function(res){
					self.thumb= res.userInfo.avatarUrl;
					  self.nickname= res.userInfo.nickName;
				  }
				}),

				/**
				 * 发起请求获取订单列表信息
				 */
				uni.request({
				  url: 'http://www.gdfengshuo.com/api/wx/orders.txt',
				  success(res){
					self.orders=res.data

				  }
				})
				
				
// 				    var self = this;
// 					/**
// 					 * 获取本地缓存 地址信息
// 					 */
// 					uni.getStorage({
// 					  key: 'address',
// 					  success: function(res){
// 						self.hasAddress=true;
// 						  self.address= res.data;
// 					  }
// 					})
			
		},methods:{
			  /**
			   * 发起支付请求
			   */
			  payOrders(){
				uni.requestPayment({
				  timeStamp: 'String1',
				  nonceStr: 'String2',
				  package: 'String3',
				  signType: 'MD5',
				  paySign: 'String4',
				  success: function(res){
					console.log(res)
				  },
				  fail: function(res) {
					uni.showModal({
					  title:'支付提示',
					  content:'<text>',
					  showCancel: false
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
				this.addrShow=true;
			}
		},
		components: {
			templateAddress
		}
	}
</script>

<style>
.header{
    position: relative;
    height: 160rpx;
    line-height: 100rpx;
    padding:30rpx 30rpx 30rpx 150rpx;
    box-sizing: border-box;
    background: #AB956D;
    font-size: 28rpx;
    color: #fff;
}
.header .thumb{
    position: absolute;
    left: 30rpx;
    top: 30rpx;
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
}
.header .about{
    float: right;
}

</style>
