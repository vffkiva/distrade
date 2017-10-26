$(document).ready(function(){

	$.ajaxSetup({
	url: "/tools/ajax.html",
	type: "POST",
	dataType: 'json'
	});

dialog = $('<div id="dialogs"></div>').appendTo('body');

	ddsmoothmenu.init({
	mainmenuid: "smoothmenu1", //menu DIV id
	orientation: 'h', //Horizontal or vertical menu: Set to "h" or "v"
	classname: 'ddsmoothmenu', //class added to menu's outer DIV
	//customtheme: ["#1c5a80", "#18374a"],
	contentsource: "markup" //"markup" or ["container_id", "path_to_menu_file"]
	})

	$('#language').bind('mouseenter', function (){
	$('#language ul li ul').fadeTo(500, 1.0, function(){});});
	$('#language').bind('mouseleave', function (){$('#language ul li ul').fadeTo(500, 0.0, function(){});});

	$('#top .logo').bind('click', function(){window.location.href=vars['url'];});
	$('.more-news > .link').bind('click', function(){window.location.href=vars['url']+'?_page=242';});
	$('.action-button').button();
	
	});