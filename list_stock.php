<?php
	$database = new Database();
	$database->connectDB();
	$stock_list = $database->getStocks();
	foreach($stock_list as $stock) {
	  $stock_id = $stock[0];
	  $stock_name = $stock[1];
	  echo "<li><a id='$stock_id' href='' class='select_stock' name='$stock_name'>$stock_name</a></li>";
	}
	//print_r( $database->computeStocks());
?>