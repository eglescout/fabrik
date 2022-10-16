/*! Fabrik */

var fabrikCalendar=new Class({Implements:[Options],options:{days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],shortDays:["Sun","Mon","Tues","Wed","Thur","Fri","Sat"],months:["January","Feburary","March","April","May","June","July","August","September","October","November","December"],shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"],viewType:"month",calendarId:1,tmpl:"default",Itemid:0,colors:{bg:"#F7F7F7",highlight:"#FFFFDF",headingBg:"#C3D9FF",today:"#dddddd",headingColor:"#135CAE",entryColor:"#eeffff"},eventLists:[],listid:0,popwiny:0,timeFormat:"%X",urlfilters:[],url:{add:"index.php?option=com_fabrik&controller=visualization.calendar&view=visualization&task=getEvents&format=raw",del:"index.php?option=com_fabrik&controller=visualization.calendar&view=visualization&task=deleteEvent&format=raw"},monthday:{width:90,height:120},restFilterStart:"na",j3:!1,showFullDetails:!1,readonly:!1,readonlyMonth:!1,dateLimits:{min:"",max:""}},initialize:function(t){this.firstRun=!0,this.el=document.id(t),this.SECOND=1e3,this.MINUTE=60*this.SECOND,this.HOUR=60*this.MINUTE,this.DAY=24*this.HOUR,this.WEEK=7*this.DAY,this.date=new Date,this.selectedDate=new Date,this.entries=$H(),this.droppables={month:[],week:[],day:[]},this.fx={},this.ajax={},"null"!==typeOf(this.el.getElement(".calendar-message"))&&(this.fx.showMsg=new Fx.Morph(this.el.getElement(".calendar-message"),{duration:700}),this.fx.showMsg.set({opacity:0})),this.colwidth={},this.windowopts={id:"addeventwin",title:"add/edit event",loadMethod:"xhr",minimizable:!1,evalScripts:!0,width:380,height:320,onContentLoaded:function(t){t.fitToContent()}.bind(this)},Fabrik.addEvent("fabrik.form.submitted",function(t,e){this.ajax.updateEvents.send(),Fabrik.Windows.addeventwin.close()}.bind(this))},removeFormEvents:function(i){this.entries.each(function(t,e){void 0!==t&&t.formid===i&&this.entries.dispose(e)}.bind(this))},_makeEventRelDiv:function(s,t,e,i){var n,a,o,d,r,l=s.label;t.left==t.left&&t.left,t["margin-left"]==t["margin-left"]&&t["margin-left"];var h=""!==s.colour?s.colour:this.options.colors.entryColor;0===t.startMin&&(t.startMin=t.startMin+"0"),0===t.endMin&&(t.endMin=t.endMin+"0");t.view&&t.view;var p={"background-color":this._getColor(h,e),width:t.width,cursor:"pointer","margin-left":t["margin-left"],top:t.top.toInt()+"px",position:"absolute",border:"1px solid #666666","border-right":"0","border-left":"0",overflow:"auto",opacity:.6,padding:"0 4px"};t.height&&(p.height=t.height.toInt()+"px"),t.left&&(p.left=t.left.toInt()+1+"px"),p["max-width"]=t["max-width"]?t["max-width"]-10+"px":"";var c="fabrikEvent_"+s._listid+"_"+s.id;return i&&"monthView"!==t.view&&(c+=i.className.replace(" ","")),"monthView"===t.view&&(p.width-=1),this.options.j3?(r="",s._canDelete&&(r+=this.options.buttons.del),s._canEdit&&!this.options.readonly&&(r+=this.options.buttons.edit),s._canView&&(r+=this.options.buttons.view),o={start:Date.parse(s.startdate_locale).format(this.options.timeFormat),end:Date.parse(s.enddate_locale).format(this.options.timeFormat)},d=Joomla.JText._("PLG_VISUALIZATION_CALENDAR_EVENT_START_END").substitute(o),""!==r&&(d+='<hr /><div class="btn-group" style="text-align:center;display:block">'+r+"</div>"),a=new Element("a",{class:"fabrikEvent label "+s.status,id:c,styles:p,rel:"popover","data-original-title":l+'<button class="close" data-popover="'+c+'">&times;</button>',"data-bs-content":d,"data-bs-placement":"top","data-html":"true","data-bs-trigger":"click"}),this.options.showFullDetails?a.set("data-task","viewCalEvent"):"undefined"!=typeof jQuery&&(jQuery(a).popover(),a.addEvent("click",function(t){this.popOver=a}.bind(this)),a.addEvent("dblclick",function(t){t.stop()}.bind(this)))):(a=new Element("div",{class:"fabrikEvent label",id:c,styles:p}),this.options.showFullDetails?a.set("data-task","viewCalEvent"):a.addEvent("mouseenter",function(t){this.doPopupEvent(t,s,l)}.bind(this))),n=""!==s.link&&!1===this.options.readonly&&!1===this.options.j3?new Element("a",{href:s.link,class:"fabrikEditEvent",events:{click:function(t){if(Fabrik.fireEvent("fabrik.viz.calendar.event",[t]),!s.custom){t.stop();var e={},i=t.target.getParent(".fabrikEvent").id.replace("fabrikEvent_","").split("_");e.rowid=i[1],e.listid=i[0],this.addEvForm(e)}}.bind(this)}}).set("html",l):s.custom?(l=""===l?"click":l,new Element("a",{href:s.link,events:{click:function(t){Fabrik.fireEvent("fabrik.viz.calendar.event",[t])}}}).set("html",l)):new Element("span").set("html",l),a.adopt(n),a},doPopupEvent:function(t,e,i){var s;this.activeHoverEvent;if(this.popWin){this.activeHoverEvent=t.target.hasClass("fabrikEvent")?t.target:t.target.getParent(".fabrikEvent"),e._canDelete?this.popWin.getElement(".popupDelete").show():this.popWin.getElement(".popupDelete").hide(),e._canEdit?(this.popWin.getElement(".popupEdit").show(),this.popWin.getElement(".popupView").hide()):(this.popWin.getElement(".popupEdit").hide(),this.popWin.getElement(".popupView").show()),s=this.activeHoverEvent?this.activeHoverEvent.getCoordinates():{top:0,left:0};var n=this.popup.getElement("div[class=popLabel]");n.empty(),n.set("text",i),this.activeDay=t.target.getParent();s.top,this.popWin.getSize().y;var a={opacity:[0,1],top:[s.top+50,s.top-10]};this.inFadeOut=!1,this.popWin.setStyles({left:s.left+20,top:s.top}),this.fx.showEventActions.cancel().set({opacity:0}).start.delay(500,this.fx.showEventActions,a)}},_getFirstDayInMonthCalendar:function(t){var e=new Date;if(e.setTime(t.valueOf()),t.getDay()!==this.options.first_week_day){var i=t.getDay()-this.options.first_week_day;i<0&&(i=7+i),t.setTime(t.valueOf()-24*i*60*60*1e3)}if(e.getMonth()===t.getMonth())for(;1<t.getDate();)t.setTime(t.valueOf()-this.DAY);return t},showMonth:function(){var h=new Date;h.setTime(this.date.valueOf()),h.setDate(1),h=this._getFirstDayInMonthCalendar(h);for(var t=this.el.getElements(".monthView tr"),p=1;p<t.length;p++){var e=t[p].getElements("td"),c=0;e.each(function(r){r.setProperties({class:""}),r.addClass(h.getTime()),h.getMonth()!==this.date.getMonth()&&r.addClass("otherMonth"),this.selectedDate.isSameDay(h)&&r.addClass("selectedDay"),r.empty(),r.adopt(new Element("div",{class:"date",styles:{"background-color":this._getColor("#E8EEF7",h)}}).appendText(h.getDate()));var l=0;this.entries.each(function(t){(""!==t.enddate&&h.isDateBetween(t.startdate,t.enddate)||""===t.enddate&&t.startdate.isSameDay(h))&&l++}.bind(this));this.entries.each(function(t){if(""!==t.enddate&&h.isDateBetween(t.startdate,t.enddate)||""===t.enddate&&t.startdate.isSameDay(h)){var e,i=r.getElements(".fabrikEvent").length,s=r.getElement(".date").getSize().y;e=Math.floor((r.getSize().y-l-s)/l);var n=r.getSize().y*(p-1)+this.el.getElement(".monthView .dayHeading").getSize().y+s;this.colwidth[".monthView"]=this.colwidth[".monthView"]?this.colwidth[".monthView"]:r.getSize().x;var a=r.getSize().x;n+=i*e;var o=(a=this.colwidth[".monthView"])*c,d={view:"monthView","max-width":a};d.top=n,window.ie&&(d.left=o),d.startHour=t.startdate.getHours(),d.endHour=t.enddate.getHours(),d.startMin=t.startdate.getMinutes(),d.endMin=t.enddate.getMinutes(),d["margin-left"]=0,r.adopt(this._makeEventRelDiv(t,d,h,r))}0}.bind(this)),h.setTime(h.getTime()+this.DAY),c++}.bind(this))}document.addEvent("mousemove",function(t){t.target;var e=t.client.x,i=t.client.y,s=this.activeArea;if("null"!==typeOf(s)&&"null"!==typeOf(this.activeDay)&&(e<=s.left||e>=s.right||i<=s.top||i>=s.bottom)){if(!this.inFadeOut){var n=this.activeHoverEvent.getCoordinates(),a={opacity:[1,0],top:[n.top-10,n.top+50]};this.fx.showEventActions.cancel().start.delay(500,this.fx.showEventActions,a)}this.activeDay=null}}.bind(this)),this.entries.each(function(t){this.el.getElement(".fabrikEvent_"+t._listid+"_"+t.id)}.bind(this)),this._highLightToday(),this.el.getElement(".monthDisplay").innerHTML=this.options.months[this.date.getMonth()]+" "+this.date.getFullYear()},_makePopUpWin:function(){if(!this.options.readonly){if("null"===typeOf(this.popup)){var t=new Element("div",{class:"popLabel"}),e=new Element("div",{class:"popupDelete"}).set("html",this.options.buttons);this.popup=new Element("div",{class:"popWin",styles:{position:"absolute"}}).adopt([t,e]),this.popup.inject(document.body),this.activeArea=null,this.fx.showEventActions=new Fx.Morph(this.popup,{duration:500,transition:Fx.Transitions.Quad.easeInOut,onCancel:function(){}.bind(this),onComplete:function(t){if(this.activeHoverEvent){var e=this.popup.getCoordinates(),i=this.activeHoverEvent.getCoordinates(),s=window.getScrollTop(),n={};n.left=e.left<i.left?e.left:i.left,n.top=e.top<i.top?e.top:i.top,n.top=n.top-s,n.right=e.right>i.right?e.right:i.right,n.bottom=e.bottom>i.bottom?e.bottom:i.bottom,n.bottom=n.bottom-s,this.activeArea=n,this.inFadeOut=!1}}.bind(this)})}return this.popup}},makeDragMonthEntry:function(t){},removeWeekEvents:function(){var t=this.date.getDay();t-=this.options.first_week_day.toInt();var e=new Date;e.setTime(this.date.getTime()-t*this.DAY);for(var i={},s=this.el.getElements(".weekView tr"),n=1;n<s.length;n++){e.setHours(n-1,0,0),1!==n&&e.setTime(e.getTime()-6*this.DAY);var a=s[n].getElements("td");for(j=1;j<a.length;j++){"null"===typeOf(i[j-1])&&(i[j-1]=[]);var o=a[j];i[j-1].push(o),1!==j&&e.setTime(e.getTime()+this.DAY),o.addClass("day"),"null"!==typeOf(o.retrieve("calevents"))&&o.retrieve("calevents").each(function(t){t.destroy()}),o.eliminate("calevents"),o.className="",o.addClass("day"),o.addClass(e.getTime()-this.HOUR),this.selectedDate.isSameWeek(e)&&this.selectedDate.isSameDay(e)?o.addClass("selectedDay"):o.removeClass("selectedDay")}}return i},showWeek:function(){var t=this.date.getDay();t-=this.options.first_week_day.toInt();var e=new Date;e.setTime(this.date.getTime()-t*this.DAY);var p=new Date;p.setTime(this.date.getTime()-t*this.DAY);var s=new Date;s.setTime(this.date.getTime()+(6-t)*this.DAY),this.el.getElement(".monthDisplay").innerHTML=e.getDate()+"  "+this.options.months[e.getMonth()]+" "+e.getFullYear()+" - ",this.el.getElement(".monthDisplay").innerHTML+=s.getDate()+"  "+this.options.months[s.getMonth()]+" "+s.getFullYear();var n,a,o,d=this.el.getElements(".weekView tr")[0].getElements("th"),r=this.removeWeekEvents();for(i=0;i<d.length;i++){d[i].className="dayHeading",d[i].addClass(p.getTime()),o=d[i].getStyle("background-color"),a=this.options.shortDays[p.getDay()]+" "+p.getDate()+"/"+this.options.shortMonths[p.getMonth()],n=new Element("div",{styles:{"background-color":this._getColor(o,p)}}).set("text",a),d[i].empty().adopt(n);var c=10,l={},v={},u=r[i];this.entries.each(function(t){var e=new Date(t.startdate_locale),s=new Date(t.enddate_locale);if(""!==t.enddate&&p.isDateBetween(e,s)||""===s&&e.isSameDay(p))for(var n=this._buildEventOpts({entry:t,curdate:p,divclass:".weekView",tdOffset:i}),a=n.startHour;a<=n.endHour;a++)l[a]="null"===typeOf(l[a])?0:l[a]+1}.bind(this));var w=1;Object.each(l,function(t){w<t&&(w=t)}),this.entries.each(function(t){var e=new Date(t.startdate_locale),s=new Date(t.enddate_locale);if(""!==t.enddate&&p.isDateBetween(e,s)||""===s&&e.isSameDay(p)){for(var n=this._buildEventOpts({entry:t,curdate:p,divclass:".weekView",tdOffset:i}),a=n.startHour;a<=n.endHour;a++)v[a]="null"===typeOf(v[a])?0:v[a]+1;var o=0;for(a=n.startHour;a<=n.endHour;a++)v[a]>o&&(o=v[a]);var d=Math.max(0,n.startHour-this.options.open);td=u[d],c=Math.floor((td.getSize().x-w)/(w+1)),n.width=c+"px",n["margin-left"]=o*(c+1);var r=this._makeEventRelDiv(t,n,null,td);r.addClass("week-event"),r.inject(document.body);var l=r.getStyle("padding-left").toInt()+r.getStyle("padding-right").toInt();r.setStyle("width",r.getStyle("width").toInt()-l+"px"),r.store("opts",n),r.store("relativeTo",td),r.store("gridSize",w);var h=td.retrieve("calevents",[]);h.push(r),td.store("calevents",h),r.position({relativeTo:td,position:"upperLeft"})}}.bind(this)),p.setTime(p.getTime()+this.DAY)}},_buildEventOpts:function(t){var e=t.curdate,i=new CloneObject(t.entry,!0,["enddate","startdate"]),s=this.el.getElements(t.divclass+" tr"),n=new Date(i.startdate_locale),a=new Date(i.enddate_locale),o=n.isSameDay(e)?n.getHours()-this.options.open:0;o=o<0?0:o;var d=t.tdOffset;i.label=i.label?i.label:"";var r=s[o+1].getElements("td")[d+1],l=i.startdate.getHours(),h=r.getSize().y;this.colwidth[t.divclass]=this.colwidth[t.divclass]?this.colwidth[t.divclass]:r.getSize().x;var p=this.el.getElement(t.divclass).getElement("tr").getSize().y;colwidth=this.colwidth[t.divclass];var c=colwidth*d;c+=this.el.getElement(t.divclass).getElement("td").getSize().x;var v=Math.ceil(a.getHours()-n.getHours());0===v&&(v=1),n.isSameDay(a)||(v=0!==this.options.open||24!==this.options.close?this.options.close-this.options.open+1:24,n.isSameDay(e)?v=0!==this.options.open||24!==this.options.close?this.options.close-this.options.open+1:24-n.getHours():(n.setHours(0),a.isSameDay(e)&&(v=0!==this.options.open||24!==this.options.close?this.options.close-this.options.open:a.getHours()))),p+=h*o;var u=h*v;a.isSameDay(e)&&(u+=a.getMinutes()/60*h),n.isSameDay(e)&&(p+=n.getMinutes()/60*h,u-=n.getMinutes()/60*h);var w=r.getElements(".fabrikEvent"),g=colwidth/(w.length+1),m=g*w.length;w.setStyle("width",g+"px");t.divclass.substr(1,t.divclass.length);return g-=r.getStyle("border-width").toInt(),(t={"z-index":999,"margin-left":m+"px",height:u,view:"weekView","background-color":this._getColor(this.options.colors.headingBg)})["max-width"]=g+"px",t.left=c,t.top=p,t.color=this._getColor(this.options.colors.headingColor,n),t.startHour=n.getHours(),t.endHour=t.startHour+v,t.startMin=n.getMinutes(),t.endMin=a.getMinutes(),i.startdate.setHours(l),t},removeDayEvents:function(){var t=new Date,e=(new Date).get("gmtoffset").replace(/0+$/,"").toInt(),i=[];t.setTime(this.date.valueOf()),t.setHours(0,0);for(var s=this.el.getElements(".dayView tr"),n=1;n<s.length;n++){t.setHours(n-1+e,0);var a=s[n].getElements("td")[1];"null"!==typeOf(a)&&(i.push(a),a.className="",a.addClass("day"),"null"!==typeOf(a.retrieve("calevents"))&&a.retrieve("calevents").each(function(t){t.destroy()}),a.eliminate("calevents"),a.addClass(t.getTime()-this.HOUR),a.set("data-date",t))}return i},showDay:function(){var t,e=this.el.getElements(".dayView tr");thbg=e[0].childNodes[1].getStyle("background-color"),ht=this.options.days[this.date.getDay()],t=new Element("div",{styles:{"background-color":this._getColor(thbg,this.date)}}).set("text",ht),e[0].childNodes[1].empty().adopt(t);var r=this.removeDayEvents(),l=100,h={},s={};this.entries.each(function(t){if(""!==t.enddate&&this.date.isDateBetween(t.startdate,t.enddate)||""===t.enddate&&t.startdate.isSameDay(firstDate))for(var e=this._buildEventOpts({entry:t,curdate:this.date,divclass:".dayView",tdOffset:0}),i=e.startHour;i<=e.endHour;i++)s[i]="null"===typeOf(s[i])?0:s[i]+1}.bind(this));var p=1;Object.each(s,function(t){p<t&&(p=t)}),this.entries.each(function(t){if(""!==t.enddate&&this.date.isDateBetween(t.startdate,t.enddate)||""===t.enddate&&t.startdate.isSameDay(firstDate)){var e=this._buildEventOpts({entry:t,curdate:this.date,divclass:".dayView",tdOffset:0}),i=Math.max(0,e.startHour-this.options.open);td=r[i],l=Math.floor((td.getSize().x-p)/(p+1)),e.width=l+"px";for(var s=e.startHour;s<=e.endHour;s++)h[s]="null"===typeOf(h[s])?0:h[s]+1;var n=0;for(s=e.startHour;s<=e.endHour;s++)h[s]>n&&(n=h[s]);e["margin-left"]=n*(l+1);var a=this._makeEventRelDiv(t,e,null,td);a.addClass("day-event"),a.store("relativeTo",td),a.store("gridSize",p),a.inject(document.body);var o=a.getStyle("padding-left").toInt()+a.getStyle("padding-right").toInt();a.setStyle("width",a.getStyle("width").toInt()-o+"px"),a.store("opts",e);var d=td.retrieve("calevents",[]);d.push(a),td.store("calevents",d),a.position({relativeTo:td,position:"upperLeft"})}}.bind(this)),this.el.getElement(".monthDisplay").innerHTML=this.date.getDate()+"  "+this.options.months[this.date.getMonth()]+" "+this.date.getFullYear()},renderMonthView:function(){var t,e;this.fadePopWin(0);var i=this._getFirstDayInMonthCalendar(new Date),s=this.options.days.slice(this.options.first_week_day).concat(this.options.days.slice(0,this.options.first_week_day)),n=new Date;if(n.setTime(i.valueOf()),i.getDay()!==this.options.first_week_day){var a=i.getDay()-this.options.first_week_day;n.setTime(i.valueOf()-24*a*60*60*1e3)}if(this.options.viewType="monthView",this.setAddButtonState(),!this.mothView){for(tbody=new Element("tbody",{class:"viewContainerTBody"}),e=new Element("tr"),t=0;t<7;t++)e.adopt(new Element("th",{class:"dayHeading",styles:{width:"80px",height:"20px","text-align":"center",color:this._getColor(this.options.colors.headingColor,n),"background-color":this._getColor(this.options.colors.headingBg,n)}}).appendText(s[t])),n.setTime(n.getTime()+this.DAY);tbody.appendChild(e);for(var o=this.options.colors.highlight,d=this.options.colors.bg,r=this.options.colors.today,l=0;l<6;l++){e=new Element("tr");var h=this;for(t=0;t<7;t++){var p=this.options.colors.bg,c=this.selectedDate.isSameDay(i)?"selectedDay":"";e.adopt(new Element("td",{class:"day "+i.getTime()+c,styles:{width:this.options.monthday.width+"px",height:this.options.monthday.height+"px","background-color":p,"vertical-align":"top",padding:0,border:"1px solid #cccccc"},events:{mouseenter:function(){this.setStyles({"background-color":o})},mouseleave:function(){this.set("morph",{duration:500,transition:Fx.Transitions.Sine.easeInOut});var t=this.hasClass("today")?r:d;this.morph({"background-color":[o,t]})},click:function(t){h.selectedDate.setTime(this.className.split(" ")[1]),h.date.setTime(h._getTimeFromClassName(this.className)),h.el.getElements("td").each(function(t){t.removeClass("selectedDay"),t!==this&&t.setStyles({"background-color":"#F7F7F7"})}.bind(this)),this.addClass("selectedDay")},dblclick:function(t){!1===this.options.readonlyMonth&&this.openAddEvent(t,"month")}.bind(this)}})),i.setTime(i.getTime()+this.DAY)}tbody.appendChild(e)}this.mothView=new Element("div",{class:"monthView",styles:{position:"relative"}}).adopt(new Element("table",{styles:{"border-collapse":"collapse"}}).adopt(tbody)),this.el.getElement(".viewContainer").appendChild(this.mothView)}this.showView("monthView")},setAddButtonState:function(){var t=this.el.getElement(".addEventButton");"null"!==typeOf(t)&&("monthView"===this.options.viewType&&!0===this.options.readonlyMonth?t.hide():t.show())},_getTimeFromClassName:function(t){return t.replace("today","").replace("selectedDay","").replace("day","").replace("otherMonth","").trim()},openAddEvent:function(t,e){var i,s,n,a,o,r,l;!1!==this.options.canAdd&&("monthView"===this.options.viewType&&!0===this.options.readonlyMonth||(t.stop(),i="addEventButton"===t.target.className?(new Date).getTime():this._getTimeFromClassName(t.target.className),this.dateInLimits(i)&&(t.target.get("data-date")&&console.log("data-date = ",t.target.get("data-date")),this.date.setTime(i),d=0,isNaN(i)||""===i||((l=new Date).setTime(i),o=(o=l.getMonth()+1)<10?"0"+o:o,s=(s=l.getDate())<10?"0"+s:s,a="month"!==e?(n=(n=l.getHours())<10?"0"+n:n,(a=l.getMinutes())<10?"0"+a:a):n="00",this.doubleclickdate=l.getFullYear()+"-"+o+"-"+s+" "+n+":"+a+":00",d="&jos_fabrik_calendar_events___start_date="+this.doubleclickdate),1<this.options.eventLists.length?this.openChooseEventTypeForm(this.doubleclickdate,i):(r={rowid:"",id:""},d="&"+this.options.eventLists[0].startdate_element+"="+this.doubleclickdate,r.listid=this.options.eventLists[0].value,this.addEvForm(r)))))},dateInLimits:function(t){var e=new Date;if((e.setTime(t),""!==this.options.dateLimits.min)&&e<new Date(this.options.dateLimits.min))return alert(Joomla.JText._("PLG_VISUALIZATION_CALENDAR_DATE_ADD_TOO_EARLY")),!1;if(""!==this.options.dateLimits.max&&new Date(this.options.dateLimits.max)<e)return alert(Joomla.JText._("PLG_VISUALIZATION_CALENDAR_DATE_ADD_TOO_LATE")),!1;return!0},openChooseEventTypeForm:function(t,e){var i="index.php?option=com_fabrik&tmpl=component&view=visualization&controller=visualization.calendar&task=chooseaddevent&id="+this.options.calendarId+"&d="+t+"&rawd="+e;i+="&renderContext="+this.el.id.replace(/visualization_/,""),this.windowopts.contentURL=i,this.windowopts.id="chooseeventwin",this.windowopts.onContentLoaded=function(){new Fx.Scroll(window).toElement("chooseeventwin")},Fabrik.getWindow(this.windowopts)},addEvForm:function(t){"undefined"!=typeof jQuery&&jQuery(this.popOver).popover("hide"),this.windowopts.id="addeventwin";var e="index.php?option=com_fabrik&controller=visualization.calendar&view=visualization&task=addEvForm&format=raw&listid="+t.listid+"&rowid="+t.rowid;e+="&jos_fabrik_calendar_events___visualization_id="+this.options.calendarId,e+="&visualizationid="+this.options.calendarId,t.nextView&&(e+="&nextview="+t.nextView),e+="&fabrik_window_id="+this.windowopts.id,void 0!==this.doubleclickdate&&(e+="&start_date="+this.doubleclickdate),this.windowopts.type="window",this.windowopts.contentURL=e;var i=this.options.filters;this.windowopts.onContentLoaded=function(t){i.each(function(t){if(document.id(t.key))switch(document.id(t.key).get("tag")){case"select":document.id(t.key).selectedIndex=t.val;break;case"input":document.id(t.key).value=t.val}}),this.fitToContent(!1)},Fabrik.getWindow(this.windowopts)},_highLightToday:function(){var i=new Date;this.el.getElements(".viewContainerTBody td").each(function(t){var e=new Date(this._getTimeFromClassName(t.className).toInt());i.equalsTo(e)?t.addClass("today"):t.removeClass("today")}.bind(this))},centerOnToday:function(){this.date=new Date,this.showView()},renderDayView:function(){var t,e;if(this.fadePopWin(0),this.options.viewType="dayView",this.setAddButtonState(),!this.dayView){for(tbody=new Element("tbody"),t=new Element("tr"),e=0;e<2;e++)0===e?t.adopt(new Element("td",{class:"day"})):t.adopt(new Element("th",{class:"dayHeading",styles:{width:"80px",height:"20px","text-align":"center",color:this.options.headingColor,"background-color":this.options.colors.headingBg}}).appendText(this.options.days[this.date.getDay()]));for(tbody.appendChild(t),this.options.open=this.options.open<0?0:this.options.open,this.options.close=24<this.options.close||this.options.close<this.options.open?24:this.options.close,i=this.options.open;i<this.options.close+1;i++){for(t=new Element("tr"),e=0;e<2;e++)if(0===e){var s=1===i.length?i+"0:00":i+":00";t.adopt(new Element("td",{class:"day"}).appendText(s))}else t.adopt(new Element("td",{class:"day",styles:{width:"100%",height:"10px","background-color":"#F7F7F7","vertical-align":"top",padding:0,border:"1px solid #cccccc"},events:{mouseenter:function(t){this.setStyles({"background-color":"#FFFFDF"})},mouseleave:function(t){this.setStyles({"background-color":"#F7F7F7"})},dblclick:function(t){this.openAddEvent(t,"day")}.bind(this)}}));tbody.appendChild(t)}this.dayView=new Element("div",{class:"dayView",styles:{position:"relative"}}).adopt(new Element("table",{class:"",styles:{"border-collapse":"collapse"}}).adopt(tbody)),this.el.getElement(".viewContainer").appendChild(this.dayView)}this.showView("dayView")},hideDayView:function(){this.el.getElement(".dayView")&&(this.el.getElement(".dayView").hide(),this.removeDayEvents())},hideWeekView:function(){this.el.getElement(".weekView")&&(this.el.getElement(".weekView").hide(),this.removeWeekEvents())},showView:function(t){switch(this.hideDayView(),this.hideWeekView(),this.el.getElement(".monthView")&&this.el.getElement(".monthView").hide(),this.el.getElement("."+this.options.viewType).style.display="block",this.options.viewType){case"dayView":this.showDay();break;case"weekView":this.showWeek();break;default:case"monthView":this.showMonth()}Cookie.write("fabrik.viz.calendar.view",this.options.viewType)},renderWeekView:function(){var t,e,i,s,n;if(this.fadePopWin(0),n=!1===this.options.showweekends?6:8,this.options.viewType="weekView",this.setAddButtonState(),!this.weekView){for(s=new Element("tbody"),i=new Element("tr"),e=0;e<n;e++)0===e?i.adopt(new Element("td",{class:"day"})):i.adopt(new Element("th",{class:"dayHeading",styles:{width:this.options.weekday.width+"px",height:this.options.weekday.height-10+"px","text-align":"center",color:this.options.headingColor,"background-color":this.options.colors.headingBg},events:{click:function(t){t.stop(),this.selectedDate.setTime(t.target.className.replace("dayHeading ","").toInt());var i=new Date;t.target.getParent().getParent().getElements("td").each(function(t){var e=t.className.replace("day ","").replace(" selectedDay").toInt();i.setTime(e),i.getDayOfYear()===this.selectedDate.getDayOfYear()?t.addClass("selectedDay"):t.removeClass("selectedDay")}.bind(this))}.bind(this)}}).appendText(this.options.days[e-1]));for(s.appendChild(i),this.options.open=this.options.open<0?0:this.options.open,24<this.options.close||this.options.close<this.options.open?this.options.close=24:this.options.close,t=this.options.open;t<this.options.close+1;t++){for(i=new Element("tr"),e=0;e<n;e++)if(0===e){var a=1===t.length?t+"0:00":t+":00";i.adopt(new Element("td",{class:"day"}).set("text",a))}else i.adopt(new Element("td",{class:"day",styles:{width:this.options.weekday.width+"px",height:this.options.weekday.height+"px","background-color":"#F7F7F7","vertical-align":"top",padding:0,border:"1px solid #cccccc"},events:{mouseenter:function(t){this.hasClass("selectedDay")||this.setStyles({"background-color":"#FFFFDF"})},mouseleave:function(t){this.hasClass("selectedDay")||this.setStyles({"background-color":"#F7F7F7"})},dblclick:function(t){this.openAddEvent(t,"week")}.bind(this)}}));s.appendChild(i)}this.weekView=new Element("div",{class:"weekView",styles:{position:"relative"}}).adopt(new Element("table",{styles:{"border-collapse":"collapse"}}).adopt(s)),this.el.getElement(".viewContainer").appendChild(this.weekView)}this.showWeek(),this.showView("weekView")},repositionEvents:function(){document.getElements("a.week-event, a.day-event").each(function(t){var e=t.retrieve("relativeTo");t.position({relativeTo:e,position:"upperLeft"});var i=t.retrieve("gridSize"),s=Math.floor((e.getSize().x-i)/i);s-=t.getStyle("padding-left").toInt()+t.getStyle("padding-right").toInt(),t.setStyle("width",s+"px")})},render:function(t){this.setOptions(t),window.addEvent("resize",function(){this.repositionEvents()}.bind(this)),this.y=this.el.getPosition().y;var e=function(){var t=this.el.getPosition().y;t!==this.y&&(this.y=t,this.repositionEvents())}.bind(this);window.setInterval(e,200),document.addEvent("click:relay(button[data-task=deleteCalEvent], a[data-task=deleteCalEvent])",function(t,e){t.preventDefault(),this.deleteEntry()}.bind(this)),document.addEvent("click:relay(button[data-task=editCalEvent], a[data-task=editCalEvent])",function(t,e){t.preventDefault(),this.editEntry()}.bind(this)),document.addEvent("click:relay(button[data-task=viewCalEvent], a[data-task=viewCalEvent])",function(t,e){t.preventDefault(),this.activeHoverEvent||(this.activeHoverEvent=e.hasClass("fabrikEvent")?e:e.getParent(".fabrikEvent")),this.viewEntry()}.bind(this)),document.addEvent("click:relay(a.fabrikEvent)",function(t,e){this.activeHoverEvent=t.target.hasClass("fabrikEvent")?t.target:t.target.getParent(".fabrikEvent")}.bind(this)),this.windowopts.title=Joomla.JText._("PLG_VISUALIZATION_CALENDAR_ADD_EDIT_EVENT"),this.windowopts.y=this.options.popwiny,this.popWin=this._makePopUpWin();var i=this.options.urlfilters;i.visualizationid=this.options.calendarId,this.firstRun&&(this.firstRun=!1,i.resetfilters=this.options.restFilterStart),this.ajax.updateEvents=new Request({url:this.options.url.add,data:i,evalScripts:!0,onSuccess:function(t){if("null"!==typeOf(t)){var e=t.stripScripts(!0),i=JSON.parse(e);this.addEntries(i),this.showView()}}.bind(this)}),this.ajax.deleteEvent=new Request({url:this.options.url.del,data:{visualizationid:this.options.calendarId},onComplete:function(t){t=t.stripScripts(!0);var e=JSON.parse(t);this.entries=$H(),this.addEntries(e)}.bind(this)}),"null"!==typeOf(this.el.getElement(".addEventButton"))&&this.el.getElement(".addEventButton").addEvent("click",function(t){this.openAddEvent(t)}.bind(this));var s=new Element("div",{class:"calendarNav"}).adopt(new Element("ul",{class:"viewMode"}).adopt([]));switch(this.el.appendChild(s),this.el.appendChild(new Element("div",{class:"viewContainer"})),"null"!==typeOf(Cookie.read("fabrik.viz.calendar.date"))&&(this.date=new Date(Cookie.read("fabrik.viz.calendar.date"))),"null"===typeOf(Cookie.read("fabrik.viz.calendar.view"))?this.options.viewType:Cookie.read("fabrik.viz.calendar.view")){case"dayView":this.renderDayView();break;case"weekView":this.renderWeekView();break;default:case"monthView":this.renderMonthView()}this.el.getElement(".nextPage").addEvent("click",function(t){this.nextPage(t)}.bind(this)),this.el.getElement(".previousPage").addEvent("click",function(t){this.previousPage(t)}.bind(this)),this.options.show_day&&this.el.getElement(".dayViewLink").addEvent("click",function(t){this.renderDayView(t)}.bind(this)),this.options.show_week&&this.el.getElement(".weekViewLink").addEvent("click",function(t){this.renderWeekView(t)}.bind(this)),(this.options.show_week||this.options.show_day)&&this.el.getElement(".monthViewLink").addEvent("click",function(t){this.renderMonthView(t)}.bind(this)),this.el.getElement(".centerOnToday").addEvent("click",function(t){this.centerOnToday(t)}.bind(this)),this.showMonth(),this.ajax.updateEvents.send()},showMessage:function(t){this.el.getElement(".calendar-message").set("html",t),this.fx.showMsg.start({opacity:[0,1]}).chain(function(){this.start.delay(2e3,this,{opacity:[1,0]})})},addEntry:function(t,e){var i,s,n,a;if(e.startdate){if(""===(i=(i=e.startdate.split(" "))[0]).trim())return;if(a=(a=(a=e.startdate.split(" "))[1]).split(":"),i=i.split("-"),s=new Date,n=i[1].toInt()-1,s.setYear(i[0]),s.setMonth(n,i[2]),s.setDate(i[2]),s.setHours(a[0].toInt()),s.setMinutes(a[1].toInt()),s.setSeconds(a[2].toInt()),e.startdate=s,this.entries.set(t,e),e.enddate){if(""===(i=(i=e.enddate.split(" "))[0]).trim())return;if("0000-00-00"===i)return void(e.enddate=e.startdate);a=(a=(a=e.enddate.split(" "))[1]).split(":"),i=i.split("-"),s=new Date,n=i[1].toInt()-1,s.setYear(i[0]),s.setMonth(n,i[2]),s.setDate(i[2]),s.setHours(a[0].toInt()),s.setMinutes(a[1].toInt()),s.setSeconds(a[2].toInt()),e.enddate=s}}},deleteEntry:function(){var t=this.activeHoverEvent.id.replace("fabrikEvent_",""),e=t.split("_"),i=e[0];this.options.deleteables.contains(i)&&confirm(Joomla.JText._("PLG_VISUALIZATION_CALENDAR_CONF_DELETE"))&&(this.ajax.deleteEvent.options.data={id:e[1],listid:i},this.ajax.deleteEvent.send(),document.id(this.activeHoverEvent).fade("out"),this.fx.showEventActions.start({opacity:[1,0]}),this.removeEntry(t),this.activeDay=null)},editEntry:function(t){var e={};e.id=this.options.formid;var i=this.activeHoverEvent.id.replace("fabrikEvent_","").split("_");e.rowid=i[1],e.listid=i[0],t&&t.stop(),this.addEvForm(e)},viewEntry:function(){var t={};t.id=this.options.formid;var e=this.activeHoverEvent.id.replace("fabrikEvent_","").split("_");t.rowid=e[1],t.listid=e[0],t.nextView="details",this.addEvForm(t)},addEntries:function(t){(t=$H(t)).each(function(t,e){this.addEntry(e,t)}.bind(this)),this.showView()},removeEntry:function(t){this.entries.erase(t),this.showView()},nextPage:function(){switch(this.fadePopWin(0),this.options.viewType){case"dayView":this.date.setTime(this.date.getTime()+this.DAY),this.showDay();break;case"weekView":this.date.setTime(this.date.getTime()+this.WEEK),this.showWeek();break;case"monthView":this.date.setDate(1),this.date.setMonth(this.date.getMonth()+1),this.showMonth()}Cookie.write("fabrik.viz.calendar.date",this.date)},fadePopWin:function(t){this.popWin&&this.popWin.setStyle("opacity",t)},previousPage:function(){switch(this.fadePopWin(0),this.options.viewType){case"dayView":this.date.setTime(this.date.getTime()-this.DAY),this.showDay();break;case"weekView":this.date.setTime(this.date.getTime()-this.WEEK),this.showWeek();break;case"monthView":this.date.setMonth(this.date.getMonth()-1),this.showMonth()}Cookie.write("fabrik.viz.calendar.date",this.date)},addLegend:function(t){var i=new Element("ul");t.each(function(t){var e=new Element("li");e.adopt(new Element("div",{styles:{"background-color":t.colour}}),new Element("span").appendText(t.label)),i.appendChild(e)}.bind(this)),new Element("div",{class:"calendar-legend"}).adopt([new Element("h3").appendText(Joomla.JText._("PLG_VISUALIZATION_CALENDAR_KEY")),i]).inject(this.el,"after")},_getGreyscaleFromRgb:function(t){var e=parseInt(t.substring(1,3),16),i=parseInt(t.substring(3,5),16),s=parseInt(t.substring(5),16),n=parseInt(.3*e+.59*i+.11*s,10);return"#"+n.toString(16)+n.toString(16)+n.toString(16)},_getColor:function(t,e){if(!this.options.greyscaledweekend)return t;new Color(t);return"null"===typeOf(e)||0!==e.getDay()&&6!==e.getDay()?t:this._getGreyscaleFromRgb(t)}});Date._MD=new Array(31,28,31,30,31,30,31,31,30,31,30,31),Date.SECOND=1e3,Date.MINUTE=60*Date.SECOND,Date.HOUR=60*Date.MINUTE,Date.DAY=24*Date.HOUR,Date.WEEK=7*Date.DAY,Date.prototype.getMonthDays=function(t){var e=this.getFullYear();return void 0===t&&(t=this.getMonth()),0!=e%4||0==e%100&&0!=e%400||1!==t?Date._MD[t]:29},Date.prototype.isSameWeek=function(t){return this.getFullYear()===t.getFullYear()&&this.getMonth()===t.getMonth()&&this.getWeekNumber()===t.getWeekNumber()},Date.prototype.isSameDay=function(t){return this.getFullYear()===t.getFullYear()&&this.getMonth()===t.getMonth()&&this.getDate()===t.getDate()},Date.prototype.isSameHour=function(t){return this.getFullYear()===t.getFullYear()&&this.getMonth()===t.getMonth()&&this.getDate()===t.getDate()&&this.getHours()===t.getHours()},Date.prototype.isDateBetween=function(t,e){var i=1e4*t.getFullYear()+100*(t.getMonth()+1)+t.getDate(),s=1e4*e.getFullYear()+100*(e.getMonth()+1)+e.getDate(),n=1e4*this.getFullYear()+100*(this.getMonth()+1)+this.getDate();return i<=n&&n<=s};