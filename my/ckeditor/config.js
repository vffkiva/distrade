/*
Copyright (c) 2003-2011, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

CKEDITOR.editorConfig = function( config )
{
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';


   config.filebrowserBrowseUrl = '/my/kcfinder/browse.php?type=files';
   config.filebrowserImageBrowseUrl = '/my/kcfinder/browse.php?type=images';
   config.filebrowserFlashBrowseUrl = '/my/kcfinder/browse.php?type=flash';
   config.filebrowserUploadUrl = '/my/kcfinder/upload.php?type=files';
   config.filebrowserImageUploadUrl = '/my/kcfinder/upload.php?type=images';
   config.filebrowserFlashUploadUrl = '/my/kcfinder/upload.php?type=flash';
};
