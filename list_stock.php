<?php
	$database = new Database();
	$database->connectDB();
	$stock_list = $database->getStocks();

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
					<a id='$stock_id' href='' class='select_stock' data_name='$stock_name' name='$stock_name'>$stock_name</a>
				</li>

			 	<li id='stock_item_last_$stock_name' class='stock_item' data_name='last'>
			 		0
			 	</li>
			 	<li id='stock_item_change_$stock_name' class='stock_item' data_name='change'>
			 		0
			 	</li>

				<li id='' class='stock_item'>
					<a id='$stock_id' href='' class='delete_stock' name='$stock_name'>DEL</a>
			 	</li>

			 	</ul>";
	}
	echo "<ul class ='stock_list_item'><li><a id='refresh_stock_list' href=''>REFRESH</a></li></ul>"
	//print_r( $database->computeStocks());
?>