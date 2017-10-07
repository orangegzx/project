function $(s){
    return document.querySelectorAll(s);
}
/* -------------------------------------6 li的鼠标事件 事件代理-------*/
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
div.onmouseout=function(e){//事件代理
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
draw.type="col";
var btns=$(".type li");//btn绑定事件
for(var i=0,l=btns.length;i<l;i++){
    btns[i].onclick=function(){
        for(var j=0;j<btns.length;j++){
            btns[j].className="";
        }
        this.className="btn";
        draw.type=this.getAttribute("data-type");
    }
}
/* -------------------------------------6 li的鼠标事件 end-------*/

/* -------------------------------------音频的修复与音量的控制 -------*/

//7  从服务端获取音频数据
var xhr=new XMLHttpRequest();
// 9 创建AudioContext对象
var ac=new (window.AudioContext || window.webkitAudioContext)();
// 11.1 创建gainNode 控制音频大小
var gainNode=ac[ac.createGain?"createGain":"createGainNode"]();
gainNode.connect(ac.destination);//连接到destination

// 12 修复bug  歌曲同时播放  终止上一首
var source=null;
// 13 记录器 解决没播放之前点击其他歌曲导致歌曲同时播放
var count=0;
// 14 音频分析数据 为可视化提供数据
var analyser=ac.createAnalyser();
var size=128;
analyser.fftSize=size*2;
analyser.connect(gainNode);
/* ------------------------------音频可视化---------------------*/
// 15 音频数据分析 可视化
var box=$("#box")[0];
 var h,w;
 var canvas=document.createElement("canvas");
 var ctx=canvas.getContext("2d");
 box.appendChild(canvas);
//  16 音频数据分析 可视化
    var dots=[];//用于放置圆形的数组
    h=canvas.height=box.offsetHeight-10;
    w=canvas.width=box.offsetWidth;
    var  line=ctx.createLinearGradient(0,0,0,h);//线性渐变
     line.addColorStop(0,"red");
     line.addColorStop(0.5,"yellow");
     line.addColorStop(1,"green");
     ctx.fillStyle=line;
     //重置窗口
    window.onresize=function(){
        h=canvas.height=box.offsetHeight-10;
        w=canvas.width=box.offsetWidth;
        line=ctx.createLinearGradient(0,0,0,h);//线性渐变
        line.addColorStop(0,"red");
        line.addColorStop(0.5,"yellow");
        line.addColorStop(1,"green");
        Dots();//获取圆的属性
    }
    
    // 16.2 圆的函数对象
    function Dots(){
        this.x=random(0,w);
        this.y=random(0,h);
        this.color=color();
    }
    //创建128个圆的属性并放入dots数组中
    for(var i=0;i<size;i++){
        dots.push(new Dots());
    }
    // 16.1 返回m-n的整数
    function random(m,n){
        return Math.round(Math.random()*(n-m)+m);
    }
    // 圆的随机颜色
    function color(){return "rgba("+random(0,255)+","+random(0,255)+","+random(0,255)+")"; }

    //15.2 根据音频分析数据来绘制矩形
    function draw(arr){
        ctx.clearRect(0,0,w,h);
        var ww=w / size;
          ctx.fillStyle=line;
        for(var i=0;i<size;i++){
            if(draw.type=="col"){//绘制矩形
                var hh=arr[i]/256 *h;
                ctx.fillRect(ww*i,h-hh,ww*0.6,hh);
            }
            else if(draw.type=="dot"){//绘制圆形
                ctx.beginPath();
                var o=dots[i];
                var r=arr[i]/256 *50;
                // console.log(o.color);
                ctx.arc(o.x,o.y,r,0,Math.PI*2,true);
                var c=ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, r);
                c.addColorStop(0,"#fff");
                c.addColorStop(1,o.color);
                ctx.fillStyle=c;
                ctx.fill();
            }
        }
    }
    // 16.3
    draw.type="col";
/* --------------------------------可视化end----------------------------------- */



/* --------------------------------后台数据庆请求 start----------------------------------- */

//  后台请求
function load(url){
    var n=++count; // 13.1
    source && source[source.stop ? "stop" :"noteOff"](0);// 12.3
    xhr.abort();//13.4 终止上一次请求 停止上一首的请求
    xhr.open('GET',url);
    xhr.responseType="arraybuffer";
    xhr.onload=function(){
        if(n!=count){return}; // 13.2
        // 10 j解码audiobuffer数据
        ac.decodeAudioData(xhr.response,function(buffer){
            if(n!=count){return};//13.3
            var bufferSource=ac.createBufferSource();//创建buffersource
            bufferSource.buffer=buffer;
            bufferSource.connect(analyser);//14.1
            // bufferSource.connect(gainNode);//11.2 将buffersource连接到gainNode节点上 控制音量大小强度 //14.2
            // bufferSource.connect(ac.destination);//连接到destination //11.2后就不需要吧buffersource连接到destination
            bufferSource[bufferSource.start?"start":"noteOn"](0);//播放
            source=bufferSource;//12.2
        },function(err){
            console.log(err);
        });
    }
    xhr.send();
}
// 11-3 改变音量大小
function changeVol(now){
    gainNode.gain.value=now*now;
}
// 11.4 添加按钮控制音量大小
$("#vol")[0].onchange=function(){
    changeVol(this.value/this.max)
}
$("#vol")[0].onchange();
// 14.3
function vis(){
    var arr=new Uint8Array(analyser.frequencyBinCount);
    requestAnimationFrame=window.requestAnimationFrame ||//14.4
                          window.webkitRequestAnimationFrame ||
                          window.mozRequestAnimationFrame;

    function v(){//14.6
        analyser.getByteFrequencyData(arr);//获取音频分析数据
        draw(arr);//15.1
        requestAnimationFrame(v);
    }
    requestAnimationFrame(v);
}
 vis();//14.4
 /*--------------------------后台请求 end----------------- */