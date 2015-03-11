
  
<?php if(isset($id) && !is_null($id)){
  $model=User::model()->findByPk(Yii::app()->session[Yii::app()->session['userid'].'_user']);   
?>
<script type="text/javascript">//current="social";
    $(this).empty();
</script>
<script>
	var imageUser=user_picture.split('_v94');

	social[user_id] = {
		name:user_fullname,
		picture: imageUser[0]+'_v614',
                type:"<?php if($model->gender=='professional'){echo 'pro';}else{echo $model->gender;} ?>",
		description:"<?php echo  ucfirst($model->about); ?>",
		location:"<?php echo $model->city; ?>",
		facebook:"jaymachalani",google:"+JayMachalani",twitter:"technofou",instagram:"technofou",skype:"TechnoFouJM",linkedin:"jmachalani",tumblr:"technofou",youtube:"technofou",vimeo:"technofou",vine:"technofou",flickr:"",pinterest:"",soundcloud:"technofou",deviantart:"",dribbble:"",behance:"",twitch:"TechnoFou",steam:"TechnoFou",xbox:"TechnoFou"							
	}
	
</script>

<div id="cover" class="cover_social">
	<div id="cover_picture"></div>
	
	<div id="cover_info" class="cover_info_social">
		<p id="cover_name" class="cover_name_social"></p>
		<p id="cover_description" class="cover_description_social"></p>
	</div>
	
	<div id="cover_nav" class="cover_nav_social">
		<p onClick="content_control(null,'1')" class="t025 cover_nav_bt">About</p>
		<p onClick="content_control(null,'2')" class="t025 cover_nav_bt">People</p>
		<p onClick="content_control(null,'3')" class="t025 cover_nav_bt">Shouts</p>
		
	</div>
	
	<div id="cover_icons">
	</div>
</div>

<div id="content" class="nano">
<div class="nano-content">

	<div id="<?php echo Yii::app()->session['userid']; ?>_content" class="content_view">
		<div id="<?php echo Yii::app()->session['userid']; ?>_c1" class="content_select">
			<p class="content_title">About me</p>
			
			<div class="content_location"></div>
			
			<div class="content_strip content_strip_info">
			
				<p class="content_sub">City</p>
				<p class="content_info"><?php echo $model->city; ?></p>

				<p class="content_sub">Personal Email</p>
				<p class="content_info"><a href="mailto:me@jaymachalani.com"><?php echo $model->email; ?></a></p>
				
				<p class="content_sub">Work Email</p>
				<p class="content_info"><a href="mailto:jmachalani@nxecorporation.com"><?php echo $model->email; ?></a></p>
				
				<p class="content_sub">Mobile Phone</p>
				<p class="content_info">(510) 100-0100</p>
				
				<p class="content_sub">Blog</p>
				<p class="content_info"><a href="jaymachalani.com" target="_blank"></a></p>
				
				<p class="content_sub">Website</p>
				<p class="content_info"><a href="buildingkolab.com" target="_blank"></a></p>                
			</div>
		
		</div>
		<div id="<?php echo Yii::app()->session['userid']; ?>_c2" class="content_select">
			<p class="content_title">Favorites</p>
			
			<div class="content_strip">
				<div onClick="person_select('TESTIDcat');" class="t025 person">
					<div class="t015 person_img get" style="background-image:url(<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/cath.jpg)"></div>
					<p class="t015 person_name">Catherine Francoeur</p>
				</div>
				<div class="t025 person">
					<div class="t015 person_img get" style="background-image:url(<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/chloe.jpg)"></div>
					<p class="t015 person_name">Chloé King</p>
				</div>
				<div onClick="person_select('TESTIDkev');" class="t025 person">
					<div class="t015 person_img get" style="background-image:url(<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/kev.jpg)"></div>
					<p class="t015 person_name">Kevin Bérard</p>
				</div>
				<div class="t025 person">
					<div class="t015 person_img get" style="background-image:url(<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/josi.jpg)"></div>
					<p class="t015 person_name">Josianne Grondin</p>
				</div>
			</div>
			
			<p class="content_title">All</p>
			
			<div class="content_strip">
				<div class="t025 person">
					<div class="t015 person_img get" style="background-image:url(<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/alexe.jpg)"></div>
					<p class="t015 person_name">Alexandra Machalani</p>
				</div>
				<div class="t025 person">
					<div class="t015 person_img get" style="background-image:url(<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/c3po.jpg)"></div>
					<p class="t015 person_name">C-3PO de Robot</p>
				</div>
				<div class="t025 person">
					<div class="t015 person_img get" style="background-image:url(<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/captain.jpg)"></div>
					<p class="t015 person_name">Captain America</p>
				</div>
				<div class="t025 person">
					<div class="t015 person_img get" style="background-image:url(<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/cat.jpg)"></div>
					<p class="t015 person_name">Catwoman Miaw</p>
				</div>
				<div onClick="person_select('TESTIDcat');" class="t025 person">
					<div class="t015 person_img get" style="background-image:url(<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/cath.jpg)"></div>
					<p class="t015 person_name">Catherine Francoeur</p>
				</div>
				<div class="t025 person">
					<div class="t015 person_img get" style="background-image:url(<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/chloe.jpg)"></div>
					<p class="t015 person_name">Chloé King</p>
				</div>
				<div class="t025 person">
					<div class="t015 person_img get" style="background-image:url(<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/chris.jpg)"></div>
					<p class="t015 person_name">Christopher Scott</p>
				</div>
				<div class="t025 person">
					<div class="t015 person_img get" style="background-image:url(<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/clark.jpg)"></div>
					<p class="t015 person_name">Clark Kent</p>
				</div>
				<div class="t025 person">
					<div class="t015 person_img get" style="background-image:url(<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/david.jpg)"></div>
					<p class="t015 person_name">David Duclos</p>
				</div>
				<div class="t025 person">
					<div class="t015 person_img get" style="background-image:url(<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/fadi.jpg)"></div>
					<p class="t015 person_name">Fadi Atallah</p>
				</div>
				<div class="t025 person">
					<div class="t015 person_img get" style="background-image:url(<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/franc.jpg)"></div>
					<p class="t015 person_name">Francis Laparé</p>
				</div>
				<div class="t025 person">
					<div class="t015 person_img get" style="background-image:url(<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/frank.jpg)"></div>
					<p class="t015 person_name">Frank Asselin</p>
				</div>
				<div class="t025 person">
					<div class="t015 person_img get" style="background-image:url(<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/gab.jpg)"></div>
					<p class="t015 person_name">Gabriel Jetté Renaud</p>
				</div>
				<div onClick="person_select('TESTIDjoe');" class="t025 person">
					<div class="t015 person_img get" style="background-image:url(<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/josee.jpg)"></div>
					<p class="t015 person_name">Josephine Machalani</p>
				</div>
				<div class="t025 person">
					<div class="t015 person_img get" style="background-image:url(<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/josi.jpg)"></div>
					<p class="t015 person_name">Josianne Grondin</p>
				</div>
				<div class="t025 person">
					<div class="t015 person_img get" style="background-image:url(<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/kad.jpg)"></div>
					<p class="t015 person_name">Kadeaus Couloute</p>
				</div>
				<div onClick="person_select('TESTIDkev');" class="t025 person">
					<div class="t015 person_img get" style="background-image:url(<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/kev.jpg)"></div>
					<p class="t015 person_name">Kevin Bérard</p>
				</div>
				<div class="t025 person">
					<div class="t015 person_img get" style="background-image:url(<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/lau.jpg)"></div>
					<p class="t015 person_name">Laurence Bettez</p>
				</div>
				<div class="t025 person">
					<div class="t015 person_img get" style="background-image:url(<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/mel.jpg)"></div>
					<p class="t015 person_name">Melissa Leblanc</p>
				</div>
				<div class="t025 person">
					<div class="t015 person_img get" style="background-image:url(<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/micheal.jpg)"></div>
					<p class="t015 person_name">Micheal	Archambault</p>
				</div>
				<div class="t025 person">
					<div class="t015 person_img get" style="background-image:url(<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/oli.jpg)"></div>
					<p class="t015 person_name">Olivier Grondines</p>
				</div>
				<div class="t025 person">
					<div class="t015 person_img get" style="background-image:url(<?php echo Yii::app()->request->baseUrl; ?>/kolabNXFront/test/rox.jpg)"></div>
					<p class="t015 person_name">Roxanne Dufour-Cantin</p>
				</div>
			</div>
		</div>
			
		<div id="<?php echo Yii::app()->session['userid']; ?>_c3" class="content_select">
			<p class="content_title">Recent</p>
				
		</div>
	</div>
		
										

</div>
</div>
<?php
}else{
    echo '';  
    
}
 //echo '<script type="text/javascript" >console.log(\'pret\');  setTimeout(function(){$(document).trigger(\'socialpartialisready\') },200); </script>';
