<p class="view_title">Reminder</p>
                    
<p class="view_line">Name</p>
<input id="file_name" class="t02 view_input vh"/>

<p class="view_line">When</p>
<input class="t02 view_input view_date vh" />
<script>$('.view_date').datepicker({showAnim:'',prevText:'',nextText:''});</script>

<select class="view_input view_dropdown view_dropdown_time">
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
<select class="view_input view_dropdown view_dropdown_time">
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
<select class="view_input view_dropdown view_dropdown_time">
    <option></option>
    <option>AM</option>
    <option>PM</option>
</select>
<script>$('.view_dropdown').selectmenu({position:{my:'left top',at:'left bottom',collision:'flip'}});</script>

<p class="view_line">Description</p>
<textarea id="task_desc" class="t02 view_input view_paragraph view_message_w vh"></textarea>
 
<div class="view_end"></div>