<?php
$this->breadcrumbs=array(
	'Binders',
);

$this->menu=array(
	array('label'=>'Create Binders', 'url'=>array('create')),
	array('label'=>'Manage Binders', 'url'=>array('admin')),
);
?>

<h1>Binders</h1>

<?php $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); ?>