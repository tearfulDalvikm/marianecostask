<template>
	<view class="tui">
		<view class="uni-list">
<!-- 			<view class="uni-list-cell-divider">
				右侧带箭头
			</view> -->
			<view class="uni-list-cell uni-flex" style="justify-content: space-between;" hover-class="uni-list-cell-hover" @tap="update('headimg')">
				<view class="uni-list-cell-navigate item" style="width: 50upx;">
					头像
				</view>
				<view class="uni-list-cell-navigate uni-navigate-right flex " style="justify-content:flex-end;flex:2" >
					<image  class=" tui-headimg"  style="padding:0 20upx;" :src="userInfo.headimg" mode="aspectFit"></image>
				</view>
			</view>
			<view class="uni-list-cell flex" style="justify-content: space-between;" hover-class="uni-list-cell-hover"  @tap="update('nickName')">
				<view class="uni-list-cell-navigate item" style="width: 50upx;">
					昵称
				</view>
				<view class="uni-list-cell-navigate uni-navigate-right flex " style="justify-content:flex-end;flex:2">
					<text  style="padding:0 20upx;">{{userInfo.nickName}}</text>
				</view>
			</view>
			<view class="uni-list-cell flex" style="justify-content: space-between;" hover-class="uni-list-cell-hover" @tap="update('area')">
				<view class="uni-list-cell-navigate item" style="width: 50upx;">
					地区
				</view>
				<view class="uni-list-cell-navigate uni-navigate-right flex " style="justify-content:flex-end;flex:2">
					<text  style="padding:0 20upx;">{{userInfo.area}}</text>
				</view>
			</view>
			<view class="uni-list-cell flex" style="justify-content: space-between;" hover-class="uni-list-cell-hover" @tap="update('individuality')">
				<view class="uni-list-cell-navigate item" style="width: 50upx;">
					个性
				</view>
				<view class="uni-list-cell-navigate uni-navigate-right flex " style="justify-content:flex-end;flex:2">
					<text  style="padding:0 20upx;">{{userInfo.individuality}}</text>
				</view>
			</view>
			<view class="uni-list-cell flex" style="justify-content: space-between;" hover-class="uni-list-cell-hover" @tap="toPage('address')">
				<view class="uni-list-cell-navigate item uni-list-cell-navigate uni-navigate-right" style="width: 50upx;">
					地址信息
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Url from '../../common/utils/Url.js';
	// import Time from "../../common/utils/Time.js";
	import Storage from "../../common/utils/Storage.js";
	export default {
			name:"安全中心",
		data(){
			return{
				userInfo:{
					nickName:"小宝宝",
					headimg:"../../static/HM-PersonalCenter/face.jpeg",
					user_id:"123",
					individuality:"爱你一万年",
					address:"北京市西城区中南海大院1号",
					sex:"男",
					area:"北京-北京-东城区",
					infoUpdate:{
						key:null,
						value:null
					}
					
					
				}
			}
		},methods:{
			update(e){
				var str="key="+e+"&value="+this.userInfo[e];
				this.infoUpdate={key:e,value:this.userInfo[e]};
				this.toPage('update',str)
// 				switch (e){
// 					case "nickName":
// 						break;
// 					default:
// 						break;
// 				}

				console.log(e)
			},toPage(url,e){
				uni.navigateTo({
					url:url+'?'+e
				})
			}
		},onShow(){
		var value= Storage.get('userInfoUpdate');
			if(this.infoUpdate && this.infoUpdate.key && this.infoUpdate.value!= value){
				this.userInfo[this.infoUpdate.key]=value;
				// this.value=value;	
			}
			console.log('返回触发')
		}
	}
</script>

<style>
</style>
