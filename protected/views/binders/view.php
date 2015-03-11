<?php
$this->breadcrumbs=array(
	'Binders'=>array('index'),
	$model->name,
);

$this->menu=array(
	array('label'=>'List Binders', 'url'=>array('index')),
	array('label'=>'Create Binders', 'url'=>array('create')),
	array('label'=>'Update Binders', 'url'=>array('update', 'id'=>$model->binderID)),
	array('label'=>'Delete Binders', 'url'=>'#', 'linkOptions'=>array('submit'=>array('delete','id'=>$model->binderID),'confirm'=>'Are you sure you want to delete this item?')),
	array('label'=>'Manage Binders', 'url'=>array('admin')),
);
?>

<h1>View Binders #<?php echo $model->binderID; ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
	'data'=>$model,
	'attributes'=>array(
		'binderID',
		'userID',
		'name',
		'color',
		'style',
		'description',
		'creationDate',
		'lastUpdateDate',
		'squaresOrdre',
		'squaresList',
		'_id',
	),
)); ?>