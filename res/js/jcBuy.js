/**
 * @author luwenbin@live.com
 */
$("#mainSection").show();
var jcDom = {
	headerS1: $("#headerS1"),
	headerS2: $("#headerS2"),
	Title: $("#Title"),
	QRTi: $("#Title2"),
	changePlayType: $("#changePlayType"),
	jcTo: $("#jcTo"),
	jcTime: $("#jcTime"),
	choose: $("#choose"),
	MainStep1: $("#MainStep1"),
	MainStep2: $("#MainStep2"),
	curBets: $("#curBets"),
	curMoney: $("#curMoney"),
	betList: $("#betList"),
	Edit: $("#EditBets"),
	money: $("#money"),
	bets: $("#bets"),
	mul: $("#mul"),
	passWayBox: $("#passWayBox"),
	cc: $("#cc"),
	dd: $("#dd"),
	passWayTxt: $("#passWayTxt"),
	lC: $("#leagueChoose"),
	lcs: $("#lcs")
};
cp2y.buy = {
	doInit: function () {
		this.gg = this.bt == 10059 ? {
			//'单关'  : {'单关':1},
			'2串1': {
				'2串1': 1
			},
			'3串1': {
				'3串1': 1
			},
			'3串3': {
				'2串1': 3
			},
			'3串4': {
				'3串1': 1,
				'2串1': 3
			},
			'4串1': {
				'4串1': 1
			},
			'4串4': {
				'3串1': 4
			},
			'4串5': {
				'4串1': 1,
				'3串1': 4
			},
			'4串6': {
				'2串1': 6
			},
			'4串11': {
				'4串1': 1,
				'3串1': 4,
				'2串1': 6
			},
			'5串1': {
				'5串1': 1
			},
			'5串5': {
				'4串1': 5
			},
			'5串6': {
				'5串1': 1,
				'4串1': 5
			},
			'5串10': {
				'2串1': 10
			},
			'5串16': {
				'5串1': 1,
				'4串1': 5,
				'3串1': 10
			},
			'5串20': {
				'2串1': 10,
				'3串1': 10
			},
			'5串26': {
				'5串1': 1,
				'4串1': 5,
				'3串1': 10,
				'2串1': 10
			},
			'6串1': {
				'6串1': 1
			},
			'6串6': {
				'5串1': 6
			},
			'6串7': {
				'6串1': 1,
				'5串1': 6
			},
			'6串15': {
				'2串1': 15
			},
			'6串20': {
				'3串1': 20
			},
			'6串22': {
				'6串1': 1,
				'5串1': 6,
				'4串1': 15
			},
			'6串35': {
				'2串1': 15,
				'3串1': 20
			},
			'6串42': {
				'6串1': 1,
				'5串1': 6,
				'4串1': 15,
				'3串1': 20
			},
			'6串50': {
				'2串1': 15,
				'3串1': 20,
				'4串1': 15
			},
			'6串57': {
				'6串1': 1,
				'5串1': 6,
				'4串1': 15,
				'3串1': 20,
				'2串1': 15
			},
			'7串1': {
				'7串1': 1
			},
			'7串7': {
				'6串1': 7
			},
			'7串8': {
				'6串1': 7,
				'7串1': 1
			},
			'7串21': {
				'5串1': 21
			},
			'7串35': {
				'4串1': 35
			},
			'7串120': {
				'2串1': 21,
				'3串1': 35,
				'4串1': 35,
				'5串1': 21,
				'6串1': 7,
				'7串1': 1
			},
			'8串1': {
				'8串1': 1
			},
			'8串8': {
				'7串1': 8
			},
			'8串9': {
				'7串1': 8,
				'8串1': 1
			},
			'8串28': {
				'6串1': 28
			},
			'8串56': {
				'5串1': 56
			},
			'8串70': {
				'4串1': 70
			},
			'8串247': {
				'2串1': 28,
				'3串1': 56,
				'4串1': 70,
				'5串1': 56,
				'6串1': 28,
				'7串1': 8,
				'8串1': 1
			}
		} : {
			'单关': {
				'单关': 1
			},
			'2串1': {
				'2串1': 1
			},
			'3串1': {
				'3串1': 1
			},
			'3串3': {
				'2串1': 3
			},
			'3串4': {
				'3串1': 1,
				'2串1': 3
			},
			'4串1': {
				'4串1': 1
			},
			'4串4': {
				'3串1': 4
			},
			'4串5': {
				'4串1': 1,
				'3串1': 4
			},
			'4串6': {
				'2串1': 6
			},
			'4串11': {
				'4串1': 1,
				'3串1': 4,
				'2串1': 6
			},
			'5串1': {
				'5串1': 1
			},
			'5串5': {
				'4串1': 5
			},
			'5串6': {
				'5串1': 1,
				'4串1': 5
			},
			'5串10': {
				'2串1': 10
			},
			'5串16': {
				'5串1': 1,
				'4串1': 5,
				'3串1': 10
			},
			'5串20': {
				'2串1': 10,
				'3串1': 10
			},
			'5串26': {
				'5串1': 1,
				'4串1': 5,
				'3串1': 10,
				'2串1': 10
			},
			'6串1': {
				'6串1': 1
			},
			'6串6': {
				'5串1': 6
			},
			'6串7': {
				'6串1': 1,
				'5串1': 6
			},
			'6串15': {
				'2串1': 15
			},
			'6串20': {
				'3串1': 20
			},
			'6串22': {
				'6串1': 1,
				'5串1': 6,
				'4串1': 15
			},
			'6串35': {
				'2串1': 15,
				'3串1': 20
			},
			'6串42': {
				'6串1': 1,
				'5串1': 6,
				'4串1': 15,
				'3串1': 20
			},
			'6串50': {
				'2串1': 15,
				'3串1': 20,
				'4串1': 15
			},
			'6串57': {
				'6串1': 1,
				'5串1': 6,
				'4串1': 15,
				'3串1': 20,
				'2串1': 15
			},
			'7串1': {
				'7串1': 1
			},
			'7串7': {
				'6串1': 7
			},
			'7串8': {
				'6串1': 7,
				'7串1': 1
			},
			'7串21': {
				'5串1': 21
			},
			'7串35': {
				'4串1': 35
			},
			'7串120': {
				'2串1': 21,
				'3串1': 35,
				'4串1': 35,
				'5串1': 21,
				'6串1': 7,
				'7串1': 1
			},
			'8串1': {
				'8串1': 1
			},
			'8串8': {
				'7串1': 8
			},
			'8串9': {
				'7串1': 8,
				'8串1': 1
			},
			'8串28': {
				'6串1': 28
			},
			'8串56': {
				'5串1': 56
			},
			'8串70': {
				'4串1': 70
			},
			'8串247': {
				'2串1': 28,
				'3串1': 56,
				'4串1': 70,
				'5串1': 56,
				'6串1': 28,
				'7串1': 8,
				'8串1': 1
			}
		};
	},
	showLine2: function () {
		$(".jc_line1 strong").click(function () {
			$(".jc_line2").hide();
			if ($(this).hasClass('show')) {
				$(".jc_line1 strong").removeClass('show');
				$(this).removeClass('show');
				$(this).parent().next().hide();
			} else {
				$(".jc_line1 strong").removeClass('show');
				$(this).addClass('show');
				$(this).parent().next().show();
			}
		});
		$(".tip2").click(function () {
			$(this).next().toggle();
		});
		$('#lcs a').click(function () {
			$(this).toggleClass("on");
		});
	},
	openLC: function () {
		jcDom.lC.show();
	},
	hideLC: function () {
		jcDom.lC.hide();
	},
	Lea: function () {
		var Lea = [],
			i = 0,
			len;
		$("#lcs .on").each(function (i, v) {
			Lea.push($(v).html());
		});
		len = Lea.length;
		$("#choose li").each(function (i, v) {
			if (Lea.indexOf($(v).attr("class")) != -1) {
				$(v).show();
			} else {
				$(v).hide();
			}
		});
		this.hideLC();
	},
	Lea2: function (t, x) {
		$(t).toggleClass('on');
		$(t).siblings().removeClass('on');
		if (x == 1) {
			$("#lcs a").addClass("on");
		} else if (x == 2) {
			$("#lcs a").toggleClass("on");
		} else if (x == 3) {
			$("#lcs a").removeClass("on");
		} else if (x == 4) {
			$("#lcs a").removeClass("on");
			$("#lcs a").each(function (i, v) {
				if (['意甲', '英超', '西甲', '德甲', '法甲'].indexOf($(v).html()) != -1) {
					$(v).addClass('on');
				}
			});
		}
	},
	showPassWayBox: function () {
		jcDom.passWayBox.show();
	},
	hidePassWayBox: function () {
		jcDom.passWayBox.hide();
	},
	select: function (_this, f) {
		var p = $(_this).parent().parent(),
			d = eval('(' + p.attr('data') + ')'),
			t = p.parent();
		if (d.end) {
			return cp2y.dialog.alert('该场比赛已截止投注。');
		}
		if ($(_this).hasClass('jcSelect')) {
			$(_this).removeClass('jcSelect');
		} else {
			$(_this).addClass('jcSelect');
		}
		this.content(t, d);
		if (f) {
			this.showPassWay();
			//展示过关方式
			this.setPassWay();
			//过关方式 写入内存
			if ($(_this).hasClass('jcSelect')) {
				this.reSelect($(_this).attr("data_class"), true);
			} else {
				this.reSelect($(_this).attr("data_class"), false);
			}
		}
		this.switchDanChk();
		jcDom.curBets.html(this.selectMatchCount());
	},
	addContent: function () {
		var k = 0,
			html = [],
			s = 0;
		for (k in this.schemes) {
			s++;
			html.push("<dd>" + this.schemes[k].p.html() + "<a onclick='cp2y.buy.selectDan(this)' id='d_" + this.schemes[k].no + "' class='dan'>胆</a><a onclick='cp2y.buy.del(this)' class='delI'>X</a></dd>");
		}
		if (s < 2) {
			return cp2y.dialog.alert('至少选择两场比赛');
		}
		jcDom.betList.html(html.join(''));
		$("#betList .jcBet").click(function () {
			cp2y.buy.select($(this), true);
		});
		if (this.passWay.length == 0) { //设置默认过关方式
			if (s > this.maxMatch) {
				s = this.maxMatch;
			}
			this.passWay.push(s + "串1");
		}
		this.showPassWay();
		//重写过关方式
		this.setPassWay();
		this.step2();
	},
	showPassWay: function () {
		var arr = [],
			dd = [],
			cc = [],
			mc = this.selectMatchCount(),
			sm = this.maxMatch,
			m, k, i = 0,
			len, html = [],
			mhtml = [],
			c = '';
		if (mc < 2) {
			return cp2y.dialog.alert('至少选择两场比赛');
		}
		if (mc > sm) {
			mc = sm;
		}
		for (k in this.gg) {
			m = Number(k.substring(0, k.indexOf('串')));
			if (m <= mc) {
				arr.push(k);
			}
		}
		len = arr.length;
		for (i; i < len; i++) {
			var c = arr[i].substring(arr[i].indexOf('串') + 1);
			if (c == '1') {
				cc.push(arr[i]);
			} else {
				dd.push(arr[i]);
			}
		}
		i = 0;
		len = dd.length;
		for (i; i < len; i++) {
			if (this.passWay.indexOf(dd[i]) != -1) {
				c = 'inPassWay';
			} else {
				c = '';
			}
			html.push('<a onclick="cp2y.buy.choosePassWay(this)" class="' + c + '">' + dd[i] + '</a>');
		}
		i = 0;
		len = cc.length;
		for (i; i < len; i++) {
			if (this.passWay.indexOf(cc[i]) != -1) {
				c = 'inPassWay';
			} else {
				c = '';
			}
			mhtml.push('<a onclick="cp2y.buy.choosePassWay(this)" class="' + c + '">' + cc[i] + '</a>');
		}
		jcDom.dd.html(html.join(''));
		jcDom.cc.html(mhtml.join(''));
	},
	choosePassWay: function (o) {
		this.chkDanModem();
		if ($(o).hasClass("inPassWay")) {
			$(o).removeClass('inPassWay');
			this.passWay.del($(o).html());
		} else {
			$(o).addClass('inPassWay');
			this.passWay.push($(o).html());
		}
		this.setPassWay();
		// 过关方式 写入内存
	},
	setPassWay: function () {
		var inPas = $(".inPassWay"),
			i = 0,
			len = inPas.length;
		this.passWay = [];
		for (i; i < len; i++) {
			this.passWay.push(inPas.eq(i).html());
		}
		jcDom.passWayTxt.html(this.passWay.join(','));
		$(".isDan").removeClass('isDan');
		this.chkDanModem();
		this.setUnits();
	},
	reSelect: function (t, f) { //重写旧文件
		if (f) {
			jcDom.choose.find("." + t).addClass('jcSelect');
		} else {
			jcDom.choose.find("." + t).removeClass('jcSelect');
		}
	},
	canChooseDan: function () {
		if (this.passWay.length == 1 && this.passWay[0] == '单关')
			return false;
		var pass = this.getRealPass(),
			pm = 1000,
			m;
		for (var i = 0; i < pass.length; i++) {
			m = pass[i] == '单关' ? 1 : Number(pass[i].substring(0, pass[i].indexOf('串')));
			if (m < pm)
				pm = m;
		}
		if (pm == 1) {
			return false;
		}
		var sm = this.selectMatchCount();
		return sm > 2 && sm > pm;
	},
	switchDanChk: function (chk) {
		this.each(this.schemes, function (s, k) {
			s.dan = false;
			$('#dan_' + k).removeClass("isDan");
		});
	},
	chkDanModem: function () {
		this.switchDanChk(!this.canChooseDan());
	},
	selectDan: function (obj) {
		if ($(obj).hasClass('isDan')) {
			$(obj).removeClass('isDan');
		} else {
			$(obj).addClass('isDan');
		}
		var f = function (msg) {
			cp2y.dialog.alert(msg);
			$(obj).removeClass('isDan');
			cp2y.buy.schemes[obj.id.replace('d_', '')].dan = false;
		};
		if (this.passWay.length == 0) {
			return f('请选择过关方式再定胆码。');
		};
		var dcMax = 10000,
			pass = this.getRealPass();
		for (var i = 0; i < pass.length; i++) {
			m = pass[i] == '单关' ? 1 : Number(pass[i].substring(0, pass[i].indexOf('串')));
			if (m < dcMax) {
				dcMax = m;
			}
		}
		if (this.danCount() == dcMax - 1 && $(obj).hasClass('isDan')) {
			return f((dcMax - 1) == 0 ? '单关不能设置胆码。' : '胆码只能设置 ' + (dcMax - 1) + ' 场。');
		}
		this.schemes[obj.id.replace('d_', '')].dan = $(obj).hasClass('isDan');
		this.setUnits();
	},
	danCount: function () { /*计算胆个数*/
		var dc = 0;
		this.each(this.schemes, function (s, k) {
			if (s.dan) {
				dc++;
			}
		});
		return dc;
	},
	getRealPass: function () {
		var pass = [];
		for (var i = 0; i < this.passWay.length; i++) {
			for (var k in this.gg[this.passWay[i]]) {
				pass.push(k);
			}
		}
		return pass;
	},
	setUnits: function () {
		this.u = this.calcUnits();
		this.setMoney();
	},
	setMul: function (t) {
		var v = $(t).val();
		if (!v.isInt()) {
			v = 1;
		}
		if (v > 9999) {
			v = 9999;
		}
		if (v < 1) {
			v = 1;
		}
		$(t).val(v);
		this.mul = v;
		this.setMoney();
	},
	setMoney: function () {
		this.money = this.u * this.mul * 2;
		jcDom.bets.html(this.u);
		jcDom.money.html(this.money);
		//this.guessPrizeScope();//计算赔率
	},
	apartDraw: function (dan, tuo, len) {
		var arrJoin = function (arr1, arr2) {
			var arr = [];
			for (var i = 0; i < arr1.length; i++)
				arr.push(arr1[i]);
			for (var i = 0; i < arr2.length; i++)
				arr.push(arr2[i]);
			return arr;
		}, combi = function (arr, num) {
				var r = [];
				(function f(t, a, n) {
					if (n == 0)
						return r.push(t);
					for (var i = 0, l = a.length - n; i <= l; i++) {
						f(t.concat(a[i]), a.slice(i + 1), n - 1);
					}
				})([], arr, num);
				return r;
			};
		var tuoLen = len - dan.length;
		var arr = combi(tuo, tuoLen);
		var bet = [];
		var l = tuo.length;
		for (var i = 0; i < arr.length; i++) {
			bet.push(arrJoin(dan, arr[i]));
		}
		return bet;
	},
	calcUnits: function () {
		var hunhe = false;
		if (4 == cp2y.buy.bt) {
			hunhe = true;
		}
		return this[this.isCutRepeat ? 'calcUnitsNotRepeat' : hunhe ? 'calcUnitsRepeatHhtz' : 'calcUnitsRepeat'](cp2y.buy.hasCutSinglePlay);
	},
	_calcUnitsRepeat: function (m, pass) {
		var p = [];
		for (var k in this.gg[pass]) {
			p.push(k);
		}
		var t = [],
			d = [],
			len, arr, tu = 0;
		$(m).each(function (i, o) {
			(o.dan ? d : t).push(o.v.length);
		});
		$(p).each(function (i, v) {
			len = v == '单关' ? 1 : Number(v.substring(0, v.indexOf('串')));
			arr = d.length > len ? this.comp(d, len) : this.comp(t, len - d.length);
			for (var j = 0; j < arr.length; j++) {
				tu += this.cheng(arr[j].concat(d));
			}
		}.bind(this));
		return tu;
	},
	calcUnitsNotRepeat: function () { //不重复 //暂无用
		var pass = this.getRealPass(),
			tu = 0,
			tm = 0;
		var a = this.getRealPass(),
			pass = [];
		for (var i = 0; i < a.length; i++)
			if (pass.indexOf(a[i]) == -1)
				pass.push(a[i]);
		if (pass.length > 0) {
			var t = [],
				d = [];
			for (var k in this.schemes) {
				o = this.schemes[k];
				(o.dan ? d : t).push(o.v.length);
			}
			var len, arr;
			for (var i = 0; i < pass.length; i++) {
				len = pass[i] == '单关' ? 1 : Number(pass[i].substring(0, pass[i].indexOf('串')));
				arr = d.length > len ? this.comp(d, len) : this.comp(t, len - d.length);
				for (var j = 0; j < arr.length; j++) {
					tu += this.cheng(arr[j].concat(d));
				}
			}
		}
		return tu;
	},
	calcUnitsRepeat: function () { //有重复
		var pass = this.passWay,
			tu = 0,
			tm = 0;
		this.bets = [];
		if (pass.length > 0) {
			for (var i = 0; i < pass.length; i++) {
				var t = [],
					d = [],
					len = pass[i] == '单关' ? 1 : Number(pass[i].substring(0, pass[i].indexOf('串')));
				for (var k in this.schemes) {
					o = this.schemes[k];
					(o.dan ? d : t).push(o);
				}
				var bet = this.apartDraw(d, t, len);
				this.bets = this.bets.concat(bet);
				$(bet).each(function (j, v) {
					tu += this._calcUnitsRepeat(v, pass[i]);
				}.bind(this));
			}
		}
		// if(cp2y.buy.bt==0 || cp2y.buy.bt==4 || cp2y.buy.bt==5){
		this.chaipiao();
		// }
		return tu;
	},
	bets: [],
	chaipiao: function () {
		if (this.passWay.length < 1) {
			return false;
		}
		var bet = this.bets,
			detail = [];
		$(bet).each(function (j, v) {
			var result = '',
				arr = [],
				x = 0,
				xlen = v.length,
				tmp2 = [];
			for (x; x < xlen; x++) {
				var y = 0;
				ylen = v[x].v.length, tmp = [];
				for (y; y < ylen; y++) {
					var o = $.extend(true, {}, v[x]);
					o.v = v[x].v[y];
					o.p = '';
					o.score = $(v[x].o[y]).attr('data_s');
					o.o = '';
					tmp.push(o);
				}
				arr.push(tmp);
			}
			var result = '';

			function transform(ii, s) {
				if (ii == 0)
					s += '[';
				if (ii == arr.length) {
					result += s.substring(0, s.length - 1) + '],';
					return;
				}
				var arr1 = arr[ii];
				for (var jj = 0; jj < arr1.length; jj++) {
					transform(ii + 1, s + JSON.stringify(arr1[jj]) + ',');
				}
			}

			transform(0, '');
			result = '[' + result.substring(0, result.length - 1) + ']';
			var resultArr = eval(result);
			detail.push(resultArr);
		});
		var xx = 0;
		xxlen = detail.length, piao = [];
		for (xx; xx < xxlen; xx++) {
			var yy = 0,
				yylen = detail[xx].length;
			for (yy; yy < yylen; yy++) {
				piao.push(detail[xx][yy]);
			}
		}
		//console.log("拆票结果:",piao);
		//计算最大赔率
		var maxPrizeScopeA = [],
			minPrizeScopeA = [];
		//console.log(this.schemes);
		for (var sch in this.schemes) { //取出每场最高赔率的选项
			var tmp = [];
			$(this.schemes[sch].o).each(function (i, v) {
				tmp.push($(v).attr("data_s"));
			});
			maxPrizeScopeA.push([this.schemes[sch].no, tmp.max()]);
			minPrizeScopeA.push(tmp.min());
		}
		// console.log(maxPrizeScopeA);//输出每场比赛的最大赔率投注项
		// console.log(minPrizeScopeA);//输出每场比赛的最小赔率投注项
		// 循环所有票
		var pI = 0;
		pLen = piao.length, finalAyy = [];
		for (pI; pI < pLen; pI++) {
			var pJ = 0,
				pJen = piao[pI].length,
				arr = [],
				xx = 0;
			for (pJ; pJ < pJen; pJ++) {
				if (maxPrizeScopeA.inArray2([piao[pI][pJ].no, piao[pI][pJ].score])) { //属于最大玩法
					arr.push([piao[pI][pJ].no, piao[pI][pJ].score]);
					xx++;
				}
			}
			if (xx == pJen) { //如果全部属于最大玩法
				finalAyy.push(arr);
			}
		}
		//console.log(finalAyy);//记录所有最大赔率玩法
		var fI = 0;
		fLen = finalAyy.length, sum = 0;
		for (fI; fI < fLen; fI++) {
			var fJ = 0,
				fJen = finalAyy[fI].length,
				tt = 2;
			for (fJ; fJ < fJen; fJ++) {
				tt *= finalAyy[fI][fJ][1];
			}
			sum += tt;
		}
		//console.log("最大奖金",sum);
		minPrizeScopeA.sort();
		//console.log(minPrizeScopeA)
		var minI = 0,
			minLen = piao[0].length,
			minPrize = 2;
		for (minI; minI < minLen; minI++) {
			minPrize *= minPrizeScopeA[minI];
		}
		//console.log("最小奖金",minPrize);
		$("#PrizeCalc").html(minPrize.toFixed(2) + "-" + sum.toFixed(2) + "元");
	},
	content: function (p, d) {
		var choose = [],
			objs = [];
		delete this.schemes[d.no];
		//删除该比赛
		p.find('.jcBet').each(function (i, v) {
			if ($(v).hasClass('jcSelect')) {
				choose.push($(v).attr('data'));
				objs.push($(v));
			}
		});
		if (choose.length > 0) {
			this.schemes[d.no] = {
				no: d.no,
				name: d.name,
				h: d.h,
				g: d.g,
				r: d.rq,
				v: choose,
				o: objs,
				dan: false,
				p: p
			};
		} //重写该场比赛
	},
	each: function (a, cb) { /*对象循环*/
		for (var key in a) cb(a[key], key);
	},
	cheng: function (a) { /*数组累乘*/
		var n = 1;
		for (var i = 0, l = a.length; i < l; i++)
			n *= a[i];
		return n;
	},
	comp: function (arr, n) { /*组合*/
		var r = [],
			sum = 0;
		(function f(t, a, n) {
			if (n == 0)
				return r.push(t);
			for (var i = 0, l = a.length - n; i <= l; i++) {
				f(t.concat(a[i]), a.slice(i + 1), n - 1);
			}
		})([], arr, n);
		return r;
	},
	selectMatchCount: function () { //选择的比赛场次
		var m = 0,
			k = 0;
		for (k in this.schemes) {
			m++;
		}
		return m;
	},
	maxMatch: 4,

	//以上为竞彩私有
	init: function (play) {
		if (play in _) {
			$.extend(cp2y.buy, _[play]);
		} else {
			$.extend(cp2y.buy, _.a0);
		}
		this.step1();
		this.bet();
		jcDom.Title.html("<span>" + this.playName + "</span>-" + _[play].playType);
		jcDom.QRTi.html("<span>" + cp2y.buy.playName + "</span>-投注");
		jcDom.changePlayType.html(_.playTypes(play));
		this.doInit();
	},
	betType: '',
	iid: 0,
	issue: 0,
	passWay: [],
	schemes: {},
	step1: function () {
		if (jcDom.Edit.html() == "完成") {
			return this.editScheme();
		}
		jcDom.headerS1.show();
		jcDom.headerS2.hide();
		jcDom.MainStep1.show();
		jcDom.MainStep2.hide();
	},
	step2: function () {
		jcDom.headerS1.hide();
		jcDom.headerS2.show();
		jcDom.MainStep1.hide();
		jcDom.MainStep2.show();
	},
	editScheme: function () {
		if (jcDom.Edit.html() == "编辑") {
			jcDom.Edit.html('完成');
			$(".delI").show();
			$(".dan").hide();
		} else if (jcDom.Edit.html() == "完成") {
			jcDom.Edit.html('编辑');
			$(".delI").hide();
			$(".dan").show();
		}
	},
	isCutRepeat: false,
	mul: 1,
	money: 0,
	u: 0,
	del: function (o) {
		var data = eval("(" + $(o).prev().prev().prev().attr('data') + ")");
		delete this.schemes[data.no];
		$(o).parent().remove();
		$(".a" + data.no + "_3").removeClass('jcSelect');
		$(".a" + data.no + "_1").removeClass('jcSelect');
		$(".a" + data.no + "_0").removeClass('jcSelect');
		this.setUnits();
	},
	toggleMore: function () {
		if (playDom.More.hasClass('on')) {
			playDom.More.removeClass('on');
			MoreDetail.hide();
			MoreLocked.hide();
		} else {
			playDom.More.addClass('on');
			MoreDetail.show();
			MoreLocked.show();
		}
	},
	pay: function () {
		var p = ['submitAction=submitAction', 'lid=10059', 'ajax=true'],
			content = [],
			scheme = this.schemes,
			i = 0;
		for (i in scheme) {
			content.push(i + "`" + scheme[i].name + "`" + scheme[i].h + "`" + scheme[i].g + "`" + i + "_0`" + scheme[i].dan + "`" + scheme[i].v.join(','));
		}
		p = {
			lotteryId: _.bt,
			issueId: this.issue,
			issueIds: this.sels.join(","),
			issueCount: 1,
			multiple: this.mul,
			schemeNumber: "content=" + content.join("$"),
			schemeAmount: this.money,
			buyAmount: this.money,
			buyType: 1,
			betType: this.betType,
			pass: this.passWay.join(','),
			sels: this.sels.join(","),
			cutRepeat: false
		};
		$.ajax({
			url: WebAppUrl.HOME_APP_URL + "/core/lottery/buy_lottery",
			data: p,
			type: "post",
			dataType: "json",
			beforeSend: function () {
				cp2y.dialog.loading();
			},
			success: function (data) {
				cp2y.dialog.clearLoading();
				if (data.flag == -1) {
					return cp2y.quick.user.signInBox();
				} else if (data.flag == 2) {
					return cp2y.dialog.confirm("余额不足，去充值？", function () {
						cp2y.dialog.closeConfirm();
						cp2y.quick.user.rechargeBox();
					});
				} else if (data.flag == 1) {
					location.href = WebAppUrl.HOME_APP_URL + '/index#type=user&part=scheme&scheme=' + data.schemeId;
				} else {
					cp2y.dialog.alert(data.message);
				}
			}
		});
	}
};