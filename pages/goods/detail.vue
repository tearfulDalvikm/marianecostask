<template>
<view class="main">
   <view class="goods-box">
        <image :src="goods.image" mode="aspectFill" class="goods-thumb"></image>
        
        <view  @tap="gotoCart" >
            <view class="carts-icon " :class="scaleCart?'on':''">

                <text class="carts-icon-num background" v-if="totalNum>0">{{totalNum}}</text>
								<i  class="iconfont icon-gouwuche" ></i>
            </view>
        </view>

        <view class="goods-operation background">
			<picker @change="bindPickerChange" :range-key="'name'" :data-data="goods.version" :value="vIndex" :range="goods.version">
			  <view class="picker">
					{{goods.version[vIndex].name}}
			  </view>
			</picker>
						
			<view class="goods-operation-left" >
					<!-- <text>数量</text> -->
					<i class="goods-operation-cut iconfont icon-biaodankongjianshanchu" :style="num<=1?'opacity:0.5;':'opacity:1;'" @tap="cutCount"></i>
					<text class="goods-operation-num">{{num}}</text>
					<i class="goods-operation-add iconfont icon-jia-shixin" :style="num>=goods.stock?'opacity:0.5;':'opacity:1;'" @tap="addCount"></i>
				</view>


            <view class="goods-operation-right" @tap="addToCart"><text>加入购物车</text><i   class="iconfont icon-gouwuche" ></i></view>
           
        </view>
        <icon v-if="show"  class="to-carts-icon iconfont icon-gouwuche"></icon>
        <view class="goods-stock">库存:{{goods.stock}}</view>
        <view class="goods-title">{{goods.title}}</view>
        <view class="goods-price"><text style="color:red;">￥ {{goods.price}}</text></view>
    </view>
    <view class="goods-tab">
		<view class="goods-tab-nav">
				<view :class="curIndex === 0 ?'on color border':'opacity'" @tap="bindTap(0)" :data-index="0">商品详情</view>
				<view :class="curIndex === 1 ?'on color border':'opacity'" @tap="bindTap(1)" :data-index="1">产品参数</view>
				<!-- <view class="goods-tab-nav " :class="curIndex === 2 ?'on':''" @tap="bindTap(2)" :data-index="2">售后保障</view> -->
		</view>
        <view class="goods-content border">
            <!-- <view class="goods-content-box" > -->
				<view  v-if="curIndex === 1" v-for="(attr,aIndex) in goods.attribute" :key="aIndex">
					<text class="border">{{attr.name}}</text><text class="border" style="">{{attr.text}}</text>
				</view>
				<view  v-if="curIndex === 0">
					<text>
						{{goods.detail}}
					</text>
				</view>
			<!-- </view> -->
        </view> 
    </view>
</view>
</template>

<script>
	// import mpvuePicker from '../../components/template/picker/mpvuePicker.vue';
	import ajax from "../../request/ajax.js"
	import Storage from "../../common/utils/Storage.js"
	export default {
		data() {
			return {
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
						  detail: '这里是梨花带雨详情。',
							synopsis:"简介，这里是梨花带雨详情",
						  parameter: '125g/个',
						  service: '不支持退货'
						},
						num: 1,
						totalNum: 0,
						curIndex: 0,
						show: false,
						scaleCart: false
				
			};
		},
		methods:{
			// 下拉表单
				bindPickerChange (e) {
					var vIndex=e.detail.value;
					this.vIndex =vIndex;
					this.goods.price=e.target.dataset.data[vIndex].price || this.goods.price;
				  console.log(e)
				},
			// 增加数量
			  addCount() {
				  if(this.num>=this.goods.stock){
					  uni.showToast({
						title: '库存不足',
						icon:'none',
						duration: 2000
					});
				  }else{
					  this.num++;
				  }
			  },
			  // 减少数量
				cutCount() {	
					if(this.num>1){
						this.num--;
					}
			  },
			  addToCart() {
				const self = this;
				const num = this.num;
				let total = this.totalNum;

					this.show=true;
					this.scaleCart = true;
					clearTimeout(self.timeOut2);
				  this.timeOut2=setTimeout( function() {
					self.totalNum= num + total;
					self.show=false;
					self.scaleCart= false;
				  }, 100)
					console.log(this.timeOut2)
			  },

			  bindTap(index) {
				  // console.log(index)
				this.curIndex=index

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
			}
		},onLoad(e){
			
			ajax.get('goodsDetail',(res)=>{
				this.goods=res.data.data
				console.log(res.data.data)
			})
			console.log(e)
		}
	}
</script>

<style>
view,text{
	border-color:#bcaa8a;
}
picker{
	border-bottom: 1upx solid #ededed;
	flex:1;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}

.picker{

}
.opacity{
opacity: .6;	
}
.color{
	color: #bcaa8a;
}
.background{
	background:#bcaa8a;
}
.border{
	/* border-color:#bcaa8a;*/
	border-width:1upx;
	border-style:solid;
	/* border-bottom: 30upx solid #ededed; */
}
.goods-box{
    position: relative;
    padding: 40upx 45upx;
    text-align: center;
    color: #454552;
    border-bottom: 30upx solid #ededed;
}
.goods-box .goods-thumb{
	border-radius: 20upx;
    width: 300upx;
    height: 300upx;
    margin: 35upx 0 125upx;
}

.to-carts-icon{
    position: absolute;
    right: 70upx;
    top: 70upx;
    width: 10upx;
    height: 10upx;
    border-radius: 50%;
    opacity: .6;
    -webkit-animation: to_cart .3s ease-out;
    animation: to_cart .3s ease-out;
}

@keyframes to_cart {
    0%{
        right:100upx;
        top:300upx;
        transform: scale(4);
    }
}
.carts-icon{
    position: absolute;
    right: 40upx;
    top: 40upx;
    width: 75upx;
    height: 75upx;
}
.carts-icon i{
	font-size: 2em;
}

.carts-icon-num{

    position: absolute;
    right: -15upx;
		width: 40upx;
    height: 40upx;
    line-height: 40upx;
    border-radius: 50%;
    color: #fff;
    font-size: 24upx;
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
