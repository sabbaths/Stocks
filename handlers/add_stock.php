<?php

include_once('../database_model_stock.php');

$stock_name = isset($_REQUEST['stock_name']) ? $_REQUEST['stock_name'] : null;
$stock_text = isset($_REQUEST['stock_text']) ? $_REQUEST['stock_text'] : "";


$database = new Database();
$database->connectDB();

$status_code = $database->addStock("", $stock_name, $stock_text);

$response_data = [ 'status_code' => $status_code];
echo json_encode( $status_code );

?>