<?php
	require_once('database_model_stock.php');
	$country_stock = isset($_REQUEST['country_stock']) ? $_REQUEST['country_stock'] : "PH";
	$database = new Database();
	$database->connectDB();
	$stock_list = $database->getStocks(1, 1, $country_stock);

	echo "

		<div class='pagination'>
			<a id='add_stock' class ='stock_list_item_page' href='#'>Edit</a>
			<a class ='stock_list_item_page' href='#'>1</a>
			<a class ='stock_list_item_page' href='#'>2</a>
			<a class ='stock_list_item_page' href='#'>3</a>
			<a class ='stock_list_item_page' href='#'>4</a>
			<a class ='stock_list_item_page' href='#'>5</a>
			<a class ='stock_list_item_page' href='#'>Hist</a>
		</div>	
		<input id='input_hidden' type='hidden'>
	";
	echo "<div id='stock_list_item_div'>";
	echo "<ul class ='stock_list_item'>
	  		<li class='stock_item'>
	  			CODE
	  		</li>
	  	 	<li class='stock_item'>
	  	 		LAST
	  	 	</li>
	  	 	<li class='stock_item'>
	  	 		CHNG
	  	 	</li>
	  	 	<li class='stock_item'>
	  	 		ACT
	  	 	</li>
	 	</ul>";

	foreach($stock_list as $stock) {
		$stock_id = $stock[0];
		$stock_name = $stock[1];

		echo "<ul class ='stock_list_item'>
				<li id='' class='stock_item' name='$stock_name'>
					<a id='$stock_id' href='' class='select_stock' data_name='$stock_name' data_id='$stock_id' name='$stock_name'>$stock_name</a>
				</li>

			 	<li id='stock_item_last_$stock_name' class='stock_item' data_name='last' data_id='$stock_id'>
			 		0
			 	</li>
			 	<li id='stock_item_change_$stock_name' class='stock_item' data_name='change' data_id='$stock_id'>
			 		0
			 	</li>

				<li id='' class='stock_item'>
					<a id='$stock_id' href='testestes' class='delete_stock' name='$stock_name'>DEL</a>
			 	</li>

		 	</ul>";
	} 
	echo "</div>"; 
	
	
	echo "<span class='span_test'><a id='refresh_stock_list' href=''>REFRESH</a></span>";
	echo "<span class='span_test'><a id='refresh_stock_list_update' href=''>REFRESH DB</a></span>";
	echo "<span class='span_test'><span id='time_updated'>Last Updated:</span></span>"; 
	
	//print_r( $database->computeStocks());
?>