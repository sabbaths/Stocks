<?php

include_once('../database_model_stock.php');

$user_id = isset($_REQUEST['user_id']) ? $_REQUEST['user_id'] : null;
$page_id = isset($_REQUEST['page_id']) ? $_REQUEST['page_id'] : "";


$database = new Database();
$database->connectDB();

//$status_code = $database->addStock("", $stock_name, $stock_text);

$stock_list = $database->getStocks($user_id, $page_id);

//$response_data = [ 'status_code' => $status_code];
echo json_encode( $stock_list );

?>