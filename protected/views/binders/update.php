<?php
$this->breadcrumbs=array(
	'Binders'=>array('index'),
	$model->name=>array('view','id'=>$model->binderID),
	'Update',
);

$this->menu=array(
	array('label'=>'List Binders', 'url'=>array('index')),
	array('label'=>'Create Binders', 'url'=>array('create')),
	array('label'=>'View Binders', 'url'=>array('view', 'id'=>$model->binderID)),
	array('label'=>'Manage Binders', 'url'=>array('admin')),
);
?>

<h1>Update Binders <?php echo $model->binderID; ?></h1>

<?php echo $this->renderPartial('_form', array('model'=>$model)); ?>