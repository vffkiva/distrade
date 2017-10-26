CKEDITOR.plugins.add('banner',
{
    init: function (editor) {
        var pluginName = 'banner';
        editor.ui.addButton('Banner',
            {
                label: 'Gallery',
                command: 'OpenWindow',
                icon: CKEDITOR.plugins.getPath('banner') + 'banner.png'
            });
        var cmd = editor.addCommand('OpenWindow', { exec: showMyDialog });
	}
});

function showMyDialog(e) {


var buttons = {};
buttons[tr({'var' : 'BTTN_SELECT'})] = function(){
//var type = $(dialog).find('input[name="Type"]:checked').val();
var gallery_id = $(dialog).find('select[name="GalleryID"]').val();
var banner_id = $(dialog).find('select[name="BannerID"]').val();


var html = json = '';
	if(gallery_id == '' && banner_id == '')console.log('empty');
	else {
		if(gallery_id != ''){
		json = $.toJSON({'gallery' : gallery_id, 'text' : $(dialog).find('select[name="GalleryID"] option:selected').text()});
		}
		if(banner_id != ''){
		json = $.toJSON({'banner' : banner_id, 'text' : $(dialog).find('select[name="BannerID"] option:selected').text()});
		}
	html = '<div class="banner-element">'+json+'</div>';
	e.insertHtml(html);
	}
};
var dialog_id = 'dialog-select-gallery';
var defaults = {'title' : '', 'width' : 400, 'height' : 160, 'resizable' : true, 'buttons' : buttons};
var opts = $.extend(defaults, {});
var dialog = showDialog(dialog_id,opts);

	$.ajax({
	data: {'action' : 'dialogAddMyElement'},
		success: function(out){
		$("#dialog-"+dialog_id).html(out['dialog']['text']);
		$(dialog).dialog('option', 'title', out['dialog']['title']);
		$(dialog).find('select').prop('disabled', true);
		
			$(dialog).find('input[type="radio"]').bind('click', function(){
			$(dialog).find('select').val('').prop('disabled', true);
				if($(this).val() == 'banner')$(dialog).find('select[name="BannerID"]').prop('disabled', false);
				if($(this).val() == 'gallery')$(dialog).find('select[name="GalleryID"]').prop('disabled', false);
			});
		}
	});

	
}