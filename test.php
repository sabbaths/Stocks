<?php
/*
require('simple_html_dom.php');
$html = file_get_html('https://www.pesobility.com/stock/PGOLD');

foreach($html->find('div[class=large-3 columns]') as $element) {
   foreach($element->find('span') as $element_span) {
   	echo $element_span;
   }
}
*/


		require('simple_html_dom.php');
		$stock_info_arr = array();
		$a = 0;

		$html = file_get_html('https://www.investagrams.com/Stock/PSE:ALI');
		foreach($html->find('span#lblStockLatestLastPrice') as $element) {
			echo $element;
		}

		echo $html->find('span#lblStockLatestLastPrice')[0];
		echo $html->find('span#lblStockLatestChangePerc')[0];


?>