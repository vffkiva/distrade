$(document).ready(function(){
	$(".lang-variable").each( function(index,value) {
		$(value).bind( 'dblclick' , function(event,item) {
	 	var var_id = $(this).attr('id');
	 	var tmp = var_id.split('-');
	 	var var_name = tmp[0];
	 	var lang = langCode;
	 	
	 	var Matches = $(this).attr('id').match(/\bMAINVAR/);
	 		if(Matches != null){
	 		tmp = var_name.split('_');
	 		lang = tmp[1];
	 		var_name = var_name.replace('MAINVAR_'+lang+'_','');
	 		//lang = Matches.input.replace('lang-variable','').replace('lang_','').replace(/\s/g, '');
	 		}
	 	
	 	
	 	dialog = showDialog(var_id,{'width' : 400, 'height' : 200, 'resizable' : true, buttons:{
	 		'Save': function(){
	 			var VarValue = $("#ActionForm_"+var_id).serialize();
					$.ajax({
					data: 'action=saveVar&VarName='+var_name+'&'+VarValue,
						success: function(data){
						$("#dialog-"+var_id).dialog('close');
						$("#"+var_id).html(data.dialog.text);
						//console.log($(this));
						//$(this).dialog('close');
			 			}
					});
	 			}
	 		}
	 		});
			$.ajax({
			data: 'action=viewVar&VarName='+var_name+'&VarID='+var_id+'&Lang='+lang,
 				success: function(out){
				$(dialog).html(out['dialog']['text']);
				$(dialog).dialog('option', 'title', out['dialog']['title']); 
			 	}
			});
		});
	}).disableSelection().css({'cursor' : 'pointer'});
});