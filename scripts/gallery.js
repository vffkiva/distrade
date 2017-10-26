$(document).ready(function(){

});

$(function() {

var all_tabs = $("div[id^='tab-nr-']");
	$(all_tabs).each(function () {
	var tab_content = $(this).find("div[id^='tab-content-']").attr('id');
	var tabs = $(this).
	tabs({ 
	selected: 0,
	
	beforeLoad: function(event, ui) { 
	ui.ajaxSettings.dataType = "json";
		ui.ajaxSettings.dataFilter = function(out) {
		var data = $.parseJSON(out);
		$("#"+tab_content).html(data['html']).hide().fadeTo(1000,1.0);

		var link = $("#"+tab_content).find('table').find('span[class~="main-href"]');
			if($(link).length > 0){
				$(link).bind('click', function() {
				var hidden_pics = $("#"+tab_content).find('.hidden-object');
				$(hidden_pics).fadeTo(1000,1.0);
				$(link).fadeTo(1000,0.0, function(){$(this).remove();});
				});
			}		
		
		
					$('#'+tab_content).find('a').fancybox({
					cyclic : true, 
					titlePosition : 'inside',
					helpers	: {
						title	: {type: 'outside'},
						overlay	: {opacity : 0.8, css : {'background-color' : '#000'}
					},
					thumbs	: {width : 50,height	: 50}
					}
				});
		
		}
 	} 
	 })
	
	
	})

	
});