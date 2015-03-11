<div class="struc_backstore bs_binder" id="bs_nsquare"><!-- NEW SQUARE WINDOW -->
        
        <div class="bs_parts bs_header bs_parts_binder">
            <p class="bs_title">Create</p>
            <div class="bs_subzone">
                <p class="t02 bs_subtitle bs_subtitle_active" id="bs_nsquare_1" 
                    onClick="backstore_selection('1')">Square</p>
            </div>
        </div>
        
        <div class="bs_parts bs_content">
        
            <div class="view nano" id="view_nsquare_1"><!-- VIEW------------------------------ -->
                <div class="nano-content">
                
                	<p class="view_title">Basic</p>
                    
                        <p class="view_line">Name</p>
                        <input id="sq_square_name" class="t02 view_input vh"/>
                        
                        <p class="view_line">Description <span class="view_linesub">(<span class="desc_count"></span>)</span></p>
                        <textarea id="sq_desc" class="t02 view_input view_paragraph view_desc_limiter vh"></textarea>
                        <script>
							var elem = $(".desc_count");$(".view_desc_limiter").limiter(160, elem);
							$('.view_desc_limiter').focus(function(){$('.view_linesub').stop().fadeTo(140,1);});
							$('.view_desc_limiter').blur(function(){$('.view_linesub').stop().fadeTo(140,0);});
                        </script>
                    
                    <p class="view_title">Schedule</p>
                    
                        <p class="view_line">Due date</p>
                        <input id="sq_due_date" class="t02 view_input view_date vh" />
                        <script>$('.view_date').datepicker({showAnim:'',prevText:'',nextText:'', dateFormat: "dd/mm/yy"});</script>
    
                        <select id="sq_due_hour"  class="view_input view_dropdown view_dropdown_time">
                            <option selected="selected"></option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                            <option>11</option>
                            <option>12</option>
                        </select>
                        <select id="sq_due_min"  class="view_input view_dropdown view_dropdown_time">
                            <option ></option>
                            <option>00</option>
                            <option>05</option>
                            <option>10</option>
                            <option>15</option>
                            <option>20</option>
                            <option>25</option>
                            <option>30</option>
                            <option>35</option>
                            <option>40</option>
                            <option>45</option>
                            <option>50</option>
                            <option>55</option>
                        </select>
                        <select id="sq_due_period" class="view_input view_dropdown view_dropdown_time">
                            <option></option>
                            <option>AM</option>
                            <option>PM</option>
                        </select>
                        <script>$('.view_dropdown').selectmenu({position:{my:'left top',at:'left bottom',collision:'flip'}});</script>
                    
                    <p class="view_title">People</p>
                    
                    <input id="sq_peoplesearch"  class="t02 view_input view_peoplesearch vh"/>
                    <div id="sq_bkdhelper_peoplesearch_tab" class="view_peoplesearch_tab">
                    	
                    	
                    
                        </div>
                    <div id="sq_bkdhelper_peoplesearch_selected" class="view_select">
                    
                    </div>             
                    
                    
                    <div class="view_end"></div>
                </div>
            </div>            
            
        </div>
        
        <div class="bs_parts bs_footer bs_parts_binder">
        
        	<div class="action" id="action_nsquare_1">
            	<div onClick="action_back('nsquare');" class="t02 action_bt a_back"></div>
                <div  class="t02 action_bt a_done a_tp" tip="Done"></div>
            </div>
        
        </div>
        
    </div>