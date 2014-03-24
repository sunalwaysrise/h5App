/**
 * @author luwenbin@live.com
 */
var countDown={
	t:60,
	init:function(){
		if(this.t>1){
			this.t--;
			$("#resendVeri span").html(this.t);
			setTimeout("countDown.init()",1000);
		}else{
			$("#resendVeri").html('没收到？<span onclick="countDown.restart();">重新发送</span>');
		}
	},
	restart:function(){
		this.t=60;
		$("#resendVeri").html('<span>'+this.t+"</span> 秒后重新发送");
		this.init();
	},
	p:0,//当前页
	locked:false,//锁定分页
	next:function(url,data,dom){
		$.ajax({
			url:url,
			data:data,
			beforeSend:function(){
				countDown.locked=true;
			},
			success:function(data){
				countDown.locked=false;
				dom.append(data);
			}
		});
	}
};
cp2y.user={
	getActivity:function(){
		$.ajax({
			url:WebAppUrl.HOME_APP_URL+"/activity/userActivityCount",
			success:function(data){
				if(data.myActivityCount>0){
					$("#hasActive").append('<i class="unRead"></i>');
				}
			}
		});
	},
	status:function(op){
		$.ajax({
			url:WebAppUrl.HOME_APP_URL+"/user/checkLogin",
			anysc:false,
			type:"post",
			success:function(data){
				op(data);
			}
		});
	},
	checkStatus:function(){
		this.status(function(isLogin){
			if(isLogin.flag!=1){
				if(cp2y.util.getArgs('type')=="user"){
					location.hash="type=user&part=signIn";
					cp2y.user.signInBox();
				}
			}else{
				$("#userHeader").html(isLogin.username);
			}
		});
	},
	checkLogin:function(){
		if(cp2y.util.getCookies("cp_uuidsession_id")){
			localStorage.setItem('username', cp2y.util.getCookies("cp_username"));
			return true;
		}else{
			return false;
		}
	},
	changeStatus:function(){
		this.status(function(isLogin){
			if(isLogin.flag==1){
				$("#indexNav").append('<p id="imLogin" onclick="cp2y.user.home();cp2y.index();">'+isLogin.username+'</p>');
				localStorage.setItem('username', isLogin.username);
				cp2y.user.getActivity();//获得可参与
			}else{
				$("#imLogin").remove();
				if(cp2y.util.getArgs('type')=="user" && cp2y.util.getArgs('part')!="scheme"){
					location.hash="type=user&part=signIn";
					cp2y.user.signInBox();
				}
				localStorage.removeItem("username");
			}
		});
	},
	setbalance:function(){
		$.ajax({
			url:WebAppUrl.HOME_APP_URL+"/core/user/query_balance",
			success:function(data){
				if(data.flag==1){
					$("#balance span").html(data.balance+"元");
				}
			}
		});
	},
	signInBox:function(){
		location.hash="type=user&part=signIn";
		userDom.GoIndex1.show();userDom.GoIndex2.hide();userDom.GoIndex3.hide();userDom.more.hide().removeClass('on');
		userDom.moreDetail.hide().html('');
		index.hide();mainSection.hide();drawCenter.hide();userCenter.show();
		userPartBox.show();
		userDom.userPartTitle.html("账户登录");
		var html=[];
		html.push('<div class="userPartBox1"><div id="userTip3" ></div>');
		html.push('<input type="text" id="username" placeholder="用户名/手机号" class="input4 mt40" />');
		html.push('<input type="password" id="password" placeholder="密码" class="input4 nobt" />');
		html.push('<a id="login" class="btn1 mt10" onclick="cp2y.user.signIn()">登录</a>');
		html.push('<p class="userTip1">');
		html.push('<a class="fl" id="goSignUp" onclick="cp2y.user.signUpBox()">免费注册</a>');
		html.push('<a class="fr" onclick="cp2y.user.findPasswordBox()">找回密码</a>');
		html.push('</p>');
		// html.push('<div class="quickSignIn">');
		// html.push('<p>第三方，快捷登录</p>');
		// html.push('<a class="input4">新浪微博</a>');
		// html.push('<a class="input4 nobt">QQ</a>');
		// html.push('<a class="input4 nobt">支付宝</a>');
		// html.push('</div>');
		html.push('</div>');
		userPartBox.html(html.join(''));
	},
	signIn:function(){
		cp2y.dialog.clearTip();
		var data={
			username:$("#username").val().trim(),
			password:$("#password").val().trim()
		};
		if(!data.username || !data.password){
			cp2y.dialog.tip('信息不能为空');
		}
		$.ajax({
			url:WebAppUrl.HOME_APP_URL+"/user/login",
			data:data,
			type:"post",
			dataType:"json",
			beforeSend:function(){
				cp2y.dialog.loading();
			},
			success:function(data){
				cp2y.dialog.clearLoading();
				if(data.flag==1){
					cp2y.user.changeStatus();
					cp2y.user.home();
				}else{
					cp2y.dialog.tip(data.message);
				}
			},
			error:function(){
				//alert("login error");
				cp2y.dialog.tip("login error");
				cp2y.dialog.clearLoading();
			}
		});
	},
	signOut:function(){
		$.ajax({
			url:WebAppUrl.HOME_APP_URL+"/user/exit",
			beforeSend:function(){
				cp2y.dialog.loading();
			},
			success:function(data){
				cp2y.user.changeStatus();
				cp2y.dialog.clearLoading();
				cp2y.user.signInBox();
			},
			error:function(){
				cp2y.dialog.clearLoading();
			}
		});
	},
	signUpBox:function(){
		location.hash="type=user&part=signUp";
		userDom.GoIndex1.hide();userDom.GoIndex2.show();userDom.GoIndex3.hide();userDom.more.hide();userDom.moreDetail.hide();
		userDom.userPartTitle.html("免费注册");
		var html=[];
		html.push('<div class="userPartBox1">');
		html.push('<div id="userTip3"></div>');
		html.push('<input type="number" id="phone" placeholder="请输入手机号" class="input4 mt40" />');
		html.push('<a id="getVerify" onclick="cp2y.user.getVeri()" class="btn1 mt10">获取验证码</a>');
		//html.push('<p class="userTip2">我已经满18周岁并同意<a>《用户服务条款》</a></p>');
		html.push('</div>');
		userPartBox.html(html.join(''));
	},
	getVeri:function(){
		var val=$("#phone").val().trim();
		cp2y.dialog.clearTip();
		if(val.isPhone()){
			$.ajax({
				url:WebAppUrl.HOME_APP_URL+"/user/sendmsg",
				data:{mobile:val},
				beforeSend:function(){
					cp2y.dialog.loading();
				},
				success:function(data){
					cp2y.dialog.clearLoading();
					if(data.flag==1){
						userDom.GoIndex1.hide();userDom.GoIndex2.hide();userDom.GoIndex3.show();userDom.more.hide();userDom.moreDetail.hide();
						userDom.userPartTitle.html("免费注册");
						var html=[];
						html.push('<div class="userPartBox1">');
						html.push('<div id="userTip3"></div>');
						html.push('<input type="text" id="veri" placeholder="请输入手机验证码" class="input4 mt40" />');
						html.push('<a onclick="cp2y.user.setPassword('+val+')" class="btn1 mt10">提交验证码</a>');
						html.push('<p id="resendVeri"><span>60</span> 秒后重新发送</p>');
						html.push('</div>');
						userPartBox.html(html.join(''));
						countDown.t=60;
						setTimeout('countDown.init()',1000);
						$("#resendVeri span").html();
						userDom.GoIndex3.off().on('click',function(){
							cp2y.user.signUpBox();
						});
					}else{
						cp2y.dialog.tip(data.message);
					}
				},
				error:function(){
					cp2y.dialog.clearLoading();
				}
			});
		}else{
			return cp2y.dialog.tip('手机号码不正确');
		}
	},
	getVeri2:function(){
		var val=$("#phone").val().trim();
		cp2y.dialog.clearTip();
		if(val.isPhone()){
			$.ajax({
				url:WebAppUrl.HOME_APP_URL+"/core/user/sendMobile",
				data:{mobile:val},
				beforeSend:function(){
					cp2y.dialog.loading();
				},
				success:function(data){
					cp2y.dialog.clearLoading();
					if(data.flag==1){
						userDom.GoIndex1.hide();userDom.GoIndex2.hide();userDom.GoIndex3.show();userDom.more.hide();userDom.moreDetail.hide();
						userDom.userPartTitle.html("重绑定手机号");
						var html=[];
						html.push('<div class="userPartBox1">');
						html.push('<div id="userTip3"></div>');
						html.push('<input type="text" id="veri" placeholder="请输入手机验证码" class="input4 mt40" />');
						html.push('<a onclick="cp2y.user.updataPhone()" class="btn1 mt10">提交验证码</a>');
						html.push('<p id="resendVeri"><span>60</span> 秒后重新发送</p>');
						html.push('</div>');
						userPartBox.html(html.join(''));
						countDown.t=60;
						setTimeout('countDown.init()',1000);
						$("#resendVeri span").html();
						userDom.GoIndex3.off().on('click',function(){
							cp2y.user.signUpBox();
						});
					}else{
						cp2y.dialog.tip(data.message);
					}
				},
				error:function(){
					cp2y.dialog.clearLoading();
				}
			});
		}else{
			return cp2y.dialog.tip('手机号码不正确');
		}
	},
	setPassword:function(phone){
		var data={mobile:phone,validateCode:$("#veri").val()};
		if(!data.mobile || !data.validateCode){
			return cp2y.dialog.tip('不能为空');
		}else{
			$.ajax({
				url:WebAppUrl.HOME_APP_URL+"/user/checkCode",
				data:data,
				type:"post",
				beforeSend:function(){
					cp2y.dialog.loading();
				},
				success:function(data2){
					cp2y.dialog.clearLoading();
					if(data2.flag==1){
						userDom.GoIndex1.hide();userDom.GoIndex2.show();userDom.GoIndex3.hide();userDom.more.hide();userDom.moreDetail.hide();
						userDom.userPartTitle.html("免费注册");
						var html=[];
						html.push('<div class="userPartBox1">');
						html.push('<div id="userTip3"></div>');
						html.push('<input type="password" id="password" placeholder="设置密码" class="input4 mt40" />');
						html.push('<a onclick="cp2y.user.signUp(\''+data.mobile+'\',\''+data.validateCode+'\')" class="btn1 mt10">完成注册</a>');
						html.push('</div>');
						userPartBox.html(html.join(''));
						cp2y.dialog.tip('6-20个字符，区分大小写');
					}else{
						cp2y.dialog.tip(data2.message);
					}
				},
				error:function(){
					cp2y.dialog.clearLoading();
				}
			});
		}
	},
	signUp:function(phone,veri){
		var data={mobile:phone,msgCode:veri,password:$("#password").val()};
		if(!data.mobile || !data.msgCode || !data.password){
			return cp2y.dialog.tip('不能为空');
		}else{
			if(data.password.length <6 || data.password.length>20){
				return cp2y.dialog.tip('6-20个字符，区分大小写');
			}else{
				$.ajax({
					url:WebAppUrl.HOME_APP_URL+"/user/register",
					data:data,
					beforeSend:function(){
						cp2y.dialog.loading();
					},
					success:function(data){
						cp2y.dialog.clearLoading();
						if(data.flag==1){
							cp2y.user.changeStatus();
							cp2y.user.home();
						}else{
							cp2y.dialog.tip(data.message);
						}
					},
					error:function(){
						cp2y.dialog.clearLoading();
					}
				});
			}
		}
	},
	findPasswordBox:function(){
		location.hash="type=user&part=findPassword";
		userDom.GoIndex1.hide();userDom.GoIndex2.show();userDom.GoIndex3.hide();userDom.more.hide();userDom.moreDetail.hide();
		userDom.userPartTitle.html("找回密码");
		var html=[];
		html.push('<div class="userPartBox1">');
		html.push('<div id="userTip3"></div>');
		html.push('<input type="text" id="username" placeholder="用户名" class="input4 mt40" />');
		html.push('<input type="text" id="phone" placeholder="手机号码" class="input4 nobt" />');
		html.push('<a id="getVerify" onclick="cp2y.user.findPassword()" class="btn1 mt10">确认</a>');
		html.push('</div>');
		userPartBox.html(html.join(''));
	},
	findPassword:function(){
		cp2y.dialog.clearTip();
		var data={
			username:$("#username").val().trim(),
			mobile:$("#phone").val().trim()
		};
		if(!data.username || !data.mobile){
			return cp2y.dialog.tip("不能为空");
		}
		if(data.mobile.isPhone()){
			$.ajax({
				url:WebAppUrl.HOME_APP_URL+"/user/get_forget_password",
				data:data,
				beforeSend:function(){
					cp2y.dialog.loading();
				},
				success:function(data2){
					cp2y.dialog.clearLoading();
					if(data2.flag==1){
						cp2y.dialog.tip("密码已发送至"+data.mobile+"，请注意查收");
						setTimeout('cp2y.user.signInBox()',2000);
					}else{
						cp2y.dialog.tip(data2.message);
					}
				},
				error:function(){
					cp2y.dialog.clearLoading();
				}
			});
		}else{
			return cp2y.dialog.tip("手机号不合法");
		}
	},
	home:function(){
		this.status(function(isLogin){
			if(isLogin.flag==1){
				var has=localStorage.getItem('HasBuy'),_lotteryId=localStorage.getItem('lotteryId');
				if(has && _lotteryId){
					cp2y.buy.initBuy(_lotteryId,'a0');
				}else{
					location.hash="type=user&part=home";
					index.hide();mainSection.hide();drawCenter.hide();userCenter.show();
					userDom.GoIndex1.show();userDom.GoIndex2.hide();userDom.GoIndex3.hide();userDom.more.hide().removeClass('on');userDom.moreDetail.hide().html('');
					userDom.uPDetail.hide();
					userDom.userPartTitle.html("账户中心");
					var html=[];
					html.push('<div class="userPartBox2">');
					html.push('<div class="userHeader" onclick="cp2y.user.detail()" id="userHeader">'+isLogin.username+'</div>');
					html.push('<div class="balance" id="balance" onclick="cp2y.user.setbalance()" >余额<span></span></div>');
					html.push('<div class="userPartBox2Nav"><h2 onclick="cp2y.user.rechargeBox()">充值</h2>');
					html.push('<h2 onclick="cp2y.user.withdrawalsBox()">提款</h2>');
					html.push('<h2 onclick="cp2y.user.capitalBox()">明细</h2></div>');
					html.push('<table class="history"><thead><tr><td colspan="2">购彩记录</td></tr></thead><tbody id="mySH">');
					html.push('</tbody></table>');
					html.push('<div class="line3" onclick="cp2y.user.logBox()">查看全部</div>');
					html.push('</div>');
					userPartBox.html(html.join('')).show();
					cp2y.user._schemeHistory(0,5,function(data){
						var i=0,len=data.buyHistoryData.length,html=[];
						for(i;i<len;i++){
					if(BT.jc.indexOf(data.buyHistoryData[i].lotteryId)!=-1 && data.buyHistoryData[i].lotteryId!=10059){
					html.push('<tr>');
					}else{
					html.push('<tr onclick="cp2y.user.scheme('+data.buyHistoryData[i].schemeId+')">');
					}
					html.push('<td>'+data.buyHistoryData[i].lotteryName+'</td><td>');
					html.push('<div><b>'+data.buyHistoryData[i].schemeAmount+'元<b>');
					html.push('<span>'+data.buyHistoryData[i].issue+'期</span></div>');
					//if(data.buyHistoryData[i].prize>0){
					html.push('<div><b class="has'+data.buyHistoryData[i].status+'">'+data.buyHistoryData[i].statusDesc+'</b>');
					// }else{
					// html.push('<div><b>'+data.buyHistoryData[i].statusDesc+'</b>');
					// }
					html.push('<span>'+data.buyHistoryData[i].initiateTimeStr+'</span></td></tr>');
						}
						$("#mySH").html(html.join(''));
					});
					cp2y.user.setbalance();
				}
			}else{
				cp2y.user.signInBox();
			}
		});
		// if(!cp2y.user.checkLogin()){
			// location.hash="type=user&part=signIn";
			// cp2y.user.signInBox();
			// cp2y.index();
			// return false;
		// }
	},
	detail:function(_this){
		//用户详细信息
		userDom.GoIndex1.hide();userDom.GoIndex2.show();userDom.GoIndex3.hide();userDom.more.hide().removeClass('on');userDom.moreDetail.hide().html('');
		userDom.userPartTitle.html("个人信息");
		$.ajax({
			url:WebAppUrl.HOME_APP_URL+"/core/user/my_info",
			beforeSend:function(){
				cp2y.dialog.loading();
			},
			success:function(data){
				cp2y.dialog.clearLoading();
				var html=[];
				html.push('<div class="userPartBox4">');
				html.push('<div class="userLin"><span>登录账户</span><p class="black">'+localStorage.getItem('username')+'</p></div>');
				if(data.bindingIdentify==1){
				html.push('<div onclick="cp2y.dialog.alert(\'请联系客服\')" class="userLin wbg mt12"><span>真实姓名</span><p>'+data.name+'</p></div>');
				html.push('<div onclick="cp2y.dialog.alert(\'请联系客服\')" class="userLin wbg"><span>身份证号</span><p>'+data.identify+'</p></div>');
				}else{
				html.push('<div onclick="cp2y.user.updataDetail(1)" class="userLin wbg mt12"><span>真实姓名</span><p></p></div>');
				html.push('<div onclick="cp2y.user.updataDetail(1)" class="userLin wbg"><span>身份证号</span><p></p></div>');
				}
				html.push('<div onclick="cp2y.user.updataDetail(2)" class="userLin wbg mt12"><span>绑定手机</span><p>'+data.mobile+' (重新绑定)</p></div>');
				html.push('<div onclick="cp2y.user.updataDetail(3)" class="userLin wbg mt12"><span>修改密码</span><p></p></div>');
				html.push('<p class="userPartBox61">绑定修改，需联系客服<a href="tel:4006667575">400-666-7575</a></p>');
				html.push('</div>');
				html.push('<div class="fixBottom" onclick="cp2y.user.signOut()">退出账户</div>');
				userPartBox.html(html.join(''));
			}
		});
	},
	updataDetail:function(i){
		//更新个人信息
		if(!i){return false;}
		userDom.GoIndex1.hide();userDom.GoIndex2.hide();userDom.GoIndex3.show();userDom.more.hide();userDom.moreDetail.hide();
		var html=[];
		html.push('<div class="userPartBox1"><div id="userTip3"></div>');
		switch(i){
			case 1:
			userDom.userPartTitle.html("绑定证件");
			html.push('<input type="text" id="updataNick" placeholder="真实姓名" class="input4 mt40" />');
			html.push('<input type="text" id="updataId" placeholder="身份证号码" class="input4 nobt" />');
			html.push('<a id="recharge" onclick="cp2y.user.updataId()" class="btn1 mt10">确认</a>');
			break;
			case 2:
			userDom.userPartTitle.html("绑定手机");
			html.push('<input type="text" id="phone" placeholder="绑定手机可免费定制中奖通知、找回密码" class="input4 mt40" />');
			html.push('<a id="recharge" onclick="cp2y.user.getVeri2()" class="btn1 mt10">确认</a>');
			break;
			case 3:
			userDom.userPartTitle.html("修改密码");
			html.push('<input type="password" id="updataPassword1" placeholder="输入旧密码" class="input4 mt40" />');
			html.push('<input type="password" id="updataPassword2" placeholder="输入新密码" class="input4 mt10" />');
			html.push('<input type="password" id="updataPassword3" placeholder="确认新密码" class="input4 nobt" />');
			html.push('<a id="recharge" onclick="cp2y.user.updataPassword()" class="btn1 mt10">确认</a>');
			break;
		}
		html.push('</div>');
		userPartBox.html(html.join(''));
		userDom.GoIndex3.off().on('click',function(){
			cp2y.user.detail();
		});
	},
	updataId:function(){
		var data={
			name:$("#updataNick").val().trim(),
			identityNumber:String($("#updataId").val().trim())
		},isId=data.identityNumber.isID();
		cp2y.dialog.clearTip();
		if(isId){
			return cp2y.dialog.tip(isId);
		}else if(!data.name){
			return cp2y.dialog.tip("信息不能为空");
		}else{
			$.ajax({
				url:WebAppUrl.HOME_APP_URL+"/core/user/bind_identify_name",
				data:data,
				beforeSend:function(){},
				success:function(data){
					if(data.flag==1){
						cp2y.dialog.tip(data.message);
						setTimeout('userDom.GoIndex3.click()',1000);
					}else{
						cp2y.dialog.tip(data.message);
					}
				}
			});
		}
	},
	updataPhone:function(m){
		var validateCode=$("#veri").val().trim();
		cp2y.dialog.clearTip();
		if(!validateCode){
			return cp2y.dialog.tip('验证码不能为空');
		}else{
			$.ajax({
				url:WebAppUrl.HOME_APP_URL+"/core/user/bind_mobile_validate",
				data:{validateCode:validateCode},
				beforeSend:function(){
					cp2y.dialog.loading();
				},
				success:function(data){
					cp2y.dialog.clearLoading();
					if(data.flag==1){
						userDom.GoIndex3.click();
					}else{
						
					}
				}
			});
		}
	},
	updataPassword:function(){
		var data={
			password:$("#updataPassword1").val(),
			newPassword:$("#updataPassword2").val(),
			newPassword2:$("#updataPassword3").val()
		};
		cp2y.dialog.clearTip();
		if(!data.password||!data.newPassword||!data.newPassword2){
			return cp2y.dialog.tip('以下信息均必填');
		}
		if(data.newPassword!=data.newPassword2){
			return cp2y.dialog.tip('两次输入密码不一致');
		}
		$.ajax({
			url:WebAppUrl.HOME_APP_URL+'/core/user/update_password',
			data:data,
			beforeSend:function(){
				cp2y.dialog.loading();
			},
			success:function(data){
				cp2y.dialog.clearLoading();
				if(data.flag==1){
					cp2y.dialog.tip(data.message);
					setTimeout('userDom.GoIndex3.click()',1000);
				}else{
					cp2y.dialog.tip(data.message);
				}
			}
		});
	},
	capitalBox:function(){//资金明细
		userDom.GoIndex1.hide();userDom.GoIndex2.show();userDom.GoIndex3.hide();userDom.more.show();userDom.moreDetail.hide();
		userDom.userPartTitle.html("资金明细-<span>全部</span>");
		userDom.moreDetail.html('<a class="on" onclick="cp2y.user.capital(this,0)">全部</a><a onclick="cp2y.user.capital(this,2)">购彩</a><a onclick="cp2y.user.capital(this,3)">中奖</a><a onclick="cp2y.user.capital(this,1)">充值</a><a onclick="cp2y.user.capital(this,4)">提款</a>');
		this._capital({optionType:0,firstRow:0,fetchSize:10},function(data){
			cp2y.user.capitalPage+=10;
			var html=[],i=0,len=data.length,has="";
			html.push('<div class="userPartBox3" id="capitalBox1">');
			for(i;i<len;i++){
				if(data[i].payOut){
					has='<b class="has501">-'+data[i].payOut+'元</b>';
				}else{
					has='<b>+'+data[i].inCome+'元</b>';
				}
				if(data[i].isbuy==1){
					if(BT.jc.indexOf(data[i].lotteryId)!=-1 && data[i].lotteryId!=10059){
					html.push('<div class="capital userPartBox3C">');
					}else{
					html.push('<div class="capital userPartBox3C" onclick="cp2y.user.scheme('+data[i].schemeId+')">');
					}
				}else{
					html.push('<div class="capital userPartBox3C">');
				}
				html.push('<div><b>'+data[i].type+'</b><span>'+data[i].createTime+'</span></div>');
				html.push('<div>'+has+'<span>余额：'+data[i].balance+'</span></div></div>');
			}
			html.push('</div>');
			if(len<10){
				html.push('<div class="btn2" >暂无</div>');
			}else{
				html.push('<div class="btn2" onclick="cp2y.user.getNext(0,'+cp2y.user.capitalPage+')" id="getMore">查看更多</div>');	
			}
			userPartBox.html(html.join(''));
		});
	},
	capitalPage:0,
	capitalType:0,
	capital:function(o,id){
		cp2y.user.capitalPage=0;
		cp2y.user.capitalType=id;
		$(o).siblings().removeClass('on');$(o).addClass('on');
		userDom.more.removeClass('on');userDom.moreDetail.hide();
		userDom.userPartTitle.html("资金明细-<span>"+$(o).html()+"</span>");
		if(id==4){
			this._capital({optionType:id,firstRow:0,fetchSize:10},function(data){
			cp2y.user.capitalPage+=10;
			var data=data.list,html=[],i=0,len=data.length,has="";
			html.push('<div class="userPartBox3" id="capitalBox1">');
			for(i;i<len;i++){
				html.push('<div class="capital userPartBox3C">');
				html.push('<div><b>'+data[i].type+'</b><span>'+data[i].typeDesc+'</span></div>');
				html.push('<div>提款金额：'+data[i].money+'元<span>'+data[i].stateDesc+'</span></div></div>');
			}
			html.push('</div>');
			if(len<10){
				html.push('<div class="btn2" >暂无</div>');
			}else{
				html.push('<div class="btn2" onclick="cp2y.user.getNext2('+cp2y.user.capitalType+','+cp2y.user.capitalPage+')" id="getMore">查看更多</div>');	
			}
			userPartBox.html(html.join(''));
			},4);
		}else{
			this._capital({optionType:id,firstRow:0,fetchSize:10},function(data){
			cp2y.user.capitalPage+=10;
			var html=[],i=0,len=data.length,has="";
			html.push('<div class="userPartBox3" id="capitalBox1">');
			for(i;i<len;i++){
				if(data[i].payOut){
					has='<b class="has501">-'+data[i].payOut+'元</b>';
				}else{
					has='<b>+'+data[i].inCome+'元</b>';
				}
				if(BT.jc.indexOf(data[i].lotteryId)!=-1 && data[i].lotteryId!=10059){
					html.push('<div class="capital userPartBox3C">');
				}else{
					html.push('<div class="capital userPartBox3C" onclick="cp2y.user.scheme('+data[i].schemeId+')">');
				}
				html.push('<div><b>'+data[i].type+'</b><span>'+data[i].createTime+'</span></div>');
				html.push('<div>'+has+'<span>余额：'+data[i].balance+'</span></div></div>');
			}
			html.push('</div>');
			if(len<10){
				html.push('<div class="btn2" >暂无</div>');
			}else{
				html.push('<div class="btn2" onclick="cp2y.user.getNext('+cp2y.user.capitalType+','+cp2y.user.capitalPage+')" id="getMore">查看更多</div>');	
			}
			userPartBox.html(html.join(''));
			},1);
		}
	},
	getNext:function(oT,fR){//下一页
		$("#getMore").remove();
		this._capital({optionType:oT,firstRow:fR,fetchSize:10},function(data){
			var html=[],i=0,len=data.length,has="";
			if(len==0){
				$("#capitalBox1").append('<div class="btn2">没有了</div>');
				return false;
			}
			cp2y.user.capitalPage+=10;
			for(i;i<len;i++){
				if(data[i].payOut){
					has='<b class="has501">-'+data[i].payOut+'元</b>';
				}else{
					has='<b>+'+data[i].inCome+'元</b>';
				}
				if(BT.jc.indexOf(data[i].lotteryId)!=-1 && data[i].lotteryId!=10059){
					html.push('<div class="capital userPartBox3C">');
				}else{
					html.push('<div class="capital userPartBox3C" onclick="cp2y.user.scheme('+data[i].schemeId+')">');
				}
				html.push('<div><b>'+data[i].type+'</b><span>'+data[i].createTime+'</span></div>');
				html.push('<div>'+has+'<span>余额：'+data[i].balance+'</span></div></div>');
			}
			html.push('<div class="btn2" onclick="cp2y.user.getNext('+cp2y.user.capitalType+','+cp2y.user.capitalPage+')" id="getMore">查看更多</div>');
			$("#capitalBox1").append(html.join(''));
		});
	},
	getNext2:function(oT,fR){//下一页
		$("#getMore").remove();
		this._capital({optionType:oT,firstRow:fR,fetchSize:10},function(data){
			var html=[],i=0,len=data.length,has="";
			if(len==0){
				$("#capitalBox1").append('<div class="btn2">没有了</div>');
				return false;
			}
			cp2y.user.capitalPage+=10;
			for(i;i<len;i++){
				html.push('<div class="capital userPartBox3C">');
				html.push('<div><b>'+data[i].type+'</b><span>'+data[i].typeDesc+'</span></div>');
				html.push('<div>'+data[i].money+'元</div></div>');
			}
			html.push('<div class="btn2" onclick="cp2y.user.getNext2('+cp2y.user.capitalType+','+cp2y.user.capitalPage+')" id="getMore">查看更多</div>');
			$("#capitalBox1").append(html.join(''));
		});
	},
	_capital:function(data,fn,tf){
		var url;
		if(tf==4){
			url='/core/user/capitalInOut_detail';
		}else{
			url='/core/user/capital_detail';
		}
		$.ajax({
			url:WebAppUrl.HOME_APP_URL+url,
			data:data,
			beforeSend:function(){
				cp2y.dialog.loading();
			},
			success:function(data){
				cp2y.dialog.clearLoading();
				fn(data);
			}
		});
	},
	logBox:function(){
		userDom.GoIndex1.hide();userDom.GoIndex2.show();userDom.GoIndex3.hide();userDom.more.show();userDom.moreDetail.hide();
		userDom.userPartTitle.html("购彩记录-<span>全部</span>");
		userDom.moreDetail.html('<a class="on" onclick="cp2y.user.log(this,0)">全部</a><a onclick="cp2y.user.log(this,5)">代购</a><a onclick="cp2y.user.log(this,3)">合买发起</a><a onclick="cp2y.user.log(this,4)">合买参与</a><a onclick="cp2y.user.log(this,1)">追号发起</a><a onclick="cp2y.user.log(this,2)">追号参与</a><a onclick="cp2y.user.log(this,6)">中奖发起</a><a onclick="cp2y.user.log(this,7)">中奖参与</a>');
		this._log({type:0,status:0,firstRow:0,fetchSize:10},function(data){
			cp2y.user.logPage+=10;
			var i=0,len=data.schemelist.length,html=[];
			html.push('<div class="userPartBox3" id="logBox">');
			for(i;i<len;i++){
				if(BT.jc.indexOf(data.schemelist[i].lotteryId)!=-1 && data.schemelist[i].lotteryId!=10059){
				html.push('<div class="mylog userPartBox3C">');
				}else{
				html.push('<div onclick="cp2y.user.scheme('+data.schemelist[i].schemeId+')" class="mylog userPartBox3C">');		
				}
				html.push('<p><img src="'+WebAppUrl.RESOURCE_URL+data.schemelist[i].lotteryId+'.png"/><span>'+data.schemelist[i].lotteryName+'</span></p><div>');
				html.push('<b>金额'+data.schemelist[i].schemeAmount+'元</b>');
				html.push('<span>'+data.schemelist[i].issue+'期</span></div><div>');
				if(data.schemelist[i].prize>0){
				html.push('<b class="has501">中'+data.schemelist[i].prize+'元</b>');
				}else{
				html.push('<b>'+data.schemelist[i].statusDesc+'</b>');
				}
				html.push('<span>'+data.schemelist[i].initiateTime+'</span></div></div>');
			}
			html.push('</div>');
			if(len<10){
				html.push('<div class="btn2" >暂无</div>');
			}else{
				html.push('<div class="btn2" onclick="cp2y.user.getNextLog('+cp2y.user.logType+','+cp2y.user.logPage+')" id="getMore">查看更多</div>');	
			}
			userPartBox.html(html.join(''));
		});
	},
	logType:0,
	logPage:0,
	log:function(o,id){
		cp2y.user.logType=id;
		cp2y.user.logPage=0;
		$(o).siblings().removeClass('on');$(o).addClass('on');
		userDom.more.removeClass('on');userDom.moreDetail.hide();
		userDom.userPartTitle.html("购彩记录-<span>"+$(o).html()+"</span>");
		var status=0;
		if(id==6 || id==7){
			status=5;
		}
		this._log({type:this.logType,status:status,firstRow:this.logPage,fetchSize:10},function(data){
			cp2y.user.logPage+=10;
			var i=0,len=data.schemelist.length,html=[];
			html.push('<div class="userPartBox3" id="logBox">');
			for(i;i<len;i++){
				if(BT.jc.indexOf(data.schemelist[i].lotteryId)!=-1 && data.schemelist[i].lotteryId!=10059){
					html.push('<div class="mylog userPartBox3C">');
				}else{
					html.push('<div onclick="cp2y.user.scheme('+data.schemelist[i].schemeId+')" class="mylog userPartBox3C">');
				}			
				html.push('<p><img src="'+WebAppUrl.RESOURCE_URL+data.schemelist[i].lotteryId+'.png"/><span>'+data.schemelist[i].lotteryName+'</span></p><div>');
				html.push('<b>金额'+data.schemelist[i].schemeAmount+'元</b>');
				html.push('<span>'+data.schemelist[i].issue+'期</span></div><div>');
				//html.push('<b class="has'+data.schemelist[i].status+'">'+data.schemelist[i].statusDesc+'</b>');
				if(data.schemelist[i].prize>0){
				html.push('<b class="has501">中'+data.schemelist[i].prize+'元</b>');
				}else{
				html.push('<b>'+data.schemelist[i].statusDesc+'</b>');
				}
				html.push('<span>'+data.schemelist[i].initiateTime+'</span></div></div>');
			}
			html.push('</div>');
			if(len<10){
				html.push('<div class="btn2" >暂无</div>');
			}else{
				html.push('<div class="btn2" onclick="cp2y.user.getNextLog('+cp2y.user.logType+','+cp2y.user.logPage+')" id="getMore">查看更多</div>');	
			}
			userPartBox.html(html.join(''));
		});
	},
	getNextLog:function(t,fR){//下一页
		$("#getMore").remove();
		var status=0;
		if(t==6 || t==7){
			status=5;
		}
		this._log({type:t,status:status,firstRow:fR,fetchSize:10},function(data){
			var html=[],i=0,len=data.schemelist.length;
			if(len==0){
				$("#logBox").append('<div class="btn2">没有了</div>');
				return false;
			}
			cp2y.user.logPage+=10;
			for(i;i<len;i++){
				if(BT.jc.indexOf(data.schemelist[i].lotteryId)!=-1 && data.schemelist[i].lotteryId!=10059){
					html.push('<div onclick="cp2y.user.scheme(\''+data.schemelist[i].schemeId+'\')" class="mylog userPartBox3C">');
				}else{	
					html.push('<div onclick="cp2y.user.scheme(\''+data.schemelist[i].schemeId+'\')" class="mylog userPartBox3C">');
				}
				html.push('<p><img src="'+WebAppUrl.RESOURCE_URL+data.schemelist[i].lotteryId+'.png"/><span>'+data.schemelist[i].lotteryName+'</span></p><div>');
				html.push('<b>金额'+data.schemelist[i].schemeAmount+'元</b>');
				html.push('<span>'+data.schemelist[i].issue+'期</span></div><div>');
				//html.push('<b class="has'+data.schemelist[i].status+'">'+data.schemelist[i].statusDesc+'</b>');
				if(data.schemelist[i].prize>0){
				html.push('<b class="has501">中'+data.schemelist[i].prize+'元</b>');
				}else{
				html.push('<b>'+data.schemelist[i].statusDesc+'</b>');
				}
				html.push('<span>'+data.schemelist[i].initiateTime+'</span></div></div>');
			}
			html.push('<div class="btn2" onclick="cp2y.user.getNextLog('+cp2y.user.logType+','+cp2y.user.logPage+')" id="getMore">查看更多</div>');
			$("#logBox").append(html.join(''));
		});
	},
	_log:function(data,fn){
		$.ajax({
			url:WebAppUrl.HOME_APP_URL+"/core/lottery/my_schemelist",
			data:data,
			beforeSend:function(){
				cp2y.dialog.loading();
			},
			success:function(data){
				cp2y.dialog.clearLoading();
				fn(data);
			}
		});
	},
	scheme:function(sId){//展示详情
		if(!sId){return false;}
		location.hash="#type=user&part=scheme&scheme="+sId;
		userDom.GoIndex1.hide();userDom.GoIndex2.hide();userDom.GoIndex3.show();userDom.more.hide();userDom.moreDetail.hide();
		userPartBox.hide();//隐藏列表内容，以便于恢复
		var title=userDom.userPartTitle.html();
		$.ajax({
			url:WebAppUrl.HOME_APP_URL+"/lottery/scheme_detail",
			data:{schemeId:sId},
			beforeSend:function(){
				cp2y.dialog.loading();
			},
			success:function(data){
				cp2y.dialog.clearLoading();
				var html=[],logStep=1,k1,k2="出票成功",k3="兑奖",isT='追号中';
				userDom.userPartTitle.html(data.lotteryName+"-方案");
				switch(data.schemeStatus){
					case 101://认购中
					logStep=1;k1="认购中";
					break;
					case 201://委托中
					logStep=1;k1="委托中";
					break;
					case 301://出票成功
					logStep=3;k1="待出票";
					break;
					case 401://追号中
					logStep=4;k1="待出票";
					break;
					case 501://中奖
					logStep=5;k1="待出票";k3="中"+data.schemeData.schemePrize+"元";
					break;
					case 601://未中奖
					logStep=6;k1="待出票";k3="未中奖";
					break;
					case 701://撤单
					isT="撤单";
					logStep=7;k1="待出票";k3="撤单";
					break;
				}
				html.push('<div class="logStep logStep'+logStep+'"><span></span><span></span><span></span><i></i><i></i><i></i><a>'+k1+'</a><a>'+k2+'</a><a>'+k3+'</a><code>'+isT+'</code></div>');
				if(BT.jc.indexOf(data.lotteryId)!=-1){
					html.push('<p class="jcScheme1">'+data.schemeData.schemeType+data.traceData[0].issue+'期，'+data.schemeData.numberType+'，'+data.schemeData.schemeContent[0].matchCount+'场，'+data.schemeData.schemeContent[0].pass+','+data.traceData[0].multiple+'倍，共'+data.traceData[0].money+'元</p>');
					var tf=false;
					if(data.schemeData.open==4 ){
						if(data.schemeStatus==501 || data.schemeStatus==701){
							tf=true;
						}
					}
					if(data.schemeData.open==1 || tf){
						if(data.isJingCai==1){
							html.push('<table class="jcScheme2"><thead><tr><td>投注球队</td><td>赔率</td><td>是否中奖</td></tr></thead><tbody>');
							var i=0,td=data.schemeData.schemeContent[0].matches,len=td.length,dd='';
							for(i;i<len;i++){
								if(!td[i].matchResult){
									dd="";
								}else{
									dd=td[i].matchResult;
								}
							html.push('<tr><td>'+td[i].hostName+'</td><td>'+td[i].rate+'</td><td>'+dd+'</td></tr>');
							}
							html.push('</body></table>');
						}else{
							html.push('<table class="jcScheme2"><thead><tr><td>对阵</td><td>比分</td><td>投注</td><td>彩果</td><td>定胆</td></tr></thead><tbody>');
							var i=0,td=data.schemeData.schemeContent[0].matches,len=td.length,ss='--',dd='';
							for(i;i<len;i++){
								if(td[i].rate>0){
									dd="<span class='red'>+"+td[i].rate+"</span>";
								}else{
									dd="<span class='green'>"+td[i].rate+"</span>";
								}
								html.push('<tr><td>'+td[i].hostName+dd+'<br/>vs<br/>'+td[i].guestName+'</td><td>'+(td[i].lastScore?td[i].lastScore:'--')+'</td><td>'+td[i].msg+'</td><td>'+(td[i].lastScore?td[i].lastScore:'--')+'</td><td>'+(td[i].dan?"√":"×")+'</td></tr>');
							}
							html.push('</body></table>');
						}
					}else{
						html.push('<div class="userTip4">该方案未公开</div>');
					}
				}else{
					/* 非竞彩 */
					//方案内容展示Start 
					var i=0,len=data.schemeData.schemeContent.length;
					html.push('<div class="userTip4">投'+data.schemeData.schemeNumberUnit+'注，共'+data.schemeData.buyAmount+'元</div>');
					html.push('<div class="schemeDetail mt10">');
					if(len>3){
						for(i;i<3;i++){
							html.push(data.schemeData.schemeContent[i].content);
						}
						html.push('</div><div class="schemeDetail oHidden" id="hiddenScheme">');
						for(i;i<len;i++){
							html.push(data.schemeData.schemeContent[i].content);
						}
						html.push('</div><p class="toggleScheme" onclick="cp2y.util.toggle(this,$(\'#hiddenScheme\'),\'展开全部方案\')" data="0">&gt;&gt;展开全部方案</p>');
					}else{
						for(i;i<len;i++){
							html.push(data.schemeData.schemeContent[i].content);
						}
						html.push('</div>');
					}
					//方案内容展示End
					
					//追号列表展示Start
					i=0;len=data.traceData.length;
					if(data.schemeData.issueCount==1){
						html.push('<div class="userTip4 mt10">期号详情');	
					}else{
						html.push('<div class="userTip4 mt10">追'+data.schemeData.issueCount+'期');
					}
					if(data.traceData.prizeStop){
						html.push('，累计中奖≥'+data.traceData.prizeStop+'元，停止追号');
					}
					html.push('</div>');
					html.push('<div class="traceDetail">');
					if(len>1){
						var len2=len;
						if(len2>3){len2=3;}
						for(i;i<len2;i++){
							html.push('<div class="traceDetailL"><div><p>'+data.traceData[i].issue+'期：'+data.traceData[i].multiple+'倍，'+data.traceData[i].money+'元</p><p>开奖号码：'+data.traceData[i].drawNumber+'</p></div><div>');
							if(data.traceData[i].prize){
								html.push('<p>'+data.traceData[i].status+'</p><p class="has501">'+data.traceData[i].prize+'元</p>');
							}else{
								html.push('<p class="spanRow1">'+data.traceData[i].status+'</p>');
							}
							html.push('</div></div>');
						}
						if(len==3){
							html.push('</div><div class="traceDetail oHidden" id="hiddenTrace"></div>');
							html.push('<p class="toggleScheme" onclick="cp2y.user.hiddenTrace('+data.schemeData.schemeId+','+data.schemeData.type+');cp2y.util.toggle(this,$(\'#hiddenTrace\'),\'查看更多\')" data="0">&gt;&gt;查看更多</p>');
						}
					}else{//未追号
						for(i;i<len;i++){
							html.push('<div class="traceDetailL"><div><p>'+data.traceData[i].issue+'期：'+data.traceData[i].multiple+'倍，'+data.traceData[i].money+'元</p><p>开奖号码：'+data.traceData[i].drawNumber+'</p></div><div>');
							if(data.traceData[i].prize){
								html.push('<p>'+data.traceData[i].status+'</p><p class="has501">'+data.traceData[i].prize+'元</p>');
							}else{
								html.push('<p class="spanRow1">'+data.traceData[i].status+'</p>');
							}
							html.push('</div></div>');
						}
						html.push('</div>');
					}
					//追号列表展示End
				}
				//合买列表展示Start
				if(data.schemeData.type==200 ||data.schemeData.type==201||data.schemeData.type==202||data.schemeData.type==203){
					html.push('<div class="userTip4 mt10">'+data.schemeParticipantData.totalCount+'人参与合买</div>');
					i=0;len=data.schemeParticipantData.listData.length;
					var tlen=len;
					if(len>3){
						tlen=3;
					}
					for(i;i<tlen;i++){
						html.push('<div class="Participant"><span>'+data.schemeParticipantData.listData[i].userName+'</span>');
						html.push('<p>认购'+data.schemeParticipantData.listData[i].money+'元</p>');
						html.push('<span>占股'+data.schemeParticipantData.listData[i].proportion+'%</span></div>');
					}
					if(len>2){
					html.push('<div class="traceDetail oHidden" id="Participant"></div>');
					html.push('<p class="toggleScheme" onclick="cp2y.user.Participant('+data.schemeData.schemeId+','+data.lotteryId+');cp2y.util.toggle(this,$(\'#Participant\'),\'查看更多\')" data="0">&gt;&gt;查看更多</p>');
					}
				}
				//合买End
				
				//方案详情Start
				html.push('<div class="userTip4 mt10">方案详情</div>');
				if(data.schemeData.remuneration){
				html.push('<div class="schemeD1"><span>盈利佣金：</span><p>'+data.schemeData.remuneration+'%</p></div>');
				}
				html.push('<div class="schemeD1"><span>发起人：</span><p>'+data.schemeData.userName+'</p></div>');
				html.push('<div class="schemeD1"><span>发起时间：</span><p>'+data.schemeData.initiateTime+'</p></div>');
				if(data.schemeData.schemeDesc){
				html.push('<div class="schemeD1"><span>方案描述：</span><p>'+data.schemeData.schemeDesc+'</p></div>');
				}
				html.push('<div class="schemeD1 pb40"><span>方案编号：</span><p>'+data.schemeData.schemeNumber+'</p></div>');
				//方案详情end
				
				//底部状态
				if(data.schemeData.canCancel==1){//可撤单
					var isH=1;
					if(data.schemeData.type==200 ||data.schemeData.type==201 ||data.schemeData.type==202 ||data.schemeData.type==203){
						isH=2;
					}
					if(BT.selling.indexOf(data.lotteryId)!=-1){
						html.push('<div class="fixBottom schemeBtns"><a class="scB1" onclick="cp2y.user.cancelScheme('+isH+','+data.schemeData.schemeId+')">撤单</a>');
						if(data.lotteryId==10059){
							if(data.isJingCai==1){
								html.push('<a class="scB1" href="/caiguanya">继续购买</a></div>');
							}else{
								html.push('<a class="scB1" href="/lottery/10059?type=a0">继续购买</a></div>');
							}
						}else{
							html.push('<a class="scB1" onclick="cp2y.buy.initBuy('+data.lotteryId+',\'a0\')">继续购买</a></div>');
						}
					}
				}else if(data.schemeData.type==200 ||data.schemeData.type==201||data.schemeData.type==202||data.schemeData.type==203){//合买
					if(data.ownPrize && data.ownPrize>0){//中奖
						html.push('<div class="fixBottom schemeBtns schemeBtns2">');
						html.push('<a>我中了'+data.ownPrize+'元</a>');
						html.push('<a onclick="cp2y.index()">去大厅</a>');
						html.push('</div>');
					}else if(BT.selling.indexOf(data.lotteryId)!=-1){//未中奖
						html.push('<div class="fixBottom schemeBtns"><a onclick="cp2y.buy.initBuy('+data.lotteryId+',\'a0\')">继续购买</a></div>');
					}
				}else{
					if(BT.selling.indexOf(data.lotteryId)!=-1){
						if(data.lotteryId==10059){
							if(data.isJingCai==1){
								html.push('<div class="fixBottom schemeBtns"><a href="/caiguanya">继续购买</a></div>');
							}else{
								html.push('<div class="fixBottom schemeBtns"><a href="/lottery/10059?type=a0">继续购买</a></div>');
							}
						}else{
							html.push('<div class="fixBottom schemeBtns"><a onclick="cp2y.buy.initBuy('+data.lotteryId+',\'a0\')">继续购买</a></div>');
						}
						
					}
				}
				userDom.uPDetail.html(html.join('')).show();//显示详细
			}
		});
		userDom.GoIndex3.off().on('click',function(){
			if(userPartBox.children("#logBox").size()>0){
				location.hash="#type=user&part=home";
				userDom.userPartTitle.html(title);
				userPartBox.show();
				userDom.uPDetail.hide();
				userDom.GoIndex1.hide();
				userDom.GoIndex2.show();
				userDom.GoIndex3.hide();
				userDom.more.show();
				userDom.moreDetail.hide();
			}else{
				userDom.uPDetail.hide();
				userPartBox.show();
				cp2y.user.home();
			}
		});
	},
	cancelScheme:function(i,s){
		var url=WebAppUrl.HOME_APP_URL,data={schemeId:s};
		if(i==1){
			url+='/core/lottery/scheme_cancel';
		}else if(1==2){
			url+='/core/lottery/scheme_remove';
		}else{
			return false;
		}
		$.ajax({
			url:url,
			data:data,
			beforeSend:function(){cp2y.dialog.loading();},
			success:function(data){
				cp2y.dialog.clearLoading();
				cp2y.dialog.alert(data.message);
				if(data.flag==1){
					setTimeout('location.reload()',1000);
				}
			}
		});
	},
	hiddenTrace:function(id,t){
		var hT=$("#hiddenTrace");
		if(hT.children("div").size()>0){
			return false;
		}
		$.ajax({
			url:WebAppUrl.HOME_APP_URL+"/lottery/scheme_join_trace_detail",
			data:{"schemeId":id,"type":t},
			success:function(data){
				var i=3,len=data.traceData.length,html=[];
				for(i;i<len;i++){
					html.push('<div class="traceDetailL"><div><p>'+data.traceData[i].issue+'期：'+data.traceData[i].multiple+'倍，'+data.traceData[i].money+'元</p><p>开奖号码：'+data.traceData[i].drawNumber+'</p></div><div>');
					if(data.traceData[i].prize){
						html.push('<p>'+data.traceData[i].status+'</p><p class="has501">'+data.traceData[i].prize+'元</p>');
					}else{
						html.push('<p class="spanRow1">'+data.traceData[i].status+'</p>');
					}
					html.push('</div></div>');
				}
				hT.html(html.join(''));
			}
		});
	},
	Participant:function(id,t){
		var hT=$("#Participant");
		if(hT.children("div").size()>0){
			return false;
		}
		$.ajax({
			url:WebAppUrl.HOME_APP_URL+"/lottery/scheme_join_Participant_detail",
			data:{"schemeId":id,"lotteryId":t},
			success:function(data){
				var i=3,len=data.schemeParticipantData.listData.length,html=[];
				for(i;i<len;i++){
					html.push('<div class="Participant"><span>'+data.schemeParticipantData.listData[i].userName+'</span>');
					html.push('<p>认购'+data.schemeParticipantData.listData[i].money+'元</p>');
					html.push('<span>占股'+data.schemeParticipantData.listData[i].proportion+'%</span></div>');
				}
				hT.html(html.join(''));
			}
		});
	},
	rechargeBox:function(){
		location.hash="type=user&part=recharge";
		userDom.GoIndex1.hide();userDom.GoIndex2.show();userDom.GoIndex3.hide();userDom.more.hide();userDom.moreDetail.hide();
		userDom.userPartTitle.html("充值");
		var html=[];
		html.push('<div class="userPartBox3">');
		html.push('<div class="recharge userPartBox3C" onclick="cp2y.user._rechargeBox(this)" data_title="储蓄卡" data_id="2"><img src="'+WebAppUrl.RESOURCE_URL+'recharge2.png"/><p>储蓄卡</p></div>');
		html.push('<div class="recharge userPartBox3C" onclick="cp2y.user._rechargeBox(this)" data_title="信用卡" data_id="3"><img src="'+WebAppUrl.RESOURCE_URL+'recharge3.png"/><p>信用卡</p></div>');
		html.push('<div class="recharge userPartBox3C" onclick="cp2y.user._rechargeBox(this)" data_title="支付宝" data_id="1"><img src="'+WebAppUrl.RESOURCE_URL+'recharge1.png"/><p>支付宝</p></div>');
		html.push('</div>');
		userPartBox.html(html.join(''));
	},
	_rechargeBox:function(o){
		userDom.GoIndex1.hide();userDom.GoIndex2.hide();userDom.GoIndex3.show();userDom.more.hide();userDom.moreDetail.hide();
		var html=[],o=$(o),k=['','每日支付金额最高2000元','单卡单笔限额10000元，单卡单日限额10000元','单卡单笔限额10000元，单卡单日限额10000元'],
		type=o.attr('data_id');
		userDom.userPartTitle.html(o.attr('data_title')+"充值");
		html.push('<div class="userPartBox1"><div id="userTip3"></div>');
		html.push('<input type="number" id="rechargeMoney" placeholder="至少1元" class="input4 mt40" />');
		html.push('<input type="hidden" id="payType" value="'+type+'" />');
		html.push('<a id="recharge" onclick="cp2y.user.recharge()" class="btn1 mt10">确认</a>');
		html.push('<p>'+k[type]+'</p>');
		html.push('</div>');
		userPartBox.html(html.join(''));
		userDom.GoIndex3.off().on('click',function(){
			cp2y.user.rechargeBox();
		});
	},
	recharge:function(){
		var Money=$("#rechargeMoney"),money=Money.val(),payType=$("#payType").val();
		if(!money.isInt()){
			//Money.val(10);money=10;
			return cp2y.dialog.tip("必须为整数");
		}else if(Money.val()>10000){
			Money.val(10000);money=10000;
		}
		if(payType==1){
			url="/core/user/aliPay?money="+money;
		}else{
			url="/core/user/lianlianPay?money="+money+"&payType="+payType;
		}
		$.ajax({
			url:WebAppUrl.HOME_APP_URL+url,
			beforeSend:function(){
				cp2y.dialog.clearTip();
				cp2y.dialog.loading();
			},
			success:function(data){
				cp2y.dialog.clearLoading();
				if(data.flag==1){
					document.location.href=data.payUrl;
				}else{
					cp2y.dialog.tip(data.message);
				}
			}
		});
	},
	_balance:function(){
		//接口
		var balance=[];
		$.ajax({
			url:WebAppUrl.HOME_APP_URL+"/balance.html",
			async:false,
			success:function(data){
				balance=[1,data];
			},
			error:function(){
				balance=[0,"查询错误"];
			}
		});
		return balance;
	},
	withdrawalsBox:function(){
		//接口  判断绑定
		$.ajax({
			url:WebAppUrl.HOME_APP_URL+"/core/user/query_bank_card",
			beforeSend:function(){
				cp2y.dialog.loading();
			},
			success:function(data){
				cp2y.dialog.clearLoading();
				var html=[];
				userDom.GoIndex1.hide();userDom.GoIndex2.show();userDom.GoIndex3.hide();userDom.more.hide();userDom.moreDetail.hide();
				userDom.userPartTitle.html("提款");
				html.push('<div class="userPartBox1"><div id="userTip3"></div>');
				if(data.bindingBank==1){
					html.push('<ul class="userPartBox6 mt40"><li><label>银行：</label><p>'+data.bank+'</p></li>');
					html.push('<li><label>卡号：</label><p>'+data.bankAccount+'</p></li>');
					html.push('<li><label>开户行所在地：</label><p>'+data.bankProvince+data.bankCity+'</p></li>');
					html.push('<li><label>开户人姓名：</label><p>'+data.name+'</p></li>');
					html.push('<li><label>开户人证件号：</label><p>'+data.identify+'</p></li></ul>');
					html.push('<p class="userPartBox61">绑定修改，需联系客服<a href="tel:4006667575">400-666-7575</a></p>');
					html.push('<p class="userPartBox62">可提款余额：<span id="wdV"></span>元</p>');
					html.push('<div class="fixBottom2"><div class="userPartBox1" ><input type="number" id="withdrawals" class="input7" placeholder="每次至少5元，每天可提现3次"/></div><a onclick="cp2y.user.withdrawals()">提款</a></div>');
				}else{
					html.push('<a class="userPartBox5 input4 mt40"><label>银行:</label><select id="banks" class="input5"></select></a>');
					html.push('<a class="userPartBox5 input4 nobt"><label>卡号:</label><input type="number" id="card" class="input6" /></a>');
					html.push('<a class="userPartBox5 input4 nobt"><label>开户行所在地:</label><select id="provinces" class="input5"></select><select id="city" class="input5"></select></a>');
					html.push('<a class="userPartBox5 input4 nobt"><label>开户人姓名:</label><input type="text" id="userName" class="input6" /></a>');
					html.push('<a class="userPartBox5 input4 nobt"><label>开户人证件号:</label><input type="text" id="userId" class="input6" /></a>');
					html.push('<div class="fixBottom" onclick="cp2y.user.saveBank()">绑定</div>');
				}
				html.push('</div>');
				userPartBox.html(html.join(''));
				cp2y.user.withdrawalsView();
				if(data.bindingBank==1){
				}else{
					cp2y.util.getBanks();
					cp2y.util.getAreas();
				}
			}
		});
	},
	saveBank:function(){
		var data={
			name:$("#userName").val().trim(),
			identityNumber:$("#userId").val().trim(),
			bankAccount:$("#card").val().trim(),
			bank:$("#banks").val(),
			province:selectCitys[$("#provinces").val()].name,
			city:$("#city").val()
		};
		cp2y.dialog.clearTip();
		if(!data.bankAccount.isInt()){
			return cp2y.dialog.tip('卡号不对');
		}
		if(data.identityNumber.isID()){
			return cp2y.dialog.tip(data.identityNumber.isID());
		}
		if(!data.name||!data.identityNumber||!data.bankAccount||!data.bank||!data.province||!data.city){
			return cp2y.dialog.tip('信息不能为空');
		}
		$.ajax({
			url:WebAppUrl.HOME_APP_URL+"/core/user/bind_bank_card",
			data:data,
			beforeSend:function(){
				cp2y.dialog.loading();
			},
			success:function(data){
				cp2y.dialog.clearLoading();
				if(data.flag==1){
					cp2y.user.withdrawalsBox();
				}else{
					return cp2y.dialog.tip(data.message);
				}
			}
		});
	},
	withdrawalsView:function(){
		$.ajax({
			url:WebAppUrl.HOME_APP_URL+"/core/user/withdraw_view",
			success:function(data){
				$("#wdV").html(data.balance);
			}
		});
	},
	withdrawals:function(){
		var money=$("#withdrawals").val().trim();
		cp2y.dialog.clearTip();
		if(!money.isInt()){
			return cp2y.dialog.tip("请输入数字");
		}
		if(money<5){
			return cp2y.dialog.tip("每次至少5元");
		}
		$.ajax({
			url:WebAppUrl.HOME_APP_URL+"/core/user/withdraw",
			data:{money:money},
			beforeSend:function(){
				cp2y.dialog.loading();
			},
			success:function(data){
				$("#withdrawals").val('');
				cp2y.dialog.clearLoading();
				cp2y.dialog.tip(data.message);
			}
		});
	},
	_schemeHistory:function(firstRow,fetchSize,fn){
		$.ajax({
			url:WebAppUrl.HOME_APP_URL+"/core/lottery/mySchemeHistory",
			data:{firstRow:firstRow,fetchSize:fetchSize},
			beforeSend:function(){
				cp2y.dialog.loading();
			},
			success:function(data){
				cp2y.dialog.clearLoading();
				fn(data);
			}
		});
	}
};

cp2y.user.changeStatus();
$("#getKj").click(function(){
	location.hash='#type=draw&part=list&playType='+_.bt;
	cp2y.index();
});
