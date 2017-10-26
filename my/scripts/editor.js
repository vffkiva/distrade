$(function() {

	$("[id^='button-editor-title-style_']").bind('click', function() {
	var LangKey = $(this).attr('id').replace('button-editor-title-style_','');
	var LangID = $("input[name='LangID_"+LangKey+"']").val();
	var TitleText = $("input[name='Title_"+LangKey+"']").val();
	//getTitleConfigWindow({'object_id' : SubId, 'lang_key' : LangKey, 'lang_id' : LangID, 'text' : TitleText, 'type' : 'section'});
	
	dialogTitleConfiguration({'object_id' : $("input[name='SubId']").val(), 'lang_key' : LangKey, 'lang_id' : LangID, 'text' : TitleText, 'type' : 'section'});
	});

});




function dialogShowSectionPreview(options){
var opts = $.extend({'lang_id' : '', 'sub_id' : ''}, options);
	$.ajax({
	data: {'action' : 'dialogPreviewSection', 'LangID' : opts['lang_id'], 'SubId' : opts['sub_id']},
 		success: function(data){
 		var buttons = {};
			buttons[tr({'var' : 'BTTN_LOAD_FROM_SECTION'})] = function(){
			CKEDITOR.instances['PreviewText'].setData(data['dialog']['main_text']);
			}
			
			buttons[tr({'var' : 'BTTN_SAVE'})] = function(){
				$.ajax({
				data: {'action' : 'actionSaveSectionPreview', 'PreviewText' : CKEDITOR.instances['PreviewText'].getData(), 'LangID' : opts['lang_id'], 'SubId' : opts['sub_id']},
					success: function(out){
					$(dialog).dialog().remove();
					actionShowMessage(out['message']);
					}
				})
			}
			
			buttons[tr({'var' : 'BTTN_CLOSE'})] = function(){$(this).dialog().remove();};

			
		var dialog = showDialog('dialog_preview_edit',{'width' : 'auto', 'height' : 'auto', 'modal' : true, 'title': data.dialog.title, 'resizable' : true, 'position' : [100,100], buttons: buttons});
		$(dialog).html(data.dialog.text);
			if (CKEDITOR.instances['PreviewText']) delete CKEDITOR.instances['PreviewText'];
			CKEDITOR.replace( 'PreviewText',{
			removePlugins : 'elementspath',
			enterMode : CKEDITOR.ENTER_BR,
			shiftEnterMode: CKEDITOR.ENTER_P,
			resize_enabled : true,
			width: '700px',
			customConfig : '/my/ckeditor/my_config.js',
			toolbar: 'QuickEdit',
			sharedSpaces : {top : 'PreviewEditorToolbar'}
   			}); 
		}
	});

}

function actionSaveSection(options){
var defaults = {'container' : '#id-formEditor', 'redirect' : ''}
var opts = $.extend(defaults,options);

var data = $(opts['container']).serializeJSON();
data['action'] = 'actionSaveSection';
data['redirect'] = opts['redirect'];

	$.each($('textarea[name^="SectionText_"]'), function(index, item){
	data['SectionText_'+index] = CKEDITOR.instances['SectionText_'+index].getData();
	});

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