<div class="struc_backstore" id="bs_notif"><!-- NOTIFICATIONS -->
    	
        <div class="bs_parts bs_header">
        	<p class="bs_title">Notifications</p>
            <div class="bs_subzone">
            	<p class="t02 bs_subtitle bs_subtitle_active" id="bs_notif_1" 
                	onClick="backstore_selection('1')">Recent</p>
                <p class="t02 bs_subtitle bs_subtitle_not" id="bs_notif_2" 
                	onClick="backstore_selection('2')">Pending</p>
            </div>
        </div>
        
        <div class="bs_parts bs_content">
        
        	<div class="view nano" id="view_notif_1"><!-- VIEW------------------------------ -->
                <div class="nano-content">
            		<p class="view_title">New</p>
                   
                    <p class="view_title">Previous</p><!-- LAST 25-->
                    
                    
                    
                    <div class="t03 bt m_more_c view_block_more"></div>
                    
                    <div class="view_end"></div>
                </div>
            </div>
            
            <div class="view nano" id="view_notif_2"><!-- VIEW------------------------------ -->
                <div class="nano-content">
            		<p class="view_title">Contacts</p>
                   
                        <p class="view_title">Squares</p>
                  
                    <p class="view_title">SquareMaster</p>
                   
                    <div class="view_end"></div>
                </div>
            </div>
        
        </div>
        
        <div class="bs_parts bs_footer">
        
        	<div class="action" id="action_notif_1">
            	<div onClick="action_back('notif')" class="t02 action_bt a_back"></div>
                <!--<div class="t02 action_bt a_open a_tp" tip="Open"></div>-->
            </div>
            <div class="action" id="action_notif_2">
            	<div onClick="action_back('notif')" class="t02 action_bt a_back"></div>
                <!--<div class="t02 action_bt a_open a_tp" tip="Open"></div>-->
            </div>
        
        </div>
    </div>