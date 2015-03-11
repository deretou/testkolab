<p class="view_title">Profile</p>

<p class="view_line">First name</p>
<input id="user_firstname" value="<?php echo ucfirst($userInfo->firstname);?>" class="t02 view_input vh"/>

<p class="view_line">Last name</p>
<input id="user_lastname" value="<?php echo ucfirst($userInfo->lastname);?>" class="t02 view_input vh"/>

<p class="view_line view_line_dropdown">I am a</p>
<select id="user_type" class="view_input view_dropdown view_dropdown_full">
    <option value="student">Student</option>
    <option value="teacher">Teacher</option>
    <option selected value="artist">Artist</option>
    <option value="pro">Professional</option>
    <option value="home">Other</option>
</select>
<script>$('.view_dropdown').selectmenu({position:{my:'left top',at:'left bottom',collision:'flip'}});</script>
                        
<p class="view_line">About you <span class="view_linesub">(<span class="desc_count"></span>)</span></p>
<textarea id="user_desc" class="t02 view_input view_paragraph view_desc_limiter vh"><?php echo $userInfo->about;?></textarea>
<script>
    var elem = $(".desc_count");$(".view_desc_limiter").limiter(160, elem);
    $('.view_desc_limiter').focus(function(){$('.view_linesub').stop().fadeTo(140,1);});
    $('.view_desc_limiter').blur(function(){$('.view_linesub').stop().fadeTo(140,0);});
</script>

<p class="view_line">City</p>
<input id="user_location_input" class="t02 view_input view_location_input vh"/>
<div id="user_location" class="view_location"></div>

<p class="view_title">Contact</p>

<p class="view_line">Personal Email</p>
<input id="user_pemail" value="me@jaymachalani.com" class="t02 view_input vh"/>

<p class="view_line">Work Email</p>
<input id="user_wemail" value="jmachalani@nxecorporation.com" class="t02 view_input vh"/>

<p class="view_line">Other Email</p>
<input id="user_oemail" value="" class="t02 view_input vh"/>

<p class="view_line">Home Phone</p>
<input id="user_hphone" value="" class="t02 view_input vh"/>

<p class="view_line">Mobile Phone</p>
<input id="user_mphone" value="(510) 100-0100" class="t02 view_input vh"/>

<p class="view_line">Other Phone</p>
<input id="user_ophone" value="" class="t02 view_input vh"/>

<p class="view_line">Blog</p>
<input id="user_blog" value="jaymachalani.com" class="t02 view_input vh"/>

<p class="view_line">Website</p>
<input id="user_web" value="buildingkolab.com" class="t02 view_input vh"/>

<p class="view_title">Links</p>

<p class="view_line">Facebook</p>
<input id="user_facebook" value="jaymachalani" class="t02 view_input input_facebook input_x vh"/>

<p class="view_line">Google</p>
<input id="user_google" value="+JayMachalani" class="t02 view_input input_google input_x vh"/>

<p class="view_line">Twitter</p>
<input id="user_twitter" value="technofou" class="t02 view_input input_twitter input_x vh"/>

<p class="view_line">Instagram</p>
<input id="user_instagram" value="technofou" class="t02 view_input input_instagram input_x vh"/>

<p class="view_line">Skype</p>
<input id="user_skype" value="TechnoFouJM" class="t02 view_input input_skype input_x vh"/>

<p class="view_line">LinkedIn</p>
<input id="user_linkedin" value="jmachalani" class="t02 view_input input_linkedin input_x vh"/>

<p class="view_line">Tumblr</p>
<input id="user_tumblr" value="technofou" class="t02 view_input input_tumblr input_x vh"/>

<p class="view_line">YouTube</p>
<input id="user_youtube" value="technofou" class="t02 view_input input_youtube input_x vh"/>

<p class="view_line">Vimeo</p>
<input id="user_vimeo" value="technofou" class="t02 view_input input_vimeo input_x vh"/>

<p class="view_line">Vine</p>
<input id="user_vine" value="technofou" class="t02 view_input input_vine input_x vh"/>

<p class="view_line">Flickr</p>
<input id="user_flickr" value="" class="t02 view_input input_flickr input_x vh"/>

<p class="view_line">Pinterest</p>
<input id="user_pinterest" value="" class="t02 view_input input_pinterest input_x vh"/>

<p class="view_line">Soundcloud</p>
<input id="user_soundcloud" value="technofou" class="t02 view_input input_soundcloud input_x vh"/>

<p class="view_line">DeviantArt</p>
<input id="user_deviantart" value="" class="t02 view_input input_deviantart input_x vh"/>

<p class="view_line">Dribbble</p>
<input id="user_dribbble" value="" class="t02 view_input input_dribbble input_x vh"/>

<p class="view_line">Behance</p>
<input id="user_behance" value="" class="t02 view_input input_behance input_x vh"/>

<p class="view_line">Twitch</p>
<input id="user_twitch" value="TechnoFou" class="t02 view_input input_twitch input_x vh"/>

<p class="view_line">Steam</p>

<input id="user_steam" value="TechnoFou" class="t02 view_input input_steam input_x vh"/>

<p class="view_line">Xbox Live</p>
<input id="user_xbox" value="TechnoFou" class="t02 view_input input_xbox input_x vh"/> <!-- IMPORTANT, SAVE USER SPACES AS '+' SIGN -->