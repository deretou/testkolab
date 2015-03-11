<div class="struc_backstore bs_binder" id="bs_npost"><!-- NEW SQUARE WINDOW -->
        
        <div class="bs_parts bs_header bs_parts_binder">
            <p class="bs_title">New</p>
            <div class="bs_subzone">
                <p class="t02 bs_subtitle bs_subtitle_active" id="bs_npost_1" 
                    onClick="backstore_selection('1')">Feedback</p>
            </div>
        </div>
        
        <div class="bs_parts bs_content">
        
            <div class="view nano" id="view_npost_1"><!-- VIEW------------------------------ -->
                <div class="nano-content">
                
                	<p class="view_title">Basic</p>
                    
                        <p class="view_line">Title <span class="view_linesub">(<span class="feedback_title_count"></span>)</span></p>
                        <textarea id="feedback_post_title" class="t02 view_input view_paragraph view_paragraph_title vh"></textarea>
                        <script>
							var elem = $(".feedback_title_count");$("#feedback_post_title").limiter(70, elem);
							$('#feedback_post_title').focus(function(){$('.view_linesub').stop().fadeTo(140,1);});
							$('#feedback_post_title').blur(function(){$('.view_linesub').stop().fadeTo(140,0);});
                        </script>
                        
                        <p class="view_line">Category</p>
                        <ol id="list_type" class="list" active="">
                          <li class="t02 list_item" value="Bug">Bugs</li>
                          <li class="t02 list_item" value="Suggestion">Suggestions</li>
                        </ol>
                        
                        <p class="view_line">Tag</p>
                        <ol id="list_tag" class="list" active="">
                          <li class="t02 list_item vh" value="Locker" color="#BFB128">Locker<span class="list_item_tag" style="background-color:#FFEC27;"></span></li>
                          <li class="t02 list_item vh" value="Social" color="#BF42BF">Social<span class="list_item_tag" style="background-color:#FF4DFF;"></span></li>
                          <li class="t02 list_item vh" value="KZone" color="#0D77BF">KZone<span class="list_item_tag" style="background-color:#0099FF;"></span></li>
                          <li class="t02 list_item vh" value="Editor" color="#0D9B0D">Editor<span class="list_item_tag" style="background-color:#00CC00;"></span></li>
                          <li class="t02 list_item vh" value="Comms" color="#7327BF">Communications<span class="list_item_tag" style="background-color:#9326FF;"></span></li>
                          <li class="t02 list_item vh" value="Interface" color="#BF470D">Interface<span class="list_item_tag" style="background-color:#FF5300;"></span></li>
                          <li class="t02 list_item vh" value="Security" color="#0F6D77">Security<span class="list_item_tag" style="background-color:#048A99;"></span></li>
                          <li class="t02 list_item vh" value="Other" color="#919B14">Other<span class="list_item_tag" style="background-color:#BDCC0B;"></span></li>
                        </ol>
                    
                    <p class="view_title">Information</p>
                        
                        <p class="view_line">Description</p>
                        <textarea id="feedback_post_description" class="t02 view_input view_message view_message_w vh"></textarea>
                    
                    
                    <div class="view_end"></div>
                </div>
            </div>            
            
        </div>
        
        <div class="bs_parts bs_footer bs_parts_binder">
        
        	<div class="action" id="action_npost_1">
            	<div onClick="action_back('npost');" class="t02 action_bt a_back"></div>
                <div onClick="feedback_done();" class="t02 action_bt a_done a_tp" tip="Done"></div>
            </div>
        
        </div>
        
    </div>