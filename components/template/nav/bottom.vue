<template>
	<view  class="tui uni-flex tui-center tui-bottom-nav">
		<view  class="uni-flex-item" v-for="(item,idx) in bottomNav" :key="idx" @tap="index=idx,(item.fn)(item)"  :class="index==idx?'uni-badge-primary uni-badge-inverted':''">

			<view class="uni-item uni-column">
				<view class="nav-icon uni-item">
					<view class="nav-msg" >
						<view class="uni-badge uni-badge-danger" v-if="item.msg">{{item.msg}}</view>
					</view>
					<i class="uni-item iconfont" :class="item.ico"></i>
				</view>
				<view class="uni-item nav-title">
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
						url:'/pages/home/index'
					},{
						fn:this.tijiao,
						msg:0,
						name:'订单',
						ico:'icon-dingdanjihe',
						url:'/pages/order/list'
					},
					{
						fn:this.tijiao,
						msg:230,
						name:'消息',
						ico:'icon-xiaoxi',
						url:'/pages/chat/list'
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
				if(item.name=="首页"){
					uni.redirectTo({
						url: item.url
					});
				}else{
				// console.log(item)
					uni.navigateTo({
						url: item.url
					});
				}
			}
		}
	}
</script>

<style>

</style>
