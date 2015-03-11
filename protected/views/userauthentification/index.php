<?php
$this->breadcrumbs=array(
	'Userauthentifications',
);

$this->menu=array(
	array('label'=>'Create Userauthentification', 'url'=>array('create')),
	array('label'=>'Manage Userauthentification', 'url'=>array('admin')),
);
?>

<h1>Userauthentifications</h1>

<?php $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); ?>