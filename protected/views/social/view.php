<?php
$this->breadcrumbs=array(
	'Socials'=>array('index'),
	$model->id,
);

$this->menu=array(
	array('label'=>'List Social', 'url'=>array('index')),
	array('label'=>'Create Social', 'url'=>array('create')),
	array('label'=>'Update Social', 'url'=>array('update', 'id'=>$model->id)),
	array('label'=>'Delete Social', 'url'=>'#', 'linkOptions'=>array('submit'=>array('delete','id'=>$model->id),'confirm'=>'Are you sure you want to delete this item?')),
	array('label'=>'Manage Social', 'url'=>array('admin')),
);
?>

<h1>View Social #<?php echo $model->id; ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
	'data'=>$model,
	'attributes'=>array(
		'id',
		'_id',
	),
)); ?>