<?php

include_once('../database_model_stock.php');

$stock_id = isset($_REQUEST['stock_id']) ? $_REQUEST['stock_id'] : null;
$bias = isset($_REQUEST['bias']) ? $_REQUEST['bias'] : "";
$shares = isset($_REQUEST['shares']) ? $_REQUEST['shares'] : 0;
$entry = isset($_REQUEST['entry']) ? $_REQUEST['entry'] : 0;
$exit = isset($_REQUEST['exit']) ? $_REQUEST['exit'] : 0;
$be = isset($_REQUEST['be']) ? $_REQUEST['be'] : 0;
$p1 = isset($_REQUEST['p1']) ? $_REQUEST['p1'] : 0;
$p2 = isset($_REQUEST['p2']) ? $_REQUEST['p2'] : 0;
$p5 = isset($_REQUEST['p5']) ? $_REQUEST['p5'] : 0;
$p10 = isset($_REQUEST['p10']) ? $_REQUEST['p10'] : 0;
$alert = isset($_REQUEST['alert']) ? $_REQUEST['alert'] : 0;

$input_entry_position = isset($_REQUEST['input_entry_position']) ? $_REQUEST['input_entry_position'] : 0;
$input_exit_position = isset($_REQUEST['input_exit_position']) ? $_REQUEST['input_exit_position'] : 0;
$input_capital_position = isset($_REQUEST['input_capital_position']) ? $_REQUEST['input_capital_position'] : 0;
$input_risk_perc_position = isset($_REQUEST['input_risk_perc_position']) ? $_REQUEST['input_risk_perc_position'] : 0;
$input_risk_position = isset($_REQUEST['input_risk_position']) ? $_REQUEST['input_risk_position'] : 0;
$input_buyshares_position = isset($_REQUEST['input_buyshares_position']) ? $_REQUEST['input_buyshares_position'] : 0;


$database = new Database();
$database->connectDB();

$status_code = $database->addStockInfo(
	$stock_id,$bias,$shares,$entry,$exit,$be,$p1,$p2,$p5,$p10,$alert, $input_entry_position,
		$input_exit_position,
		$input_capital_position,
		$input_risk_perc_position,
		$input_risk_position,
		$input_buyshares_position);

$response_data = [ 'status_code' => $status_code];
echo json_encode( $status_code );

?>