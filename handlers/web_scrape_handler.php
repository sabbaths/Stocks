<?php

include_once('../web_scraper.php');

$stock_id = isset($_REQUEST['stock_id']) ? $_REQUEST['stock_id'] : null;
$stock_name = isset($_REQUEST['stock_name']) ? $_REQUEST['stock_name'] : null;
$what_price = isset($_REQUEST['what_price']) ? $_REQUEST['stock_name'] : null;

$web_scrape = new NWebScraper();
//$web_scrape->getStock("SMC");

echo $web_scrape->getStock($stock_name);

?>