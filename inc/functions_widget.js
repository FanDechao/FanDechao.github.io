jQuery.fn.autoZoomLoadImage = function(scaling, width, height, loadPic) {
  if (loadPic == null) loadPic = "/images/loading2.gif";
  return this.each(function() {
    var t = $(this);
    var src = $(this).attr("src");
    var img = new Image();
    //alert("Loading")
    img.src = src;
    //自动缩放图片
    var autoScaling = function() {
      if (scaling) {
        if (img.width > 0 && img.height > 0) {
          if (img.width / img.height >= width / height) {
            if (img.width > width) {
              t.width(width);
              t.height((img.height * width) / img.width);
            }
            else {
              t.width(img.width);
              t.height(img.height);
            }
          }
          else {
            if (img.height > height) {
              t.height(height);
              t.width((img.width * height) / img.height);
            }
            else {
              t.width(img.width);
              t.height(img.height);
            }
          }
        }
		//实现垂直居中
		var a=(height-t.height())/2;if(a>0){t.css("marginTop",a)};
      }
    }
    //处理ff下会自动读取缓存图片
    if (img.complete) {
      //alert("getToCache!");
      autoScaling();
      return;
    }
    $(this).attr("src", "");
    var loading = $("<img class='myloading' style='width:20px;height:20px;' alt=\"加载中\" title=\"图片加载中\" src=\"" + loadPic + "\" />");
	
    t.hide();
    t.after(loading);
    $(img).load(function() {
      autoScaling();
      loading.remove();
      t.attr("src", this.src);
      t.show();
      //alert("finally!")
    });
  });
}

function asp_widget_insert_url(p_pathtype,p_url,p_name,p_value)
{
	var tstr = p_url;
	p_value = encodeURIComponent(p_value);
	switch(p_pathtype)
	{
		case "No":
			if(tstr.length<=1){tstr += "?"+p_name+"="+p_value;}else{tstr += "&"+p_name+"="+p_value;}
			break;
		case "category":
			tstr += p_name+"-"+p_value + "/";
			break;
		default:
			tstr = tstr.replace(p_pathtype,"/");
			tstr += p_name+"-"+p_value+ p_pathtype;
			break;
	};
	//tstr = encodeURI(tstr);
	//tstr = escape(tstr);
	//tstr = encodeURIComponent(tstr);
	//alert(tstr);
	var appversion = $('meta[name=appversion]').attr("content");
	if(appversion=="6.0"){tstr = tstr.replace(/%/g,"-bfh-");}
	return tstr;
}
function AddFavorite(sURL, sTitle)
{
    try
    {
        window.external.addFavorite(sURL, sTitle);
    }
    catch (e)
    {
        try
        {
            window.sidebar.addPanel(sTitle, sURL, "");
        }
        catch (e)
        {
            alert("加入收藏失败，请使用Ctrl+D进行添加");
        }
    }
}
function SetHome(obj,vrl){
try{
obj.style.behavior='url(#default#homepage)';obj.setHomePage(vrl);
}
catch(e){
if(window.netscape) {
try {
    netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
}
catch (e) {
    alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。");
}
var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
prefs.setCharPref('browser.startup.homepage',vrl);
}
}
}

function insertFlash(elm, url, w, h) {
 if (!document.getElementById(elm)) return;
 var str = '';
 str += '<object width="'+ w +'" height="'+ h +'" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0">';
 str += '<param name="movie" value="'+ url +'">';
 str += '<param name="wmode" value="transparent">';
 str += '<param name="quality" value="autohigh">';
 str += '<embed width="'+ w +'" height="'+ h +'" src="'+ url +'" quality="autohigh" wmode="transparent" type="application/x-shockwave-flash" plugspace="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash"></embed>';
 str += '</object>';
 document.getElementById(elm).innerHTML = str;
}
function flashChecker()
{
  var hasFlash=0;　
  if(document.all)
  {
  var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
  if(swf) {hasFlash=1;}
  }else{
    if (navigator.plugins && navigator.plugins.length > 0)
    {
    var swf=navigator.plugins["Shockwave Flash"];
    if (swf)
      {
        hasFlash=1;
      }
    }
  }
  return hasFlash;
}