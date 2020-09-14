<?php

include_once('../database_model_stock.php');

$stock_id = isset($_REQUEST['stock_id']) ? $_REQUEST['stock_id'] : null;
$buy_sell = isset($_REQUEST['buy_sell']) ? $_REQUEST['buy_sell'] : "";
$bias = isset($_REQUEST['bias']) ? $_REQUEST['bias'] : "";
$plcalc_input_units = isset($_REQUEST['plcalc_input_units']) ? $_REQUEST['plcalc_input_units'] : 0;
$plcalc_input_entry2 = isset($_REQUEST['plcalc_input_entry2']) ? $_REQUEST['plcalc_input_entry2'] : 0;
$plcalc_input_exit = isset($_REQUEST['plcalc_input_exit']) ? $_REQUEST['plcalc_input_exit'] : 0;
$plcalc_input_pl = isset($_REQUEST['plcalc_input_pl']) ? $_REQUEST['plcalc_input_pl'] : 0;
$rd_btn_buy = isset($_REQUEST['rd_btn_buy']) ? $_REQUEST['rd_btn_buy'] : 0;
$risk_input_port = isset($_REQUEST['risk_input_port']) ? $_REQUEST['risk_input_port'] : 0;
$risk_input_risk = isset($_REQUEST['risk_input_risk']) ? $_REQUEST['risk_input_risk'] : 0;
$risk_input_entry = isset($_REQUEST['risk_input_entry']) ? $_REQUEST['risk_input_entry'] : 0;
$risk_input_exit = isset($_REQUEST['risk_input_exit']) ? $_REQUEST['risk_input_exit'] : 0;
$risk_input_units = isset($_REQUEST['risk_input_units']) ? $_REQUEST['risk_input_units'] : 0;
$risk_input_invest_amt = isset($_REQUEST['risk_input_invest_amt']) ? $_REQUEST['risk_input_invest_amt'] : 0;
$alert = isset($_REQUEST['alert']) ? $_REQUEST['alert'] : 0;

$database = new Database();
$database->connectDB();

$status_code = $database->addStockInfoUS(
	$stock_id,
	$buy_sell,
	$bias,
	$plcalc_input_units,
	$plcalc_input_entry2,
	$plcalc_input_exit,
	$plcalc_input_pl,
	$rd_btn_buy,
	$risk_input_port,
	$risk_input_risk,
	$risk_input_entry,
	$risk_input_exit,
	$risk_input_units,
	$risk_input_invest_amt,
	$alert
);

$response_data = [ 'status_code' => $status_code];
echo json_encode( $status_code );
?>