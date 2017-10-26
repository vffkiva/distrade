$(document).ready(function(){
	$.ajaxSetup({
	url: "/my/tools/ajax.html",
	type: "POST",
	dataType: 'json'
	});



	$('.LoginPwd, .LoginUser').bind('keyup', function(event){if(event.keyCode == 13)actionLogin($(this));});
	$('#id-linkLogout').bind('click', function(){actionLogout();});
	$('.icon-button').bind('mouseenter', function(){$(this).removeClass('ui-state-default').addClass('ui-state-hover');});
	$('.icon-button').bind('mouseleave', function(){$(this).removeClass('ui-state-hover').addClass('ui-state-default');});
	$('.ui-icon').parent().bind('mouseenter', function(){$(this).removeClass('ui-state-default').addClass('ui-state-hover');});
	$('.ui-icon').parent().bind('mouseleave', function(){$(this).removeClass('ui-state-hover').addClass('ui-state-default');});
	
	$("[name^='Date_']").datepicker({ dateFormat: 'dd.mm.yy', changeYear: true });
	$('.action-button').button();

	dialog = $('<div id="dialogs"></div>').appendTo('body');

	if($('#message-type').length > 0){
	actionShowMessage({'text': $('#message-text').html(), 'type' : $('#message-type').html(), 'title' : $('#message-title').html(), 'mode' : $('#message-mode').html(), 'wrap' : true});
	}

	$('span[id^="id-lang-"]').unbind().bind('click', function(){
		console.log($(this));
		$.ajax({
		data: {'action' : 'actionChangeLanguage', 'lang' : $(this).attr('id').replace('id-lang-','')},
			success: function(out){
				if(out['redirect'] !='')window.location.href=out['redirect'];
			}
		});
	});

	
});