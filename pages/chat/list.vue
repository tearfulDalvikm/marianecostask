<template>
	<view class="page tui">
		<page-head :title="title"></page-head>
		<view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(value,key) in list" :key="key">
				<view class=" uni-media-list flex" @tap="goPage(value)">
					<view class="uni-media-list-logo " style="position: relative;">
						<view v-if="value.msg" class="bagde" style="position: absolute;right:-15rpx;top:-15rpx"> <text v-if="value.msg<10">{{value.msg}}</text><text v-else>…</text></view>
						<image v-if="showImg" :src="value.img"></image>
					</view>
					<view class="uni-media-list-body item" style="flex: 1;">
						<view class="uni-media-list-text-top">
							<text>{{value.title}}</text>
						</view>
						<view class="uni-media-list-text-bottom uni-ellipsis">{{value.content}}</view>
					</view>
					<view class="flex column" style="width: 90rpx;">
						<text class="item " style=" font-size: 0.7em;opacity: 0.5;">晚上07:20</text>
						<text class="item"></text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'media-list',
				showImg: false,
				order:[],
				list: [
					{
						uid:"1234",
						title: "订单通知",
						type:"order",
						content: "水煮鱼,小碗米饭,雪碧已接单",
						msg:"1",
						img: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg?imageView2/3/w/200/h/100/q/90"
					},
					{
						uid:"1234",
						title: "小甜甜",
						type:"chat",
						content: "能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？",
						msg:"1",
						img: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg?imageView2/3/w/200/h/100/q/90"
					},
					{
						uid:"1235",
						title: "大柱子",
						type:"chat",
						content: "想要这样一间小木屋，夏天挫冰吃瓜，冬天围炉取暖。",
						msg:"11",
						img: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/muwu.jpg?imageView2/3/w/200/h/100/q/90"
					},
					{
						uid:"1236",
						title: "信阳烧烤",
						type:"chat",
						content: "烤炉模式的城，到黄昏，如同打翻的调色盘一般。",
						msg:"3",
						img: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg?imageView2/3/w/200/h/100/q/90"
					}
				]
			}
		},methods:{
			goPage(value){
				var type=value.type;
				var  url ='chat';
				if(type==='order'){
					url ='order';
				}
				console.log(value);
				uni.navigateTo({
					url: url
				});
			}
		},
		onLoad() {
			setTimeout(() => {
				this.showImg = true;
			}, 400)
		}
	}
</script>

<style>
.tui .bagde{
	background: #FF4040;
	color: #fff;
}
.title {
	padding: 20upx;
}
</style>
