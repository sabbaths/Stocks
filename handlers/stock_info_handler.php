<?php

include_once('../database_model_stock.php');

$stock_id = isset($_REQUEST['stock_id']) ? $_REQUEST['stock_id'] : null;
$country_stock = isset($_REQUEST['country_stock']) ? $_REQUEST['country_stock'] : "PH";

$database = new Database();
$database->connectDB();
$status_code = 0;

if($country_stock == "PH") {
	$status_code = $database->getStockInfo($stock_id);
} else {
	$status_code = $database->getStockInfoUS($stock_id);
}

$response_data = [ 'status_code' => $status_code];
echo json_encode( $status_code );

?>