// // console.log(urlEncode(arr||obj).slice(1))//调用
// 
var Sync={
	/**
	 * 异步存入缓存 可对象可数组
	 * k 		string 				键
	 * val 		array|object|string	缓存的内容
	 * expires	int					有效期
	 */
	set(k,val,expires){
		var type= typeof val;
		var expires=expires || 300;
		return uni.setStorage(k,{data:val,expires:expires+(Date.parse(new Date())/1000),type:type});
	},get(k){
		try{
			var data= uni.getStorage(k) || {};
			if(data.expires){
				if(data.expires> (Date.parse(new Date())/1000)){
					return data.data;
				}
				uni.removeStorage(k);
				try {
							uni.removeStorage(k);
					} catch (e) {
							// error
					}
			}
		}catch(e){
			console.log(e)
			return false;
			//TODO handle the exception
		}
	
			return false;
		
	},remove(k){
		uni.removeStorage(k);
	}
}
var Asynchronous={
	set(k,val,expires){
		var expires=expires || 300;
		var type= typeof val;
		if(type==='object'){
			val =JSON.stringify(val)
		}
		return uni.setStorageSync(k,{data:val,expires:expires+(Date.parse(new Date())/1000),type:type})
	},get(k){
		try{
			var data= uni.getStorageSync(k) || {};
			// console.log(data)
			if(data.expires){
				if(data.expires> (Date.parse(new Date())/1000)){
					if(data.type==='object'){
						return  JSON.parse(data.data)
					}
					return data.data;
				}
				uni.removeStorageSync(k);
				try {
							uni.removeStorageSync(k);
					} catch (e) {
							// error
					}
			}
		}catch(e){
			console.log(e)
			return false;
			//TODO handle the exception
		}
	
			return false;
		
	}
}
export default {
    // CusBASE64: __BASE64,
	set:Asynchronous.set,//异步
	get:Asynchronous.get,
	setSync:Sync.set,//同步
	getSync:Sync.get
	// encoder:base64decode
  }