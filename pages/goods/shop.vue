<template>

	<view class="page-body tui">

			<nav class="uni-flex tui-bottom-nav" style="">

				<view class="uni-flex-item uni-flex tui-center" style="justify-content: space-around;padding: 0;">
					<icon class="iconfont icon-xuzhixianxiao tui-flex tui-column" style="font-size: 1.4em;line-height: 0.8em;" @tap="goPage('about')">
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
					<!-- 导航微信 -->
				</view>
				<button class="" type="warn" size="mini" @tap="goPage('cart')" style="padding: 0;line-height:100upx; width: 100upx; justify-content: center;">下单</button>
				<!-- <uni-nav-bar left-icon="back" left-text="返回" right-text="菜单" title="标题"></uni-nav-bar> -->
			</nav>

		<view v-if="isShow" class="main-content tui-flex tui-row" :style="{height:contentHeight + 'px'}">

					<scroll-view scroll-y class="tui-flex tui-center tui-column" style="width: 180upx; " :style="{height:contentHeight + 'px'}">
							<view class="tui-item tui-border cebian-list"   @click="categoryClickMain(null,{id:null})"  :class="categoryActive==null?'active':''">
												全部
							</view>
							<view class="tui-item cebian-list tui-border tui-relative"   @click="categoryClickMain(idx,item)" :key="idx" :style="idx==categoryActive?'opacity:0.7;color:red':'opacity:1;color:;'" v-for="(item,idx) in category">
									{{item.name}}
									<view class="tui-nav-badge tui-absolute" style="top:0;right: 0;">
										<text v-if="item.total" class="uni-badge uni-badge-warning">{{item.total}}</text>
									</view>
							</view>
					</scroll-view>
					<scroll-view class="uni-flex-item" scroll-y :scroll-into-view="scrollViewId" :style="{height:contentHeight + 'px'}">
							<view class="content-right" v-if="goodsList">
									<view  v-if="categoryId==item.category_id||categoryId==null" class="tui-flex tui-border tui-list" style="" v-for="(item,key) in goodsList" :key="key">
										
										<view class="tui-center tui-absolute" style="right: 20upx;">
											<icon v-if="item.selected" type="success" color="#32CD32" :data-index="key"  class="cart-pro-select" @tap="selectList(item,key,true)"/>
											<icon v-else type="circle" class="cart-pro-select" :data-index="key" @tap="selectList(item,key,false)" />

										</view>
										<!-- @tap="tapDetail(item,key,item.selected);" -->
											<image    style="height:130upx;width: 130upx;" :src="item.image" mode="aspectFill" />
										<view  class="tui-flex tui-item  tui-column" style="padding: 0 20upx;height: 130upx;"  >
												<view class="tui-title">{{item.title}}</view>
												<view>
													<text style="color: red;">¥{{item.price}} </text>
													<text style="text-decoration:line-through;font-size:0.8em ;">¥{{item.oldPrice}}</text>
												</view>
												
												<view v-if="item.version" class="tui-flex color-ju "  @tap="versionTap">
													<view  class="iconfont icon-jia-shixin tui-center">
													</view>
													<view v-if="item.version"  class="tui-item "   style="white-space: nowrap;box-sizing: border-box;overflow-y:hidden;overflow-x:auto;width: 100upx; "><text class="uni-badge"  style="font-size: 0.8em;" :style="item.versionName==vn.name?'color:red':''" v-for="(vn,vIdx) in item.version" :key="vIdx" >{{vn.name}}:¥{{vn.price}}</text>
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
		// import uniDrawer from '../../components/template/drawer/drawer.vue';
		import ajax from "../../request/ajax.js"
		var timeOut='';
		export default {
			components: {
				// uniDrawer,
				// uniIcon,
			},
			data() {
				return {

					winHeight: 0,
					contentHeight:0,
					

					categoryActive:0,
					categoryId:null,
					index:0,
					isShow:true,

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
					goodsList:[],//商品列表
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
								}
							],
		
			};
		},mounted:function () {
			
			let winHeight = uni.getSystemInfoSync().windowHeight;
			//创建节点选择器 获取底部导航高度 
				this.contentHeight=(winHeight-uni.upx2px(100));
				this.winHeight = winHeight;



		},onLoad(e) {
			uni.showLoading({
				title: '加载中'
			});
			var id=e.id
			console.log(e)
						// 请求服务器
			var self = this;
			var host=this.$config.host+"shop/"+id;//主服务器地址
			ajax.get(host,(res)=>{
				
				// var shops=res.data.data ||{};
				var goodsList=res.data.data.goodsList;
				for(let i=0;i<goodsList.length;i++){
				// 判断图片地址是站内或站外，替换链接地址http
					let src='';
					if(goodsList[i].image.indexOf("http")<0){
						src=this.$config.server.image;
					}
					goodsList[i].image= src+goodsList[i].image;
				}
				self.goodsList=goodsList;
				
				
				var category=res.data.data.category;
// 				for(let i=0;i<category.length;i++){
// 				// 判断图片地址是站内或站外，替换链接地址http
// 					let src='';
// 					if(category[i].image.indexOf("http")<0){
// 						src=this.$config.server.image;
// 					}
// 					category[i].image= src+category[i].image;
// 				}
					uni.hideLoading();
				self.category=category;
				console.log(res.data.data)
			})
		},methods:{
			versionTap(){
				uni.showModal({
					title:"提示",
					content:"请在下单后进行选择"
				})
				
			},
			goodsUpdate(e){
				// console.log(e)
				console.log('goodsUpdate')
				this.$set(this.goodsList[this.detailIndex],this.detailIndex,e)
				// this.categoryList[this.detailIndex]=e;
				this.selectList(this.detailIndex)
			},
			commit(){
				
				this.$set(this.goodsList,this.detailIndex,this.detail)
			},

				goPage(e){
					var url='';
					switch (e){
						case "cart":
									var goods=this.goodsList;
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
				
			},selectList(item,index,selected) {
				console.log(item)
				// console.log(JSON.stringify(item)+index+selected)
							// var categoryList =Object.assign({},this.categoryList);//深度拷贝源数据防止联动改变值
							var item=Object.assign({},item);
									var selected = selected || item.selected ||false;

									var category=this.category.concat();

									var categoryId=item.category_id;


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
									if(category[cateIdx]){
										this.$set(this.category,cateIdx,category[cateIdx]);
									}
									this.$set(this.goodsList,index,item)

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
	width: 180upx;
	font-size:1em;
	line-height: 3em;
}
.content-right{
	text-align: left;
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
