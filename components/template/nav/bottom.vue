<template>
	<view  class="tui flex center bottom-nav">
		<view  class="uni-flex-item" v-for="(item,idx) in bottomNav" :key="idx" @tap="index=idx,(item.fn)(item)"  :class="index==idx?'uni-badge-primary uni-badge-inverted':''">

			<view class="item column">
				<view class="nav-icon item">
					<view class="nav-msg" >
						<view class="uni-badge uni-badge-danger" v-if="item.msg">{{item.msg}}</view>
					</view>
					<i class="item iconfont" :class="item.ico"></i>
				</view>
				<view class="item nav-title">
						{{item.name}}
				</view>
			</view>
			

		</view>

	</view>
</template>

<script>
	export default {
		name: "bottomNav",
		// props:['bottomNav'],
		data() {
			return {
				index:0,
				bottomNav:[
					// 底部按钮数据
					{
						fn:this.tijiao,
						msg:0,
						name:'首页',
						ico:'icon-fangzi',
						url:'/pages/index/index'
					},{
						fn:this.tijiao,
						msg:0,
						name:'订单',
						ico:'icon-dingdanjihe',
						url:'/pages/pay/order'
					},
					{
						fn:this.tijiao,
						msg:230,
						name:'消息',
						ico:'icon-xiaoxi',
						url:'/pages/chat/chat'
					},
					{
						fn:this.tijiao,
						msg:0,
						name:'我的',
						ico:'icon-wode',
						url:'/pages/user/wode'
					}
				]
				
			}
		},mounted(){
			console.log("template/nav/bottom/mounted")
			// console.log(this.$refs.bottomnav)
		
		
		},methods:{
			tijiao(item){
				console.log('tijiao')
				console.log(item)
				uni.navigateTo({
					url: item.url
				});
			}
		}
	}
</script>

<style>
.bottom-nav {
	border-top: 1upx solid hsl(180,0%,90%);
	font-size:1.2em ;
	bottom: 0;
	height: 100%;
	box-sizing: border-box;
	padding: 10rpx 0;
}
.bottom-nav view{
	line-height: 1.3em;
}

.bottom-nav .nav-msg .uni-badge{
	top: 8upx;
	text-align: center;
	position: absolute;
	padding:1upx 8upx;
	font-size:0.8em;
}

.bottom-nav .nav-title{
	font-size:0.8em ;
}
.bottom-nav .nav-icon{
	min-height: 1em;
	line-height: 1.2em;
	font-size: 1.8em;
}
</style>
