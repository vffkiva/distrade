function dialogAddBannerContent(options){
var dialog_id = 'banner_add_content';
var container = $('#id-formAddBanner');
var buttons = {};
	buttons[tr({'var' : 'BTTN_ADD'})] = function(){
	var element_id = $(dialog).find('select[name="ElementID"]').val();
	CKEDITOR.instances[opts['field']].setData(opts['data'][element_id]);
	};

var defaults = {'title' : '', 'lang_id' : '', 'data' : [], 'width' : 600, 'height' : 200, 'resizable' : true, 'buttons' : buttons};
var opts = $.extend(defaults, options);
var dialog = showDialog(dialog_id,opts);

	$.ajax({
	data: {'action' : 'dialogAddBannerContent'},
		success: function(out){
		$("#dialog-"+dialog_id).html(out['dialog']['text']);
		$(dialog).dialog('option', 'title', out['dialog']['title']);
			$(dialog).find('input[name="Type"]').bind('click', function(){
			var type = $(this).val()
				if(type != ''){
					$.ajax({
					data: {'action' : 'actionSelectBannerContent', 'Type' : type, 'LangID' : opts['lang_id']},
						success: function(out){
							if(out['message']['type'] == 'error'){
							actionShowMessage(out['message']);
							}
							else {
							$(dialog).find('#id-tdSelect').html(out['data']['html']);
							opts['data'] = out['data']['content'];
							}
						}
					});
				}
			});
		}
	});
}


function dialogEditorToolbar(options){
var opts = $.extend({'dialog_id' : 'dialog_editor', 'fields' : {}, 'width' : 900, 'height' : 150}, options);

	if($('#dialog-'+opts['dialog_id']).length == 0){
	var dialog = showDialog('dialog_editor',{'title' : tr({'var' : 'TITLE_EDITOR'}), 'width' : opts['width'], 'height' : opts['height'], 'resizable' : true, position: [10,10]});
	$(dialog).html('<div id="dialog-editor-toolbar"></div>');
	}
	else var dialog = $('#dialog-'+opts['dialog_id']).dialog();
					 
	

	$.each(opts['fields'], function(index, item){
	var name = $(this).attr('name');
	//if (CKEDITOR.instances[$(this).attr('name')]) delete CKEDITOR.instances[$(this).attr('name')];
		if(!CKEDITOR.instances[name]){
			CKEDITOR.replace(name, {
			resize_enabled : true,
			enterMode : CKEDITOR.ENTER_BR,
			shiftEnterMode: CKEDITOR.ENTER_P,
			width: 300,
			height: 120,
			customConfig : '/my/ckeditor/my_config.js',
			sharedSpaces : {top : 'dialog-editor-toolbar'}
			}); 
		}
	});
}




function actionAddBanner(options){
var opts = $.extend({'container' : $('#id-formAddBanner'), 'banner_id' : ''}, options);
var data = {
	'Total' : 0, 
	'action' : 'actionAddBanner', 
	'BlockStatus' : opts['container'].find('select[name="BlockStatus"]').val(), 
	'Name' : opts['container'].find('input[name="Name"]').val(), 
	'BannerID' : opts['banner_id'],
	'redirect' : opts['redirect']
	};

	$.each(opts['container'].find('li[id^="id-row_"]'), function (index, item){
	data['Total']++;
	var row = $(this);
		$.each($(row).find('textarea[name^="Text_"]'), function (index1, item1){
		var tmp = $(this).attr('name').split('_');
		var text = 'Text_'+index+'_'+tmp[2];
		var title = 'Title_'+index+'_'+tmp[2];
		
		data[title] = $(row).find('input[name="Title_'+tmp[1]+'_'+tmp[2]+'"]').val();
		data[text] = CKEDITOR.instances[$(this).attr('name')].getData();
		});
	});

	
	$.ajax({
	data: data,
		success: function(out){
			if(out['message']['type'] == 'error'){
			actionShowMessage(out['message']);
			}
			else {
				if(out['redirect'] != '') window.location = out['redirect'];
			}
		}
	});
}


function actionBlockBanner(options){
var defaults = {'container' : '#id-formBanners', 'redirect' : '', 'block_status' : 0};
var opts = $.extend(defaults,options);

var data = $(opts['container']).serializeJSON();
data['action'] = 'actionBlockBanner';
data['redirect'] = opts['redirect'];
data['BlockStatus'] = opts['block_status'];
data['TotalFields'] = $(opts['container']).find('input[name^="Banner_"]').length;

	$.ajax({
	data: data,
		success: function(out){
			if(out['message']['type'] == 'error')actionShowMessage(out['message']);
			else {
				if(out['redirect'] != '') window.location = out['redirect'];
			}
		}
	});
}


function actionDeleteBanner(options){
var defaults = {'banner_id' : '', 'redirect' : ''};
var opts = $.extend(defaults,options);
data = {'action' : 'actionDeleteBanner', 'redirect' : opts['redirect'], 'BannerID' : opts['banner_id']};
	$.ajax({
	data: data,
		success: function(out){
			if(out['message']['type'] == 'error')actionShowMessage(out['message']);
			else {
				if(out['redirect'] != '') window.location = out['redirect'];
			}
		}
	});
}