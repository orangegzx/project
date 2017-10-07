function $(s){
    return document.querySelectorAll(s);
}
//6 li的鼠标事件 事件代理
var lis = $("#list li");
var div=$(".left")[0];
var ul=$("#list")[0];
div.onmouseover=function(e){
   if(e.target.parentNode.nodeName=='UL' ){
      
       if( e.target.className=="clicked"){
           e.target.className="clicked";
       }
        else{
            e.target.className="seleted"
        }
   }
}
div.onmouseout=function(e){
   if(e.target.parentNode.nodeName=='UL' ){
       if( e.target.className!="clicked"){
            e.target.className=""
        }
        else{
            e.target.className="clicked";
        }
   
   }
}
for (var i=0;i<lis.length;i++){
    lis[i].onclick=function(){
        for(var j=0;j<lis.length;j++){
            lis[j].className=""
        }
        this.className="clicked"
        //8 加载音频数据
        load("/media/"+this.title);
    }
}
//7  从服务端获取音频数据
var xhr=new XMLHttpRequest();
// 9 创建AudioContext对象
var ac=new(window.AudioCOntext || window.wekitAudioContext)();
function load(url){
    xhr.open('GET',url);
    xhr.responseType="arraybuffer";
    xhr.onload=function(){
        // console.log(xhr.response);
        // 10 j解码audiobuffer数据
        ac.decodeAudioData(xhr.response,function(buffer){
            var bufferSource=ac.createBufferSource();
            bufferSource.buffer=buffer;
            bufferSource.connect(ac.destination);
            bufferSource[bufferSource.start?"start":"noteOn"](0);
        },function(err){
            console.log(err);
        });
    }
    xhr.send();
}

