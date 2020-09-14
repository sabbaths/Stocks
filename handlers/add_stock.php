<?php

include_once('../database_model_stock.php');

$stock_name = isset($_REQUEST['stock_name']) ? $_REQUEST['stock_name'] : null;
$stock_text = isset($_REQUEST['stock_text']) ? $_REQUEST['stock_text'] : "";
$page_id = isset($_REQUEST['page_id']) ? $_REQUEST['page_id'] : "";
$user_id = isset($_REQUEST['user_id']) ? $_REQUEST['user_id'] : "";
$country_stock = isset($_REQUEST['country_stock']) ? $_REQUEST['country_stock'] : "";

$database = new Database();
$database->connectDB();

$status_code = $database->addStock($user_id, $stock_name, $stock_text, $page_id, $country_stock);

$response_data = [ 'status_code' => $status_code[0], 
	'stock_id' => $status_code[1]];

echo json_encode($response_data);

?>