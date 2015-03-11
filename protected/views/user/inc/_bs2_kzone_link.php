<div id="backend_helper_kzone_link" class="backend_helper_bs2">
<p class="view_title">Link</p>
                    
<p class="view_line">Name</p>
<input id="link_name" class="t02 view_input vh"/>

<p class="view_line">Description <span class="view_linesub">(<span class="desc_count"></span>)</span></p>
<textarea id="link_desc" class="t02 view_input view_paragraph view_desc_limiter vh"></textarea>
<script>
    var elem = $(".desc_count");$(".view_desc_limiter").limiter(160, elem);
    $('.view_desc_limiter').focus(function(){$('.view_linesub').stop().fadeTo(140,1);});
    $('.view_desc_limiter').blur(function(){$('.view_linesub').stop().fadeTo(140,0);});
</script>

<p class="view_line">Hyperlink</p>
<input id="link" class="t02 view_input vh"/>

<div class="view_end"></div>
</div>