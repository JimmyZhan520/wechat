$.ajaxSetup({ xhrFields: { withCredentials: true }, crossDomain: true });//添加跨域头
$(document).ready(function(){
	  var  baseurl = 'http://cheewp.duapp.com/WeChat/';
	  var id;//定义一个全局变量来跨函数运用userid
	  var friend_id;//定义一个全局变量获取好友id
	  var frieng_name;//定义一个全局变量获取好友昵称
	  var MenID;//获取点击当前好友的id
	  var Title_Name;//目的来修改聊天内容昵称
	  var _interval;         //停止计时器
	  var myname;
/********************登录********************/
//实现enter键响应，兼容Chrome和FF，已测试。
$(".login").keypress(function(e){
	var e = e||event,
	keycode = e.which||e.keyCode;
	if (13==keycode) {
		$(".logIn").trigger("click");
	}
});
	$(".logIn").click(function(){
		//login();
		// checkIsLogin();
		// getfriend();
		$(".login").hide();
                        $(".Main").show();
                        $(".slide-online").show();
                        $(".chating").hide();
                        $(".menber-orign").show();
                        $("#chatArea").hide();
                        $(".box1").hide();
                        $(".history").hide();
                        $("#contact-photo").attr("src","../Photo/gren_04.png");
                        $("#view-photo").attr("src","../Photo/wechat_07.png"); 
		return false;
     });
/*****************退出登录*******************/
$("#exit").click(function(){
    $(".dropdown-menu").toggle();
	if (confirm("是否确认退出")) {
		exit();
	}
    else
    {
    	console.log("返回");
    }
});	
/*********************聊天界面**************************/
/***********聊天初始界面***********/
$(".chat-view").click(function(){
	$("#view-photo").attr("src","../Photo/greenwe_07.png");
	$("#contact-photo").attr("src","../Photo/liaxni_04.png");
	$(".menber-orign").hide();
	$(".box1").hide();
	$(".correct").hide();
	$(".dropdown-menu").hide();
	$(".box2").hide();
	$(".slide-online").hide();
	$(".chating").show();
	$(".mmmpop-profile").hide();
	if ($(".box_mainwrap").length>0) {
		$("#chatArea").show();
		$(".chat-orign").hide();
	}
	else{
		$("#chatArea").hide();
		$(".chat-orign").show();
	}
});
/******************聊天窗口******************************/
$("#act_sent").click(function(){
    $("#view-photo").attr("src","../Photo/greenwe_07.png");
	$("#contact-photo").attr("src","../Photo/liaxni_04.png");
	$("#chatArea").show();
    $(".menber-orign").hide();
	$(".chat-orign").hide();
	$(".box1").hide();
	$(".correct").hide();
	$(".dropdown-menu").hide();
	$(".box2").hide();
	$(".slide-online").hide();
	$(".chating").show();
	$(".mmmpop-profile").hide();
	//聊天窗口顶部显示好友昵称
	$("#CA-nickname").text(frieng_name);
	//发送信息
	Add2(friend_id);
	//把这模块添加到正在聊天
	Add(friend_id);
});
/**************聊天内容发送************************/
//发送按钮按enter键发送
$(".box_ft").keydown(function(e){
    if (e.ctrlKey && e.which == 13 || e.which == 10) {
    	$(".btn_send").trigger("click");
    }
});
$(".btn_send").click(function(){
var $content = $("#send-frame"); //发送内容  
if ($content.val() != "") {
  	send($content.val());
  	$(".box_main").scrollTop($(".box_main").height());
  }
  else{
  	// alert("发送内容不能为空!");
  	$content.focus();
  	return false;
  }
});
/*************联系人初始界面************/
$(".contact").click(function(){
	$("#contact-photo").attr("src","../Photo/gren_04.png");
	$("#view-photo").attr("src","../Photo/wechat_07.png");
	$(".slide-online").show();
	$(".chat-orign").hide();
	$(".box1").hide();
	$(".correct").hide();
	$(".dropdown-menu").hide();
	if ($(".box2").length>0) {
		$(".box2").show();
		$(".menber-orign").hide();
	}
	else{
		$(".box2").hide();
		$(".menber-orign").show();		
	}
	$("#chatArea").hide();
	$(".chating").hide();
	$(".history").hide();
	$(".mmmpop-profile").hide();
});
/*************联系人界面************/
$(document).on("click",".menber",function(){
	friend_id=$(this).attr('id'); //获取好友id
	MenID = friend_id;
	friend_meg(friend_id);//获取好友资料,调用friend_meg函数
	GETname(MenID);
              		// console.log(MenID);
              		// console.log(fname);
    getremark(MenID);
    $("#CA-nickname").text(Title_Name);
	$(".box2").show();
	$(".menber-orign").hide();
	$(".chat-orign").hide();
	$(".box1").hide();
	$(".correct").hide();
	$(".dropdown-menu").hide();
	$("#chatArea").hide(); 
	$(".mmmpop-profile").hide();
	$(this).css("background","#3A3F45").siblings("div").css("background","#2e3238");//当被点击的div会变色  
});
//备注栏切换
$(document).on("click",".meta_content",function(){
	  $(".meta_content").hide();
   $(".correct_name").show();
   $(".correct_name").focus();
})
//修改备注按enter确认
$(".meta_area").keydown(function(e){
 var e = e || event,
 keycode = e.which || e.keyCode;
 if (keycode==13) {
  $(".meta_submit").trigger("click");
 }
});
$(".meta_submit").click(function(){
    var $SecondName = $(".correct_name");
    if ($SecondName.val().length>8) {alert("备注需在8个字以内");}
    	else{
	if ($SecondName.val()=="") {
      	  // $("#"+MenID+"111").show();
      	  $(".meta_content").show();
          $(".correct_name").hide();
	}
	else{
	setmark($SecondName.val());
	getremark(MenID);
	$(".correct_name").val('');
    }
  }

});
//年龄选择器
$(function(){
	for (var i = 1; i < 101; i++) {
		$(".Co-age").append("<option id='co-age' value="+i+">"+i+"</option>");
	}
		})
/***********设置按钮************/
$("#setting").click(function(){
	$(".dropdown-menu").fadeToggle();
});
/***********个人资料********/
$("#inf").click(function(){
	$(".dropdown-menu").toggle();
	$("#chatArea").hide();
	$(".menber-orign").hide();
	$(".box1").show();
	$(".chat-orign").hide();
	$(".correct").hide();
	$(".box2").hide();
	$(".mmmpop-profile").hide();
});
/********************修改资料*************************/
//修改资料按enter确认
$(".correct-main").keydown(function(e){
 var e = e || event,
 keycode = e.which || e.keyCode;
 if (keycode==13) {
  $(".co-submit").trigger("click");
 }
});
$("#cnf").click(function(){
	$(".dropdown-menu").toggle();
    $(".correct").show();
    $(".box1").hide();
    $(".chat-orign").hide();
    $(".menber-orign").hide();
    $(".box2").hide();
    $("#chatArea").hide();
    $(".mmmpop-profile").hide();
    getUsermes();//把资料填上去
}); 
$(".co-submit").click(function(){
   correct();
});
//点击正在聊天模快
$(document).on("click",".chat_ing",function(){
	 var chat_id=$(this).attr('id');
	 MenID = chat_id;
	 GETname(MenID);
              		// console.log(MenID);
              		// console.log(fname);
	  getremark(MenID);
	  $("#CA-nickname").text(Title_Name);
	 $.ajax({
	                  type:"POST",
	                  url:baseurl + '?action=User&method=getUserById',
                      data:{userid:chat_id},
                      success: function(data){
    	              var obj = eval("("+data+")");
    	              console.log(data);
    	              if (Title_Name!='') {obj.nickName=Title_Name;}
    	              $("#CA-nickname").text(obj.nickName);
    	              $(".Mini_nickname").text(obj.nickName);
    	          }
      });
	$("."+chat_id).css("background","#3A3F45").siblings("div").css("background","#2e3238");//当被点击的div会变色
	$("#"+chat_id+'777').hide(); //提示消息红点消失
	if ($(".wechat_reddot").is(":hidden")) {
		$(".reddot").hide();
	}
	$("#chatArea").show();
    $(".box_mainwrap").hide();
	$('#'+chat_id + '222').show();
	$(".menber-orign").hide();
	$(".chat-orign").hide();
	$(".box1").hide();
	$(".correct").hide();
	$(".dropdown-menu").hide();
	$(".mmmpop-profile").hide();
})
/*********************修改好友备注**********************/
//enter键确认修改信息并提交
$(".mmmpop-profile").keydown(function(e){
 var e = e || event,
 keycode = e.which || e.keyCode;
 if (keycode==13) {
  $(".Mini_submit").trigger("click");
 }
});
//点击标题显示小卡片
$("#CA-nickname,.Down_img").click(function(){
    $(".mmmpop-profile").toggle();
    $.ajax({
                      type:"POST",
	                  url:baseurl + '?action=User&method=getUserById',
                      data:{userid:MenID},
                      success: function(data){
    	              var obj = eval("("+data+")");
    	              // console.log(data);
    	              $(".Mini_nickname").text(obj.nickName);
    	          }
    });
  });
//备注栏切换
$(document).on("click",".frieng_Sname",function(){
	  $(".frieng_Sname").hide();
   $(".Mcorrect_name").show();
   $(".Mcorrect_name").focus();
})
//提交按钮
$(".Mini_submit").click(function(){
	var $SecondName = $(".Mcorrect_name");
	if ($SecondName.val()=="") {
      	  $(".frieng_Sname").show();
          $(".Mcorrect_name").hide();
	}
	else{
	setmark($SecondName.val());
	getremark(MenID);
	$("#CA-nickname").text(Title_Name);
	$(".Mcorrect_name").val('');
    }
})
/***************小卡片上的logo****************/
$(".Tochat_img").click(function(){
	$(".mmmpop-profile").hide();
});
//当备注失去焦点时隐藏
$(".Mcorrect_name").blur(function(){
    $(".Mcorrect_name").hide();
    $(".frieng_Sname").show();
  });
$(".correct_name").blur(function(){
    $(".correct_name").hide();
    $(".meta_content").show();
  });
/**************修改信息按钮*****************/
$(".box1-correct").click(function(){
	$(".box1").hide();
	$(".correct").show();
	getUsermes();//把资料填上去
})
/****************聊天记录显示*********************/
$(".checkchat").click(function(){
	$(".history").show();
	$("#chatArea").hide();
	if ($("#"+MenID+'123').length>0) {
       Recentnews(MenID);
       // $(".his_mainbody").hide();
       // $("#"+MenID+'123').show();
       $("#"+MenID+'123').css("display","block").siblings("div").css("display","none");
	}
	else{
		var body = '<div class="his_mainbody" id="'+MenID+'123">'+'</div>';
		$(".history_main").append(body);
		 Recentnews(MenID);
		// $(".his_mainbody").hide();
  //      $("#"+MenID+'123').show();
       $("#"+MenID+'123').css("display","block").siblings("div").css("display","none");
	}
})
$(".close").click(function(){
	$(".history").hide();
	$("#chatArea").show();
})
/*********************以下的全为函数部分********************/
//此为登录函数
function login(){
	  var $user=$("#username"),
	      $pass=$("#password");
	   if ($user.val() != ""&&$pass.val() != ""){
        $.ajax({
		  type :"POST",
		  url: baseurl+ '?action=User&method=login',
		  data:
		  {
		  	   username:$user.val(),
		  	   password:$pass.val()
		  },
		  cache:false,
		  success: function(data){
		  	var obj = eval("("+data+")");
             // console.log(data);   
             id = obj.userid;               
              if (obj.statue=='success') {
              	        $user.val('');
              	        $pass.val('');
              	        // $(".slide-online").hide();
              	        getuser();
              	        checkIsLogin();
              	        getfriend();
             			// $(".login").hide();
                //         $(".Main").show();
                //         $(".slide-online").show();
                //         $(".chating").hide();
                //         $(".menber-orign").show();
                //         $("#chatArea").hide();
                //         $(".box1").hide();
                //         $(".history").hide();
                //         $("#contact-photo").attr("src","../Photo/gren_04.png");
                //         $("#view-photo").attr("src","../Photo/wechat_07.png");  
                        //得到好友信息
                        autoPlay(); 
              }
              else{
              	alert(obj.error);
              }
		   },
		   error:function(){
		  	 // console.log("错误");
		   },
       })
	   }
	  else
	   {
		if ($user.val() == "") {
		  alert("请输入登录用户名");
		  $("#username").focus();
		  return false;
      }
      else{
		  alert("请输入登录密码");
		  $("#password").focus();
		  return false;
      }
	   }              
}
//此为获取资料函数
function getuser(){              
  $.ajax({
	type:"POST",
	url:baseurl + '?action=User&method=getUserById',
    data:{userid:id},
    success: function(data){
    	var obj = eval("("+data+")");
    	// console.log(data);
    	if (obj.statue!='error') {
    		$(".nickname1").text(obj.nickName);
    		$(".display_name").text(obj.nickName);
    		$(".signature").text(obj.introduction);
    		$(".sex1").text(obj.sex);
    		$(".age1").text(obj.age);
    		$(".email1").text(obj.email);
    		myname = obj.nickName ;
    	}
    	else{
    		// console.log("错误");
    	}
    },
    });
}
//修改资料的填写
function getUsermes(){
	$.ajax({
        type:"POST",
	    url:baseurl + '?action=User&method=getUserById',
	    data:{userid:id},
	    success:function(data){
	    	var obj = eval("("+data+")");
	    	if (obj.statue!='error') {
	    		Cname=obj.nickName;
	    		Cemail=obj.email;
	    		Cintro=obj.introduction;
	    		if (obj.nickName!=null) {
	    		// $("#co-name").attr("placeholder",obj.nickName);
	    	    $("#co-name").attr("value",obj.nickName);}
	    		if (obj.email!=null) {
	    		// $("#co-email").attr("placeholder",obj.email);
	    	    $("#co-email").attr("value",obj.email);}
	    		if (obj.introduction!=null) {
	    		$("#co-intro").text(obj.introduction);}
	    		$("input[type=radio][name=UserSex][value="+obj.sex+"]").attr("checked",'checked');
	    	}
	    }
	})
}
//此为登录状态函数
function checkIsLogin(){
       $.ajax({
	       type:"POST",
	       url:baseurl+ '?action=User&method=checkIsLogin',
           success:function(data)
           {
              var obj = eval("("+data+")");
                // console.log(data);
              if (obj.statue == 'success') {
               $("#status").text("在线");
               // alert("此账号已登录");
              }
              else{
               $("#status").text("离线");
               // alert("未登录");
               // login();
              }
           }
        });
}
//此为退出判断函数
function exit(){
		$.ajax({
				type:"POST",
				url:baseurl + '?action=User&method=logout',
			    success:function(data){
			    	var obj = eval("("+data+")");
	    		// console.log(data);
	    		if (obj.statue == 'success') {
	    			alert("退出成功!");
	    			    $(".login").show();
                        $(".Main").hide();
                        $(".menber").remove();
                        $(".history_main").remove();
                        $(".chat_ing").remove();
                        $(".box_mainwrap").remove();
                        $(".correct").hide();
                        clearInterval(_interval);
	    		}
	    		else{
	    			alert("退出失败!");
	    		}
	    	  },
		});                      
}
//此为修改函数
function correct(){                                 
	var $name = $("#co-name"),
	    sex = $("input[name='UserSex']:checked").val(),
	    age = $(".Co-age").find("option:selected").attr("value"),
	    $email = $("#co-email"),
	    $intro = $("#co-intro");
	    if ($name.val()=='') {
	    	$(".c-nickname").children(".wrong").show();
	        $(".c-nickname").children(".right").hide();
	    }
	    else if ($intro.val()=='') {
	    	$(".c-intro").children(".wrong").show();
	    	$(".c-intro").children(".right").hide();
	    }
	    else if ($email.val()==''|| ( $email.val()!="" && !/.+@.+\.[a-zA-Z]{2,4}$/.test($email.val()) )) {
	    	$(".c-email").children(".wrong").show();
	    	$(".c-email").children(".right").hide();
	    }
	    else{
	    $.ajax({
	    	type:"POST",
	    	url:baseurl+ '?action=User&method=update',
	    	data:
	    	{
              nickname:$name.val(),
              age:age,
              sex:sex,
              introduction:$intro.val(),
              email:$email.val()
	    	},
	    	success:function(data){
	    		var obj = eval("("+data+")");
	    		// console.log(data);
	    		if (obj.statue == 'success') {
	    			alert("提交成功!");
	    			// $(".co-submit").text("修改成功");
	    			getuser();
	                $(".box1").show();
	                $(".correct").hide();
	                $(".c-nickname").children(".wrong").hide();
	                $(".c-email").children(".wrong").hide();
	                $(".c-intro").children(".wrong").hide();
	                $(".c-nickname").children(".right").hide();
	                $(".c-email").children(".right").hide();
	                $(".c-intro").children(".right").hide();
	    		}
	    		else{
	    			alert("提交失败!");
	    			// $(".co-submit").text("修改失败");
	    		}
	    	},
	    	error:function(){
		  	// console.log("错误");
		  },
	    });
	}
}
//此为获取好友列表函数
function getfriend(){
	$.ajax({
		type:"POST",
		url:baseurl+'?action=Friend&method=getFriendsList',
		success:function(data){
			var obj = eval("("+data+")");
	        // console.log(data);
	        for (var i = 0; i < obj.length; i++)
	        {
	        	if (obj[i].remark==null) {
	              $.ajax({
	              type:"POST",
	              url:baseurl + '?action=User&method=getUserById',
                  data:{userid:obj[i].userid},
                  success:function(data){
                  	var obj = eval("("+data+")");
                  	var name;
                    	  name=obj.nickName;
                          // console.log(name);
	        	          var friendDiv  = "<div class='menber' id="+obj.userid+">"+"<div class='men-pirture'>"+"<span class='m-pirture'>"+'</span>'+"</div>"+"<div class='chat-item'>"+"<h3 class='s-nickname'>"+"<span class='s-nick-text' id="+obj.userid+'555'+">"+name+"</span>"+"</h3>"+"</div>"+"</div>";
	                      $(".slide_one").append(friendDiv);
                  }
                })
	          }
	          else{
	          	var friendDiv  = "<div class='menber' id="+obj[i].userid+">"+"<div class='men-pirture'>"+"<span class='m-pirture'>"+'</span>'+"</div>"+"<div class='chat-item'>"+"<h3 class='s-nickname'>"+"<span class='s-nick-text' id="+obj[i].userid+'555'+">"+obj[i].remark+"</span>"+"</h3>"+"</div>"+"</div>";
	                      $(".slide_one").append(friendDiv);
	          }
	        }
		}	
	})
}
//此为设置备注函数
function setmark(SecondName){
	$.ajax({
		type:"POST",
		url:baseurl+'?action=Friend&method=setRemark',
		data:{
			userid:MenID,
			remark:SecondName,
		},
		success:function(data){
			var obj = eval("("+data+")");
    	              // console.log(data);
			if (obj.statue=='success') {
               $(".frieng_Sname").show();
               $(".meta_content").show();
               $(".correct_name").hide();
               $(".Mcorrect_name").hide();
			}
			else{
				// console.log("提交失败"); 
			}
		},
	})
}
//获取好友备注
function getremark(ID){
	$.ajax({
		type:"POST",
		url:baseurl+'?action=Friend&method=getFriendsList',
		success:function(data){
			var obj = eval("("+data+")");
			for (var i = 0; i < obj.length; i++) {
				if (obj[i].userid==ID) {
					// console.log("备注为："+obj[i].remark);
					if (obj[i].remark!=null) {
					$(".frieng_Sname").text(obj[i].remark);
					$(".meta_content").text(obj[i].remark);
					$("#"+obj[i].userid+'555').text(obj[i].remark);
					$("#"+obj[i].userid+'444').text(obj[i].remark);
					// $("#CA-nickname").text(obj[i].remark);
					Title_Name = obj[i].remark;
				    }
				    else{
				      $(".frieng_Sname").text('修改好友备注');
				      $(".meta_content").text('修改好友备注');
				      Title_Name = '';
					  // $("#"+MenID+'111').text('修改好友备注');
				    }
				}
			}
		}
	})
}
//获取好友资料
function friend_meg(content){
	        $.ajax({
	                  type:"POST",
	                  url:baseurl + '?action=User&method=getUserById',
                      data:{userid:content},
                      success: function(data){
    	              var obj = eval("("+data+")");
    	              // console.log(data);
    	               frieng_name = obj.nickName;
    	              if (obj.statue!='error') {
    		           $(".nickname2").text(obj.nickName);
    		           $(".signature2").text(obj.introduction);
    		           $(".sex2").text(obj.sex);
    		           $(".age2").text(obj.age);
    		           $(".email2").text(obj.email);
    	                }
    	              else{
    		            // console.log("错误");
    	                }
                      },
            });
}
//发送消息
function send(content){
	$.ajax({
		type:"POST",
		url:baseurl+'?action=Message&method=sendTo',
		data:{
			userid:MenID,
			content:content
		},
		success:function(data){
			var obj = eval("("+data+")");
    	    // console.log(data);
			if (obj.statue='success') {
               var Message ='<div class="other">'+
             '<div class="clearfix">'+
               '<div class="m-one">'+
                   '<div class="other-body">'+
                     '<p class="m-time">'+'<span>'+currentTime()+'</span>'+'</p>'+
                     '<span class="other-avator">'+"</span>"+
                     '<div class="content">'+
                       '<div class="other-bubble">'+
                          '<div class="bubble_wrap">'+
                            '<div class="m_meg">'+
                              '<span class="meg">'+strFilter(content);+'</span>'+
                            '</div>'+
                          '</div>'+
                       '</div>'+
                    '</div>'+
                   '</div>'+
               '</div>'+
             '</div>'+
           '</div>'
           $('#'+MenID + '1').append(Message);
               $("#send-frame").val('');
           $('#'+MenID+'1').scrollTop( $('#'+MenID+'1')[0].scrollHeight );
			}
			else{
				alert("发送失败！");
				return false;
			}
		}
	})
}
//获取聊天记录
function Recentnews(ID){
	$.ajax({
		type:"POST",
		url:baseurl+'?action=Message&method=getRecentByUserId',
		data:{
			userid:ID,
			number:20,
		},
		success:function(data){
             var obj = eval("("+data+")");
             // console.log(data);
              for (var i = obj.length-1; i >0; i--) {
              	var toUserId = obj[i].toUserId;
              	var fromUserId = obj[i].fromUserId;
              	var messigeId = obj[i].messigeId;
              	var content = obj[i].content;
              	var time = obj[i].time;
              	if (ID==fromUserId) {
              		var meg = '<div class="you" id='+messigeId+'>'+
                                '<div class="clearfix">'+
                                  '<div class="you-hd">'+
                                    '<span class="you-hd-name">'+fname+'</span>'+
                                     '<span class="you-hd-time">'+time+'</span>'+
                                   '</div>'+
                              '<div class="you-content">'+
                             '<pre>'+content+'</pre>'+
                              '</div>'+
                            '</div>'+
                          '</div>';
                      $("#"+fromUserId+'123').append(meg); 
                      // console.log("B="+B);
                      $("#"+fromUserId+'123').scrollTop( $("#"+fromUserId+'123')[0].scrollHeight );
              	}
              	else{
              	var meg = '<div class="me" id='+messigeId+'>'+
                             '<div class="clearfix">'+
                                '<div class="me-hd">'+
                                  '<span class="me-hd-name">'+myname+'</span>'+
                                  '<span class="me-hd-time">'+time+'</span>'+
                                '</div>'+
                             '<div class="me-content">'+
                                 '<pre>'+content+'</pre>'+
                             '</div>'+
                           '</div>'+
                        '</div>';
                     $("#"+toUserId+'123').append(meg);
                      $("#"+toUserId+'123').scrollTop( $("#"+toUserId+'123')[0].scrollHeight );
              	}
              }
          }
		
	})
} 
//获取好友昵称或者备注
var fname;
function GETname(ID){
   getremark(ID);
   $.ajax({
   	type:"POST",
   	url:baseurl+"?action=User&method=getUserById",
   	data:{userid:ID},
   	success:function(data){
   		var obj =eval ("("+data+")");
     	if (Title_Name!='') {obj.nickName = Title_Name;}
         fname = obj.nickName;  		
   	}
   })
}
//判断有无新消息
function autoPlay(){
 var time = setInterval(function getnews(){
	$.ajax({
		type:"POST",
		url:baseurl+'?action=Message&method=getUnreadUserId',
		success:function(data){
			var obj = eval("("+data+")");
			if (obj.statue != 'error') {
				var news_id;
				for (var i = 0; i < obj.length; i++) {
					news_id = obj[i];
					// console.log(news_id);
										
					//判断正在聊天存在这个正在聊天模块。
					if ($("."+news_id).length>0) {
                       $("."+news_id).remove();
                       getremark(news_id);
				    	// $("#CA-nickname").text(Title_Name);
                       var A ;
					$.ajax({
                       	type:"POST",
                       	url:baseurl + '?action=User&method=getUserById',
                       	data:{userid:news_id},
                       	success:function(){
                       		if (Title_Name!='') {obj.nickName = Title_Name;}
                       		A = obj.nickName;
                        }
                         })
                     var chating = "<div class='chat_ing"+" "+news_id+"'"+"id="+news_id+">"+"<div class='men-pirture'>"+"<span class='m-pirture'>"+"<span class='icon wechat_reddot' id ="+news_id+'777'+">"+"</div>"+"<div class='chat-item'>"+"<h3 class='s-nickname'>"+"<span class='s-nick-text' id="+news_id+'444'+">"+A+"</span>"+"</h3>"+"</div>"+"</div>";
                        if ($(".chat_ing").length>0) {
                         $(".chat_ing").first().before(chating);
                      //    getremark(news_id);
	                     // if (Title_Name!='') {$("#CA-nickname").text(Title_Name);}
	                     // if (Title_Name=='') {$("#CA-nickname").text(frieng_name);}
		                 // $("."+news_id).css("background","#3A3F45").siblings("div").css("background","#2e3238");
		                }
		                else{
		                 $(".chating").append(chating);
                      //    getremark(news_id);
	                     // if (Title_Name!='') {$("#CA-nickname").text(Title_Name);}
	                     // if (Title_Name=='') {$("#CA-nickname").text(frieng_name);}
		                 // $("."+news_id).css("background","#3A3F45").siblings("div").css("background","#2e3238");
		                }
					    //判断是否处于该id的聊天页面上，如果处于，则无红点，若不在，则反。
					    judgereddot(news_id);
				    }
				    //判断正在聊天不存在这个模块，并添加。
				    else{
				    	getremark(news_id);
				    	// $("#CA-nickname").text(Title_Name);
				    var A ;
					$.ajax({
                       	type:"POST",
                       	url:baseurl + '?action=User&method=getUserById',
                       	data:{userid:news_id},
                       	success:function(){
                       		if (Title_Name!='') {obj.nickName = Title_Name;}
                       		A = obj.nickName;
                        }
                         })
                     var chating = "<div class='chat_ing"+" "+news_id+"'"+"id="+news_id+">"+"<div class='men-pirture'>"+"<span class='m-pirture'>"+"<span class='icon wechat_reddot' id ="+news_id+'777'+">"+"</div>"+"<div class='chat-item'>"+"<h3 class='s-nickname'>"+"<span class='s-nick-text' id="+news_id+'444'+">"+A+"</span>"+"</h3>"+"</div>"+"</div>";
                        if ($(".chat_ing").length>0) {
                         $(".chat_ing").first().before(chating);
		                 // $("."+news_id).css("background","#3A3F45").siblings("div").css("background","#2e3238");
		                }
		                else{
		                 $(".chating").append(chating);
		                 // $("."+news_id).css("background","#3A3F45").siblings("div").css("background","#2e3238");
		                }
					    //判断是否处于该id的聊天页面上，如果处于，则无红点，若不在，则反。
					    $("#"+news_id+'777').show();
	                    $(".reddot").show(); 
					    judgereddot(news_id);
				    	// getremark(news_id);
				    	// $("#CA-nickname").text(Title_Name);
				    	// $.ajax({
	        //                type:"POST",
	        //                url:baseurl + '?action=User&method=getUserById',
         //                   data:{userid:news_id},
         //                   success:function(data){
         //                   	var obj = eval("("+data+")");
         //                   	if (Title_Name!='') {obj.nickName = Title_Name;}
         //                    var chating = "<div class='chat_ing"+" "+news_id+"'"+"id="+news_id+">"+"<div class='men-pirture'>"+"<span class='m-pirture'>"+"<span class='icon wechat_reddot' id ="+news_id+'777'+">"+"</div>"+"<div class='chat-item'>"+"<h3 class='s-nickname'>"+"<span class='s-nick-text' id="+ID+'444'+">"+obj.nickName+"</span>"+"</h3>"+"</div>"+"</div>"
	        //                  $(".chat_ing").first().before(chating);	  
	        //                  console.log("hi");  
	        //                  $("#"+news_id+'777').show();
	        //                  $(".reddot").show();                     
					    //      //判断是否处于该id的聊天页面上，如果处于，则无红点，若不在，则反。
					    //       judgereddot(news_id);
         //                   }
         //                })
				    }
				}
			}
			else{
				// console.log(obj.error);
			}
		}
	})
  },2000);
_interval = time;
}
//获取好友发来的消息
function getMeg(news_id){
	$.ajax({
		type:"POST",
		url:baseurl+'?action=Message&method=getUnreadByUserId',
		data:
		{
          userid:news_id,
		},
		success:function(data){
			var obj = eval("("+data+")");
			// console.log("5f4ds6=="+data);
		for (var i = 0; i< obj.length; i++) {
			var receiverT = obj[i].time;
			var rec_content = obj[i].content;
			var reid = obj[i].fromUserId;
			var remd = obj[i].messageId;
			// console.log("meee="+remd);
            // strFilter(rec_content);
			//添加聊天窗口
			if ($("#"+reid+"222").length>0) {
				getremark(reid);
				// $("#CA-nickname").text(Title_Name);
				$.ajax({
				type:"POST",
	                  url:baseurl + '?action=User&method=getUserById',
                      data:{userid:reid},
                      success:function(data){
                      	var obj = eval("("+data+")");
                      	// console.log(data);
                      	if (Title_Name!='') {obj.nickName = Title_Name;}
                      	var Message = '<div class="myself">'+
             '<div class="clearfix">'+
               '<div class="m-one">'+
                   '<div class="m-body">'+
                     '<p class="m-time">'+'<span>'+receiverT+'</span>'+'</p>'+
                     '<span class="avator">'+"</span>"+
                     '<div class="content">'+
                       '<h4 class="content-nick" id='+reid+'123'+'>'+obj.nickName+'</h4>'+
                       '<div class="bubble">'+
                          '<div class="bubble_wrap">'+
                            '<div class="m_meg">'+
                              '<pre class="meg" id='+remd+'>'+'</pre>'+
                            '</div>'+
                          '</div>'+
                       '</div>'+
                     '</div>'+
                   '</div>'+
               '</div>'+
             '</div>'+
              '</div>'
              $('#'+reid+ '1').append(Message);
              $("#"+remd).html(strFilter(rec_content));
              $('#'+reid+ '1').scrollTop( $('#'+reid+ '1')[0].scrollHeight );//滚动条置底
                      }
			   })
			}
		   else{
		   	getremark(reid);
		    var chat_content = "<div class='box_mainwrap'"+"id="+reid+'222'+">"+"<div class='box_main'"+ "id="+reid+'1'+">"+"</div>"+"</div>";
	        $(".chat_content").append(chat_content);
	            if ($(".box_mainwrap").is(":hidden")) 
	            {
	            	$("#CA-nickname").text(Title_Name);
	            	$("#"+reid+'222').show();
	            }
		   	    else{$("#"+reid+'222').hide();}
			$.ajax({
				type:"POST",
	                  url:baseurl + '?action=User&method=getUserById',
                      data:{userid:reid},
                      success:function(data){
                      	var obj = eval("("+data+")");
                      	// console.log(data);
                      	if (Title_Name!='') {obj.nickName = Title_Name;}
                      	var Message = '<div class="myself">'+
             '<div class="clearfix">'+
               '<div class="m-one">'+
                   '<div class="m-body">'+
                     '<p class="m-time">'+'<span>'+receiverT+'</span>'+'</p>'+
                     '<span class="avator">'+"</span>"+
                     '<div class="content">'+
                       '<h4 class="content-nick" id='+reid+'123'+'>'+obj.nickName+'</h4>'+
                       '<div class="bubble">'+
                          '<div class="bubble_wrap">'+
                            '<div class="m_meg">'+
                              '<pre class="meg" id='+remd+'>'+'</pre>'+
                            '</div>'+
                          '</div>'+
                       '</div>'+
                     '</div>'+
                   '</div>'+
               '</div>'+
             '</div>'+
              '</div>'
              $('#'+reid+ '1').append(Message);
              $("#"+remd).html(strFilter(rec_content));
             $('#'+reid+ '1').scrollTop( $('#'+reid+ '1')[0].scrollHeight ); //滚动条置底
                      }
			})
		     }
            }
		}
	})
}
//获取当前时间
function currentTime(){
  var str = '';
  var d = new Date();
  var sperator1 = "-";
  var sperator2 = ":";
  var month = d.getMonth()+1;
  var strd = d.getDate();
  var strH = d.getHours();
  var strM = d.getMinutes();
  var strS = d.getSeconds();
  if (month >= 1 && month <= 9) {
	  month = '0' + month;
  }
  if (strd >=0 && strd <=9) {
	  strd = '0' + strd;
  }
  if (strH >=0 && strH <=9) {
	strH = '0' + strH;
  }
  if (strM >=0 && strM <=9) {
	strM = '0' + strM;
  }
   if (strS >=0 && strS <=9) {
	strS = '0' + strS;
 }
  str = d.getFullYear() + sperator1 + month + sperator1 +strd + " " +strH
     + sperator2 + strM+sperator2+strS;
  return str;
}
/***************************表情模块************************/
//自定义设置表情图标函数
function InitFace() {
   var strHTML = "";
   for (var i = 1; i <=60; i++) {
   	strHTML ="<li>"+"<a>"+"<img src='../Photo/emo_" + i + ".gif' id='"+i+"'/>"+"</a>"+"</li>";
   $(".faces_main ul").append(strHTML);
   }
}
//绑定单击表情事件
$(document).on("click",".faces_main ul li a img",function(){
	var strContent = $("#send-frame").val() +  "<img src='" + this.src + "'>";
	$("#send-frame").val(strContent);
})
$(".face").click(function(){
	if ($(".faces_main ul li a img").length>0) {$(".faces_box").toggle();}
	else{
	InitFace();//获取表情
	$(".faces_box").toggle();}
})
/**********************记住密码***********/
// function

/************************过滤消息******************/
function strFilter(str){
  // str = str.replace(/<\/?(?!img\b)[a-z]+[^>]*>/ig,'');
  str = str.replace(/<\/?(?!img\b)[a-z\d]+[^>]*>/ig, function ($0) { return $0.replace(/</g, '&lt;').replace(/>/g, '&gt;') });
  return str;
}
/***************动态添加正在聊天人员************************/
function Addmen(ID){
	   var chating = "<div class='chat_ing"+" "+ID+"'"+"id="+ID+">"+"<div class='men-pirture'>"+"<span class='m-pirture'>"+"</span>"+"<span class='icon wechat_reddot' id ="+ID+'777'+">"+"</div>"+"<div class='chat-item'>"+"<h3 class='s-nickname'>"+"<span class='s-nick-text' id="+ID+'444'+">"+frieng_name+"</span>"+"</h3>"+"</div>"+"</div>"
	   if ($(".chat_ing").length>0) {
	   	$(".chat_ing").first().before(chating);
	   getremark(ID);
	   if (Title_Name!='') {$("#CA-nickname").text(Title_Name);}
	   if (Title_Name=='') {$("#CA-nickname").text(frieng_name);}
	   $("."+ID).css("background","#3A3F45").siblings("div").css("background","#2e3238");
	  }
	  else{
	   $(".chating").append(chating);
	   getremark(ID);
	   if (Title_Name!='') {$("#CA-nickname").text(Title_Name);}
	   if (Title_Name=='') {$("#CA-nickname").text(frieng_name);}
	   $("."+ID).css("background","#3A3F45").siblings("div").css("background","#2e3238");}
}
function Add2(ID){
	if ($("#"+ID+"222").length>0) {
		$(".box_mainwrap").hide();
	    $('#'+ID + '222').show();
	   
	}
    else{
	var chat_content = "<div class='box_mainwrap'"+"id="+ID+'222'+">"+"<div class='box_main'"+ "id="+ID+'1'+">"+"</div>"+"</div>";
	$(".chat_content").append(chat_content);
	$(".box_mainwrap").hide();
	$('#'+ID + '222').show();
    }
}
function Add(ID){
	if ($("."+ID).length>0) {
		$("."+ID).remove();
		Addmen(ID);
		$("."+ID).css("background","#3A3F45").siblings("div").css("background","#2e3238");
	}
    else{
    	Addmen(ID);
    }
}
/*********************添加红点*****************************/
function judgereddot(ID) {
					    if ($("#"+ID+'222').is(":hidden")) {			    
					      $(".reddot").show();
					      $("#"+ID+'777').show();					      
					      getMeg(ID);
				         }
				        else{				     	
				     	 getMeg(ID);
				     	 $("#CA-nickname").text(Title_Name);
				     	 $("."+ID).css("background","#3A3F45").siblings("div").css("background","#2e3238");
				        }
				      }
/************************************************************/
});


