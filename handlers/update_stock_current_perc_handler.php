<?php

include_once('../web_scraper.php');
include_once('../database_model_stock.php');

$stock_id = isset($_REQUEST['stock_id']) ? $_REQUEST['stock_id'] : null;
$stock_name = isset($_REQUEST['stock_name']) ? $_REQUEST['stock_name'] : null;
$what_price = isset($_REQUEST['what_price']) ? $_REQUEST['what_price'] : 0;

$web_scrape = new NWebScraper($what_price);
$database = new Database();
$database->connectDB();


if($what_price == 0) {
	$price = $web_scrape->getStockLast($stock_name);	
	$database->updateStockCurrentPrice($stock_id, $price, $what_price);
	//echo $price;
} else {
	$price = $web_scrape->getStockChangePerc($stock_name);
	$database->updateStockCurrentPrice($stock_id, $price, $what_price);
	//echo $price;
}


?>