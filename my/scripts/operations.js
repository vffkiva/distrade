function actionLogin(a){
var form = $(a).parents().find('form').first();
var defaults = {'username' : '', 'password' : '', 'action' : 'login'};
var data = $.extend(defaults, {'username' : $(form).find('input[name="username"]').val(), 'password' : $(form).find('input[name="password"]').val()});
	$.ajax({
	data: data,
		success: function(out){
		actionShowMessage(out['message']);
			if(out['redirect'] != '')window.location.href=out['redirect'];
	 	}
	});
}

function actionLogout(){
	$.ajax({
	data: {'action' : 'logout'},
		success: function(out){
		actionShowMessage(out['message']);
			if(out['redirect'] != '')window.location.href=out['redirect'];
	 	}
	});
}