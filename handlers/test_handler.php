<?php

include_once('../web_scraper.php');

$stock_id = isset($_REQUEST['stock_id']) ? $_REQUEST['stock_id'] : null;
$stock_name = isset($_REQUEST['stock_name']) ? $_REQUEST['stock_name'] : null;
$what_price = isset($_REQUEST['what_price']) ? $_REQUEST['what_price'] : 0;

$web_scrape = new NWebScraper($what_price);
//$web_scrape->getStock("SMC");

if($what_price == 0) {
	echo $web_scrape->getStockLast($stock_name);	
} else {
	echo $web_scrape->getStockChangePerc($stock_name);	
}


?>