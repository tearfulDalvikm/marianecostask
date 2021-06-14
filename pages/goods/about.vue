<template>
<view class="main tui">
	<!-- <drawer-bottom  ref="drawerBottom"  :drawerBottomShow="drawerBottomShow" :about="about" v-on:change="aboutUpdate"></drawer-bottom> -->

	<scroll-view class="scrollList" scroll-y   :style="{height:contentHeight + 'px'}" style="margin-bottom: 120rpx;">
				<view class="uni-card flex center column"style="padding-top:50rpx ;">
						<image :src="about.image" mode="aspectFill" class="about-thumb"></image>
							<view class="about-title " style="opacity: 0.7;">{{about.name}}</view>

				</view>

<!-- 				<view class="uni-card flex center">
					<view class="about-price">
						<text style="color:red;">{{about.name}}</text>
					</view>
				</view> -->
<!-- 				<view v-if="about.address" class="uni-card flex center">
					<text class="">地址:{{about.address}}</text>

				</view> -->
				<view class="uni-card center">
					<view class="about-tab-nav">
							<view class="about-title " @tap="bindTap(0)" :data-index="0">客户须知</view>
					</view>
						<text>
							{{about.detail}}
						</text>
				</view>
				<!-- <view class="uni-card flex column center" > -->

					<view class="uni-card  center">
						<view class="about-tab-nav">
								<view class="about-title " @tap="bindTap(0)" :data-index="0">商家介绍</view>
						</view>
							<text>
								{{about.detail}}
							</text>
					</view>
					<view class="uni-card center">
						<view class="about-tab-nav " style="width: auto;">
								<text class=" about-title " @tap="bindTap(0)" :data-index="0">联系地址</text>
						</view>
						<view class="item">{{about.address}}</view>
					</view>
				<!-- </view> -->
		</scroll-view>
<!-- 						<nav class="bottom-nav flex  " style="bottom:0;z-index: 99;">
								<view class="item flex center" style="justify-content: space-around;">
									<view class="icon flex column" style="flex-direction: column;" @tap="goPage('shop')">
										<icon class="iconfont icon-dianpu" style="font-size: 1.4em;line-height: 0.6em;"></icon>
										<text style="font-size:0.8em ;">店铺</text>
									</view>
									<view class="icon flex column" @tap="goPage('chat')">
										<icon class="iconfont icon-kefu" style="font-size: 1.4em;line-height: 0.6em;"></icon>
										<text style="font-size:0.8em ;">客服</text>
									</view>
									<view class="icon flex column" @tap="goPage('order')">
										<icon class="iconfont icon-dingdanjihe" style="font-size: 1.4em;line-height: 0.6em;"></icon>
										<text style="font-size:0.8em ;">订单</text>
									</view>
								</view>

								<button type="warn" @tap="xuanZhe()" >下单</button>
						</nav> -->
</view>
</template>

<script>
	// import mpvuePicker from '../../components/template/picker/mpvuePicker.vue';
	// import numberBox from '../../components/template/box/number.vue'
	import ajax from "../../request/ajax.js"
	import Storage from "../../common/utils/Storage.js"
	// import drawerBottom from '../../components/template/drawer/bottom.vue'
	export default {
		components: {
			// numberBox,
			// drawerBottom
		},
		data() {
			return {
				winHeight:0,
				contentHeight:100,
				winHeight:0,
				drawerBottomShow:false,
				timeOut:'',
				timeOut2:'',
				selected:'',
				vIndex:0,
					about:{
						name:'王家小店',
						  id: 1,
						  image: 'https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product3.jpg',
						  // title: '新鲜梨花带雨',
						  // price: 0.01,
						  address: "北京市东城区王府井门口",
							// number:0,
						  detail: '这里是梨花带雨详情。',
							synopsis:"简介，这里是梨花带雨详情",
						  // parameter: '125g/个',
						  // service: '不支持退货'
						},
// 						num: 1,
// 						totalNum: 0,
// 						totalPrice:0,
// 						curIndex: 0,
// 						scaleCart: false
				
			};
		},
		methods:{
							xuanZhe(){
								if(typeof this.about.version ==='object' && this.about.version[0]){
									this.$refs.drawerBottom.drawerBottomShow=true;
								}else{
									this.tongJi()
									this.goPage('cart')
								}
							},
							tongJi(){
								var cart={};
								cart[this.about.id]=this.about;
								Storage.set('cart',cart,100)
							},
							aboutUpdate(item){
								this.about=item;
								this.tongJi()
								console.log(item)
								this.goPage('cart')
							},
							goPage(e){
								var url='';
								switch (e){
									case "cart":

// 												var about=this.about;
// 												var cart={};
// 												// cart[this.about.id]=this.about;
// 												for(let i=0;i<about.length;i++){
// 													if(about[i].selected){
// 														cart[about[i].id]=about[i];
// 													}
// 												}
												// Storage.set('cart',cart,1000);
												url="/pages/about/"+e+"?id=2";
										break;
										case "wode":
										url="/pages/user/"+e+"?id=2";
										break;
										case "chat":
										url="/pages/chat/"+e+"?id=2";
										break;
										case "order":
										url="/pages/pay/"+e+"?id=2";
										break;
										
									default:
										url="/pages/about/"+e+"?id=2";
										break;
								}
			
								
								uni.navigateTo({
									url: url,
									success: res => {
										
									},
									fail: () => {},
									complete: () => {}
								});
						},gotoCart(){
							var cart={};
							cart[this.about.id]=this.about;
							Storage.set('cart',cart,100)
							uni.navigateTo({
								url: "/pages/about/cart?id=2",
								success: res => {
									
								},
								fail: () => {},
								complete: () => {}
							});
					},
// 			numberUpdate(value,item){
// 				console.log(value)
// 				var about=this.about;
// 				item.number=value;
// 				if(about.number && about.price){
// 					this.totalPrice=about.number*about.price;
// 					this.about=item;
// 				}
// 			},
// 			// 下拉表单
// 				bindPickerChange (e) {
// 					var vIndex=e.detail.value;
// 					this.vIndex =vIndex;
// 					this.about.price=e.target.dataset.data[vIndex].price || this.about.price;
// 				  console.log(e)
// 				},
// 			// 增加数量
// 			  addCount() {
// 				  if(this.num>=this.about.stock){
// 					  uni.showToast({
// 						title: '库存不足',
// 						icon:'none',
// 						duration: 2000
// 					});
// 				  }else{
// 					  this.num++;
// 				  }
// 			  },
// 			  // 减少数量
// 				cutCount() {	
// 					if(this.num>1){
// 						this.num--;
// 					}
// 			  },
// 			  addToCart() {
// 				const self = this;
// 				const num = this.num;
// 				let total = this.totalNum;
// 
// 					this.show=true;
// 					this.scaleCart = true;
// 					clearTimeout(self.timeOut2);
// 				  this.timeOut2=setTimeout( function() {
// 					self.totalNum= num + total;
// 					self.show=false;
// 					self.scaleCart= false;
// 				  }, 100)
// 					console.log(this.timeOut2)
// 			  },

			  bindTap(index) {
				  // console.log(index)
				this.curIndex=index

			  }
		},onLoad(e){
				let winHeight = uni.getSystemInfoSync().windowHeight;
			//创建节点选择器 获取底部导航高度 
				this.contentHeight=(winHeight-uni.upx2px(100));
				this.winHeight = winHeight;
			
			ajax.get('aboutDetail',(res)=>{
				
				var about=res.data.data ||{};
						about.number=1;
						about.versionName='未选择';
				this.about=about;
				// console.log(res.data.data)
			})
			console.log(e)
		}
	}
</script>

<style>

page{
	/* overflow-y: scroll; */
}
.about-box .about-thumb{

	border-radius: 20upx;
}


.about-box .about-operation{
	
	padding: 10upx 30upx;
	display: flex;
	align-items:center;
	box-sizing: border-box;
	border-radius: 50upx;
	color: #fff;
	font-size: 1.2em;
}

.about-operation-left{
	justify-content: flex-start;
	display: flex;
	align-items: center;
	flex: 1;
	font-size: 1em;
}
.about-operation-left i{
	padding:0 15upx;
}
.about-operation-right{
	font-size: 1em;
	justify-content:flex-end;
	display: flex;
	align-items: center;
  width: 210upx;
}

/* .about-stock{
    font-size: 28upx;
    margin-bottom: 20upx;
}

.about-price{
    font-size: 40upx;
}
.about-tab{
	display: flex;
	flex-direction :column;
}
.about-tab-nav{
	display: flex;
	flex-direction :row;
	justify-content:space-around;
	box-sizing: border-box;


} */
.about-title{
	font-size: 1.2em;
	font-weight:bold;
	/* border-width:0 ; */
	/* border-bottom-style:solid; */
  /* border-bottom-width: 5upx; */
}
/* .about-tab-nav view{
	font-size:1.3em ;
}

.about-tab-nav .on{
	font-weight:bold;
	border-width:0 ;
	border-bottom-style:solid;
  border-bottom-width: 5upx; 
}
 */
.about-content{
	
	margin: 40upx;
	padding: 10upx;
	display: flex;
	flex-direction: column;
}
.about-content view{
	border-width:2upx;
	/* display: flex; */
	/* flex:1; */
	box-sizing: border-box;
	
}
.about-content text{
	flex: 1;
	text-align: center;

}
.about-content text:last-child{

	border-left-width:0;
	flex: 3;
}
</style>
