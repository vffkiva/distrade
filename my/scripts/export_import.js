function dialogImport(options){
var buttons = {};

buttons[tr({'var' : 'BTTN_IMPORT'})] = function(){

//var data = $(opts['container']).serializeJSON();

	$.ajax({
	data: $.extend({'action' : 'actionExport', 'item' : opts['item'], 'format' : '', 'filter_key' : opts['filter_key']},$(this).find('form').serializeJSON()),
		success: function(out){
				if(out['message']['type'] == 'error'){
				actionShowMessage(out['message']);
				}
				else {
				//	if(opts['redirect'] !='')window.location.href=opts['redirect'];
					if(out['file']['format'] != '' && out['file']['contents'] != '' && out['file']['name'] != ''){
            
					var $form = $("<form/>").attr("id", "data_form").attr("action", "/tools/download.html").attr("method", "post");
					$("body").append($form);
					
			        var $input = $("<input />").attr("type", "hidden").attr('name', 'format').attr('value', out['file']['format']);
					$form.append($input);
					$input = $("<input />").attr("type", "hidden").attr('name', 'filename').attr('value', out['file']['name']);
					$form.append($input);
					$input = $("<input />").attr("type", "hidden").attr('name', 'contents').attr('value', out['file']['contents']);
					$form.append($input);					
					$form.submit();

					//window.location.href='/tools/download.html?opts['redirect'];
					//	window.open('/tools/download.html');
					//	$.post( '/tools/download.html', {'format' : out['file']['format'], 'contents' : out['file']['contents'], 'filename' : out['file']['name']}, function() {
					//	console.log('here');
					//						});
					
					}
				}
			}	
		});

};

buttons[tr({'var' : 'BTTN_CLOSE'})] = function(){$(this).dialog().remove();};


var defaults = {'item' : '', 'filter_key' : '', 'redirect' : '', 'title' : '', 'width' : 400, 'height' : 300, 'resizable' : true, 'buttons' : buttons};
var opts = $.extend(defaults, options);
var dialog_id = 'dialog_export';
var dialog = showDialog(dialog_id,opts);
	$.ajax({
	data: {'action' : 'dialogImport', 'item' : opts['item'], 'filter_key' : opts['filter_key']},
		success: function(out){
		$("#dialog-"+dialog_id).html(out['dialog']['text']);
		$(dialog).dialog('option', 'title', out['dialog']['title']);
	 	}
	});

}