<?php
$this->breadcrumbs=array(
	'Userauthentifications'=>array('index'),
	$model->userID=>array('view','id'=>$model->userID),
	'Update',
);

$this->menu=array(
	array('label'=>'List Userauthentification', 'url'=>array('index')),
	array('label'=>'Create Userauthentification', 'url'=>array('create')),
	array('label'=>'View Userauthentification', 'url'=>array('view', 'id'=>$model->userID)),
	array('label'=>'Manage Userauthentification', 'url'=>array('admin')),
);
?>

<h1>Update Userauthentification <?php echo $model->userID; ?></h1>

<?php echo $this->renderPartial('_form', array('model'=>$model)); ?>