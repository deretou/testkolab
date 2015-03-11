<div id="backend_helper_kzone_file" class="backend_helper_bs2">
<p class="view_title">File</p>
                    
<p class="view_line">Name</p>
<input id="file_name" class="t02 view_input vh"/>

<p class="view_line">Description <span class="view_linesub">(<span class="desc_count"></span>)</span></p>
<textarea id="file_desc" class="t02 view_input view_paragraph view_desc_limiter vh"></textarea>
<script>
    var elem = $(".desc_count");$(".view_desc_limiter").limiter(160, elem);
    $('.view_desc_limiter').focus(function(){$('.view_linesub').stop().fadeTo(140,1);});
    $('.view_desc_limiter').blur(function(){$('.view_linesub').stop().fadeTo(140,0);});
  
  //-------------Fode----------
   jQuery(function ($) {
    $("#bkd-add-image").click(function () {
        $("#myfile").click();
    });
})
</script>

 <div class="t02 view_stripe vh" id="bkd-add-image">Browse</div>
  <input type="file" id="myfile" style="display:none" />
  <div class="view_end"></div>
 </div>
