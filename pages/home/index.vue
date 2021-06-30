
<template>
	<view>
		<!-- <page-head :title="title"></page-head> -->
		<view class="page-body tui">
			<header></header>
			<scroll-view v-if="bodyShow" class="main-content" :style="'height:'+windowHeight+'px'" @scrolltoupper="scrolltoupper" style="flex: 1;" :lower-threshold="100"  @scroll="scroll"  @scrolltolower="scrolltolower" scroll-y>
				
				<view v-if="bigAdData.length>0" style="height: 300upx;width: 100vw;">
					<big-ad  ref="bigAd"  :bigAd="bigAdData" :autoplay="bigAdAutoplay"></big-ad>
				</view>

				<view class="uni-flex-item" >
					<index-shop-list   ref="productList" :productList="productListData"></index-shop-list>
				</view>
				<view class="" @tap="loadData">
					<uni-load-more :loadingType="loadingType" :contentText="contentText"></uni-load-more>
				</view>
				<view style="height: 90upx;"></view>
			</scroll-view>
			<footer class="uni-flex tui-bottom-nav">
				<bottom-nav></bottom-nav>
			</footer>	

		</view>
	</view>
</template>
<script>
// 	var scrollTop=0;//记录上次滚动的html标签与屏幕顶部的距离
// 	var scrollTopPx=100;//滚动条滚动范围距离上次大于xx像素开始触发事件
// 	var scrollTime=300;//滚动条定时器间隔触发时间毫秒 防止触发频率太高性能下降
// 	var scrollTimeout=0;//记录懒加载定时触发器
// 	var refreshTimeout=0;//上拉刷新定时器
	import indexShopList from '../../components/template/product/shopList.vue';
	import bottomNav from '../../components/template/nav/bottom.vue';
	import bigAd from '../../components/template/swiper/big-ad.vue';
	import uniLoadMore from '../../components/template/unit/uni-load-more.vue';
	import Url from '../../common/utils/Url';
	import request from '../../request/ajax.js'
	export default {
		components: { 
			bigAd,bottomNav,indexShopList,uniLoadMore
		},
		name: "indexIndex",
		data() {
			return {
				windowHeight:0,//手机屏幕高度
				scrollTop:0,//记录上次滚动的html标签与屏幕顶部的距离
				scrollTopPx:100,//滚动条滚动范围距离上次大于xx像素开始触发事件
				scrollTime:300,//滚动条定时器间隔触发时间毫秒 防止触发频率太高性能下降
				scrollTimeout:0,//记录懒加载定时触发器
				refreshTimeout:0,//上拉刷新定时器
				timeOut:0,
				title:'首页',
				bodyShow:false,
				bigAdData:[],//大屏广告数据替换
				bigAdAutoplay:true,//大屏广告自动滚动开关
				loadingType: 1,//加载圈圈
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				productListData:[],//传给子组件商品列表信息
				searchInput:'',
				index:0,
				//loading:0,//下拉加载开启
				number:2,//每页请求数量

			}
		},
		methods: {
			goTo(e){
				// var host=this.$config.host;
				console.log('gotoindex')
// 				request.get(host,{},function(res){
// 					console.log(res)
// 				})
				// console.log(Url.urlEncode(e))
				console.log('gotoindex')
				
				uni.navigateTo({
				    url: '/pages/goods/detail?'+Url.urlEncode(e)
				});
			},
			scrolltoupper(){
				
				// if(!this.bigAdAutoplay){
					console.log(this.bigAdAutoplay+'滚动顶部触发-开启自动滚动和下拉刷新功能')
					this.bigAdAutoplay=true;
					this.switchPullRefresh(true);//开启下拉刷新
				// }
			},
			scrolltolower(e){
				console.log(this.loadingType);
				// 如果下来触发状态未关闭 将会触发请求服务器
				if(this.loadingType!=2){
				console.log("滚动底部触发")
					clearTimeout(this.timeOut)
						this.timeOut=setTimeout(()=> {
							this.loadData();
						}, 100);

				}
				// 滚到底部或者右边触发
			},
			loadAdData(){
// 			var host=this.$config.host+"ad/big";//主服务器地址
// 			console.log(host)
// 			request.get(host,{},(res)=>{
// 				console.log("请求bigAd")
// 				console.log(res)
// 				if(res.data.data.length<this.number){
// 					
// 					// 如果服务器端数据少于20条关闭下拉触发
// 					this.loadingType=0;
// 				}else{
// 					var bigAd=(res.data.data).slice(0,5)
// 						// console.log(bigAd)
// 						for(let i=0;i<bigAd.length;i++){
// 							// 判断图片地址是站内或站外，替换链接地址http
// 							let src='';
// 							if(bigAd[i].image.indexOf("http")<0){
// 								src=this.$config.server.image;
// 							}
// 							bigAd[i].image= src+bigAd[i].image;
// 						}
// 						this.bigAdData=bigAd;
// 
// 				}
// 			})

			},
			scroll(e){
				var self=this;
				// console.log(e.detail.scrollTop)
				var Top=e.detail.scrollTop;
				// 控制顶部大屏广告在屏幕中触发自动滚动生效的所在位置
				if(Top>10 && this.bigAdAutoplay){
					// console.log(this.bigAdAutoplay+'关闭自动滚动')
				this.bigAdAutoplay=false;
				this.switchPullRefresh(false);//关闭下拉刷新
				}
				// 控制商品列表 滚动条滚动达到距离 触发懒加载
				if(Top>this.scrollTop+this.scrollTopPx){
					this.scrollTop=Top;
					clearTimeout(this.scrollTimeout);
					this.scrollTime
					this.scrollTimeout=setTimeout(()=>{
						// console.log('触发懒加载扫描')
						this.$refs.productList.load()
					},self.scrollTime)
				}
			},
			 loadData(action = 'add') {
				
					if (action === 'refresh') {
							this.productListData = [];
						var host=this.$config.host+"";//主服务器地址
							request.get(host,{},(res)=>{
								console.log(res.data)
										if(res.data.length<this.number){
											// 如果服务器端数据少于20条关闭下拉触发
											this.loadingType=0;
										}else{
											this.p=0;
												var bigAd= res.data.data.adList;
												for(let i=0;i<bigAd.length;i++){
													// 判断图片地址是站内或站外，替换链接地址http
													let src='';
													if(bigAd[i].image.indexOf("http")<0){
														src=this.$config.server.image;
													}
													bigAd[i].image= src+bigAd[i].image;
												}
												this.bigAdData=bigAd;
												var shopList= res.data.data.shopList;
												for(let i=0;i<shopList.length;i++){
													// 判断图片地址是否来自站外
													let src='';
													if(shopList[i].image.indexOf("http")<0){
														src=this.$config.server.image;
													}
													shopList[i].juli=parseInt(shopList[i].id*6+1)+325*3;//这里只是模拟距离运算。
							
												}
												this.productListData=this.productListData.concat(shopList)
												this.bodyShow=true;
										}
										uni.hideLoading();
							
								})
					}else{
					var host=this.$config.host+"shop/list/"+this.p;//主服务器地址
					request.get(host,{},(res)=>{
						var data= res.data.data;
						console.log(data.length);
								if(data.length<this.number){
									// 如果服务器端数据少于20条关闭下拉触发
									this.loadingType=2;
								}else{
									this.p=this.p+1;
									for(let i=0;i<data.length;i++){
										// 判断图片地址是否来自站外
										let src='';
										if(data[i].image.indexOf("http")<0){
											src=this.$config.server.image;
										}
										data[i].juli=parseInt(data[i].id*6+1)+325*3;//这里只是模拟距离运算。
				
									}
									this.productListData=this.productListData.concat(data)
									this.bodyShow=true;
								}
								uni.hideLoading();
					
						})	
					}

			},
			tijiao(item){
				console.log(item)
				uni.navigateTo({
					url: item.url
				});

		},refresh(){
			var that=this;
			clearTimeout(that.timeOut);
			var timeOut=setTimeout(function () {
				uni.redirectTo({
					url: 'index'
				});
				// 异步加载 防止组件未加载完成 数据先进去了
				// console.log(that.$refs.productList.productList)	
					// that.loadData('refresh');//加载列表数据
					// that.$refs.productList.goTo=that.goTo;
					// that.loadAdData();//加载广告数据
			}, 100);
		},

			switchPullRefresh(status=true) {
				// console.log('is support:' + status);
				// #ifdef APP-PLUS
				// 5+ 手机端的下拉刷新功能
				const pages = getCurrentPages();
				const page = pages[pages.length - 1];
				const currentWebview = page.$getAppWebview();

				currentWebview.setStyle({
					pullToRefresh: {
						support: status,
						style: plus.os.name === 'Android' ? 'circle' : 'default'
					}
				});
				// #endif

			}
		},
		mounted: function (){
			var that=this;
			// el渲染完成触发
			this.$nextTick(function () {
				// this.refresh('refresh')
				that.loadData('refresh');//加载列表数据
				// that.$refs.productList.goTo=that.goTo;
				that.loadAdData();//加载广告数据
		  })
			
		},
    onLoad: function (options) {
		this.windowHeight=uni.getSystemInfoSync().windowHeight;
			uni.showLoading({
				title: '加载中'
			});
			// 页面加载完毕触发
//     uni.startPullDownRefresh();
    },
		// 下拉刷新效果关闭
    onPullDownRefresh() {
        // console.log('refresh');
				var self=this;
				clearTimeout(this.refreshTimeout)
        this.refreshTimeout=setTimeout(function () {
						self.refresh()
            uni.stopPullDownRefresh();
        }, 1000);
    }
	}
</script>

<style>

	.load-more{
		height: 3em;
		
	}
	header{

	}

footer{
	
	background: #fff;
	/* background: #007AFF; */
	left: 0;
	right: 0;
	position:fixed;
	bottom: 0;

}

</style>
