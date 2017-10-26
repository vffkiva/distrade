$(function() {
var type_blocks = $("div[id^='type-id-']");
var menu_blocks = $("div[id^='menu-id-']");

	$(type_blocks).each(function () {
	var type_id = $(this).attr('id');
		$(this).bind('click', function(event) {
		$(type_blocks).removeClass('permission-active');
		$(this).addClass('permission-active');
		setActiveMenu(type_id);
		});
	})

	$(menu_blocks).each(function () {
	var menu_id = $(this).attr('id');
	var selectable = $(this).children('div').html();
		if(selectable == '1'){
			$(this).bind('click', function(event) {
			 	//if($(type_blocks).hasClass('permission-active') == false)console.log('select type');
			 	//else {
					if(menu_id == 'menu-id-all' || menu_id == 'menu-id-none'){
					$(menu_blocks).removeClass('permission-active');
					 	if($(this).hasClass('permission-active') == false)$(this).addClass('permission-active');
					}
					else {
					$('#menu-id-all, #menu-id-none').removeClass('permission-active');	
						if($(this).hasClass('permission-active') == false)$(this).addClass('permission-active');
						else $(this).removeClass('permission-active');
					}
				//}
			});
			$(this).bind('mouseover', function(event) {
				if($(this).hasClass('permission-over') == false)$(this).addClass('permission-over');
			});
			$(this).bind('mouseout', function(event) {
			$(this).removeClass('permission-over');
			});
		}
	})

});



function setActiveMenu(type_id){
delimiter = '|';
var menu_blocks = $("div[id^='menu-id-']");
$(menu_blocks).removeClass('permission-active');

permission = $('#'+type_id).children('div').html().split(delimiter);
total = permission.length;

  for(i=0;i<total;i++){
  menu_block = $('#menu-id-'+permission[i]);
  
   if($(menu_block).length > 0){
   selectable = $(menu_block).children('div').html();
    if(selectable == '1')$(menu_block).addClass('permission-active');
   }
  }
}


function savePermissions(){
var delimiter = '|';
var type_block = $("div[id^='type-id-'][class~='permission-active']");
var type_id = (( $(type_block).length > 0 ) ? $(type_block).attr('id').replace('type-id-','') : '');
var menu_blocks = $("div[id^='menu-id-'][class~='permission-active']")
var permission = '';
var i = 0;
var length = $(menu_blocks).length;

	$(menu_blocks).each(function () {
	permission += $(this).attr('id').replace('menu-id-','') + ((i < length - 1) ? delimiter : '');
	i++;
	});

	$.ajax({
	data: 'action=actionSavePermissions&TypeID='+type_id+'&Permission='+permission+'&delimiter='+delimiter,
	dataType: 'json',
		success: function(out){
			if(out['message']['text'] != '')actionShowMessage(out['message']);
			if(out['message']['type'] != 'error' ){
			$(type_block).children('div').html(permission);
			}
		}
	});




}