<?php
	$database = new Database();
	$database->connectDB();
	$stock_list = $database->getStocks();

	echo "

		<div class='pagination'>
		  <a class ='stock_list_item_page' href='#'>1</a>
		  <a class ='stock_list_item_page' href='#'>2</a>
		  <a class ='stock_list_item_page' href='#'>3</a>
		  <a class ='stock_list_item_page' href='#'>4</a>
		  <a class ='stock_list_item_page' href='#'>5</a>
		</div>	
		<input id='input_hidden' type='hidden'>
	";

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
					<a id='$stock_id' href='' class='delete_stock' name='$stock_name'>DEL</a>
			 	</li>

		 	</ul>";
	}
	echo "</br><h7><a id='refresh_stock_list' href=''>REFRESH</a></h7></br>";
	echo "<h7><a id='refresh_stock_list_update' href=''>REFRESH DB</a></h7></br>";
	echo "<h7><span id='time_updated'>Last Updated:</span></h7>";
	//print_r( $database->computeStocks());
?>