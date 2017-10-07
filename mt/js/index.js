// 设置图片导航的点击事件

    var btns=document.getElementsByClassName('nav');

    var ul=document.getElementById('content');
    var lis=ul.children;//三大li
    console.log(lis);

    var slide=document.getElementById('slide');

    // console.log(slide);

    for(var i=0;i<btns.length;i++){
        btns[i].onclick=(function(num){
            return function(){
                // 先移除当前的样式
                for(var j=0;j<btns.length;j++){
                    btns[j].removeAttribute('style');
                    btns[j].style.border="none";
                                    //  btn[j].style.border="";
                }
                    // 给当前的元素设置样式
                btns[num].setAttribute('style','border-bottom:6px solid orange');
                for(var k=0;k<lis.length;k++){
                    lis[k].style.display="none";
                }
                lis[num].style.display="block";
            }
        })(i);

    }
// 
    var info_btns=document.getElementsByClassName('info_nav_li');
    var info_lis=document.getElementsByClassName('info_com_li');
    console.log(info_btns);
    console.log(info_lis);
    for(var i=0;i<info_btns.length;i++){
        info_btns[i].onclick=(function(num){
            return function(){
                // 先移除当前的样式
                for(var j=0;j<info_btns.length;j++){
                    info_btns[j].removeAttribute('style');
                    info_btns[j].style.border="none";
                }
                    // 给当前的元素设置样式
                info_btns[num].setAttribute('style','border-bottom:6px solid orange');

                for(var k=0;k<info_lis.length;k++){
                    info_lis[k].style.display="none";
                }
            info_lis[num].style.display="block";
            }
        })(i);

    }

    // 机构 学堂
    var news_btns=document.getElementsByClassName('info2_nav_li');
    var news_ul=document.getElementById('news_ul');
    var  news_lis=news_ul.children;
    console.log(news_btns);
    console.log(news_lis);

    for(var i=0;i<news_btns.length;i++){
        news_btns[i].onclick=(function(num){
            return function(){
                // 先移除当前的样式
                for(var j=0;j<news_btns.length;j++){
                    news_btns[j].removeAttribute('style');
                    news_btns[j].style.border="none";
                }
                    // 给当前的元素设置样式
                news_btns[num].setAttribute('style','border-bottom:6px solid orange');

                for(var k=0;k<news_lis.length;k++){
                    news_lis[k].style.display="none";
                }
            news_lis[num].style.display="block";
            }
        })(i);

    }

    /* 底部绑定事件*/
    
    // 获取第一个li
    var footer_li_1=document.getElementById('footer_li_1') ;
    // console.log(footer_li_1);

    // 获取第一张图片
     var img_1=document.getElementById('footer_img_1') ;

    //  利用第一张图获取该父节点li->获取该父节点li的父节点ul-->获取ul的孩子节点 所有li
    var f_lis=img_1.parentNode.parentNode.children;//lis
    // console.log(lis);//lis[ <li#footer_li_1.footer_li.>, <li.footer_li>, <li.footer_li>, <li.footer_li>, <li.footer_li> ]
    
    // 用getElementById可以找到父元素 用className找不到父节点
    var footer_ul=footer_li_1.parentNode;//获取ul
    console.log(footer_ul);

/*第一种 for循环*/
 /*
    for(var i=0;i<f_lis.length;i++){
        f_lis[i].onclick=(function(e){
            return function(){
                for(var j=0;j<f_lis.length;j++){ 
                    if(e!=j){//筛选除了当前目标外的目标
                        // console.log(f_lis[j].children[0].attributes.getNamedItem('src'));//img-src
                        // console.log(f_lis[j].children[0].attributes.getNamedItem('src').value);//img-src
                        // 获取当前img的src值（点击后的覆盖原先的图片src值 需要重新改为原先白色的图片）
                        var val=f_lis[j].children[0].attributes.getNamedItem('src').value;
                        var val_1=val.slice(0,17);//截取./images/index**
                        var val_2=val_1+".png";//设置src属性值为白色图片：./images/index**.png
                        // 即给除了目标图片外的图片设置为白色的图片
                       f_lis[j].children[0].attributes.getNamedItem('src').value=val_2;//给当前不是点击目标的src赋值，
                    }
                } 
                // 
                var img_src= f_lis[e].children[0].attributes.getNamedItem('src');//当前图片的src
                // console.log (img_src);
                img_src.value=img_src.value.slice(0,17);//截取./images/index**
                var new_src =img_src.value+"_1.png";//设置src属性值为黄色图片：./images/index**_1.png
                img_src.value=new_src;//给当前目标图片设置新的图片
           }         
        })(i);
    }
      */ 
    //第二种： 事件代理事件 绑定ul 改变li里的图片
    footer_ul.onclick=function(e){
      
        var len=e.target.parentNode.parentNode.children.length;//5
        //   console.log(len);//5
           for(var i=0;i<len;i++){
                 if(e!=i){//筛选除了当前目标外的目标
                     // 获取当前img的src值（点击后的覆盖原先的图片src值 需要重新改为原先白色的图片）
                    var val=f_lis[i].children[0].attributes.getNamedItem('src').value;//获取当前图片的src值
                    var val_1=val.slice(0,17);//截取./images/index**
                    var val_2=val_1+".png";//设置src属性值为白色图片：./images/index**.png
                    // 即给除了目标图片外的图片设置为白色的图片 img：f_lis[i].children[0]
                    f_lis[i].children[0].attributes.getNamedItem('src').value=val_2;//给当前不是点击目标的src赋值，
                }
            } 
       if(e.target.parentNode.nodeName=="LI"){  
                
            // 获取每张图片的src属性
            var img_src=e.target.attributes.getNamedItem('src');
            // console.log(img_src);
            // console.log(img_src.value);

            // 切割每张图片src属性的前16个值‘./images/index**’
            img_src.value=img_src.value.slice(0,17);
           
            //  声明一个新的src属性为‘./images/index**_1.png’,
            var new_src =img_src.value+"_1.png"
            // console.log(new_src);

            //把新的src属性值赋给当前图片的src属性， 改变当前图片的src，获取新的src图片
            img_src.value=new_src;
        }   
    } 
    
    
//    轮播
// 获取轮播圆点ul的id
var label_ul=document.getElementById('label_ul');
// console.log(label);

// 获取圆点ul的所有li
var label_lis=label_ul.children;
// console.log(label_lis);

// 获取图片ul
var img_ul=document.getElementsByClassName("ul_img");
console.log(img_ul);//3个
console.log(img_ul.length);//3
// console.log(img_ul[0]);//3
console.log(img_ul[0]);//3

// 获取三个放置图片的ul lis
var model_ul=document.getElementById('banner_model').children[0];
var art_ul=document.getElementById('banner_art').children[0];
var pro_ul=document.getElementById('banner_pro').children[0];
var content=document.getElementById('content');//主ul 
// console.log(content.children);
// lis

// 事件代理
var index=0;
//    for(var i=0;i<img_ul.length;i++){
       label_ul.onclick=function(e){
            // 1 清除当前所有li的样式
                Array.prototype.slice.call(label_lis,0).forEach(function(ele) {
                ele.className="";
                lis[0].children[0].style.left=0;
                });
            // 给当前li添加样式
            e.target.className="label_li";
            var index=e.target.attributes.getNamedItem('val');//获取当前li的val 0 1 2 3 

            change(index)//0 1 2 3


     }


function change(curindex){
    model_ul.style.left=-100*curindex+'px';
    index=curindex;
   
   
        
}



    
