$(document).ready(function(){
galleryInit();
});


function galleryInit(options){
var opts = $.extend({'container' : 'body', 'img_container' : '#gallery-pics'}, options);
var items = $(opts['container']).find('.gallery-picture');
var i = 0;
var TotalLangs = parseInt($(opts['container']).find('[name="TotalLangs"]').val());

	$(items).each( function (item,index){
 	var picture = $(this);
 	var dialogid = 'picture_notes_'+i;
	 	$(this).find('span.ui-icon-trash').bind( 'click', function(event,item) {
 		$(picture).fadeTo(500,0.0, function(){$(this).remove();galleryInit();});
 		});
	 	$(this).find('span.ui-icon-comment').unbind().bind( 'click', function(event,item) {
 			$.ajax({
			data: {'action' : 'dialogAddPictureComment', 'PictureID' : $(picture).find('[name="PictureID"]').val()},
 			success: function(data){
				var buttons = {}; 
					buttons[tr({'var' : 'BTTN_SAVE'})] = function(){

					 for(i=0;i<TotalLangs;i++){
					 $(picture).find('[name="Lang_'+i+'"]').val($(this).find('input[name="FormLang_'+i+'"]').val());
					 $(picture).find('[name="Text_'+i+'"]').val($(this).find('textarea[name="FormText_'+i+'"]').val())
					 $(picture).find('[name="Title_'+i+'"]').val($(this).find('input[name="FormTitle_'+i+'"]').val())
					 }

					$(dialog).dialog('close');
					}; 
				
				
				var dialog = showDialog(dialogid,{'width' : (TotalLangs*275), 'height' : 330, 'title': data['dialog']['title'], 'resizable' : true, 'buttons': buttons});	
 				$(dialog).html(data['dialog']['text']);

				 for(i=0;i<TotalLangs;i++){
				 var valueActual = $(picture).find('[name="Text_'+i+'"]').val();
 				 $(dialog).find('textarea[name="FormText_'+i+'"]').val(valueActual);
 				 }
 				}
			});
 		});
	i++;
	});

//$('.gallery-picture').find('a').fancybox({
$(items).find('a').fancybox({
	cyclic : true, 
	titlePosition : 'inside',
	helpers	: {
			title	: {type: 'outside'},
			overlay	: {opacity : 0.8, css : {'background-color' : '#000'}
			},
			thumbs	: {width : 50,height	: 50}
		}
	});

 
 if($(items).length == 0){
 $(opts['img_container']).append('<span class="picture-gallery-empty-text">'+tr({'var' : 'STR_EMPTY_LIST'})+'</span>').fadeTo(1000,1.0);
 }
}


function gallerySetPicture(data){
data = $.extend({'target' : '#gallery-pics'}, data);
 if(data['Properties']['Type'] == 'image/jpeg' || data['Properties']['Type'] == 'image/gif' || data['Properties']['Type'] == 'image/png'){

	$.ajax({
	data: {'action' : 'actionGetLanguages'},
	success: function(result){
		var html;
		html = '<div class="gallery-picture ui-corner-all">';
		html += '<div class="gallery-picture-image"><a rel="group1" href="'+data['Path']+'" title=""><img src="/my/tools/thumb.html?src='+data['Path']+'&amp;ass=x&amp;size=100"/></a></div>';
		html += '<div class="gallery-picture-footer ui-corner-bl ui-corner-br">';
		html += '<span class="gallery-picture-icon"><span class="ui-icon ui-icon-trash cursor-pointer"><!----></span></span>';
		html += '<span class="gallery-picture-icon"><span class="ui-icon ui-icon-comment cursor-pointer"><!----></span></span>';
		
			$(result['langs']).each(function (index,item) {
			html += '<input type="hidden" name="Lang_'+index+'" value="'+item['lang_id']+'"/>';
			html += '<input type="text" name="Title_'+index+'"></textarea>';
			html += '<textarea rows="5" cols="50" name="Text_'+index+'"></textarea>';
			});
		
		html += '</div>';
		html += '</div>';
		$(data['target']).find('span.picture-gallery-empty-text').fadeTo(1000,0.0,function(){$(this).remove();});
		$(data['target']).append($(html).hide().fadeTo(1000,1.0));
 		galleryInit();
		}
	});
 }
}


function gallerySave(options){
var opts = $.extend({'redirect' : ''},options);
var data = $('#ActionForm').serializeJSON();
var pictures = $('#gallery-pics div.gallery-picture');

data['action'] = 'actionSaveGallery';
data['TotalPictures'] = $(pictures).length;
data['TotalLangs'] = parseInt($('body').find('[name="TotalLangs"]').val());
data['redirect'] = opts['redirect'];

	$(pictures).each( function(index,item){
 	data['Picture_'+index+'_source'] = $(this).find('.gallery-picture-image a').attr('href');
		for(i=0;i<data['TotalLangs'];i++){
		data['Picture_'+index+'_title_'+i] = $(this).find('input[name="Title_'+i+'"]').val();
		data['Picture_'+index+'_text_'+i] = $(this).find('textarea[name="Text_'+i+'"]').val();
		data['Picture_'+index+'_lang_id_'+i] = $(this).find('input[name="Lang_'+i+'"]').val();
		}
 	})
	
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


function actionBlockGalleries(options){
var defaults = {'container' : '#id-formGalleries', 'redirect' : '', 'block_status' : 0}
var opts = $.extend(defaults,options);

var data = $(opts['container']).serializeJSON();
data['action'] = 'actionBlockGalleries';
data['redirect'] = opts['redirect'];
data['BlockStatus'] = opts['block_status'];
data['TotalFields'] = $(opts['container']).find('input[name^="Gallery_"]').length;

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


function actionDeleteGallery(options){
var defaults = {'gallery_id' : '', 'redirect' : ''};
var opts = $.extend(defaults,options);
data = {'action' : 'actionDeleteGallery', 'redirect' : opts['redirect'], 'GalleryID' : opts['gallery_id']};
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