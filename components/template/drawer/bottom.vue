<template>
	<view class="tui"  >
			<view  :style="drawerBottomShow?'top:0':'top:100vh'" class="flex  fixed column bottom-nav center tui-drawer" style="">
				<view  class="toubu">
					<view class="toubu-list flex">
						<view  class="left relative">
							<!-- <view  class="img absolute"> -->
								<image class="img absolute" :src="goods.version[botIdx].image" mode="aspectFill"></image>
							<!-- </view> -->
						</view>
						<view  class="right item flex column line-height6 relative">
							<icon class="absolute  iconfont icon-guanbishixin" @tap="onShow()" style="right: 20rpx;top: 0;color: rgb(255,50,50);font-size:2em ;"></icon>
							<view  class="title">
								<text></text><text style="color: red;">￥{{goods.price}}</text>
							</view>
							<view  class="text" >
								已选：<text class="uni-badge bg-ju" >{{goods.versionName}}</text>
							</view>
							<view class="item number-box" style="font-size:1.5em ;" >
								<number-box :min="1" :max="goods.stock"  :value="goods.number"   v-on:change="numberUpdate" ></number-box>
							</view>
						</view>
					</view>
				</view>
				<view  class="list flex " style="flex-wrap: wrap;justify-content: space-between;" >

					<text style="line-height: 1.6;height: 1.6em;" class="button tag"  :style="key==botIdx?'opacity:0.5;':'opacity:1;'" v-for="(item,key) in goods.version "  :key="key" @tap="selection(key,item)">{{item.name}}</text>


				</view>
				<button class="" @tap="onShow();commit()" type="primary" style="width:100%">确认</button>
	
			</view>	
	</view>
</template>

<script>
	import numberBox from '../box/number.vue'

	export default {
		components: {
			numberBox
		},
		props:{
			drawerBottomShow:false,
			goods:{
					id: 1,
					image: 'https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product3.jpg',
					title: '新鲜梨花带雨',
					price: 0.01,
					stock: 12,
					number:0,
					versionName:'未选择',
					versionIdx:'',
					synopsis:"简介，这里是梨花带雨详情",
					version:[{name:'大份',price:18,stock:6,image:''}]
				}
		},
		data(){
			return{
				number:0,
				botIdx:0,
				// drawerBottomShow:false,
			};
		},methods:{
			commit(){
				console.log(this.number)
				this.goods.number=this.number;
				this.$emit('change',this.goods);
				
			},
			selection(idx,item){
				this.botIdx=idx;
				var goods=this.goods;
					goods.number=1;
					goods.price=item.price ||goods.price;
					goods.versionName=item.name || '未选择';
					// goods.image=item.image || goods.image;
					goods.stock=item.stock || goods.stock;
				this.goods=goods;
			},
			onShow(){
				
				this.drawerBottomShow=!this.drawerBottomShow;
				// console.log(this.show)
			},
			numberUpdate(value){
				this.number=value
				// console.log(value)
// 				var goods=this.goods;
// 				item.number=value;
// 				if(goods.number && goods.price){
// 					this.totalPrice=goods.number*goods.price;
// 					this.goods=item;
// 				}
			}
		},mounted() {
			
		}
	}
</script>

<style>
/* 	.number-box icon{
		color: #09BB07;
	} */

	.tui .line-height6{
		line-height: 1.6;
	}
	.tui .bottom-nav{
		justify-content: flex-end;
		width: 100%;
		bottom:0;
	}
	.tui .toubu{
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		height: 180rpx;
		/* background: #0062CC; */
	}
	.tui .toubu >.toubu-list{
		height: 160rpx;
		width: 100%;
		background: #fff;
		
	}
	.tui .toubu .toubu-list >.left{
		width:240rpx ;
	}
	.tui .toubu .toubu-list .left >.img{
		/* background: #808080; */
		bottom: 0;
		height: 200rpx;
		width: 200rpx;
		background: #fff;
		padding:10rpx ;
		border-radius: 10rpx;
		text-align:center;
		left: 20rpx;
		border: 1rpx solid rgb(200,200,200);
	}
	.tui .toubu .toubu-list >.right{
		padding: 20rpx;
		justify-content: center;
		text-align: left;
		/* padding: 10rpx; */
		box-sizing: border-box;
	}
  

	.tui .tag{
		font-size: 1.2em;
		text-align: center;
		/* color:#333; */
		line-height: 40rpx;
		/* background:#007AFF; */
		/* border-radius: 3rpx; */
		border:#f9f9f9 solid 1rpx;
	}
	.tui .button:hover{
		opacity:0.6;
	}
	.tui .tanchu{
		width: 100%;
	}
	.tui .tui-drawer{
		height: 100%;
		/* padding-bottom: 100rpx; */
		top:0;
		/* height: 100%; */
		bottom: 0;
		background: rgba(0,0,0,0.5);
		transition:top 1s;
		-moz-transition:top 1s;
		-webkit-transition:top 1s;
		-o-transition:top 1s;
	}
	.tui-drawer .list{
		border:#f9f9f9 solid 1rpx;
		/* justify-content:; */
		box-sizing: border-box;
		height: 200rpx;
		overflow-y:auto;
	}
	.tui .list::-webkit-scrollbar {
		 display: none;
	}
/* 	.tui .tui-drawer > .item{
		margin: 10rpx;
		height: 40rpx;
		width: 100%;
		line-height: 40rpx;

	} */


</style>
