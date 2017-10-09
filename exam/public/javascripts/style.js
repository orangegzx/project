
$(function(){
    // 左边的导航 手风琴效果  
    $(".navul li.navli a").on('click',function(){
        // 左导航点击事件
        $(this).next().slideToggle();
        // 第二層ul的li点击事件
        $(this).next().children('li').click(function(){
            var page=$(this).attr('page');
            console.log(page);
            $(".contentright").load(page);   
        });   
    });
    var df=$(".default>li").eq(0).attr('page');//获取全部题目的页面
    $(".contentright").load(df);//默认打开全部题目的页面
    // console.log($(".default>li").eq(0).attr('page'));   
})

