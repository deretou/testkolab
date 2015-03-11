<div class="struc_backstore bs_binder" id="bs_ebinder"><!-- NEW BINDER WINDOW -->
        
        <div class="bs_parts bs_header bs_parts_binder">
            <p class="bs_title">Edit</p>
            <div class="bs_subzone">
                <p class="t02 bs_subtitle bs_subtitle_active" id="bs_ebinder_1" 
                    onClick="backstore_selection('1')">Binder</p>
            </div>
        </div>
        
        <div class="bs_parts bs_content">
        
            <div class="view nano" id="view_ebinder_1"><!-- VIEW------------------------------ -->
                <div class="nano-content">
                
                	<p class="view_title">Basic</p>
                    
                        <p class="view_line">Name</p>
                        <input id="bn_binder_name2" class="t02 view_input vh"/>
                        <script>
							$("#bn_binder_name2").bind("keyup paste", function(){if(parseInt($('#b_designer_side').css('left'))<0){$('#b_designer_side').css('left','0px')};
                                                            $("#b_designer_name").text($(this).val());
                                                             if($(this).val().length==2){
                                                              $(this).val($(this).val().replace(/^[a-z]/, function(m){return m.toUpperCase()}));     
                                                            }
                                                              });
						</script>
                        
                        <p class="view_line">Description <span class="view_linesub">(<span id="bn_desc_count2"></span>)</span></p>
                        <textarea id="bn_desc2" class="t02 view_input view_paragraph vh"></textarea>
                        <script>
							var elem = $("#bn_desc_count2");$("#bn_desc2").limiter(160, elem);
							$('#bn_desc2').focus(function(){$('.view_linesub').stop().fadeTo(140,1);});
							$('#bn_desc2').blur(function(){$('.view_linesub').stop().fadeTo(140,0);});
                        </script>
                        
                        <p class="view_title">Design</p>
                        
                        	<p class="view_line">Color</p>
                            
                            <div class="view_select view_select_b" id="color_zone_limit_bkd2">
                                <div class="view_img_select" id="b_D93E3E" onClick="backstore_binder_color('D93E3E')" style="background-color:#D93E3E"><div class="t02 view_img_selectd view_binder_select b_sel"></div></div>
                                <div class="view_img_select" id="b_00C9FF" onClick="backstore_binder_color('00C9FF')" style="background-color:#00C9FF"><div class="t02 view_img_selectd view_binder_select b_sel"></div></div>
                                <div class="view_img_select" id="b_61DC1F" onClick="backstore_binder_color('61DC1F')" style="background-color:#61DC1F"><div class="t02 view_img_selectd view_binder_select b_sel"></div></div>
                                <div class="view_img_select" id="b_FFC617" onClick="backstore_binder_color('FFC617')" style="background-color:#FFC617"><div class="t02 view_img_selectd view_binder_select b_sel"></div></div>
                                <div class="view_img_select" id="b_C926FF" onClick="backstore_binder_color('C926FF')" style="background-color:#C926FF"><div class="t02 view_img_selectd view_binder_select b_sel"></div></div>
                                <div class="view_img_select" id="b_FF9326" onClick="backstore_binder_color('FF9326')" style="background-color:#FF9326"><div class="t02 view_img_selectd view_binder_select b_sel"></div></div>
                                <div class="view_img_select" id="b_00D9A3" onClick="backstore_binder_color('00D9A3')" style="background-color:#00D9A3"><div class="t02 view_img_selectd view_binder_select b_sel"></div></div>
                                <div class="view_img_select" id="b_7396FF" onClick="backstore_binder_color('7396FF')" style="background-color:#7396FF"><div class="t02 view_img_selectd view_binder_select b_sel"></div></div>
                                <div class="view_img_select" id="b_F863E1" onClick="backstore_binder_color('F863E1')" style="background-color:#F863E1"><div class="t02 view_img_selectd view_binder_select b_sel"></div></div>
                                <div class="t02 icons view_img_select view_binder_more" id="backend_helper_bcolor2"></div>
                    		</div>
                            
                            <p class="view_line">Style</p>
                            
                            <div class="view_select view_select_b color_b2" id="style_zone_limit_bkd2">
                                <div class="view_img_select style_select s_sel" id="b_typ_1" onClick="backstore_binder_style('typ_1')" style="background-image:url(http://az735234.vo.msecnd.net/kolabnxfront/img/bstyle/typ_1.png)"><div class="t02 view_img_selectd view_binder_select style_selectd s_selm"></div></div>
                                <div class="view_img_select style_select s_sel" id="b_num_1" onClick="backstore_binder_style('num_1')" style="background-image:url(http://az735234.vo.msecnd.net/kolabnxfront/img/bstyle/num_1.png)"><div class="t02 view_img_selectd view_binder_select style_selectd s_selm"></div></div>
                                <div class="view_img_select style_select s_sel" id="b_sci_1" onClick="backstore_binder_style('sci_1')" style="background-image:url(http://az735234.vo.msecnd.net/kolabnxfront/img/bstyle/sci_1.png)"><div class="t02 view_img_selectd view_binder_select style_selectd s_selm"></div></div>
                                <div class="view_img_select style_select s_sel" id="b_civ_1" onClick="backstore_binder_style('civ_1')" style="background-image:url(http://az735234.vo.msecnd.net/kolabnxfront/img/bstyle/civ_1.png)"><div class="t02 view_img_selectd view_binder_select style_selectd s_selm"></div></div>
                                <div class="view_img_select style_select s_sel" id="b_int_1" onClick="backstore_binder_style('int_1')" style="background-image:url(http://az735234.vo.msecnd.net/kolabnxfront/img/bstyle/int_1.png)"><div class="t02 view_img_selectd view_binder_select style_selectd s_selm"></div></div>
                                <div class="view_img_select style_select s_sel" id="b_act_1" onClick="backstore_binder_style('act_1')" style="background-image:url(http://az735234.vo.msecnd.net/kolabnxfront/img/bstyle/act_1.png)"><div class="t02 view_img_selectd view_binder_select style_selectd s_selm"></div></div>
                                <div class="view_img_select style_select s_sel" id="b_tec_1" onClick="backstore_binder_style('tec_1')" style="background-image:url(http://az735234.vo.msecnd.net/kolabnxfront/img/bstyle/tec_1.png)"><div class="t02 view_img_selectd view_binder_select style_selectd s_selm"></div></div>
                                <div class="view_img_select style_select s_sel" id="b_gra_1" onClick="backstore_binder_style('gra_1')" style="background-image:url(http://az735234.vo.msecnd.net/kolabnxfront/img/bstyle/gra_1.png)"><div class="t02 view_img_selectd view_binder_select style_selectd s_selm"></div></div>
                                <div class="view_img_select style_select s_sel" id="b_bas_1" onClick="backstore_binder_style('bas_1')" style="background-image:url(http://az735234.vo.msecnd.net/kolabnxfront/img/bstyle/bas_1.png)"><div class="t02 view_img_selectd view_binder_select style_selectd s_selm"></div></div>
                                <div class="t02 icons view_img_select view_binder_more" id="backend_helper_bstyle2"></div>
                    		</div>                	
                    
                    
                    <div class="view_end"></div>
                </div>
            </div>            
            
        </div>
        
        <div class="bs_parts bs_footer bs_parts_binder">
        
        	<div class="action" id="action_ebinder_1">
            	<div onClick="action_back('ebinder');binder_designer();" class="t02 action_bt a_back"></div>
                <div  class="t02 action_bt a_done a_tp" tip="Done"></div>
            	<div class="t02 action_bt a_delete a_tp" tip="Delete"></div>
            </div>
        
        </div>
        
    </div>