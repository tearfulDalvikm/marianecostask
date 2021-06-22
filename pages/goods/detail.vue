<template>
<view class="page-body tui">
	<scroll-view class="scrollList" scroll-y   :style="{height:contentHeight + 'px'}" style="margin-top: 0;">
				<view class="uni-card tui-flex tui-center tui-column">
						<image :src="goods.image" mode="aspectFill" class="goods-thumb"></image>
							<view class="goods-title">{{goods.title}}</view>

				</view>

				<view class="uni-card tui-flex tui-center">
					<view class="goods-price">
						<text style="color:red;">￥ {{goods.price}}</text>
					</view>
				</view>
				<view v-if="goods.stock" class="uni-card tui-flex tui-center">
					<text class="">库存:{{goods.stock}}</text>

				</view>
				<view class="uni-card tui-flex tui-column" >
						<view class="goods-tab-nav">
								<view :class="curIndex === 0 ?'on tui-color tui-border':'opacity'" @tap="bindTap(0)" :data-index="0">商品详情</view>
								<view v-if="goods.attribute" :class="curIndex === 1 ?'on tui-color tui-border':'opacity'" @tap="bindTap(1)" :data-index="1">产品参数</view>
						</view>
						<view class="goods-content tui-border">
						<view  v-if="curIndex === 1" v-for="(attr,aIndex) in goods.attribute" :key="aIndex">
							<text class="tui-border">{{attr.name}}</text><text class="border" style="">{{attr.text}}</text>
						</view>
						<view  v-if="curIndex === 0">
							<text>
								{{goods.detail}}
							</text>
						</view>
					<!-- </view> -->
						</view> 
				</view>
		</scroll-view>
		<drawer-bottom  ref="drawerBottom"  :drawerBottomShow="drawerBottomShow" :goods="goods" v-on:change="goodsUpdate"></drawer-bottom>
		<nav class="tui-bottom-nav tui-flex" style="bottom:0;z-index: 99;">
				<view class="tui-item tui-flex tui-center" style="justify-content: space-around;">
					<icon class="iconfont icon-dianpu tui-flex tui-column" style="font-size: 1.4em;line-height: 0.8em;" @tap="goPage('shop')">
						<text style="font-size:0.6em ;">店家</text>
					</icon>
					<icon class="iconfont icon-kefu tui-flex tui-column" style="font-size: 1.4em;line-height: 0.8em;"  @tap="goPage('chat')">
						<text style="font-size:0.6em ;">客服</text>
					</icon>
					<icon class="iconfont icon-dingdanjihe tui-flex tui-column" style="font-size: 1.4em;line-height: 0.8em;" @tap="goPage('order')">
						<text style="font-size:0.6em ;">订单</text>
					</icon>
					<icon class="iconfont icon-wode tui-flex tui-column" style="font-size: 1.4em;line-height: 0.8em;" @tap="goPage('wode')">
						<text style="font-size:0.6em ;">我的</text>
					</icon>
				</view>
				<button type="warn" @tap="xuanZhe()" size="mini" style="line-height:100upx;padding: 0 15upx;">下单</button>
		</nav>
</view>
</template>

<script>
	// import mpvuePicker from '../../components/template/picker/mpvuePicker.vue';
	// import numberBox from '../../components/template/box/number.vue'
	import ajax from "../../request/ajax.js"
	import Storage from "../../common/utils/Storage.js"
	import drawerBottom from '../../components/template/drawer/bottom.vue'
	export default {
		components: {
			// numberBox,
			drawerBottom
		},
		data() {
			return {
				winHeight:0,
				contentHeight:100,
				drawerBottomShow:false,
				timeOut:'',
				timeOut2:'',
				selected:'',
				vIndex:0,
					goods:{
						  id: 1,
						  image: 'https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product3.jpg',
						  title: '新鲜梨花带雨',
						  price: 0.01,
						  stock: 12,
							number:0,
						  detail: '这里是梨花带雨详情。',
							synopsis:"简介，这里是梨花带雨详情",
						  parameter: '125g/个',
						  service: '不支持退货'
						},
						num: 1,
						totalNum: 0,
						totalPrice:0,
						curIndex: 0,
						scaleCart: false
				
			};
		},
		methods:{
							xuanZhe(){
								if(typeof this.goods.version ==='object' && this.goods.version[0]){
									this.$refs.drawerBottom.drawerBottomShow=true;
								}else{
									this.tongJi()
									this.goPage('cart')
								}
							},
							tongJi(){
								var cart={};
								cart[this.goods.id]=this.goods;
								Storage.set('cart',cart,100)
							},
							goodsUpdate(item){
								this.goods=item;
								this.tongJi()
								console.log(item)
								this.goPage('cart')
							},
							goPage(e){
								var url='';
								switch (e){
									case "cart":

// 												var goods=this.goods;
// 												var cart={};
// 												// cart[this.goods.id]=this.goods;
// 												for(let i=0;i<goods.length;i++){
// 													if(goods[i].selected){
// 														cart[goods[i].id]=goods[i];
// 													}
// 												}
												// Storage.set('cart',cart,1000);
												url="/pages/goods/"+e+"?id=2";
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
										url="/pages/goods/"+e+"?id=2";
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
							cart[this.goods.id]=this.goods;
							Storage.set('cart',cart,100)
							uni.navigateTo({
								url: "/pages/goods/cart?id=2",
								success: res => {
									
								},
								fail: () => {},
								complete: () => {}
							});
					},
// 			numberUpdate(value,item){
// 				console.log(value)
// 				var goods=this.goods;
// 				item.number=value;
// 				if(goods.number && goods.price){
// 					this.totalPrice=goods.number*goods.price;
// 					this.goods=item;
// 				}
// 			},
// 			// 下拉表单
// 				bindPickerChange (e) {
// 					var vIndex=e.detail.value;
// 					this.vIndex =vIndex;
// 					this.goods.price=e.target.dataset.data[vIndex].price || this.goods.price;
// 				  console.log(e)
// 				},
// 			// 增加数量
// 			  addCount() {
// 				  if(this.num>=this.goods.stock){
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
			
			ajax.get('goodsDetail',(res)=>{
				
				var goods=res.data.data ||{};
						goods.number=1;
						goods.versionName='未选择';
				this.goods=goods;
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
.goods-box .goods-thumb{

	border-radius: 20upx;
}


.goods-box .goods-operation{
	
	padding: 10upx 30upx;
	display: flex;
	align-items:center;
	box-sizing: border-box;
	border-radius: 50upx;
	color: #fff;
	font-size: 1.2em;
}

.goods-operation-left{
	justify-content: flex-start;
	display: flex;
	align-items: center;
	flex: 1;
	font-size: 1em;
}
.goods-operation-left i{
	padding:0 15upx;
}
.goods-operation-right{
	font-size: 1em;
	justify-content:flex-end;
	display: flex;
	align-items: center;
  width: 210upx;
}

.goods-stock{
    font-size: 28upx;
    margin-bottom: 20upx;
}
.goods-title{
    font-size: 40upx;
    margin-bottom: 30upx;
}
.goods-price{
    font-size: 40upx;
}
.goods-tab{
	display: flex;
	flex-direction :column;
}
.goods-tab-nav{
	display: flex;
	flex-direction :row;
	justify-content:space-around;
	box-sizing: border-box;


}
.goods-tab-nav view{
	font-size:1.3em ;
}

.goods-tab-nav .on{
	font-weight:bold;
	border-width:0 ;
	border-bottom-style:solid;
  border-bottom-width: 5upx; 
}

.goods-content{
	
	margin: 40upx;
	padding: 10upx;
	display: flex;
	flex-direction: column;
}
.goods-content view{
	border-width:2upx;
	display: flex;
	flex:1;
	box-sizing: border-box;
	
}
.goods-content text{
	flex: 1;
	text-align: center;

}
.goods-content text:last-child{

	border-left-width:0;
	flex: 3;
}
</style>
