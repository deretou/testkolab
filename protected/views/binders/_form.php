<div class="form">

<?php $form=$this->beginWidget('CActiveForm', array(
	'id'=>'binders-form',
	'enableAjaxValidation'=>false,
)); ?>

	<p class="note">Fields with <span class="required">*</span> are required.</p>

	<?php echo $form->errorSummary($model); ?>

	<div class="row">
		<?php echo $form->labelEx($model,'binderID'); ?>
		<?php echo $form->textField($model,'binderID'); ?>
		<?php echo $form->error($model,'binderID'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'userID'); ?>
		<?php echo $form->textField($model,'userID'); ?>
		<?php echo $form->error($model,'userID'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'name'); ?>
		<?php echo $form->textField($model,'name'); ?>
		<?php echo $form->error($model,'name'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'color'); ?>
		<?php echo $form->textField($model,'color'); ?>
		<?php echo $form->error($model,'color'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'style'); ?>
		<?php echo $form->textField($model,'style'); ?>
		<?php echo $form->error($model,'style'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'description'); ?>
		<?php echo $form->textField($model,'description'); ?>
		<?php echo $form->error($model,'description'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'creationDate'); ?>
		<?php echo $form->textField($model,'creationDate'); ?>
		<?php echo $form->error($model,'creationDate'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'lastUpdateDate'); ?>
		<?php echo $form->textField($model,'lastUpdateDate'); ?>
		<?php echo $form->error($model,'lastUpdateDate'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'squaresOrdre'); ?>
		<?php echo $form->textField($model,'squaresOrdre'); ?>
		<?php echo $form->error($model,'squaresOrdre'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'squaresList'); ?>
		<?php echo $form->textField($model,'squaresList'); ?>
		<?php echo $form->error($model,'squaresList'); ?>
	</div>

	<div class="row buttons">
		<?php echo CHtml::submitButton($model->isNewRecord ? 'Create' : 'Save'); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- form -->