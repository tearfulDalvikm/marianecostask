<template>

	<view class="uni-page-body tui ">
		<view class="header">
			<view class="input-view">
				<uni-icon type="search" size="22" color="#666666"></uni-icon>
				<input confirm-type="search" @confirm="confirm" class="input" type="text" placeholder="输入搜索关键词" />
			</view>
			<!-- #ifdef MP-WEIXIN -->
			<view class="icon" @tap="showRightDrawer">
				<uni-icon type="bars" color="#666666" size="22"></uni-icon>
			</view>
			<view class="nav-badge">
			<text v-if="totalCart>0" class="uni-badge uni-badge-warning">{{totalCart}}</text>
			</view>
			<!-- #endif -->
		</view>
		<view v-if="detailShow" class="mask padding" style="padding: 50rpx; padding-bottom: 100rpx;">
					<view class="uni-card center">
							<view class="uni-card" @tap="detailShow=!detailShow" >
								<view class="center" style="padding-top: 20rpx;">
									<view class="tip padding" style="right: 15rpx;">关闭</view>
									<image  :src="categoryList[detailIndex].image" mode="aspectFill"></image>
								</view>
								<view class="center weight" style="font-size: 1.2em;">
								{{categoryList[detailIndex].title}}
								</view>
							</view>
							<view class="flex column">
								<view>
									<text style="color: red;">¥{{categoryList[detailIndex].price}} </text>
									<text style="text-decoration:line-through;font-size:0.8em ;">¥{{categoryList[detailIndex].newprice}}</text>
								</view>
								<view>库存:{{categoryList[detailIndex].stock}}</view>
								<view class="item center uni-flex-item" style="font-size:2em ;">
									<number-box :min="1" :max="categoryList[detailIndex].stock" :item="categoryList[detailIndex]" :value="categoryList[detailIndex].number" :other="{index:detailIndex}" v-on:change="numberUpdate"></number-box>
								</view>
							</view>
							<view class="uni-card flex column ">
									<view class="flex border">
										<view class="item center">版本</view>
										<view class="item center">单价</view>
									</view>
									<view  class="flex center border" v-for="(vItem,k) in categoryList[detailIndex].version" :key="k">
										
											<view class="item center">{{vItem.name}}</view>
											<view class="item center" style="color:red">¥{{vItem.price}}</view>
										<view class="center" style="position: absolute;right: 20rpx;">
											<icon v-if="vItem.selected" type="success" color="#32CD32"   class="cart-pro-select" @tap="selectVersion(detailIndex,k)"/>
											<icon v-else type="circle" class="cart-pro-select"  @tap="selectVersion(detailIndex,k)"/>
										</view>
									</view>
							</view>
							<button type="primary" @tap="detailShow=!detailShow" >确认</button>
					</view>
					
		</view>
<!-- 				<view v-if="detailShow" class="mask">
							<view class="uni-card">
									<view class="uni-card" >
										<view class="nav-right-item-image padding"  >
											<image v-on:click="detailShow=!detailShow" :src="detail.image" mode="aspectFill" />
										</view>
										<view class="center weight" style="font-size: 1.2em;">
										{{detail.title}}
										</view>
									</view>
									<view class="item">
										<view>
											<text style="color: red;">¥{{detail.price}} </text>
											<text style="text-decoration:line-through;font-size:0.8em ;">¥{{detail.newprice}}</text>
										</view>
										<view>库存:{{detail.stock}}</view>
										<view class="" style="font-size:2em ;">
											<number-box :min="0" :max="9"></number-box>
										</view>
									</view>
									<view class="uni-card flex column ">
											<view class="flex border">
												<view class="item center">版本</view>
												<view class="item center">单价</view>
											</view>
											<view  class="flex center border" v-for="(item,key) in detail.version" :key="key">
												
													<view class="item center">{{item.name}}</view>
													<view class="item center" style="color:red">¥{{item.price}}</view>
												
											</view>
									</view>
							</view>
				</view> -->
			<nav class="uni-flex bottom-nav" style="">

				<view class="uni-flex-item uni-flex center" style="justify-content: space-around;">
					<view class="icon center" @tap="showRightDrawer">
						<icon class="iconfont icon-945caidan_jiyao" style="font-size: 1.4em;line-height: 0.6em;"></icon>
						<text style="font-size:0.8em ;">菜单</text>
					</view>
					<view class="icon center" @tap="goPage('chat')">
						<icon class="iconfont icon-kefu" style="font-size: 1.4em;line-height: 0.6em;"></icon>
						<text style="font-size:0.8em ;">客服</text>
					</view>
					<view class="icon center" @tap="goPage('order')">
						<icon class="iconfont icon-dingdanjihe" style="font-size: 1.4em;line-height: 0.6em;"></icon>
						<text style="font-size:0.8em ;">订单</text>
					</view>
					<view class="icon center" @tap="goPage('wode')">
						<icon class="iconfont icon-wode" style="font-size: 1.4em;line-height: 0.6em;"></icon>
						<text style="font-size:0.8em ;">我的</text>
					</view>
					<!-- 导航微信 -->
				</view>
				<button type="warn" @tap="goPage('cart')">去下单</button>
				<!-- <uni-nav-bar left-icon="back" left-text="返回" right-text="菜单" title="标题"></uni-nav-bar> -->
			</nav>
<!-- 		<view class="container " style="margin-bottom: 160rpx;"> -->
		<view v-if="isShow" class="page-body" style="margin-bottom: 120rpx;">
<!-- 			<view class="nav-left" >
				<view class="nav-left-item" @click="categoryClickMain(index,item)" :key="index" :class="index==categoryActive?'active':''"
					v-for="(item,index) in categoryList">
					{{item.name}}
					<view class="nav-badge">
					<text v-if="item.number" class="uni-badge uni-badge-warning">{{item.number}}</text>
					</view>
				</view>
			</view> -->
			<!-- <scroll-view class="nav-right" scroll-y :scroll-top="scrollTop" @scroll="scroll"  scroll-with-animation> -->
				<view class="nav-item" v-if="categoryList">
						<view  :id="key" v-if="categoryId==item.categoryId||categoryId==null" class="flex border list" style="height: 100%;" v-for="(item,key) in categoryList" :key="key">
							
							<view class="center absolute" style="right: 20rpx;">
								<icon v-if="item.selected" type="success" color="#32CD32" :data-index="key"  class="cart-pro-select" @tap="selectList(key)"/>
								<icon v-else type="circle" class="cart-pro-select" :data-index="key" @tap="selectList(key)"/>
							</view>
							<!-- {{item}} -->
							<!-- <view class="item" > -->
								<image @tap="tapDetail(item);detailIndex=key" class="item"  style="height:130rpx;width: 50%;" :src="item.image" mode="aspectFill" />
							<!-- </view> -->
							<view  class="flex item  column" style="padding: 0 20rpx;height: 130rpx;width: 50%;"  >
									<view class="weight">{{item.title}}</view>
									<view>
										<text style="color: red;">¥{{item.price}} </text>
										<text style="text-decoration:line-through;font-size:0.8em ;">¥{{item.newprice}}</text>
									</view>
									
									<view v-if="item.version" class="flex" style="">
										<!-- white-space: nowrap;box-sizing: border-box;overflow-x: auto; -->
										<!-- overflow:hidden; white-space: nowrap; -->
										<!-- <view class="flex center " style="width: 2em"> -->
											<view @tap="tapDetail(item);detailIndex=key" class="colorj iconfont icon-jia-shixin">
												<!-- <icon class="iconfont icon-jia-shixin center" style="line-height: auto;"></icon> -->
											</view>
										<!-- </view> -->
										<view class="" style="white-space: nowrap;box-sizing: border-box;overflow-x: auto;margin: 0;line-height: 1em; ">
											
											<text class="tag"  style="line-height: 0;" :style="item.versionName==vn.name?'color:red':''" v-for="(vn,vIdx) in item.version" :key="vIdx" >
												{{vn.name}}
											</text>
										</view>
										<!-- 库存:{{item.stock}} -->
									</view>

							</view>
						</view>
				</view>
				<!-- <page-foot :name="name" v-if="subCategoryList.length > 1"></page-foot> -->
			<!-- </scroll-view> -->
		</view>


	<!-- </view> -->
			<uni-drawer  :visible="rightDrawerVisible" mode="right" @close="closeRightDrawer">
				<view class="drawer-content flex center column" style="">

					<button class="item" style="width: 100%;" @click="categoryClickMain(index,item),closeRightDrawer()" :key="index" :class="index==categoryActive?'active':''"
										v-for="(item,index) in category">
										{{item.name}}
										<view class="nav-badge">
										<text v-if="item.total" class="uni-badge uni-badge-warning">{{item.total}}</text>
										</view>
					</button>
					<button class="item" style="width: 100%;" @click="categoryClickMain(null,{id:null}),closeRightDrawer()"  :class="index==categoryActive?'active':''">
										全部
<!-- 										<view class="nav-badge">
										<text v-if="item.total" class="uni-badge uni-badge-warning">{{item.total}}</text>
										</view> -->
					</button>
					<button class="item"  style="width: 100%;" type="warn" @tap="closeRightDrawer">关闭</button>
				</view>
			</uni-drawer>

</view>
</template>

<script>
		import Storage from "../../common/utils/Storage.js";
		import uniDrawer from '../../components/template/drawer/drawer.vue';
		import uniIcon from '../../components/template/icon/icon.vue';
		import numberBox from '../../components/template/box/number.vue';
		import shop from"../../request/data/shop.js";
		export default {
			components: {
				numberBox,
				uniDrawer,
				uniIcon
			},
			data() {
				return {
					rightDrawerVisible: false,
					categoryActive:'',
					categoryId:null,
					index:0,
					isShow:true,
					detailShow:false,
					detailIndex:0,
					detail:{
							title:"商品1",
							src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542463574450&di=435cc8ddb1d6422b217f30386cfd4de9&imgtype=0&src=http%3A%2F%2Fpic167.nipic.com%2Ffile%2F20180602%2F8952533_124808772000_2.jpg',
							stock:'13',
							price:'123',
							newprice:'99'
						},
					categoryList:[],//商品列表
					totalCart:0,//购物车商品总数量
					shopCart:{},		
				        category: [
									{
										name:'果味',
										id:'1',
									},
									{
										name:'蔬菜',
										id:'2',
									},
									{
										name:'炒货',
										id:'3'},
									{
										name:'点心',
										id:'4'},
									{
										name:'粗茶',
										id:'5',
									},
									{
										name:'淡饭',
										id:'6',
										}
								],
						// detail:[],
// 								curIndex: 0,
// 								isScroll: false,
// 								toView: 'guowei'
		
			};
		},mounted:function () {
			var self = this;
			console.log(shop)
			// shop
			this.categoryList=shop;
			// self.detail =res.data
			// 请求服务器
// 			var self = this;
// 				uni.request({
// 					url:'http://www.gdfengshuo.com/api/wx/cate-detail.txt',
// 					success(res){
// 						console.log(res.data)
// 						self.detail =res.data
// 					}
// 				});
		},methods:{
			selectVersion(index,vIndex) {

					var categoryList = this.categoryList;
					categoryList[index].selected = true;
					var version=categoryList[index].version;
					for(let i=0;i<version.length;i++){
						if(i!=vIndex){
							version[i].selected = false;
						}else{
							version[i].selected = true;
							categoryList[index].versionIndex=i;
							categoryList[index].versionName=version[i].name || categoryList[index].title;
							categoryList[index].price=version[i].price ||categoryList[index].price;
							categoryList[index].image=version[i].image ||categoryList[index].image;
						}
					}

					this.$set(this.categoryList,index,categoryList[index])
// 					cartData[index].selected = !selected;
// 					this.cartData=cartData;
// 					this.getTotalPrice();
			},
			tapDetail(item){
				console.log(item)
				this.detail=item;
				this.detailShow=true;
			},
				goPage(e){
					var url='';
					switch (e){
						case "cart":
									var goods=this.categoryList;
									var cart={};
									// cart[this.goods.id]=this.goods;
									for(let i=0;i<goods.length;i++){
										if(goods[i].selected){
											cart[goods[i].id]=goods[i];
										}
									}
									Storage.set('cart',cart,1000);
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
			},
			selectList(index) {
			// const index = e.currentTarget.dataset.index;
			let categoryList = this.categoryList;
			const selected = categoryList[index].selected || false;
			categoryList[index].selected = !selected;
			this.categoryList=categoryList;
			this.$set(this.categoryList,index,categoryList[index])
			// this.getTotalPrice();
			},
			/* 侧边菜单 */
			closeRightDrawer() {
				this.rightDrawerVisible = false;
			},
			showRightDrawer() {
				this.rightDrawerVisible = true;
			},
			confirm() {
				uni.showToast({
					title: '搜索'
				})
			},//侧边菜单完
			// 
			setNumber(e){
				console.log(e)
			},
			      // 购物数量增减 触发
			      numberUpdate(value,item,other) {
			
			      				item.number=value;
			      				// var categoryList =	this.categoryList;
			      				// this.categoryList[other.index]=item;
										this.$set(this.categoryList,other.index,item)
										// this.getTotalPrice()
			
			      },
// 			numberUpdate(value,item,other) {
// 				console.log(value)
// 				console.log(item)
// 				console.log(other)
// // 				this.numberValue = value;
// // 				this.detail.number=value;
// 				item.number=value;
// 				// 商品放进购物车
// 				if(item.number>=0){
// 					this.shopCart[other.id]=item;	
// 				}else{
// 					delete  this.shopCart[other.id];	
// 				}
// 				var shopCart =this.shopCart;
// 				var totalCart=0;
// 				for(var p in shopCart){
// 					totalCart+=shopCart[p].number;
// 				}
// 				this.totalCart=totalCart
// 			},
			categoryClickMain(index,item){
				this.categoryId=item.id;
				this.index=index;
			},
			    switchTab(e){
				  const self = this;
				  this.isScroll= true;
				  setTimeout(function(){
					self.toView= e.target.dataset.id;
					  self.curIndex=e.target.dataset.index;
				  },0)
				  setTimeout(function () {
					self.isScroll=false;
				  },1)
					
				}
		}
	}
</script>

<style>
	page{

	}
	view{
		height: auto;
	}
	/* 侧边菜单 */
.header {
		display: flex;
		flex-direction: row;
		padding: 10px 15px;
		align-items: center;
	}

	.input-view {
		display: flex;
		align-items: center;
		flex-direction: row;
		background-color: #e7e7e7;
		height: 30px;
		border-radius: 15px;
		padding: 0 10px;
		flex: 1;
	}

	.input {
		flex: 1;
		padding: 0 5px;
		height: 24px;
		line-height: 24px;
		font-size: 16px;
	}

	.icon {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-left: 10px;
	}


	.drawer-content {
		padding: 15px;
	}

	.drawer-content>.title {
		font-size: 18px;
	}

	.drawer-content>.text {
		font-size: 15px;
	}

	.drawer-content>.button {
		font-size: 14px;
	}
	/* 侧边菜单完*/
	
/* 	.nav-item{
		width: 100%;
	}
		.nav-right-item {
			width: 100%;
			display: flex;
		}
		.nav-right-item-text{
			flex: 1;
		}
	.nav-right-item-image{
		display: flex;
		justify-content: center;
		text-align: center;
		box-sizing: border-box;
		width: 90%;
		flex: 2;
	}
		.nav-right-item image {
			box-sizing: border-box;
			width: 90%;
			height: 90%;
			padding: 10upx;
		}
	 */
/* 		.active {
			color: #007AFF;
		} */
	
</style>
