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
	/*
		$stock = "AC";
		require('simple_html_dom.php');
		$stock_info_arr = array();
		$a = 0;

		$html = file_get_html('https://www.investagrams.com/Stock/PSE:'.$stock);
		foreach($html->find('span#lblStockLatestLastPrice') as $element) {
			echo $element;
		} 

		echo $html->find('span#lblStockLatestLastPrice')[0];
		echo $html->find('span#lblStockLatestChangePerc')[0];
		*/


		
		
		require('simple_html_dom.php');
		$stock = "AC";
		$html = file_get_html('https://www.pesobility.com/stock/'.$stock);
		/*
		foreach($html->find('div[class=large-3 columns]') as $element) {
		   foreach($element->find('span') as $element_span) {
		   	echo $element_span;
		   	break;
		   }
		} */
		echo $html->find('div[class=large-3 columns]')[1];
		echo $html->find('div[class=large-3 columns]')[3];
		
?>