<?php

class NWebScraper {
	//google api key AIzaSyBTpjkG2KgVlqsKi7Kwnp8EqaiGv77t9cw
	function getStock($stock) {
		try {
			require('simple_html_dom.php');
			$html = file_get_html('https://www.investagrams.com/Stock/PSE:'.$stock);

			foreach($html->find('div[class=d-inline-flex]') as $element) {
				echo $element->find('span#lblStockLatestLastPrice',0);
				echo $element->find('span#lblStockLatestChange',0);
				echo $element->find('span#lblStockLatestChangePerc',0);
				$test = $element->find('small',0);
				echo $test;
				break;
			}
		} catch(Exception $e) {
			echo "ERROR";
		}
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
	}
}

?>