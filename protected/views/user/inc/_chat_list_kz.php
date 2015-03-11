<div id="chat_list"><!-- CHAT LIST -->
    	<div id="chat_active" class="clearfix">
        	<div id="kzchat_l" onClick="chat_controlL('kzchat')" class="t01 icons chat_img kz_chat_img kz_color_bkg"></div>
            <div id="TESTIDjoe_l" status="busy" onClick="chat_controlL('TESTIDlau')" class="t01 chat_img sb_busy" style="background-image:url(<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/josee.jpg)"></div>
            <div id="TESTIDfad_l" status="online" onClick="chat_controlL('TESTIDfad')" class="t01 chat_img sb_online" style="background-image:url(<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/fadi.jpg)"></div>
            <div id="TESTIDchr_l" status="away" onClick="chat_controlL('TESTIDchr')" class="t01 chat_img sb_away" style="background-image:url(<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/chris.jpg)"></div>
            <div id="TESTIDkev_l" status="offline" onClick="chat_controlL('TESTIDkev')" class="t01 chat_img sb_offline" style="background-image:url(<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/kev.jpg)"></div>
            <div id="TESTIDcat_l" status="online" onClick="chat_controlL('TESTIDcat')" class="t01 chat_img sb_online" style="background-image:url(<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/cath.jpg)"></div>
            <div id="TESTIDjos_l" status="busy" onClick="chat_controlL('TESTIDjos')" class="t01 chat_img sb_busy" style="background-image:url(<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/josi.jpg)"></div>
            <div id="TESTIDchl_l" status="offline" onClick="chat_controlL('TESTIDchl')" class="t01 chat_img sb_offline" style="background-image:url(<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/chloe.jpg)"></div>
        </div>
    	<div id="view_chat">
        	<div id="view_chat_other">
                <p class="view_title view_chat_title">Favorites</p>
                <div class="clearfix">
                    <div id="TESTIDcar_ls" onClick="chat_controlC('TESTIDcar','Carl Caron','<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/carl.jpg')" status="offline" class="t01 chat_img sb_offline" style="background-image:url(<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/carl.jpg)"></div>
                    <div id="TESTIDcat_ls" onClick="chat_controlC('TESTIDcat','Catherine Francoeur','<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/cath.jpg')" status="online" class="t01 chat_img sb_online" style="background-image:url(<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/cath.jpg)"></div>
                    <div id="TESTIDfad_ls" onClick="chat_controlC('TESTIDfad','Fadi Atallah','<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/fadi.jpg')" status="online" class="t01 chat_img sb_online" style="background-image:url(<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/fadi.jpg)"></div>
                    <div id="TESTIDjos_ls" onClick="chat_controlC('TESTIDjos','Josianne Grondin','<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/josi.jpg')" status="busy" class="t01 chat_img sb_busy" style="background-image:url(<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/josi.jpg)"></div>
                </div>
                <p class="view_title view_chat_title" id="chat_online">Online</p>
                <p class="view_title view_chat_title" id="chat_search">Search</p>
            </div>
            <div id="view_chat_list" class="view_chat_lists nano">
            	<div class="nano-content">
                    <div id="TESTIDchr_ls" onClick="chat_controlC('TESTIDchr','Christophe Scott','<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/chris.jpg')" status="away" class="view_box chat_box">
                        <div class="t02 view_img chat_imgb sb_away" style="background-image:url(<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/chris.jpg)"></div>
                        <p class="t01 view_text view_text_1 view_text_1c">Christophe Scott</p>
                    </div>
                    <div id="TESTIDfra_ls" onClick="chat_controlC('TESTIDfra','Frank Asselin','<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/frank.jpg')" status="online" class="view_box chat_box">
                        <div class="t02 view_img chat_imgb sb_online" style="background-image:url(<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/frank.jpg)"></div>
                        <p class="t01 view_text view_text_1 view_text_1c">Frank Asselin</p>
                    </div>
                    <div id="TESTIDjoe_ls" onClick="chat_controlC('TESTIDjoe','Josephine Machalani','<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/josee.jpg')" status="online" class="view_box chat_box">
                        <div class="t02 view_img chat_imgb sb_online" style="background-image:url(<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/josee.jpg)"></div>
                        <p class="t01 view_text view_text_1 view_text_1c">Josephine Machalani</p>
                    </div>
                    <div id="TESTIDlau_ls" onClick="chat_controlC('TESTIDlau','Laurence Bettez','<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/lau.jpg')" status="busy" class="view_box chat_box">
                        <div class="t02 view_img chat_imgb sb_busy" style="background-image:url(<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/lau.jpg)"></div>
                        <p class="t01 view_text view_text_1 view_text_1c">Laurence Bettez</p>
                    </div>
                    <div id="TESTIDmel_ls" onClick="chat_controlC('TESTIDmel','Mélissa Leblanc','<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/mel.jpg')" status="busy" class="view_box chat_box">
                        <div class="t02 view_img chat_imgb sb_busy" style="background-image:url(<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/mel.jpg)"></div>
                        <p class="t01 view_text view_text_1 view_text_1c">Mélissa Leblanc</p>
                    </div>
                    <div id="TESIDmic_ls" onClick="chat_controlC('TESIDmic','Micheal Archambault','<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/micheal.jpg')" status="online" class="view_box chat_box">
                        <div class="t02 view_img chat_imgb sb_online" style="background-image:url(<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/micheal.jpg)"></div>
                        <p class="t01 view_text view_text_1 view_text_1c">Micheal Archambault</p>
                    </div>
                    <div id="TESTIDoli_ls" onClick="chat_controlC('TESTIDoli','Olivier Grondines','<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/oli.jpg')" status="online" class="view_box chat_box">
                        <div class="t02 view_img chat_imgb sb_online" style="background-image:url(<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/oli.jpg)"></div>
                        <p class="t01 view_text view_text_1 view_text_1c">Olivier Grondines</p>
                    </div>
                    <div id="TESTIDrox_ls" onClick="chat_controlC('TESTIDrox','Roxanne Dufour-Cantin','<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/rox.jpg')" status="online" class="view_box chat_box">
                        <div class="t02 view_img chat_imgb sb_online" style="background-image:url(<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/rox.jpg)"></div>
                        <p class="t01 view_text view_text_1 view_text_1c">Roxanne Dufour-Cantin</p>
                    </div>
                    
                    <div class="view_end"></div>
            	</div>
            </div>
            
            <div id="view_chat_search" class="view_chat_lists nano">
            	<div class="nano-content">
                    <div id="TESTIDnone1" status="busy" class="view_box chat_box">
                        <div class="t02 view_img chat_imgb sb_busy"></div>
                        <p class="t01 view_text view_text_1 view_text_1c">Search 1</p>
                    </div>
                    <div id="TESTIDnone2" status="busy" class="view_box chat_box">
                        <div class="t02 view_img chat_imgb sb_busy"></div>
                        <p class="t01 view_text view_text_1 view_text_1c">Search 2</p>
                    </div>
                    <div id="TESTIDnone3" status="busy" class="view_box chat_box">
                        <div class="t02 view_img chat_imgb sb_busy"></div>
                        <p class="t01 view_text view_text_1 view_text_1c">Search 3</p>
                    </div>
                    <div class="view_end"></div>
            	</div>
            </div>
            
        </div>
        <div id="chat_bottom">
        	<input type="text" class="chat_input" id="chat_list_input" />
    		<div onClick="chat_list()" class="t03 bt bt_bottom" id="bt_chat_list"></div>
        </div>
    </div>
