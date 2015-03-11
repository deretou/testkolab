<div class="struc_backstore kz_color_brd" id="bs_organization">
        
        <div class="bs_parts bs_header kz_color_bkg">
            <p class="bs_title">Organization</p>
            <div class="bs_subzone">
                <p class="t02 bs_subtitle bs_subtitle_active" id="bs_organization_1" 
                    onClick="backstore_selection('1')">Tasks</p>
                <p class="t02 bs_subtitle bs_subtitle_not" id="bs_organization_2" 
                    onClick="backstore_selection('2')">Schedule</p>
            </div>
        </div>
        
        <div class="bs_parts bs_content">
        
            <div class="view nano" id="view_organization_1"><!-- VIEW------------------------------ -->
                <div class="nano-content">
                    <p id="kz_assigned_title" class="view_title">Assigned</p>
                    <div id="kz_assigned">
                        <div id="task_TESTID1" class="view_box" taskstatus="a">
                            <div class="kz_block">
                                <div onClick="task_toggles('TESTID1');" class="t02 view_img kz_img kz_user1_bkg"></div>
                                <div class="t01 kz_text" onClick="backstore_selectionB();">
                                    <p class="t01 view_text view_text_1 kzt">Get front page information</p>
                                    <p class="t01 view_text view_text_2 kzt">07/09/14 10:15 PM</p>
                                </div>
                            </div>
                            <div class="view_action view_action_manage">
                                <div onClick="task_moveup('TESTID1')" class="t015 view_action_half view_action_full">Move up</div>
                                <div onClick="backstore_control_2('delete')" class="t015 view_action_half view_action_full">Delete</div>
                            </div>
                        </div>
                        <div id="task_TESTID2" class="view_box" taskstatus="a">
                            <div class="kz_block">
                                <div onClick="task_toggles('TESTID2');" class="t02 view_img kz_img kz_user2_bkg kz_userself_bkg"></div>
                                <div class="t01 kz_text" onClick="backstore_selectionB();">
                                    <p class="t01 view_text view_text_1 kzt">Ask teacher about statistics</p>
                                    <p class="t01 view_text view_text_2 kzt">05/09/14 8:21 AM</p>
                                </div>
                            </div>
                            <div class="view_action view_action_manage">
                                <div onClick="task_moveup('TESTID2')" class="t015 view_action_half view_action_full">Move up</div>
                                <div onClick="backstore_control_2('delete')" class="t015 view_action_half view_action_full">Delete</div>
                            </div>
                        </div>
                        <div id="task_TESTID3" class="view_box" taskstatus="a">
                            <div class="kz_block">
                                <div onClick="task_toggles('TESTID3');" class="t02 view_img kz_img kz_user6_bkg"></div>
                                <div class="t01 kz_text" onClick="backstore_selectionB();">
                                    <p class="t01 view_text view_text_1 kzt">Find the total percentage</p>
                                    <p class="t01 view_text view_text_2 kzt">03/09/14 2:58 PM</p>
                                </div>
                            </div>
                            <div class="view_action view_action_manage">
                                <div onClick="task_moveup('TESTID3')" class="t015 view_action_half view_action_full">Move up</div>
                                <div onClick="backstore_control_2('delete')" class="t015 view_action_half view_action_full">Delete</div>
                            </div>
                        </div>
                    </div>
                    <p id="kz_unassigned_title" class="view_title">Unassigned</p>
                    <div id="kz_unassigned">
                        <div id="task_TESTID4" class="view_box" taskstatus="u">
                            <div class="kz_block">
                                <div onClick="task_toggles('TESTID4');" class="t02 view_img kz_img"></div>
                                <div class="t01 kz_text" onClick="backstore_selectionB();">
                                    <p class="t01 view_text view_text_1 kzt">Verify with latest census</p>
                                    <p class="t01 view_text view_text_2 kzt">08/09/14 12:28 AM</p>
                                </div>
                            </div>
                            <div class="view_action view_action_manage">
                                <div onClick="backstore_control_2('delete')" class="t015 view_action_half view_action_full">Delete</div>
                            </div>
                        </div>
                    </div>
                    <p id="kz_completed_title" class="view_title">Completed</p>
                    <div id="kz_completed">
                        <div id="task_TESTID5" class="view_box" taskstatus="c">
                            <div class="kz_block">
                                <div onClick="task_toggles('TESTID5');" class="t02 view_img kz_img kzics kzi_task kz_user3_bkg"></div>
                                <div class="t01 kz_text" onClick="backstore_selectionB();">
                                    <p class="t01 view_text view_text_1 kzt">Get the idea approved</p>
                                    <p class="t01 view_text view_text_2 kzt">27/09/14 9:44 AM</p>
                                </div>
                            </div>
                            <div class="view_action view_action_manage">
                                <div onClick="backstore_control_2('delete')" class="t015 view_action_half view_action_full">Delete</div>
                            </div>
                        </div>
                    </div>
                    <div class="view_end"></div>
                </div>
            </div>
            
            <div class="view nano" id="view_organization_1B"><!-- VIEW------------------------------ -->
                <div class="nano-content">
                    
                    <p class="view_title">Name</p> 
                    <p class="view_line">Find the total percentage</p>
                    
                    <p class="view_title">Description</p> 
                    <p class="view_line">We need to know the total recent percentage (3 years window from now) of Canadian citizens that immigrated in Canada. Bonus if we can find the men and women statistics.</p>
                    
                    <p class="view_title">Date added</p> 
                    <p class="view_line">03/09/14 2:58 PM</p>
                    
                    <p class="view_title">Assigned to</p><!-- "Assigned to" OR "Completed by" --> 
                    <p class="view_line kz_view_name kz_user6_bkg">David Duclos</p>
                    
                    <p class="view_title">Added by</p> 
                    <p class="view_line kz_view_name kz_user4_bkg">Catherine Francoeur</p>
                    
                    <div class="view_bigspace"></div>
                    
                    <p class="view_title">Task ID</p> 
                    <p class="view_line">09725825673</p>
                    
                    
                    <div class="view_end"></div>
                </div>
            </div>
            
            <div class="view nano" id="view_organization_2"><!-- VIEW------------------------------ -->
                <div class="nano-content">
                    <p class="view_title">Countdown</p>
                    
                    <div class="view_count_frame">
                        <div class="view_count view_count_days">
                       		<p class="view_count_text">139d</p>
                        </div>
                        <div class="view_count">
                       		<p class="view_count_text">27m</p>
                        </div>
                        <div class="view_count">
                       		<p class="view_count_text">06s</p>
                        </div>
                    </div>

                    <div class="view_end"></div>
                </div>
            </div>
        
        </div>
        
        <div class="bs_parts bs_footer kz_color_bkg">
        
        	<div class="action" id="action_organization_1">
            	<div onClick="action_back('organization')" class="t02 action_bt a_back"></div>
            	<div onClick="backstore_control_2('addtask')" class="t02 action_bt a_add a_tp" tip="Add"></div>
                <div onClick="action_manage()" class="t02 action_bt a_manage a_tp" tip="Manage"></div>
            </div>
            <div class="action" id="action_organization_1B">
            	<div onClick="action_back('organization')" class="t02 action_bt a_back"></div>
            	<div onClick="backstore_control_2('delete')" class="t02 action_bt a_delete a_tp" tip="Delete"></div>
            </div>
            <div class="action" id="action_organization_2">
            	<div onClick="action_back('organization')" class="t02 action_bt a_back"></div>
            </div>
        
        </div>
        
    </div>