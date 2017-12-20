function Calender() {
    this.initialize.apply(this, arguments);
}
Calender.prototype = {
    constructor:Calender,
   	initialize :function (options) {
        this.id = options.id;
   		this.drawDate(new Date());
   		this.clickA = options.clickLink;
	},
    _weeks: [
        'Sun','Mon','Tues','Wed','Thur','Fri','Sat'
    ],
	 // 渲染日期
    drawDate:function (odate) {
        var ddHtml=[];
        var nowDate = new Date(),
            nowyear = nowDate.getFullYear(),
            nowmonth = nowDate.getMonth(),
            nowday = nowDate.getDate();
        this.year = year = odate.getFullYear();
        this.month = month = odate.getMonth()+1;
        this.date = date = odate.getDate();
        this.day = day = odate.getDay();
        // 获取本月天数
        days = new Date(year, month, 0).getDate();
        // 获取本月第一天是星期几
        weekStart = new Date(year, month-1,1).getDay();

        for (i = 1; i <= days; i++) {
            var week = this._weeks[(weekStart+i-1)%7];
            var select = '';
            if (this.year == nowyear && this.month == nowmonth+1 && i == nowday){
                select = ' in';
            }
            var htmlStr = '<div class="dd'+ select +'"><p class="day">'+i+'</p><p class="week">'+week+'</p></div>'
            ddHtml.push(htmlStr)    
        }
        document.getElementById(this.id).innerHTML = ddHtml.join('');
        document.getElementById('show').innerHTML = this.year + '年' + this.month + '月';
        
        this.ClickLink();

    },
    // 点击上个月
    bindPrevMonth:function(){
        var idate = new Date(this.year, this.month-2,this.date);
        this.drawDate(idate);
    },
    bindNextMonth:function(){
        var idate = new Date(this.year , this.month, this.date);
        this.drawDate(idate);
    },
    // 点击日期事件
    ClickLink:function(){
    	var that = this;
    	$("#" + this.id).find(".dd").each(function(){
    		this.onclick = function(){
                $("#" + that.id+"").find(".dd").removeClass("on");
                $(this).addClass("on");
                that.date = $(this).find(".day").html();
                var values = that.year + '-' + that.month + '-' + that.date;
                typeof that.clickA == "function" && that.clickA(values);
            }
    	});
    }
}