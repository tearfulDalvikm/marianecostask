
<template>
	<view>
		<!-- <page-head :title="title"></page-head> -->
		<view class="page-body">
			<header></header>
			<scroll-view v-if="bodyShow" class="main-content" @scrolltoupper="scrolltoupper" style="flex: 1;" :lower-threshold="100"  @scroll="scroll"  @scrolltolower="scrolltolower" scroll-y>
				
				<view v-if="bigAdData.length>0" style="height: 300upx;width: 100vw;">
					<big-ad  ref="bigAd"  :bigAd="bigAdData" :autoplay="bigAdAutoplay"></big-ad>
				</view>
					
		<!-- 			    <view class="search">
								<view class="search-text" @tap="tijiao(2)" @onceAgain="tijiao(2)">
									<icon  class="weui-icon-search_in-box search-icon"   @tap="search('searchInput')" :color="[searchInput?'#1AAD19':'']" type="search" size="14"></icon>
									<input type="text" v-model="searchInput"  placeholder="搜索" />
									<i v-if="searchInput" class="iconfont icon-guanbijiantou" @tap="clean('searchInput')"></i>
								</view>
						</view> -->
				<view class="uni-flex-item" >
					<product-list   ref="productList" :productList="productListData"></product-list>
				</view>
				<view class="" @tap="loadData">
					<uni-load-more :loadingType="loadingType" :contentText="contentText"></uni-load-more>
				</view>

			</scroll-view>
			<footer>
				<bottom-nav></bottom-nav>
			</footer>	

		</view>
	</view>
</template>
<script>
	var scrollTop=0;//记录上次滚动的html标签与屏幕顶部的距离
	var scrollTopPx=100;//滚动条滚动范围距离上次大于xx像素开始触发事件
	var scrollTime=300;//滚动条定时器间隔触发时间毫秒 防止触发频率太高性能下降
	var scrollTimeout=0;//记录懒加载定时触发器
	var refreshTimeout=0;//上拉刷新定时器
	import productList from '../../components/template/product/list.vue';
	import bottomNav from '../../components/template/nav/bottom.vue';
	import bigAd from '../../components/template/swiper/big-ad.vue';
	import uniLoadMore from '../../components/template/unit/uni-load-more.vue';
	import Url from '../../common/utils/Url';
	import request from '../../request/ajax.js'
	export default {
		name: "indexIndex",
		data() {
			return {
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
				// 如果下来触发状态未关闭 将会触发请求服务器
				if(this.loadingType){
					clearTimeout(timeOut)
						var  timeOut=setTimeout(()=> {
							this.loadData();
						}, 100);

				}
				console.log("滚动底部触发")
				// 滚到底部或者右边触发
			},
			loadAdData(){
			var host=this.$config.host+"bigAd.json";//主服务器地址
			request.get(host,{},(res)=>{
				console.log("请求")
				console.log(res)
				if(res.data.data.length<this.number){
					
					// 如果服务器端数据少于20条关闭下拉触发
					this.loadingType=0;
				}else{
					var bigAd=(res.data.data).slice(0,5)
						console.log(bigAd)
						this.bigAdData=bigAd;

				}
			})

			},
			scroll(e){
				// console.log(e.detail.scrollTop)
				var Top=e.detail.scrollTop;
// 				console.log(Top)
// 				console.log(scrollTop)
				// 控制顶部大屏广告在屏幕中触发自动滚动生效的所在位置
				if(Top>10 && this.bigAdAutoplay){
					// console.log(this.bigAdAutoplay+'关闭自动滚动')
				this.bigAdAutoplay=false;
				this.switchPullRefresh(false);//关闭下拉刷新
				}

				// 控制商品列表 滚动条滚动达到距离 触发懒加载
				if(Top>scrollTop+scrollTopPx){
					scrollTop=Top;
					clearTimeout(scrollTimeout);
					scrollTimeout=setTimeout(()=>{
						// console.log('触发懒加载扫描')
						this.$refs.productList.load()
					},scrollTime)
				}
			},
			 loadData(action = 'add') {
				
					if (action === 'refresh') {
							this.productListData = [];
					}
					var host=this.$config.host+"goodsList.json";//主服务器地址
					request.get(host,{},(res)=>{
								if(res.data.length<this.number){
									// 如果服务器端数据少于20条关闭下拉触发
									this.loadingType=0;
								}else{

										console.log()
										var data= res.data.data;
										for(let i=0;i<data.length;i++){
											data[i].juli=parseInt(data[i].id*6+1)+325*3;//这里只是模拟距离运算。

										}
										this.productListData=this.productListData.concat(data)
										this.bodyShow=true;
								}
								uni.hideLoading();

						})

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
				// 异步加载 防止组件未加载完成 数据先进去了
				// console.log(that.$refs.productList.productList)	
					that.loadData('refresh');//加载列表数据
					// that.$refs.productList.goTo=that.goTo;
					that.loadAdData();//加载广告数据
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
			
			// el渲染完成触发
			this.$nextTick(function () {
				this.refresh('refresh')
		  })
			
		},
    onLoad: function (options) {
			uni.showLoading({
				title: '加载中'
			});
			// 页面加载完毕触发
//     uni.startPullDownRefresh();
    },
		// 下拉刷新效果关闭
    onPullDownRefresh() {
        console.log('refresh');
				var self=this;
				clearTimeout(refreshTimeout)
        refreshTimeout=setTimeout(function () {
						self.refresh()
            uni.stopPullDownRefresh();
        }, 1000);
    },components: { 
			bigAd,bottomNav,productList,uniLoadMore
		},
	}
</script>

<style>

	.load-more{
		height: 3em;
		
	}
	.page-body{
		justify-content:space-between;
		flex-direction: column;
		align-content: ;
		height: 100vh;
		box-sizing:border-box;
		display: flex;
	}
	header{

}

.main-content{
	margin-bottom: 110upx;
	text-align: center;
	width: 100%;
	flex:1;
	overflow-y:auto;
	box-sizing:border-box;
}

footer{
	left: 0;
	right: 0;
	position:fixed;
	bottom: 0;

	height: 110upx;
	/* font-size:1em ; */
	background:red;
	bottom: 0;
	/* overflow:hidden; */
	/* background:#fff; */
	/* box-shadow:0px 1px 15px #ccc; */
}

</style>
