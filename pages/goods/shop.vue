<template>

	<view class="uni-page-body tui">
<!-- 		<view class="item">
			营业时间
		</view> -->
		<!-- <view class="header"> -->
<!-- 			<view class="input-view">
				<uni-icon type="search" size="22" color="#666666"></uni-icon>
				<input confirm-type="search" @confirm="confirm" class="input" type="text" placeholder="输入搜索关键词" />
			</view> -->
			
			<!-- #ifdef MP-WEIXIN -->
<!-- 			<view class="icon" @tap="showRightDrawer">
				<uni-icon type="bars" color="#666666" size="22"></uni-icon>
			</view>
			<view class="nav-badge">
			<text v-if="totalCart>0" class="uni-badge uni-badge-warning">{{totalCart}}</text>
			</view> -->
			<!-- #endif -->
		<!-- </view> -->
		<!-- <view class="" v-if="detailShow"> -->
			<!-- <drawer-bottom  ref="drawerBottom"   :goods="detail"  v-on:change="goodsUpdate"></drawer-bottom> -->


			<nav class="uni-flex bottom-nav" style="">

				<view class="uni-flex-item uni-flex center" style="justify-content: space-around;">
					<view class="icon center item flex" @tap="goPage('about')">
						<icon class="iconfont icon-xuzhixianxiao" style="font-size: 1.4em;line-height: 0.6em;"></icon>
						<text style="font-size:0.8em ;">店家</text>
					</view>
					<view class="icon center item flex" @tap="goPage('chat')">
						<icon class="iconfont icon-kefu" style="font-size: 1.4em;line-height: 0.6em;"></icon>
						<text style="font-size:0.8em ;">客服</text>
					</view>
					<view class="icon center item flex" @tap="goPage('order')">
						<icon class="iconfont icon-dingdanjihe" style="font-size: 1.4em;line-height: 0.6em;"></icon>
						<text style="font-size:0.8em ;">订单</text>
					</view>
					<view class="icon center item flex" @tap="goPage('wode')">
						<icon class="iconfont icon-wode" style="font-size: 1.4em;line-height: 0.6em;"></icon>
						<text style="font-size:0.8em ;">我的</text>
					</view>
					<!-- 导航微信 -->
				</view>
				<button type="warn" @tap="goPage('cart')">下单</button>
				<!-- <uni-nav-bar left-icon="back" left-text="返回" right-text="菜单" title="标题"></uni-nav-bar> -->
			</nav>

		<view v-if="isShow" class="page-body flex row" style="margin-bottom: 100rpx;">

					<scroll-view scroll-y class=" flex center column" style="width: 180rpx; " :style="{height:contentHeight + 'px'}">
							<view class="item border cebian-list"   @click="categoryClickMain(null,{id:null})"  :class="categoryActive==null?'active':''">
												全部
							</view>
							<view class="item cebian-list border relative"   @click="categoryClickMain(idx,item)" :key="idx" :style="idx==categoryActive?'opacity:0.7;color:red':'opacity:1;color:;'" v-for="(item,idx) in category">
												{{item.name}}
												<view class="nav-badge absolute" style="top:0;right: 0;">
												<text v-if="item.total" class="uni-badge uni-badge-warning">{{item.total}}</text>
												</view>
							</view>
					</scroll-view>
					<scroll-view class="scrollList" scroll-y :scroll-into-view="scrollViewId" :style="{height:contentHeight + 'px'}">
							<view class="nav-item" v-if="categoryList">
									<view  v-if="categoryId==item.categoryId||categoryId==null" class="flex border list" style="height: 100%;" v-for="(item,key) in categoryList" :key="key">
										
										<view class="center absolute" style="right: 20rpx;">
											<icon v-if="item.selected" type="success" color="#32CD32" :data-index="key"  class="cart-pro-select" @tap="selectList(item,key,true)"/>
											<icon v-else type="circle" class="cart-pro-select" :data-index="key" @tap="selectList(item,key,false)" />
											<!-- @tap="selectList(key)" -->
										</view>
										<!-- @tap="tapDetail(item,key,item.selected);" -->
											<image    style="height:130rpx;width: 130rpx;" :src="item.image" mode="aspectFill" />
										<view  class="flex item  column" style="padding: 0 20rpx;height: 130rpx;"  >
												<view class="weight">{{item.title}}</view>
												<view>
													<text style="color: red;">¥{{item.price}} </text>
													<text style="text-decoration:line-through;font-size:0.8em ;">¥{{item.newprice}}</text>
												</view>
												
												<view v-if="item.version" class="flex color-ju"  @tap="versionTap">

														<view  class="colorj iconfont icon-jia-shixin">
														</view>
													<view v-if="item.version"  class="item"  style="white-space: nowrap;box-sizing: border-box;overflow-y:hidden;overflow-x:auto;width: 100rpx; "><text class="uni-badge"  style="" :style="item.versionName==vn.name?'color:red':''" v-for="(vn,vIdx) in item.version" :key="vIdx" >{{vn.name}}:¥{{vn.price}}</text>
													</view>
												</view>

										</view>
									</view>
							</view>
						</scroll-view>
		</view>


</view>
</template>

<script>

		import Storage from "../../common/utils/Storage.js";
		import uniDrawer from '../../components/template/drawer/drawer.vue';

		import shop from"../../request/data/shop.js";

		var timeOut='';
		export default {
			components: {

				uniDrawer,
				// uniIcon,
			},
			data() {
				return {
					title: 'grid',
					lists: {},
					touchmove: false,
					touchmoveIndex: -1,
					itemHeight: 0,
					winHeight: 0,
					scrollViewId: "A",
					titleHeight: 0,
					contentHeight:0,
					
					rightDrawerVisible: false,
					categoryActive:0,
					categoryId:null,
					index:0,
					isShow:true,
					detailShow:false,
					detailIndex:0,
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
						},
					categoryList:[],//商品列表
					selectGood:{},
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
										},{
										name:'果味',
										id:'7',
									},
									{
										name:'蔬菜',
										id:'8',
									},
									{
										name:'炒货',
										id:'9',
									},
									
								],
		
			};
		},mounted:function () {
			
			let winHeight = uni.getSystemInfoSync().windowHeight;
			//创建节点选择器 获取底部导航高度 
				this.contentHeight=(winHeight-uni.upx2px(100));
				this.winHeight = winHeight;
				// console.log(shop)
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
			versionTap(){
				uni.showModal({
					title:"请在下单后进行选择",
					// content:"请在下单后进行选择"
				})
			},
			goodsUpdate(e){
				// console.log(e)
				console.log('goodsUpdate')
				this.$set(this.categoryList[this.detailIndex],this.detailIndex,e)
				// this.categoryList[this.detailIndex]=e;
				this.selectList(this.detailIndex)
			},
			commit(){
				
				this.$set(this.categoryList,this.detailIndex,this.detail)
			},
// 			selectVersion(index,vIndex) {
// 
// 					var categoryList = this.categoryList;
// 					var version=categoryList[index].version;
// 					for(let i=0;i<version.length;i++){
// 						if(i!=vIndex){
// 							version[i].selected = false;
// 						}else{
// 							version[i].selected = true;
// 							categoryList[index].versionIndex=i;
// 							categoryList[index].versionName=version[i].name || categoryList[index].title;
// 							categoryList[index].price=version[i].price ||categoryList[index].price;
// 							categoryList[index].image=version[i].image ||categoryList[index].image;
// 						}
// 					}
// 					this.$set(this.categoryList,index,categoryList[index])
// 			},
// 			tapDetail(item,idx,selected){
// 				// console.log('selected'+selected);
// // 
// 				// if(this.detailShow && this.detailIndex==idx){
// 					if(selected){
// 						// console.log('真的selected'+selected);
// 						this.selectList(idx)
// // 					this.detailShow=false;
// 				}else{
// 					this.selectList(idx)
// 					// console.log('假的selected'+selected);
// 					// this.detailIndex=idx;
// 					// this.detail=item;
// 					// this.$refs.drawerBottom.drawerBottomShow=true;
// 					// this.detailShow=true;
// 				}
// 				
// 
// 				// console.log(item)
// 			},
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
							url="/pages/order/list?id=2";
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
			countSelect(){
				
			},
			selectList(item,index,selected) {

							// var categoryList =Object.assign({},this.categoryList);//深度拷贝源数据防止联动改变值
							var item=Object.assign({},item);
									var selected = selected || item.selected ||false;

									var category=this.category.concat();

									var categoryId=item.categoryId;


									var cateIdx=0;
									for(let i=0;i<category.length;i++){
										if(category[i].id==categoryId){
											// 根据分类id 把角标数量赋值
											cateIdx=i;

											if(!category[i].total){
												category[i].total=0;
											}
											if(selected){
												category[i].total--;	
											}else{
												category[i].total++;
											}
						
										}
									}
											item.selected = !selected;
			
									this.$set(this.category,cateIdx,category[cateIdx]);

									this.$set(this.categoryList,index,item)

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

			categoryClickMain(idx,item){
				this.categoryId=item.id;
				this.categoryActive=idx;
			},

		}
	}
</script>

<style>

.scrollList {
	flex: 1;
	height: 100vh;
}
.cebian-list{
	width: 180rpx;
	font-size:1em;
	line-height: 3em;
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
	
	
</style>
