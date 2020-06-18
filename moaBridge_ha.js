/*
* moaBridge v1.0.0
* =======================
* Author: bester
* Update Date: 2018-09-27
*/
moaBridge = window.moaBridge || {};
moaBridge = {

/* ===========================utils=================================== */
    /**
      将json字符串转成json对象
      @method app.utils.toJSON
      @static
      @param param {String} JSON字符串
     */
    toJSON: function (param) {
        return typeof (param) == "string" ? eval('(' + param + ')') : param;
    },


    //预览
    preview: function(param){
        param = moaBridge.toJSON(param);
		url=replaceurl(param.url,true);
        if(is_android()){
            window.jsBridge.preview(url,param.fileName,null,null);
        }
        if(is_iphone()){
            if(iosVersion < 8){  
                window.jsBridge.preview({'url':url,'fileName':param.fileName,'uid':null,'appid':null});
            }else{
                window.webkit.messageHandlers.preview.postMessage({'url':url,'fileName':param.fileName,'uid':null,'appid':null});
            }
        }
        if(is_iPad()){
            window.webkit.messageHandlers.preview.postMessage({'url':url,'fileName':param.fileName,'uid':null,'appid':null});
        }
    },
    //下载
    download: function(param){
        param = moaBridge.toJSON(param);
		url=replaceurl(param.url,false);
        if(is_android()){
            window.jsBridge.download(url,param.fileName,null,null);
        }
        if(is_iphone()){
            if(iosVersion < 8){  
                window.jsBridge.download({'url':url,'fileName':param.fileName,'uid':null,'appid':null});
            }else{
                window.webkit.messageHandlers.download.postMessage({'url':url,'fileName':param.fileName,'uid':null,'appid':null});
            }
        }
        if(is_iPad()){
            window.webkit.messageHandlers.download.postMessage({'url':url,'fileName':param.fileName,'uid':null,'appid':null});
        }
    },

    close: function(){
        if(is_android()){
            window.jsBridge.close();
        }
        if(is_iphone()){
            if(iosVersion < 8){  
                window.jsBridge.close();
            }else{
                window.webkit.messageHandlers.close.postMessage(null);
            }
        }
        if(is_iPad()){
            window.webkit.messageHandlers.close.postMessage(null);
        }
    },

    backToHome: function(){
         if(is_android()){
            window.jsBridge.close();
        }
        if(is_iphone()){
            if(iosVersion < 8){  
                window.jsBridge.close();
            }else{
                window.webkit.messageHandlers.close.postMessage(null);
            }
        }
        if(is_iPad()){
            window.webkit.messageHandlers.close.postMessage(null);
        }
    },

    /*
    打开内部链接
    url:"",//目标地址
    title:"",//导航栏名称，客户端使用
    mode:""//full表示H5全屏，否则客户端会渲染导航栏

    */
    openDoc: function({url,title,mode}){
        if(is_android()){
            window.jsBridge.openLink(url,title,mode);
        }
        if(is_iphone()){
            if(iosVersion < 8){  
                window.jsBridge.openLink({'url':url,'title':title,'mode':mode});
            }else{
                window.webkit.messageHandlers.openLink.postMessage({'url':url,'title':title,'mode':mode});
            }
        }
        if(is_iPad()){
            window.webkit.messageHandlers.openLink.postMessage({'url':url,'title':title,'mode':mode});
        }
    },

}
var ua = navigator.userAgent.toLowerCase();
var iosVersion = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
if(is_iphone()){
    iosVersion = parseInt(iosVersion[1], 10);
}
function replaceurl(url,type){
	var us=url.split('//');
	//测试环境
	let n = `10.87.42.136:8088`;
	let w = `10.87.42.136:8088`;
	
	//正式环境
	//var n = `10.87.13.91:8088`;
	//var w = `211.138.31.210:8088`;
	
	var uss=us[1].split("/");
	uss.splice(0,1);
	return us[0]+"//"+`${type?n:w}`+'/'+uss.join('/');
};
//判断环境
function is_android(){
    if(ua.match(/android/i)=="android"&&ua.match(/iemobile/i)!="iemobile"){
         return true;
    } else {
         return false;
    }
}
function is_iphone(){
    if(ua.match(/iphone/i)=="iphone"&&ua.match(/iemobile/i)!="iemobile"){
         return true;
    } else {
         return false;
    }
}
function is_iPad(){
    if(ua.match(/iPad/i)=="iPad"||ua.match(/ipad/i)=="ipad"){
         return true;
    } else {
         return false;
    }
}