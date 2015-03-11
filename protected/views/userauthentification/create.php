<?php
$this->breadcrumbs=array(
	'Userauthentifications'=>array('index'),
	'Create',
);

$this->menu=array(
	array('label'=>'List Userauthentification', 'url'=>array('index')),
	array('label'=>'Manage Userauthentification', 'url'=>array('admin')),
);
?>

<h1>Create Userauthentification</h1>

<?php echo $this->renderPartial('_form', array('model'=>$model)); ?>