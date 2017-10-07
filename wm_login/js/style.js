
    
    // 获取验证码
    var yz=document.getElementById('yz');
    var get_yz=document.getElementById('get_yz');
    get_yz.onclick=function(){
        var num1=parseInt(Math.random()*10);
        var num2=parseInt(Math.random()*10);
        var num3=parseInt(Math.random()*10);
        var num4=parseInt(Math.random()*10);
        var arr=[num1,num2,num3,num4];
        var num=arr.join("");
        yz.value=num;
        // console.log(num);
         // console.log(yz.value);
    }

    // 验证表单
    var btn=document.getElementById('submit');
    console.log(btn);

    var form=document.getElementsByTagName('form')[0];
    console.log(form);
    
    var inputs=document.getElementsByTagName('input');
    console.log(inputs);//HTMLCollection [ <input>, <input#yz.huoqu>, <input.short>, <input.short>, <input#check> ]
    
    var arr=Array.prototype.slice.call(inputs,0);
    console.log(arr);
    var check=document.getElementById('check');
    console.log(check.checked);
    
  var pattern1=/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(17[0,3])|(18[0,5-9]))\d{8}$/;
  var pattern2=/^[a-zA-Z]\w{5,17}$/;



    //  console.log(tel());
    //  console.log(psw());
    //  console.log(rpsw());
    //  console.log(mycheck());
// 提交按钮
    btn.onclick=function(){
       
        if(tel()&&psw()&&rpsw()&&mycheck()&&arr[1].value){
            
            window.location.href='index.html';
        }
        else{
            if(!tel()){
                 
                alert('手机未填写正确');
            }
            else if(!(arr[1].value)){
                alert("未获取验证码");
            }
             else if(!psw()){
                alert("密码未正确填写");
            }
             else if(!rpsw()){
                alert("密码不一致");
            }

            else if(arr[4].checked==false){
                alert("没有同意协议书不能提交");
            }
            
            
        }
}
   
//   手机号
     var tel=  function tel(){
         arr[0].parentNode.style.borderColor='';
             if(pattern1.test(arr[0].value)){
                 
                 arr[0].parentNode.style.borderColor='green';
                  return true;
                
            }
            else{
                // alert("请输入正确的手机号");
              
                arr[0].parentNode.style.borderColor='red';
                // arr[0].focus();
                return false;
              
            }
                 
    }
    arr[0].addEventListener("blur",tel);


        // 密码
     var psw=   function psw(){
        if(pattern2.test(arr[2].value)){
            
            arr[2].parentNode.style.borderColor='green';
             return true;
            
        }
        else{
           
            // alert("请正确输入密码6-18位的字母和数字组合");
            arr[2].parentNode.style.borderColor='red';
            //  arr[2].focus();
             return false;
     
        }
       
    }
    arr[2].addEventListener("blur",psw);


    // 重复密码
    var rpsw=    function repeatpsw(){
        if(arr[2].value==arr[3].value && arr[3].value!=""){
             
            arr[3].parentNode.style.borderColor='green';
            return true;
          
        }
        else{
            // alert("请正确输入密码6-18位的字母和数字组合");
            arr[3].parentNode.style.borderColor='red';
            // arr[3].focus();
            return false;   
        }       
    }
    arr[3].addEventListener("blur",rpsw);


    // 同意协议书
    var mycheck= function mycheck(){
        if(arr[4].checked){
           
            arr[4].style.borderColor='green';
             return true;
            
        }
        else{
            
            // alert("请正确输入密码6-18位的字母和数字组合");
            arr[4].style.borderColor='red';
            // arr[4].focus();
            return false;
            
        }
     
    }
    arr[4].addEventListener("blur",mycheck);
