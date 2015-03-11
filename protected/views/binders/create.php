<?php
$this->breadcrumbs=array(
	'Binders'=>array('index'),
	'Create',
);

$this->menu=array(
	array('label'=>'List Binders', 'url'=>array('index')),
	array('label'=>'Manage Binders', 'url'=>array('admin')),
);
?>

<h1>Create Binders</h1>

<?php echo $this->renderPartial('_form', array('model'=>$model)); ?>