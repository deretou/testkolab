<?php /* @var $this Controller */ ?>

<?php if (Yii::app()->user->isGuest){ $this->beginContent('//layouts/loginLayout'); ?>
<div id="content">
	<?php echo $content; ?>
</div><!-- content -->
<?php $this->endContent(); 

}else{
    $this->beginContent('//layouts/kolabnxMainLayout'); ?>
<div id="content">
	<?php echo $content; ?>
</div><!-- content -->

<?php $this->endContent();}?>