<!DOCTYPE html>
<html>
<title>STOCKS</title>
<script src="javascript/jquery.min.js"></script>
<link rel="stylesheet" href="css/stocks.css">
<link rel="stylesheet" href="css/w3.css">
<script src="javascript/stocks.js"></script>

<body>
  <div class="grid-container">
    <div class="grid-item-4">
      <p id='header_title'>STOCKS</p>
      
    </div>
    <div class="grid-item-1">
      <h5><a id='add_stock' href=''>ADD STOCK</a></h5>
      <ul id='stock_list'>
        
      
      <?php
        require('database_model.php');
        require('controller.php');
        include_once('list_stock.php');

        $database = new Database();
        
      ?>

      </ul>

    </div>
    <div class="grid-item-2">
      
      <h5 id='header_thoughts'>THOUGHTS/BIAS/JOURNAL</h5>
      <textarea id='textarea_stock' onfocusout='saveStockInfo()'></textarea>
      <ul id='stock_info_ul'>

      </ul>
    </div>
    <div class="grid-item-3">
      <p>Stock</p><input id='input_stock' disabled >
      <p>Shares</p><input id='input_shares' value=0 onfocusout='saveStockInfo()'>
      <p>Entry</p><input id='input_entry' value=0 onfocusout='compute()'>
      <p class='p_stock_info' id='p_exit'>Exit</p><input id='input_exit' value=0 onfocusout='computeExit()'>
      <p class='p_stock_info' id='p_be'>Breakeven</p><input id='input_be' value=0 onfocusout='saveStockInfo()'>
      <p class='p_stock_info' id='p_1'>1%</p><input id='input_1' value=0 onfocusout='saveStockInfo()'>
      <p class='p_stock_info' id='p_2'>2%</p><input id='input_2' value=0 onfocusout='saveStockInfo()'>
      <p class='p_stock_info' id='p_5'>5%</p><input id='input_5' value=0 onfocusout='saveStockInfo()'>
      <p class='p_stock_info' id='p_10'>10%</p><input id='input_10' value=0 onfocusout='saveStockInfo()'>
      <p class='p_stock_info' id='cl_1'>CL 1%</p><input id='input_cl1' value=0 '>
      <p class='p_stock_info' id='cl_2'>CL 2%</p><input id='input_cl2' value=0 '>
      <p class='p_stock_info' id='cl_5'>CL 5%</p><input id='input_cl5' value=0 '>
      <p class='p_stock_info' id='cl_10'>CL 10%</p><input id='input_cl10' value=0 '>
    </div>
  </div>
</body>
</html>
