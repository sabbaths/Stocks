<?php

echo "LOADING";

include_once('web_scraper.php');
include_once('database_model_stock.php');
/*
$stock_id = isset($_REQUEST['stock_id']) ? $_REQUEST['stock_id'] : null;
$stock_name = isset($_REQUEST['stock_name']) ? $_REQUEST['stock_name'] : null;
$what_price = isset($_REQUEST['what_price']) ? $_REQUEST['what_price'] : 0; */


$database = new Database();
$database->connectDB();
$stock_list_arr = $database->getStocks();

for($counter=0;$counter<=count($stock_list_arr)-1;$counter++) {
	$stock = $stock_list_arr[$counter];
	$stock_id = $stock[0];
	$stock_name = $stock[1];
	$what_price = 0;
	$what_price_perc = 1;

	$web_scrape = new NWebScraperPeso($what_price);
	$price = $web_scrape->getStockLast($stock_name);

	
	//if($price >= 0)
	$database->updateStockCurrentPrice($stock_id, $price, $what_price);

	//$web_scrape_perc = new NWebScraper($what_price_perc);
	$price_perc = $web_scrape->getStockChangePerc($stock_name);

	//if($price_perc >= 0)
	$database->updateStockCurrentPrice($stock_id, $price_perc, $what_price_perc); 

}

echo "Success";
/*
if($what_price == 0) {
	$price = $web_scrape->getStockLast($stock_name);	
	if($price >= 0)
	$database->updateStockCurrentPrice($stock_id, $price, $what_price);
	//echo $price;
} else {
	$price = $web_scrape->getStockChangePerc($stock_name);
	if($price >= 0)
	$database->updateStockCurrentPrice($stock_id, $price, $what_price);
	//echo $price;
} */


?>