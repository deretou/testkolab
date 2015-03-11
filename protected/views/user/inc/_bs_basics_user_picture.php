<p class="view_title">Picture</p>
<p class="view_line">Upload your picture with the button below. Then, use the slider to scale your image and drag your picture in the left frame to adjust.</p>

<div id="user_picture" class="image-editor">
    <input id="upload" type="file" class="cropit-image-input">
    <div id="preview" class="cropit-image-preview"></div>
    <input id="slider" type="range" class="slider cropit-image-zoom-input">
</div>       
<script>
	$(function(){
		$('.image-editor').cropit({
			imageState:{src:user_picture} //CHANGE TO ACTUAL PICTURE, NOT DEMO FROM MAIN_ENGINE. !!!LOAD THE ORIGINAL USER PHOTO AT RIGHT POSITION IF POSSIBLE
		});
	});
</script>