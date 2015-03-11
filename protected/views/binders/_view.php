<div class="view">

	<b><?php echo CHtml::encode($data->getAttributeLabel('binderID')); ?>:</b>
	<?php echo CHtml::link(CHtml::encode($data->binderID), array('view', 'id'=>$data->binderID)); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('userID')); ?>:</b>
	<?php echo CHtml::encode($data->userID); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('name')); ?>:</b>
	<?php echo CHtml::encode($data->name); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('color')); ?>:</b>
	<?php echo CHtml::encode($data->color); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('style')); ?>:</b>
	<?php echo CHtml::encode($data->style); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('description')); ?>:</b>
	<?php echo CHtml::encode($data->description); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('creationDate')); ?>:</b>
	<?php echo CHtml::encode($data->creationDate); ?>
	<br />

	<?php /*
	<b><?php echo CHtml::encode($data->getAttributeLabel('lastUpdateDate')); ?>:</b>
	<?php echo CHtml::encode($data->lastUpdateDate); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('squaresOrdre')); ?>:</b>
	<?php echo CHtml::encode($data->squaresOrdre); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('squaresList')); ?>:</b>
	<?php echo CHtml::encode($data->squaresList); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('_id')); ?>:</b>
	<?php echo CHtml::encode($data->_id); ?>
	<br />

	*/ ?>

</div>