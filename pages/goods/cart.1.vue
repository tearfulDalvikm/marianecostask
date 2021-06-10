<template>
	<view class="main">
	    <view v-if="hasList">
	        <view class="cart-box">
	            <view class="cart-list" v-for="(item,key) in  cartData" :key="key">
								<view class="cart-left">
										<icon v-if="item.selected" type="success" color="#32CD32" :data-index="key"  class="cart-pro-select" @tap="selectList(key)"/>
										<icon v-else type="circle" class="cart-pro-select" :data-index="key" @tap="selectList(key)"/>

										<image class="cart-thumb" :src="item.image" @tap="goPage('detail',item)" mode="aspectFill">
				
										</image>

								</view>
								<view class="cart-right">
											<view class="cart-pro-name">
											{{item.title}} 
											</view>
												<picker v-if="item.version" @change="bindPickerChange" :range-key="'name'" :data-index="key" :data-data="item.version" :value="item.versionName" :range="item.version">
													<view class="picker" style="">
														{{item.versionName}}<icon class="iconfont icon-dianziqianmingx" style="color: #B42F2D;"></icon>
													</view>
												</picker>
											<view class="cart-count-box">
													<view class="" style="font-size:0.8em ;">
														<number-box :min="1" :max="item.stock" :item="item" :value="item.number" :other="{index:key}" v-on:change="numberUpdate" ></number-box>
													</view>
											</view>
											
									</view>
									<view class="cart-tip">
										<view class="cart-pro-price" style="color: red;">
											￥{{item.price}}
										</view>
										<view class="cart-del iconfont icon-guanbishixin" style="color:;" @tap="deleteList(key)" :data-index="key"></view>

									</view>

							</view>
	        </view>
	
	        <view class="cart-footer">
	            <icon v-if="selectAllStatus" type="success_circle" color="#fff" class="total-select" @tap="selectAll(key)"/>
	            <icon v-else type="circle" color="#fff" class="total-select" @tap="selectAll(key)"/>
	            <view class="order-icon iconfont icon-jiesuan" @tap="goPage('order')" style="font-size: 2em;">
	            </view>
	            <text>全选</text>
	            <text class="cart-toatl-price">￥{{totalPrice}}</text>
	        </view>
	    </view>
      
	    <view v-else>
	        <view class="cart-no-data">购物车是空的哦~</view>
	    </view>
	</view>
</template>

<script>
  import numberBox from '../../components/template/box/number.vue'
	import Storage from "../../common/utils/Storage.js"
  import cart_Data from '../../request/data/cart.js';

	export default {
    components: {
    	numberBox
    },
		data() {
			return {
				change:0,
        totalNumber:0, //购物车总数量
				cartData:[],               // 购物车商品列表
				hasList:false,          // 列表是否有数据
				totalPrice:0,           // 总价，初始为0
				selectAllStatus:true,    // 全选状态，默认全选

				
			};
		},
    onLoad(e) {
      console.log("onload")
      console.log(e)
			var cartData =Storage.get('cart') //读取购物车缓存数据
			// var cartData =cart_Data //读取模拟数据
			
			console.log(cartData)
			for(var k in cartData){
				if(!cartData[k].number){
					cartData[k].number=1;
				}
				if(!cartData[k].selected){
					cartData[k].selected=false;
				}

				if(!cartData[k].versionName){
					let version=cartData[k].version;

					if(version && version[0] && version[0].name){
						cartData[k].versionName=version[0].name;
					}
				}
// 				let version=cartData[k].version;
// 				if(typeof version==='object'){
// 					for (var i = 0; i < version.length; i++) {
// 						if(!version[i].selected){
// 							cartData[k].version[i].selected=true;
// 						}
// 					}
// 				}

			}
			this.cartData=cartData;
			this.pageinit();
			this.hasList= true;
    },
		
		mounted(){


		},
		watch:{
			change:(e)=>{
				console.log(e)
			}
		},
		methods:{
			goPage(pg,item){
				var id="";
				if(pg==='order'){
					var orderData={};
					var cartData=this.cartData;
					for(let key in cartData){
						var good={};
						if(cartData[key].selected){
							// orderData[key]=cartData[key];
							id=cartData[key].shop_id;
							good.id=cartData[key].id;
							good.shop_id=cartData[key].shop_id;
							good.number=cartData[key].number;
							good.image=cartData[key].image;
							good.price=cartData[key].price;
							good.title=cartData[key].title;
							good.versionName=cartData[key].versionName;
							// good.versionIndex=cartData[key].versionIndex;
							orderData[key]=good;
							
						}
					}
					// order[this.goods.id]=this.goods;
					Storage.set('order',orderData,100)
				}else{
					id=item.id;
				}
				uni.navigateTo({
					url: './'+pg+"?id="+id,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			// 下拉表单
				bindPickerChange (e) {
					console.log(e)
					var index=e.detail.value;
					var key=e.target.dataset.index;
					this.cartData[key].price=e.target.dataset.data[index].price || this.cartData[key].price;
					this.cartData[key].versionName=e.target.dataset.data[index].name;
					this.getTotalPrice();//重新计算总价格
				},
//       // 获取商品购物数量
//       getNumber(index){
//       	
//       	if(this.cartData[index] && this.cartData[index].number ){
//       		return this.cartData[index].number
//       	}
//       	return  0;
//       },
      // 购物数量增减 触发
      numberUpdate(value,item,other) {

      				item.number=value;
      				var cartData =this.cartData;
      				cartData[other.index]=item;
							this.getTotalPrice()

      },
			pageinit(){
				console.log('before')
				this.hasList= true;
				this.getTotalPrice();
			},
			  /**
			   * 当前商品选中事件
			   */
			  selectList(index) {
						// const index = e.currentTarget.dataset.index;
						let cartData = this.cartData;
						const selected = cartData[index].selected || false;
						cartData[index].selected = !selected;
						this.cartData=cartData;
						this.getTotalPrice();
			  },

			  /**
			   * 删除购物车当前商品
			   */
			  deleteList(index) {
						let cartData = this.cartData;
						// console.log(index)
						// console.log(cartData[index])
						if(!cartData[index]){
							this.hasList= false;
						}else{
							var ct={};
							for(let key in cartData){
								if(key!=index){
									ct[key]=cartData[key]
								}
							}
							this.cartData=ct;

							this.getTotalPrice();
						}
			  },

			  /**
			   * 购物车全选事件
			   */
			  selectAll(e) {
						// let selectAllStatus = this.selectAllStatus;
						// selectAllStatus = !selectAllStatus;
						let cartData = this.cartData;

						for (let index in cartData) {
					
							cartData[index].selected =!cartData[index].selected || false;
						}
						// this.selectAllStatus=!this.selectAllStatus;
							this.cartData= cartData;
							this.getTotalPrice();
			  },

			  /**
			   * 计算总价
			   */
			  getTotalPrice() {
							let cartData = this.cartData;                  // 获取购物车列表
							let total = 0;
							for(let i in cartData) {         // 循环列表得到每个数据
								if(cartData[i].selected) {                     // 判断选中才会计算价格
								if(!cartData[i].number){
									cartData[i].number=0;
								}
								total += cartData[i].number * cartData[i].price;   // 所有价格加起来
								}
							}
							this.cartData=cartData;
							this.totalPrice=total.toFixed(2);
			  }
				},
	}
</script>

<style>

.cart-box{
    padding-bottom: 100rpx;
}
.cart-list{
    position: relative;
		width: 750rpx;
		display: flex;
		padding: 15rpx;
		box-sizing: border-box;
		justify-content: center;
		flex-direction: row;

    border-bottom: 1rpx solid #e9e9e9;
}
.cart-left{
	display: flex;
	justify-content: space-around;
	align-items:center;
}
.cart-right{
	display: flex;
	flex: 1;
	flex-direction:column;
	justify-content:space-between;
}
.cart-right .cart-pro-name{
	color: #000;
 font-weight:bold;
}
picker{

}
.cart-right .picker{
	width: 200rpx;
	border-bottom: 1rpx solid #e9e9e9;
}
.cart-list .cart-pro-select{
	align-self: center;

}

.cart-list .cart-thumb{
	padding: 0 15rpx ;
	width: 150rpx;
	height: 150rpx;
}

.cart-tip{
	height: 100%;
	display: flex;
	justify-content: space-around;
	flex-direction:column;
	align-items:center;
	right: 15rpx;
	position:absolute;
}

.cart-count-box{
  font-size: 2em;
}

.cart-del{

}
.cart-footer{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 90rpx;
    line-height: 90rpx;
    padding:0 100rpx 0 80rpx;
    box-sizing: border-box;
    background: #AB956D;
    color: #fff;
}
.total-select{
    position: absolute;
    left: 20rpx;
    top: 25rpx;
    width: 45rpx;
}
.order-icon{
    position: absolute;
    right: 40rpx;
    width: 45rpx;
}
.cart-toatl-price{
    float: right;
    width: 120rpx;
}

.cart-no-data{
    padding:40rpx 0;
    color: #999;
    text-align: center;
}
</style>
