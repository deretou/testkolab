<div class="struc_backstore bs_binder" id="bs_esquare"><!-- NEW SQUARE WINDOW -->
        
        <div class="bs_parts bs_header bs_parts_binder">
            <p class="bs_title">Edit</p>
            <div class="bs_subzone">
                <p class="t02 bs_subtitle bs_subtitle_active" id="bs_esquare_1" 
                    onClick="backstore_selection('1')">Square</p>
            </div>
        </div>
        
        <div class="bs_parts bs_content">
        
            <div class="view nano" id="view_esquare_1"><!-- VIEW------------------------------ -->
                <div class="nano-content">
                
                	<p class="view_title">Basic</p>
                    
                        <p class="view_line">Name</p>
                        <input id="sq_square_name2" class="t02 view_input vh"/>
                        
                        <p class="view_line">Description <span class="view_linesub">(<span class="desc_count"></span>)</span></p>
                        <textarea id="sq_desc2" class="t02 view_input view_paragraph view_desc_limiter vh"></textarea>
                        <script>
							var elem = $(".desc_count");$(".view_desc_limiter").limiter(160, elem);
							$('.view_desc_limiter').focus(function(){$('.view_linesub').stop().fadeTo(140,1);});
							$('.view_desc_limiter').blur(function(){$('.view_linesub').stop().fadeTo(140,0);});
                        </script>
                        
                        <p class="view_line view_line_binder">Binder</p>
                        <!--div id="bselect_mat" class="t02 selectbinder" style="background-color:#00C9FF;">
                            <p class="t02 selectbinder_name">Math</p>
                            <div class="t01 selectbinder_style" style="background-image:url(<?php //echo Yii::app()->request->baseUrl; ?>/kolabNXFront/img/bstyle/num_1.png);"></div>
                        </div-->    
                    
                    <p class="view_title">Schedule</p>
                    
                        <p  class="view_line">Due date</p>
                        <input id="sq_due_date2" class="t02 view_input view_date vh" />
                        <script>$('.view_date').datepicker({showAnim:'',prevText:'',nextText:'', dateFormat: "dd/mm/yy"});</script>
    
                        <select id="sq_due_hour2" class="view_input view_dropdown view_dropdown_time">
                            <option></option>
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
                        <select id="sq_due_min2" class="view_input view_dropdown view_dropdown_time">
                            <option></option>
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
                        <select id="sq_due_period2" class="view_input view_dropdown view_dropdown_time">
                            <option></option>
                            <option>AM</option>
                            <option>PM</option>
                        </select>
                        <script>$('.view_dropdown').selectmenu({position:{my:'left top',at:'left bottom',collision:'flip'}});</script>
                    
                    <!--p class="view_title">People</p>
                    
                    <input id="sq_peoplesearch2" class="t02 view_input view_peoplesearch vh"/>
                    <div id="sq_bkdhelper_peoplesearch_tab2" class="view_peoplesearch_tab">
                    	
                    	<!--div class="view_block peoplesearch_option">
                            <div class="t02 view_img"></div>
                            <p class="t01 view_text view_text_1 view_text_1s">Result 1</p>
                        </div>
                        <div class="view_block peoplesearch_option">
                            <div class="t02 view_img"></div>
                            <p class="t01 view_text view_text_1 view_text_1s">Result 2</p>
                        </div>
                        <div class="view_block peoplesearch_option">
                            <div class="t02 view_img"></div>
                            <p class="t01 view_text view_text_1 view_text_1s">Result 3</p>
                        </div>
                    
                    </div>
                    <div id="sq_bkdhelper_peoplesearch_selected2" class="view_select"-->
                        <!--div class="view_img_select tm" tip="Catherine Francoeur" style="background-image:url(<?php //echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/cath.jpg)"><div class="t02 icons view_img_selectd"></div></div>
                        <div class="view_img_select tm" tip="Joseph Cadieux" style="background-image:url(<?php //echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/jos.jpg)"><div class="t02 icons view_img_selectd"></div></div>
                        <div class="view_img_select tm" tip="Frank Asselin" style="background-image:url(<?php //echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/frank.jpg)"><div class="t02 icons view_img_selectd"></div></div>
                        <div class="view_img_select tm" tip="Laurence Bettez" style="background-image:url(<?php //echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/lau.jpg)"><div class="t02 icons view_img_selectd"></div></div>
                        <div class="view_img_select tm" tip="Kevin Bérard" style="background-image:url(<?php //echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/kev.jpg)"><div class="t02 icons view_img_selectd"></div></div>
                        <div class="view_img_select tm" tip="Kayla Sarasin" style="background-image:url(<?php //echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/kayla.jpg)"><div class="t02 icons view_img_selectd"></div></div>
                        <div class="view_img_select tm" tip="Mathieu Sheehan" style="background-image:url(<?php //echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/mat.jpg)"><div class="t02 icons view_img_selectd"></div></div-->
                    <!--/div-->
                    
                    
                    <div class="view_end"></div>
                </div>
            </div>            
            
        </div>
        
        <div class="bs_parts bs_footer bs_parts_binder">
        
        	<div class="action" id="action_esquare_1">
            	<div onClick="action_back('esquare');" class="t02 action_bt a_back"></div>
                <div  class="t02 action_bt a_done a_tp" tip="Done"></div>
            	<div class="t02 action_bt a_delete a_tp" tip="Delete"></div>
            </div>
        
        </div>
        
    </div>