<?php
  session_start();
  $_SESSION['username'] = $_POST['username'];
  /*if(!isset($_SESSION['username']))
    $_SESSION['username'] = $_POST['username']; */ 

  if($_SESSION['username'] == "") {   
    print("session not set");
    header('Location: login.html');
    exit();
  }
?>

<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>
      STOCKS
    </title>
  </head>
    <script src="javascript/jquery.min.js"></script>
    <link rel="stylesheet" href="css/stocks.css">
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <script src="javascript/stocks.js"></script>

  <body>
    <div class="grid-container">
      <div class="grid-item-1">
        <h5><a id='add_stock' href=''>ADD STOCK</a></h5>
          <?php
            require('database_model_stock.php');
            require('web_scraper.php');
            include_once('list_stock.php');
          ?>
      </div>
      <div class="grid-item-2">  
        <h5 id='header_thoughts'>JOURNAL</h5>
        <h5 id='header_stock_name'>STOCK</h5>
        <h5 id='header_stock_price'>PRICE</h5>
        <textarea id='textarea_stock' onfocusout='saveStockInfo()'></textarea>
        <ul id='stock_info_ul'>
        </ul>
      </div>
      <div class="grid-item-3">
        <p class='p_stock_info' id='p_stock'>Stock</p><input id='input_stock' disabled >
        <p>Shares</p><input id='input_shares' value=0 onfocusout='compute()'>
        <p>Entry</p><input id='input_entry' value=0 onfocusout='compute()'>
        <p class='p_stock_info' id='p_exit'>Exit</p><input id='input_exit' value=0 onfocusout='computeExit()'>
        <p class='p_stock_info' id='p_be'>Breakeven</p><input id='input_be' value=0 onfocusout='saveStockInfo()' disabled >
        <p class='p_stock_info' id='p_1'>Gain 1%</p><input id='input_1' value=0 onfocusout='saveStockInfo()' disabled >
        <p class='p_stock_info' id='p_2'>Gain 2%</p><input id='input_2' value=0 onfocusout='saveStockInfo()' disabled >
        <p class='p_stock_info' id='p_5'>Gain 5%</p><input id='input_5' value=0 onfocusout='saveStockInfo()' disabled >
        <p class='p_stock_info' id='p_10'>Gain 10%</p><input id='input_10' value=0 onfocusout='saveStockInfo()' disabled >
        <p class='p_stock_info' id='cl_1'>Cut Loss 1%</p><input id='input_cl1' value=0 ' disabled >
        <p class='p_stock_info' id='cl_2'>Cut Loss 2%</p><input id='input_cl2' value=0 ' disabled >
        <p class='p_stock_info' id='cl_5'>Cut Loss 5%</p><input id='input_cl5' value=0 ' disabled >
        <p class='p_stock_info' id='cl_10'>Cut Loss 10%</p><input id='input_cl10' value=0 ' disabled >
        <h5>ALERT</h5>
        <p class='p_stock_info' id='p_alert'>ALERT PRICE</p><input id='input_alert' value=0 onfocusout='saveAlertPrice()' >
      </div>
      <div class="grid-item-5">
        <p>RISK POSITION</p>
        <p>Entry</p><input id='input_entry_position' value=0 onfocusout=''>
        <p class='p_stock_info' id='p_exit_position'>Exit</p><input id='input_exit_position' value=0 onfocusout=''>
        <p class='p_capital' id='p_risk'>CAPITAL</p><input id='input_capital_position' value=0 '>
        <p class='p_stock_info' id='p_risk_perc'>RISK%</p><input id='input_risk_perc_position' value=0 onfocusout='computePosition()'>
        <p class='p_stock_info' id='p_risk'>RISK</p><input id='input_risk_position' value=0 '>
        <p class='p_stock_info' id='p_buyshares'>BUY SHARES</p><input id='input_buyshares_position' value=0 '>
      </div>
    </div>

    <p id='p_logout'><a id='a_logout' href='login.html' onclick=logout() >LOGOUT</a></p>
  </body>
</html>
