<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="css/stocks_new.css">
    <link rel="stylesheet" href="css/test.css">
    <script src="javascript/jquery.min.js"></script>
    <script src="javascript/us_stock.js"></script>
</head>
<body>
  <div class="grid-container">
    <div class="grid-header">
      <!--
      <label class="switch">
        <input type="checkbox">
        <span class="slider round"></span>
      </label>
      -->
      <div id='header-top'>
        <ul>
          <li><a>User</a></li>
          <li><a>Markets</a></li>
          <li><a>Search</a></li>
        </ul>        
      </div>
      <div id='header-menu'>
        <ul id='ul1'>
          <li><a>Ideas</a></li>
          <li><a>Markets</a></li>
          <li><a>Scripts</a></li>
          <li><a>Screeners</a></li>
          <li><a>Streams</a></li>
          <li><a>Brokers</a></li>
          <li><a>Chart</a></li>
          <li><a>Technicals</a></li>
          <li><a>Fundamentals</a></li>
        </ul>
        <ul id='ul2'>
          <li>PH
          <input type="radio" class="rd_btn_cntry" name="rd_btn_cnty_stock" value="PH" checked></li>
          <li>eToro
          <input type="radio" class="rd_btn_cntry" name="rd_btn_cnty_stock" value="US"></li>
        </ul>
      </div>
    </div>
    <div class="grid-menu">
      <span>Stock List</span>
          <?php
            require('database_model_stock.php');
            require('web_scraper.php');
            include_once('list_stock.php');
          ?>
    </div>
    <div class="grid-journal">
      <h7>JOURNAL</h7>
      <textarea id='textarea_stock' onfocusout='saveStockInfoUS()'></textarea>
    </div>  
    <div class="grid-pl">
      <h7>PL CALCULATOR</h7>
      <div id ='pl_ph'>
        <ul id='floatleft'>
          <li>
            <span class='p_stock_info' id='p_stock'>Stock</span>
            <input id='input_stock' disabled >
          </li>
          <li>  
            <span>Shares</span>
            <input id='input_shares' value=0 onfocusout='compute()'>
          </li>
          <li>  
            <span>Entry</span>
            <input id='input_entry' value=0 onfocusout='compute()'>
          </li>
          <li>
            <span class='p_stock_info' id='p_exit'>Exit</span>
            <input id='input_exit' value=0 onfocusout='computeExit()'>
          </li>
          <li>
            <span class='p_stock_info' id='p_be'>Breakeven</span>
            <input id='input_be' value=0 onfocusout='saveStockInfo()' disabled >
          </li>
          <li>
            <span class='p_stock_info' id='p_1'>Gain 1%</span>
            <input id='input_1' value=0 onfocusout='saveStockInfo()' disabled >
          </li>
          <li>
            <span class='p_stock_info' id='p_2'>Gain 2%</span>
            <input id='input_2' value=0 onfocusout='saveStockInfo()' disabled >
          </li>
          <li>
            <span class='p_stock_info' id='p_5'>Gain 5%</span>
            <input id='input_5' value=0 onfocusout='saveStockInfo()' disabled >
          </li>
          <li>
            <span class='p_stock_info' id='p_10'>Gain 10%</span>
            <input id='input_10' value=0 onfocusout='saveStockInfo()' disabled >
          </li>
        </ul>
        <ul id='floatright'>  
          <li>
            <span class='p_stock_info' id='cl_1'>Cut Loss 1%</span>
            <input id='input_cl1' value=0 ' disabled >
          </li>
          <li>
            <span class='p_stock_info' id='cl_2'>Cut Loss 2%</span>
            <input id='input_cl2' value=0 ' disabled >
          </li>
          <li>
            <span class='p_stock_info' id='cl_5'>Cut Loss 5%</span>
            <input id='input_cl5' value=0 ' disabled >
          </li>
          <li>
            <span class='p_stock_info' id='cl_10'>Cut Loss 10%</span>
            <input id='input_cl10' value=0 ' disabled >
          </li>
          <li>
            <span class='p_stock_info' id='p_alert'>ALERT PRICE</span>
            <input id='input_alert' value=0 onfocusout='saveAlertPrice()' >
          </li>
        </ul>     
      </div>
      <div id ='pl_us'>
        <ul>
          <!-- <li><span>Amount Invested</span><input id='plcalc_input_amt_invsted'></input></li>
          <li><span>Entry</span><input id='plcalc_input_entry'></input></li> -->
          <li><span>Stock ID</span><input id='input_stock' disabled value=0></input></li>
          <li><span>Units</span><input id='plcalc_input_units' value=0></input></li>
          <li><span>Entry</span><input id='plcalc_input_entry2' value=0></input></li>
          <li><span>Exit</span><input id='plcalc_input_exit' value=0></input></li>
          <li><span>PL</span><input id='plcalc_input_pl' value=0></input></li>
          <button id='btn_pl' onClick='btnCalculatePL()'>CALCULATE PL</button>
        </ul>
      </div>
    </div>
    <div class="grid-risk">
      <h7>RISK</h7>
      <div id='risk_ph'>
        <ul>
          <li>
            <span>Entry</span>
            <input id='input_entry_position' value=0 onfocusout=''> </li>
          <li>
            <span class='p_stock_info' id='p_exit_position'>Exit</span>
            <input id='input_exit_position' value=0 onfocusout=''></li>
          <li>
            <span class='p_capital' id='p_risk'>CAPITAL</span><input id='input_capital_position' value=0 '>
          </li>
          <li>
            <span class='p_stock_info' id='p_risk_perc'>RISK%</span>
            <input id='input_risk_perc_position' value=0 onfocusout='computePosition()'>
          </li>
          <li>
            <span class='p_stock_info' id='p_risk'>RISK</span>
            <input id='input_risk_position' value=0 '>
          </li>
          <li>
            <span class='p_stock_info' id='p_buyshares'>BUY SHARES</span>
            <input id='input_buyshares_position' value=0 '>
          </li>
        </ul>
       </div> 
      <div id='risk_us'>
        <ul>
          <li>
            <span>Buy</span>
            <input type="radio" id="rd_btn_buy" name="rd_btn" value="true" checked>
            <span>Sell</span>
            <input type="radio" id="rd_btn_sell" name="rd_btn" value="false">
          </li>
          <li><span>Portfolio</span><input id='risk_input_port' value=0></input></li>
          <li><span>Risk</span><input id='risk_input_risk' value=0></input></li>
          <li><span>Entry</span><input id='risk_input_entry' value=0></input></li>
          <li><span>Exit</span><input id='risk_input_exit' value=0></input></li>
          <li><span>Buy Units</span><input id='risk_input_units' disabled value=0></input></li>
          <li><span>Invest Amount</span><input id='risk_input_invest_amt' disabled value=0></input></li>
          <button id='btn_risk' onClick='btnCalculateRisk()'>CALCULATE RISK</button>
        </ul> 
      </div>
    </div> 
    <div class="grid-footer">
      <span id='copyright_span'>Copyright 2020</span>
    </div>
  </div>
</body>
</html>
