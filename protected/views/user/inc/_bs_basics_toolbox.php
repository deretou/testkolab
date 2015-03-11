
<div class="struc_backstore" id="bs_toolbox"><!-- toolbox -->
        
        <div class="bs_parts bs_header">
            <p class="bs_title">Toolbox</p>
            <div class="bs_subzone">
                <p class="t02 bs_subtitle bs_subtitle_active" id="bs_toolbox_1" 
                    onClick="backstore_selection('1')">Note</p>
                <p class="t02 bs_subtitle bs_subtitle_not" id="bs_toolbox_2" 
                	onClick="backstore_selection('2')">Timer</p>
                <p class="t02 bs_subtitle bs_subtitle_not" id="bs_toolbox_3" 
                	onClick="backstore_selection('3')">Player</p>
                <p class="t02 bs_subtitle bs_subtitle_not" id="bs_toolbox_4" 
                	onClick="backstore_selection('4')">Apps</p>
                    
            </div>
        </div>
        
        <div class="bs_parts bs_content">
        
            <div class="view nano" id="view_toolbox_1"><!-- VIEW------------------------------ -->
                <div class="nano-content">
                    <p class="view_title">Notepad</p>
                    <textarea id="toolbox_note"></textarea>
                    <div class="view_end"></div>
                </div>
            </div>
            <div class="view nano" id="view_toolbox_2"><!-- VIEW------------------------------ -->
                <div class="nano-content">
                    <p class="view_title">Reminder</p>
                    <div class="view_box">
                    	<div class="view_block" onClick="backstore_selectionB();">
                            <div class="t02 view_img view_bsnav b_remind"></div>
                            <p class="t01 view_text view_text_1">Call Marty</p>
                            <p class="t01 view_text view_text_2">in 45 minutes</p>
                        </div>
                        <div class="view_action view_action_manage">
                            <div class="t015 view_action_half view_action_full">Delete</div>
                        </div>
                    </div>
                    <div class="view_box">
                    	<div class="view_block" onClick="backstore_selectionB();">
                            <div class="t02 view_img view_bsnav b_remind"></div>
                            <p class="t01 view_text view_text_1">Buy printer ink</p>
                            <p class="t01 view_text view_text_2">in 2 days 3 hours 13 minutes</p>
                        </div>
                        <div class="view_action view_action_manage">
                            <div class="t015 view_action_half view_action_full">Delete</div>
                        </div>
                    </div>
                    <p class="view_title">Timer</p>
                    <div onClick="ping_visual('5')" class="view_box">
                    	<div class="view_block">
                            <div id="ping_5" class="t02 view_img view_bsnav b_ping"></div>
                            <p class="t01 view_text view_text_1 view_text_1s">Ping me in 5 minutes</p>
                        </div>
                    </div>
                    <div onClick="ping_visual('10')" class="view_box">
                    	<div class="view_block">
                            <div id="ping_10" class="t02 view_img view_bsnav b_ping"></div>
                            <p class="t01 view_text view_text_1 view_text_1s">Ping me in 10 minutes</p>
                        </div>
                    </div>
                    <div onClick="ping_visual('15')" class="view_box">
                    	<div class="view_block">
                            <div id="ping_15" class="t02 view_img view_bsnav b_ping"></div>
                            <p class="t01 view_text view_text_1 view_text_1s">Ping me in 15 minutes</p>
                        </div>
                    </div>
                    <div onClick="ping_visual('20')" class="view_box">
                    	<div class="view_block">
                            <div id="ping_20" class="t02 view_img view_bsnav b_ping"></div>
                            <p class="t01 view_text view_text_1 view_text_1s">Ping me in 20 minutes</p>
                        </div>
                    </div>
                    <div onClick="ping_visual('30')" class="view_box">
                    	<div class="view_block">
                            <div id="ping_30" class="t02 view_img view_bsnav b_ping"></div>
                            <p class="t01 view_text view_text_1 view_text_1s">Ping me in 30 minutes</p>
                        </div>
                    </div>
                    <div onClick="ping_visual('45')" class="view_box">
                    	<div class="view_block">
                            <div id="ping_45" class="t02 view_img view_bsnav b_ping"></div>
                            <p class="t01 view_text view_text_1 view_text_1s">Ping me in 45 minutes</p>
                        </div>
                    </div>
                    <div onClick="ping_visual('60')" class="view_box">
                    	<div class="view_block">
                            <div id="ping_60" class="t02 view_img view_bsnav b_ping"></div>
                            <p class="t01 view_text view_text_1 view_text_1s">Ping me in 1 hour</p>
                        </div>
                    </div>
                    <div onClick="ping_visual('120')" class="view_box">
                    	<div class="view_block">
                            <div id="ping_120" class="t02 view_img view_bsnav b_ping"></div>
                            <p class="t01 view_text view_text_1 view_text_1s">Ping me in 2 hours</p>
                        </div>
                    </div>
                    <div class="view_end"></div>
                </div>
            </div>
            
            <div class="view nano" id="view_toolbox_2B"><!-- VIEW------------------------------ -->
                <div class="nano-content">
                    <p class="view_title">Buy Printer ink</p>
                    <div class="view_space"></div>
                    
                    <p class="view_line">When</p> 
                    <p class="view_line">03/09/15 2:58 PM</p>
                    <div class="view_space"></div>
                    
                    <p class="view_line">Description</p> 
                    <p class="view_line">Get Photosmart 564 Color and 564XL Black for HP OfficeJet 4620</p>
                    
                    
                    <div class="view_end"></div>
                </div>
            </div>
            
            <div class="view nano" id="view_toolbox_3"><!-- VIEW------------------------------ -->
                <div class="nano-content">
                    <p class="view_title">Embed</p>
                    
                    <p class="view_line">YouTube</p>
                    <input id="player_youtube" class="t02 view_input input_sider input_youtube input_x vh" >
                    <div onClick="player_youtube()" class="t02 view_stripe view_sider vh" style="background-color:#E80000">Open</div>

                    <p class="view_line">Vimeo</p>
                    <input id="player_vimeo" class="t02 view_input input_sider input_vimeo input_x vh"/>
                    <div onClick="player_vimeo()" class="t02 view_stripe view_sider vh" style="background-color:#1AB7EA">Open</div>

                    <p class="view_line">Twitch</p>
                    <input id="player_twitch" class="t02 view_input input_sider input_twitch input_x vh"/>
                    <div onClick="player_twitch()" class="t02 view_stripe view_sider vh" style="background-color:#6441A5">Open</div>
                    
                    <p style="clear:both"></p>
                    
                    <p class="view_title" style="">Tutorials</p>
                    
                    <div onclick="player_vimeo('https://vimeo.com/118739987',1,1);" class="view_box">
                    	<div class="view_block">
                        	<div class="t02 view_img view_bsnav bsnav_k b_kolab"></div>
                            <p class="t01 view_text view_text_1">Getting Started</p>
                            <p class="t01 view_text view_text_2">Your first steps</p>
                        </div>
                    </div>
                    <div onclick="player_vimeo('https://vimeo.com/118739987',1,1);" class="view_box">
                    	<div class="view_block">
                        	<div class="t02 view_img view_bsnav bsnav_k b_basics"></div>
                            <p class="t01 view_text view_text_1">Basics</p>
                            <p class="t01 view_text view_text_2">The heart of kolab</p>
                        </div>
                    </div>
                    <div onclick="player_vimeo('https://vimeo.com/118739987',1,1);" class="view_box">
                    	<div class="view_block">
                        	<div class="t02 view_img view_bsnav bsnav_k b_desk"></div>
                            <p class="t01 view_text view_text_1">Interface</p>
                            <p class="t01 view_text view_text_2">Master the structure</p>
                        </div>
                    </div>
                    <div onclick="player_vimeo('https://vimeo.com/118739987',1,1);" class="view_box">
                    	<div class="view_block">
                        	<div class="t02 view_img view_bsnav bsnav_k b_locker"></div>
                            <p class="t01 view_text view_text_1">Locker</p>
                            <p class="t01 view_text view_text_2">Home of your Binder</p>
                        </div>
                    </div>
                    <div onclick="player_vimeo('https://vimeo.com/118739987',1,1);" class="view_box">
                    	<div class="view_block">
                        	<div class="t02 view_img view_bsnav bsnav_k b_user"></div>
                            <p class="t01 view_text view_text_1">Social</p>
                            <p class="t01 view_text view_text_2">Get in touch</p>
                        </div>
                    </div>
                    <div onclick="player_vimeo('https://vimeo.com/118739987',1,1);" class="view_box">
                    	<div class="view_block">
                        	<div class="t02 view_img view_bsnav bsnav_k b_kzoneed"></div>
                            <p class="t01 view_text view_text_1">KZone Editor</p>
                            <p class="t01 view_text view_text_2">Start working</p>
                        </div>
                    </div>
                    <div onclick="player_vimeo('https://vimeo.com/118739987',1,1);" class="view_box">
                    	<div class="view_block">
                        	<div class="t02 view_img view_bsnav bsnav_k b_kzoneop"></div>
                            <p class="t01 view_text view_text_1">KZone Options</p>
                            <p class="t01 view_text view_text_2">Manage your Square</p>
                        </div>
                    </div>
                    <div onclick="player_vimeo('https://vimeo.com/118739987',1,1);" class="view_box">
                    	<div class="view_block">
                        	<div class="t02 view_img view_bsnav bsnav_k b_chat"></div>
                            <p class="t01 view_text view_text_1">KZone Panel</p>
                            <p class="t01 view_text view_text_2">Communicate and work</p>
                        </div>
                    </div>
                    <div onclick="player_vimeo('https://vimeo.com/118739987',1,1);" class="view_box">
                    	<div class="view_block">
                        	<div class="t02 view_img view_bsnav bsnav_k b_toolbox"></div>
                            <p class="t01 view_text view_text_1">Toolbox</p>
                            <p class="t01 view_text view_text_2">Your new best friend</p>
                        </div>
                    </div>
                    <div onclick="player_vimeo('https://vimeo.com/118739987',1,1);" class="view_box">
                    	<div class="view_block">
                        	<div class="t02 view_img view_bsnav bsnav_k b_cog"></div>
                            <p class="t01 view_text view_text_1">Advanced</p>
                            <p class="t01 view_text view_text_2">Be in control</p>
                        </div>
                    </div>
                    <div onclick="player_vimeo('https://vimeo.com/118739987',1,1);" class="view_box">
                    	<div class="view_block">
                        	<div class="t02 view_img view_bsnav bsnav_k b_feedback"></div>
                            <p class="t01 view_text view_text_1">Feedback</p>
                            <p class="t01 view_text view_text_2">We hear you</p>
                        </div>
                    </div>
                    <div onclick="player_vimeo('https://vimeo.com/118739987',1,1);" class="view_box">
                    	<div class="view_block">
                        	<div class="t02 view_img view_bsnav bsnav_k b_help"></div>
                            <p class="t01 view_text view_text_1">Help & Support</p>
                            <p class="t01 view_text view_text_2">Learn everything</p>
                        </div>
                    </div>
                    <div onclick="player_vimeo('https://vimeo.com/118739987',1,1);" class="view_box">
                    	<div class="view_block">
                        	<div class="t02 view_img view_bsnav bsnav_k b_error"></div>
                            <p class="t01 view_text view_text_1">Troubleshooting</p>
                            <p class="t01 view_text view_text_2">Don't panic</p>
                        </div>
                    </div>
                    <div onclick="player_vimeo('https://vimeo.com/118739987',1,1);" class="view_box">
                    	<div class="view_block">
                        	<div class="t02 view_img view_bsnav bsnav_k b_forward"></div>
                            <p class="t01 view_text view_text_1">What's Next</p>
                            <p class="t01 view_text view_text_2">Just the beginning</p>
                        </div>
                    </div>
                    
                    
                    
                    <div class="view_end"></div>
                    
                </div>
            </div>
            
            <div class="view nano" id="view_toolbox_4"><!-- VIEW------------------------------ -->
                <div class="nano-content">
                    <p class="view_title">Tools</p>
                    <div onClick="app_create('calculator')" class="view_box">
                    	<div class="view_block">
                            <div class="t02 view_img" style="background-image:url(apps/calculator/img.png)"></div>
                            <p class="t01 view_text view_text_1">Calculator</p>
                            <p class="t01 view_text view_text_2">A simple semi-scientific calculator</p>
                        </div>
                    </div>
                    <div onClick="app_create('currency')" class="view_box">
                    	<div class="view_block">
                            <div class="t02 view_img" style="background-image:url(apps/currency/img.png)"></div>
                            <p class="t01 view_text view_text_1">Currency</p>
                            <p class="t01 view_text view_text_2">Easily convert worldwide currencies</p>
                        </div>
                    </div>
                    <div onClick="app_create('google')" class="view_box">
                    	<div class="view_block">
                            <div class="t02 view_img" style="background-image:url(apps/google/img.png)"></div>
                            <p class="t01 view_text view_text_1">Google Search</p>
                            <p class="t01 view_text view_text_2">Always be ready for a Google search</p>
                        </div>
                    </div>
                    <div onClick="app_create('thekolabbird')" class="view_box">
                    	<div class="view_block">
                            <div class="t02 view_img" style="background-image:url(apps/thekolabbird/img.png)"></div>
                            <p class="t01 view_text view_text_1">kolab Feed</p>
                            <p class="t01 view_text view_text_2">The official kolab Twitter feed</p>
                        </div>
                    </div>
                    <div onClick="app_create('sticky')" class="view_box">
                    	<div class="view_block">
                            <div class="t02 view_img" style="background-image:url(apps/sticky/img.png)"></div>
                            <p class="t01 view_text view_text_1">Sticky Note</p>
                            <p class="t01 view_text view_text_2">Write on the side while you work</p>
                        </div>
                    </div>
                    <div onClick="app_create('wolframalpha')" class="view_box">
                    	<div class="view_block">
                            <div class="t02 view_img" style="background-image:url(apps/wolframalpha/img.png)"></div>
                            <p class="t01 view_text view_text_1">Wolfram Alpha</p>
                            <p class="t01 view_text view_text_2">Ask any question and get answers</p>
                        </div>
                    </div>

                    <p class="view_title">Games</p>
                    <div onClick="app_create('linerider')" class="view_box">
                    	<div class="view_block">
                            <div class="t02 view_img" style="background-image:url(apps/linerider/img.png)"></div>
                            <p class="t01 view_text view_text_1">Line Rider</p>
                            <p class="t01 view_text view_text_2">Draw your track and press play</p>
                        </div>
                    </div>
                    <div onClick="app_create('targets')" class="view_box">
                    	<div class="view_block">
                            <div class="t02 view_img" style="background-image:url(apps/targets/img.png)"></div>
                            <p class="t01 view_text view_text_1">Targets</p>
                            <p class="t01 view_text view_text_2">Hit as many targets in 30 seconds</p>
                        </div>
                    </div>
                    <div onClick="app_create('tetris')" class="view_box">
                    	<div class="view_block">
                            <div class="t02 view_img" style="background-image:url(apps/tetris/img.png)"></div>
                            <p class="t01 view_text view_text_1">Tetris</p>
                            <p class="t01 view_text view_text_2">Drop the blocks and make some lines</p>
                        </div>
                    </div>
                    <div onClick="app_create('tictactoe')" class="view_box">
                    	<div class="view_block">
                            <div class="t02 view_img" style="background-image:url(apps/tictactoe/img.png)"></div>
                            <p class="t01 view_text view_text_1">Tic Tac Toe</p>
                            <p class="t01 view_text view_text_2">Get three X's in a row</p>
                        </div>
                    </div>
                    
                    <div class="view_end"></div>
                </div>
            </div>
                    
        </div>
        
        <div class="bs_parts bs_footer">
        
            <div class="action" id="action_toolbox_1">
            	<div onClick="action_back('toolbox')" class="t02 action_bt a_back"></div>
            	<div class="t02 action_bt a_delete a_tp" tip="Clear"></div>
            </div>
            <div class="action" id="action_toolbox_2">
            	<div onClick="action_back('toolbox')" class="t02 action_bt a_back"></div>
            	<div onClick="backstore_control_2('nreminder')" class="t02 action_bt a_add a_tp" tip="Add"></div>
                <div onClick="action_manage()" class="t02 action_bt a_manage a_tp" tip="Manage"></div>
            </div>
            <div class="action" id="action_toolbox_2B">
            	<div onClick="action_back('toolbox')" class="t02 action_bt a_back"></div>
            	<div onClick="backstore_control_2('delete')" class="t02 action_bt a_delete a_tp" tip="Delete"></div>
            </div>
            <div class="action" id="action_toolbox_3">
            	<div onClick="action_back('toolbox')" class="t02 action_bt a_back"></div>
                <div onClick="player_clearall();" class="t02 action_bt a_delete a_tp" tip="Clear"></div>
            </div>
            <div class="action" id="action_toolbox_4">
            	<div onClick="action_back('toolbox')" class="t02 action_bt a_back"></div>
                <div onClick="app_clearall();" class="t02 action_bt a_delete a_tp" tip="Clear"></div>
            </div>
        
        </div>
        
    </div>