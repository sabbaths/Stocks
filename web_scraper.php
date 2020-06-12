<?php

class NWebScraper {
	//google api key AIzaSyBTpjkG2KgVlqsKi7Kwnp8EqaiGv77t9cw
	function getStock($stock) {
		require('simple_html_dom.php');
		
		$html = file_get_html('https://www.investagrams.com/Stock/PSE:'.$stock);
		/*
		foreach($html->find('div[class=d-inline-flex]') as $element) {

			echo $a = $element->find('span#lblStockLatestLastPrice',0);
			array_push($stock_info_arr, $a);
			 $b= $element->find('span#lblStockLatestChange',0);
			array_push($stock_info_arr, $b);
			 $c = $element->find('span#lblStockLatestChangePerc',0);
			array_push($stock_info_arr, $c);
			 $d = $element->find('small',0);
			array_push($stock_info_arr, $d);
			break;
		} */
		$a = 0;
		$c = 0;
		$a = $html->find('span#lblStockLatestLastPrice')[0];
		$c = $html->find('span#lblStockLatestChangePerc')[0];

		echo $a;
		echo $c;
		//echo $stock_info_arr[2];
		
	}

	function getStockTest($stock) {
		require('simple_html_dom.php');
		$stock_info_arr = array();
		$a = 0;
		$b = 0;
		$c = 0;
		$d = 0;


		$html = file_get_html('https://www.investagrams.com/Stock/PSE:'.$stock);

		foreach($html->find('div[class=d-inline-flex]') as $element) {

			 $a = $element->find('span#lblStockLatestLastPrice',0);
			array_push($stock_info_arr, $a);
			 $b= $element->find('span#lblStockLatestChange',0);
			array_push($stock_info_arr, $b);
			 $c = $element->find('span#lblStockLatestChangePerc',0);
			array_push($stock_info_arr, $c);
			 $d = $element->find('small',0);
			array_push($stock_info_arr, $d);
			break;
		}

		return [$a,$b,$c,$d];
	}

	function getStockLast($stock) {
		require('simple_html_dom.php');
		$stock_info_arr = array();
		$a = 0;

		$html = file_get_html('https://www.investagrams.com/Stock/PSE:'.$stock);
		/*
		foreach($html->find('div[class=d-inline-flex]') as $element) {
			$a = $element->find('span#lblStockLatestLastPrice',0);
			break;
		} */
		$a = $html->find('span#lblStockLatestLastPrice')[0];

		return $a;
		//return 4;
	}

	function getStockChangePerc($stock) {
		require('simple_html_dom.php');
		$stock_info_arr = array();
		$c = 0;

		$html = file_get_html('https://www.investagrams.com/Stock/PSE:'.$stock);
		/*
		foreach($html->find('div[class=d-inline-flex]') as $element) {
			$c = $element->find('span#lblStockLatestChangePerc',0);
			break;
		} */
		$c = $html->find('span#lblStockLatestChangePerc')[0];
		//return 5;
		return $c;
	}
}

?>

<?php

class WebScraper {
	//google api key AIzaSyBTpjkG2KgVlqsKi7Kwnp8EqaiGv77t9cw
	function getStock($stock) {
		require('simple_html_dom.php');
		$html = file_get_html('https://www.pesobility.com/stock/'.$stock);

		foreach($html->find('div[class=large-3 columns]') as $element) {
		   foreach($element->find('span') as $element_span) {
		   	echo $element_span;
		   }
		}
		echo "NONE";
	}
}

?>