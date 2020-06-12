<?php

include_once('../database_model_stock.php');

$stock_id = isset($_REQUEST['stock_id']) ? $_REQUEST['stock_id'] : null;
$alert_price = isset($_REQUEST['alert_price']) ? $_REQUEST['alert_price'] : null;

$database = new Database();
$database->connectDB();

$status_code = $database->saveAlertPrice(
	$stock_id, $alert_price);

$response_data = [ 'status_code' => $status_code];
echo json_encode( $status_code );

?>