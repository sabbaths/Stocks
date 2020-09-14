$(document).ready(function () {
	var page_id_global = 1;

	$('#risk_ph').show();
	$('#risk_us').hide();
	$('#pl_ph').show();
	$('#pl_us').hide();	
});

$(document).on("keyup","#textarea_stock",function(e){
	var currentdate = new Date(); 
	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var datetime = "Last Log: " + currentdate.getDate() + "/"
	                + (months[currentdate.getMonth()])  + "/" 
	                + currentdate.getFullYear() + " @ "  
	                + currentdate.getHours() + ":"  
	                + currentdate.getMinutes() + ":" 
	                + currentdate.getSeconds();

		var key_pressed = event.keyCode;
		var textarea_value = $(this).val();


		console.log("key pressed " + key_pressed);

		if(key_pressed == 191) {
			console.log("add test");
			$(this).val(textarea_value + datetime);
		}
});

$(document).on("click",".stock_list_item_page",function(e){
	var page_id = $(this).text();

	if(page_id == 'Edit' || page_id == 'Hist') return;

	var input_hidden = $('#input_hidden').val(page_id);
	var country_stock = $("input[name=rd_btn_cnty_stock]:checked").val();
	page_id_global = page_id;

	//call handler get stock by user and page
	$.ajax({  
	    type: 'POST',  
	    url: 'handlers/stock_list_item_page_handler.php', 
	    data: { 
			user_id: 1,
			page_id: page_id,
			country_stock: country_stock,
	    },
	    success: function(response) {
	    	refreshStockListItem(response);
	    },
		error: function (xhr, ajaxOptions, thrownError) {
			console.log("ERROR");
		}
	});
});

$(document).on("change",':radio[name="rd_btn_cnty_stock"]',function(e){
	var country_stock = $(this).val();
	var grid_menu = $(".grid-menu");
	var textarea_stock = $("#textarea_stock");
	textarea_stock.val('');

	grid_menu.children('.pagination').remove();
	grid_menu.children('#stock_list_item_div').remove();
	grid_menu.children('.span_test').remove();

	/*
		add pl grid
		add list stock grid
	*/
	reloadStockList(grid_menu, 1, 1, country_stock);

	if(country_stock == 'US') {
		$('#risk_ph').hide();
		$('#risk_us').show();
		$('#pl_ph').hide();
		$('#pl_us').show();

		textarea_stock.focusout(function() {
		    saveStockInfoUS()
		});

	} else {
		$('#risk_ph').show();
		$('#risk_us').hide();
		$('#pl_ph').show();
		$('#pl_us').hide();

		textarea_stock.focusout(function() {
		    saveStockInfo()
		});

	}
});

function reloadStockList(grid_menu, user_id = 1, page_id = 1, country_stock = "PH") {
		$.ajax({  
		    type: 'GET',  
		    url: 'list_stock.php', 
		    data: { country_stock: country_stock, 
		    },
		    success: function(response) {
	    		grid_menu.append(response);
		    }
		});
}

$(document).on("click",".select_stock",function(e){
		
		e.preventDefault();

		$(".select_stock").css("font-weight", "normal");
		$(".select_stock").css("color", "black");
		$(this).css("font-weight", "bold");
		$(this).css("font-decoration", "underline");
		$(this).css("color", "blue");
		
		var country_stock = $("input[name=rd_btn_cnty_stock]:checked").val();
		var stock_id = $(this).attr('id');
		var stock_name = $(this).attr('name');
		console.log("STOCK NAME" + stock_name);
		var header_title = $('#header_title');
		var input_stock = $('#input_stock');
		var input_shares = $('#input_shares');
		var input_entry = $('#input_entry');
		var input_exit = $('#input_exit');
		var input_be = $('#input_be');
		var input_1 = $('#input_1');
		var input_2 = $('#input_2');
		var input_5 = $('#input_5');
		var input_10 = $('#input_10');
		var textarea_bias =  $('#textarea_stock');
		var input_cl1 = $('#input_cl1');
		var input_cl2 = $('#input_cl2');
		var input_cl5 = $('#input_cl5');
		var input_cl10 = $('#input_cl10');
		var input_alert = $('#input_alert');

		var p_exit = $('#p_exit').html("Exit:");
		var p_be = $('#p_be').html("Breakeven:");
		var p_1 = $('#p_1').html("1:");
		var p_2 = $('#p_2').html("2:");
		var p_5 = $('#p_5').html("5:");
		var p_10 = $('#p_10').html("10:");
		var cl_1 = $('#cl_1').html("CL 1:");
		var cl_2 = $('#cl_2').html("CL 2:");
		var cl_5 = $('#cl_5').html("CL 5:");
		var cl_10 = $('#cl_10').html("CL 10:");
		var header_stock_price = $('#header_stock_price');
		var header_stock_name = $('#header_stock_name');


		header_stock_name.html("STOCK: " + $(this).attr('name'));
		header_title.html($(this).attr('name'));
		input_stock.val('');
		input_shares.val('');
		input_shares.val(0);
		input_entry.val(0);
		input_exit.val(0);
		input_be.val(0);
		input_1.val(0);
		input_2.val(0);
		input_5.val(0);
		input_10.val(0);
		input_cl1.val(0);
		input_cl2.val(0);
		input_cl5.val(0);
		input_cl10.val(0);
		input_alert.val(0);
		textarea_bias.val('');
		input_stock.val(stock_id);

		var plcalc_input_units = $('#plcalc_input_units');
		var plcalc_input_entry2 = $('#plcalc_input_entry2');
		var plcalc_input_exit = $('#plcalc_input_exit');
		var plcalc_input_pl = $('#plcalc_input_pl');

		var risk_input_port = $('#risk_input_port');
		var risk_input_risk = $('#risk_input_risk');
		var risk_input_entry = $('#risk_input_entry');
		var risk_input_exit = $('#risk_input_exit');
		var risk_input_units = $('#risk_input_units');
		var risk_input_invest_amt = $('#risk_input_invest_amt');

		plcalc_input_units.val(0);
		plcalc_input_entry2.val(0);
		plcalc_input_exit.val(0);
		plcalc_input_pl.val(0);

		risk_input_port.val(0);
		risk_input_risk.val(0);
		risk_input_entry.val(0);
		risk_input_exit.val(0);
		risk_input_units.val(0);
		risk_input_invest_amt.val(0);

		console.log("select stock " + country_stock);

		$.ajax({  
		    type: 'POST',  
		    url: 'handlers/stock_info_handler.php', 
		    data: { stock_id: stock_id, 
		    		country_stock: country_stock,
		    },
		    success: function(response) {
		    	console.log(response);
		    	var stock_info_array = JSON.parse(response);

		    	if(country_stock == "PH") {
			    	textarea_bias.val(stock_info_array[0][3])
			    	input_shares.val(stock_info_array[0][4]);
			    	input_entry.val(stock_info_array[0][5]);
			    	input_exit.val(stock_info_array[0][6]);
			    	input_alert.val(stock_info_array[0][12]);

			    	if(parseFloat(input_shares) != 0 && parseFloat(input_entry) != 0) {
			    		compute();
			    		computeExit()
			    	} 
		    	} else {
			    	textarea_bias.val(stock_info_array[0][17])
			    	plcalc_input_units.val(stock_info_array[0][3]);
			    	plcalc_input_entry2.val(stock_info_array[0][4]);
			    	plcalc_input_exit.val(stock_info_array[0][5]);
			    	plcalc_input_pl.val(stock_info_array[0][6]);

			    	risk_input_port.val(stock_info_array[0][10]);
			    	risk_input_risk.val(stock_info_array[0][11]);
			    	risk_input_entry.val(stock_info_array[0][12]);
			    	risk_input_exit.val(stock_info_array[0][13]);
			    	risk_input_units.val(stock_info_array[0][14]);
			    	risk_input_invest_amt.val(stock_info_array[0][15]);
		    	}
		    }
		});
		
		$.ajax({  
		    type: 'POST',  
		    url: 'handlers/web_scrape_handler.php', 
		    data: { stock_name: stock_name, 
		    },
		    success: function(response) {
		    	console.log("RESPONSE WEB SCRAPE " + response);
		    	header_stock_price.html("STOCK PRICE: " + response);
		    },
		      error: function (xhr, ajaxOptions, thrownError) {
		      	console.log("ERROR");
		      }
		}); 

});


$(document).on("click",".delete_stock",function(e) {
	e.preventDefault();
	
	var stock_id = $(this).attr('id');
	var stock_name = $(this).attr('name');		

	if (confirm('Delete Stock? ' + stock_name)) {
		var anchor = $(e.target).parent().parent().remove();

		$.ajax({  
		    type: 'POST',  
		    url: 'handlers/delete_stock.php', 
		    data: { stock_id: stock_id, 
		    },
		    success: function(response) {
		    	console.log(response);
		    	//location.reload();
		    }
		});
	}
});

$(document).on("click","#add_stock",function(e) {
	e.preventDefault();
	var textarea_stock = $('#textarea_stock');
	
	textarea_stock.val(" ");
	//$("#refresh_stock_list").before("<li class='dataListItem' id='li_add_stock_input'><input id='input_add_stock' value='' size='6'><button id='a_add_stock_done' onclick='saveAddedStock()'>DONE</button></li>");
	$('.pagination a').hide();
	$('.pagination').append("<input id='input_add_stock' value='' size='6'><button id='a_add_stock_done' onclick='saveAddedStock()'>DONE</button></a>");
});

function saveAddedStock() {
	var page_id = $('#input_hidden').val();
	var user_id = 1;
	var stock_name = $('#input_add_stock').val().toUpperCase();
	var stock_list_item = $('.stock_list_item');
	var input_stock = $('#li_add_stock_input');
	var a_add_stock_done = $('#a_add_stock_done');
	var inpput_add_stock = $('#input_add_stock');
	var country_stock = $("input[name=rd_btn_cnty_stock]:checked").val();

	console.log("country stock: " + country_stock);
	console.log("page: " + page_id);


	input_stock.remove();
	a_add_stock_done.remove();
	inpput_add_stock.remove();
	$('.pagination a').show();

	if(!page_id) page_id = 1;
	if(page_id == 'Edit') page_id = 1;


	if(stock_name == '') return;
	//if(stock_name <> '') {
		$.ajax({  
		    type: 'POST',  
		    url: 'handlers/add_stock.php', 
		    data: { stock_name: stock_name, 
		    		stock_text: stock_name,
		    		page_id: page_id,
		    		user_id: user_id,
		    		country_stock: country_stock,
		    },
		    success: function(response) {
		    	console.log("add stock" + response);
		    	var response = JSON.parse(response);
		    	console.log('Response ' + response);
		    	if(response.status_code == 7001) {
		    		console.log("SAVE ADDED STOCK" + response);
		    		
		    		var stock_id = response.stock_id;
					var ul_item = "<ul class ='stock_list_item'> \
									<li id='' class='stock_item' name='"+stock_name+"'> \
										<a id='"+stock_id+"' href='' class='select_stock' data_name='"+stock_name+"' data_id='"+stock_id+"' name='"+stock_name+"'>"+stock_name+"</a> \
									</li> \
								 	<li id='stock_item_last_"+stock_name+"' class='stock_item' data_name='last' data_id='"+stock_id+"'> \
								 		0 \
								 	</li> \
								 	<li id='stock_item_change_"+stock_name+"' class='stock_item' data_name='change' data_id='"+stock_id+"'> \
								 		0 \
								 	</li> \
									<li id='' class='stock_item'> \
										<a id='"+stock_id+"' href='' class='delete_stock' name='"+stock_name+"'>DEL</a> \
								 	</li> \
								  </ul>";

		    		stock_list_item.last().after(ul_item);

		    	} else if(response.status_code == 7006){
		    		alert('Duplicate');
		    	} else {
		    		console.log("error saving added stock");
		    	}
		    }
		});		
	//}
}

function saveStockInfoUS() {
	var id = $('#input_stock').val();
	var buy_sell = $("input[name='rd_btn_pl']:checked").val() == 'true' ? 1 : 0;
	var bias = $('#textarea_stock').val();
	var plcalc_input_units = $('#plcalc_input_units').val();// == null ? $('#input_shares').val() : 0;
	var plcalc_input_entry2 = $('#plcalc_input_entry2').val(); //== null ? $('#input_entry').val() : 0;
	var plcalc_input_exit = $('#plcalc_input_exit').val(); //== null ? $('#input_exit').val() : 0;
	var plcalc_input_pl = $('#plcalc_input_pl').val(); //== null ? $('#input_be').val() : 0;
	
	var rd_btn_buy = $('#rd_btn_buy').val(); //== null ? $('#input_1').val() : 0;
	rd_btn_buy = rd_btn_buy == true ? 1 : 0;
	var risk_input_port = $('#risk_input_port').val(); //== null ? $('#input_2').val() : 0;
	var risk_input_risk = $('#risk_input_risk').val(); //== null ? $('#input_10').val() : 0;
	var risk_input_entry = $('#risk_input_entry').val(); //== null ? $('#input_10').val() : 0;
	var risk_input_exit = $('#risk_input_exit').val();
	var risk_input_units = $('#risk_input_units').val();
	var risk_input_invest_amt = $('#risk_input_invest_amt').val();
	console.log('save stock info us ' + buy_sell);
	
	if(id != '') {
		$.ajax({  
		    type: 'POST',  
		    url: 'handlers/add_stock_info_us.php', 
		    data: { stock_id: id, 
		    		buy_sell: buy_sell,
		    		bias: bias,
		    		plcalc_input_units: plcalc_input_units,
		    		plcalc_input_entry2: plcalc_input_entry2,
		    		plcalc_input_exit: plcalc_input_exit,
		    		plcalc_input_pl: plcalc_input_pl,
		    		rd_btn_buy: rd_btn_buy,
		    		risk_input_port: risk_input_port,
		    		risk_input_risk: risk_input_risk,
		    		risk_input_entry: risk_input_entry, 
		    		risk_input_exit: risk_input_exit, 
		    		risk_input_units: risk_input_units, 
		    		risk_input_invest_amt: risk_input_invest_amt, 
		    		alert: 0,
		    },
		    success: function(response) {
		    	if(response == 1511) {
		    		console.log(response);
		    	} else {
		    		console.log(response);
		    	}
		    }
		});		
	} 

}

function btnCalculateRisk() {
	var rd_btn_buy = $("input[name='rd_btn']:checked").val() == 'true';
	var risk_input_buy = $('#risk_input_buy').val();
	var risk_input_port = $('#risk_input_port').val();
	var risk_input_risk = $('#risk_input_risk').val();
	var risk_input_entry = $('#risk_input_entry').val();
	var risk_input_exit = $('#risk_input_exit').val();
	var risk_input_units = $('#risk_input_units');
	var risk_input_invest_amt = $('#risk_input_invest_amt');
	var this_stock = us_stock;

	this_stock.risk_pct = risk_input_risk;
	this_stock.portfolio_amt = risk_input_port;
	this_stock.entry = risk_input_entry;
	this_stock.exit = risk_input_exit;
	this_stock.buy = rd_btn_buy;
	var computed_risk = this_stock.computeRiskAmt();
	risk_input_units.val(computed_risk[0]);
	risk_input_invest_amt.val(computed_risk[1]);

	saveStockInfoUS();
}

function btnCalculatePL() {
	var rd_btn_buy = $("input[name='rd_btn_pl']:checked").val() == 'true';
	var plcalc_input_amt_invsted = $('#plcalc_input_amt_invsted').val();
	var plcalc_input_entry = $('#plcalc_input_entry').val();
	var plcalc_input_units = $('#plcalc_input_units').val();
	var plcalc_input_entry2 = $('#plcalc_input_entry2').val();
	var plcalc_input_exit = $('#plcalc_input_exit').val();
	var plcalc_input_pl = $('#plcalc_input_pl');

	var this_stock = us_stock;
	this_stock.rate_position_opened = plcalc_input_entry2;
	this_stock.rate_position_closed = plcalc_input_exit;
	this_stock.units = plcalc_input_units;
	this_stock.buy = rd_btn_buy;
	this_stock.computePL();
	plcalc_input_pl.val(this_stock.computedPL);

	saveStockInfoUS();
}

function compute() {
	var input_shares = $('#input_shares').val();
	var input_entry = $('#input_entry').val();
	var input_exit = $('#input_exit').val();
	var input_buyshares = $('#input_buyshares');
	var input_capital = $('#input_capital').val();
	var input_risk_perc = $('#input_risk_perc').val();
	var input_risk = $('#input_risk');
	var p_stock = $('#p_stock');


	if(input_shares > 0 && input_entry > 0) {
		console.log("shares:"+input_entry+"entry:"+input_entry);
		computeStocks(parseFloat(input_shares),parseFloat(input_entry),33.6,false);
		saveStockInfo();
		p_stock.html("Stocks Gross: " + (input_shares*input_entry).toFixed(2));
	}
}

function computeExit() {
	var input_shares = $('#input_shares').val();
	var input_entry = $('#input_entry').val();
	var input_exit = $('#input_exit').val();
	var p_exit = $('#p_exit');
	var input_buyshares = $('#input_buyshares');
	var input_capital = $('#input_capital').val();
	var input_risk_perc = $('#input_risk_perc').val();
	var input_risk = $('#input_risk');
	var p_stock = $('#p_stock');

	if(input_shares > 0 && input_entry > 0 && input_exit > 0) {
		console.log("shares:"+input_entry+"entry:"+input_entry+"exit:"+input_exit);
		//computeStocks(parseFloat(input_shares),parseFloat(input_entry),33.6,false);
		//saveStockInfo();
		var buy = computeEarning(input_shares,input_entry);
		var sell = computeEarning(input_shares,input_exit,false);
		var net = (sell - buy).toFixed(2);
		p_exit.html("Exit: ");
		p_exit.html(p_exit.html() + " " + net);
		saveStockInfo();

		if(input_capital > 0 && input_risk_perc > 0) {
			input_risk_perc = input_risk_perc/100;
			var risk = input_capital * input_risk_perc;
			var entry_exit = input_entry - input_exit;
			input_risk.val(risk);
			console.log("risk " + risk);
			console.log("entry_exit " + entry_exit);
			input_buyshares.val(risk/entry_exit);
		}
	}
}

function computeEarning(shares,price,buy=true) {
	var commission_charge = .0025;
	var sccp_charge = .0001;
	var vat_charge = .12;
	var pse_fee_charge = .00005;
	var sales_tax_charge = .006;
	var gross = shares * price;
	var commission = gross * commission_charge;
	var vat = commission * vat_charge;
	var sccp = gross * sccp_charge;
	var pse_fee = gross * pse_fee_charge;
	var sales_tax = gross * sales_tax_charge;
	var total_charges_sell = commission+vat+sccp+pse_fee+sales_tax;
	var total_charges_buy = commission+vat+sccp+pse_fee;
	var net_buy = gross + total_charges_buy;
	var net_sell = gross - total_charges_sell;
	var percentage = ((net_sell - net_buy) / gross) *100;

	if(buy) {
		return net_buy;
	} else {
		return net_sell;
	}
}

function computePosition() {
	console.log("Compute Position");
	var input_entry = $('#input_entry_position').val();
	var input_exit = $('#input_exit_position').val();
	var p_exit = $('#p_exit_position');
	var input_buyshares = $('#input_buyshares_position');
	var input_capital = $('#input_capital_position').val();
	var input_risk_perc = $('#input_risk_perc_position').val();
	var input_risk = $('#input_risk_position');
	var p_stock = $('#p_stock_position');

	if(input_entry > 0 && input_exit > 0) {
		console.log("shares:"+input_entry+"entry:"+input_entry+"exit:"+input_exit);

		if(input_capital > 0 && input_risk_perc > 0) {
			input_risk_perc = input_risk_perc/100;
			var risk = input_capital * input_risk_perc;
			var entry_exit = input_entry - input_exit;
			input_risk.val(risk);
			console.log("risk " + risk);
			console.log("entry_exit " + entry_exit);
			input_buyshares.val(risk/entry_exit);
		}
	}
}

function computeStocks(shares, entry, exit, first_loop) {
	var commission_charge = .0025;
	var sccp_charge = .0001;
	var vat_charge = .12;
	var pse_fee_charge = .00005;
	var sales_tax_charge = .006;
	var gross = shares * entry;
	var commission = gross * commission_charge;
	var vat = commission * vat_charge;
	var sccp = gross * sccp_charge;
	var pse_fee = gross * pse_fee_charge;
	var sales_tax = gross * sales_tax_charge;
	var total_charges_sell = commission+vat+sccp+pse_fee+sales_tax;
	var total_charges_buy = commission+vat+sccp+pse_fee;
	var net_buy = gross + total_charges_buy;
	var net_sell = gross - total_charges_sell;
	var percentage = ((net_sell - net_buy) / gross) *100;

	var input_be = $('#input_be');
	var input_1 = $('#input_1');
	var input_2 = $('#input_2');
	var input_5 = $('#input_5');
	var input_10 = $('#input_10');
	
	var input_cl1 = $('#input_cl1');
	var input_cl2 = $('#input_cl2');
	var input_cl5 = $('#input_cl5');
	var input_cl10 = $('#input_cl10');

	var p_be = $('#p_be');
	var p_1 = $('#p_1');
	var p_2 = $('#p_2');
	var p_5 = $('#p_5');
	var p_10 = $('#p_10');
	var cl_1 = $('#cl_1');
	var cl_2 = $('#cl_2');
	var cl_5 = $('#cl_5');
	var cl_10 = $('#cl_10');


	
	if(first_loop==false) {
	    for(var new_entry=entry+.1;new_entry<=entry*1.5;new_entry=new_entry+.1) {
	        var new_net_sell = computeStocks(shares,new_entry,0, true)[2];
	        var new_percentage = ((new_net_sell - net_buy) / gross);
	        
			//console.log("new percentage not rounded:" + new_percentage);
	        var new_percentage = new_percentage.toFixed(2);
	        
	        //console.log("new percentage rounded:" + new_percentage);
	        //console.log("new entry: " + new_entry +' gross: '+ gross + ' netsell: ' + new_net_sell + ' percentage: ' + new_percentage );
	        if(new_percentage == .01) {
	        	var test_new_entry = new_entry.toFixed(2);
	        	var new_gross = test_new_entry * shares;
	        	var earn = new_gross - gross;
	        	p_1.html("1%");
	        	p_1.html(p_1.html() + "<span class='span_gross'> "+ new_gross.toFixed(2)+ " </span><span class='span_earn'> "+ earn.toFixed(2)+" </span>");
	        	input_1.val(test_new_entry);
	        	//console.log( new_entry +' '+ gross + ' ' + new_net_sell + ' ' + new_percentage );
	        } else if(new_percentage == .02) {
	        	var test_new_entry = new_entry.toFixed(2);
	        	var new_gross = test_new_entry * shares;
	        	var earn = new_gross - gross;
	        	p_2.html("2%");
	        	p_2.html(p_2.html() + "<span class='span_gross'> "+ new_gross.toFixed(2)+ " </span><span class='span_earn'> "+ earn.toFixed(2)+" </span>");
	        	input_2.val(test_new_entry);
	        } else if(new_percentage == .05) {
	        	var test_new_entry = new_entry.toFixed(2);
	        	var new_gross = test_new_entry * shares;
	        	var earn = new_gross - gross;
	        	p_5.html("5%");
	        	p_5.html(p_5.html() + "<span class='span_gross'> "+ new_gross.toFixed(2)+ " </span><span class='span_earn'> "+ earn.toFixed(2)+" </span>");
	        	input_5.val(test_new_entry);
	        } else if(new_percentage == .1) {
	        	var test_new_entry = new_entry.toFixed(2);
	        	var new_gross = test_new_entry * shares;
	        	var earn = new_gross - gross;
	        	p_10.html("10%");
	        	p_10.html(p_10.html() + "<span class='span_gross'> "+ new_gross.toFixed(2)+ " </span><span class='span_earn'> "+ earn.toFixed(2)+" </span>");
	        	input_10.val(test_new_entry);
	        } else if(new_percentage == 0) {
	        	console.log( new_entry +' '+ gross + ' ' + new_net_sell + ' ' + new_percentage );
	        	input_be.val(new_entry.toFixed(2));
	        }
	    }

	    for(var new_entry=entry-.1;new_entry>=0;new_entry=new_entry-.1) {
	        var new_net_sell = computeStocks(shares,new_entry,0, true)[2];
	        var new_percentage = ((new_net_sell - net_buy) / gross);
	        
			//console.log("new percentage not rounded:" + new_percentage);
	        var new_percentage = new_percentage.toFixed(2);
	        
	        //console.log("new percentage rounded:" + new_percentage);
	        //console.log("new entry: " + new_entry +' gross: '+ gross + ' netsell: ' + new_net_sell + ' percentage: ' + new_percentage );
	        
	        if(new_percentage == -.01) {
	        	var new_entry = new_entry.toFixed(2);
	        	var new_gross = new_entry * shares;
	        	var earn = new_gross - gross;
	        	cl_1.html("CL 1%");
	        	cl_1.html(cl_1.html() + "<span class='span_gross'> "+ new_gross.toFixed(2)+ " </span><span class='span_loss'> "+ earn.toFixed(2)+" </span>");
	        	input_cl1.val(new_entry);
	        } else if(new_percentage == -.02) {
	        	var new_entry = new_entry.toFixed(2);
	        	var new_gross = new_entry * shares;
	        	var earn = new_gross - gross;
	        	cl_2.html("CL 2%");
	        	cl_2.html(cl_2.html() + "<span class='span_gross'> "+ new_gross.toFixed(2)+ " </span><span class='span_loss'> "+ earn.toFixed(2)+" </span>");
	        	input_cl2.val(new_entry);
	        } else if(new_percentage == -.05) {
	        	var new_entry = new_entry.toFixed(2);
	        	var new_gross = new_entry * shares;
	        	var earn = new_gross - gross;
	        	cl_5.html("CL 5%");
	        	cl_5.html(cl_5.html() + "<span class='span_gross'> "+ new_gross.toFixed(2)+ " </span><span class='span_loss'> "+ earn.toFixed(2)+" </span>");
	        	input_cl5.val(new_entry);
	        } else if(new_percentage == -.10) {
	        	var new_entry = new_entry.toFixed(2);
	        	var new_gross = new_entry * shares;
	        	var earn = new_gross - gross;
	        	cl_10.html("CL 10%");
	        	cl_10.html(cl_10.html() + "<span class='span_gross'> "+ new_gross.toFixed(2)+ " </span><span class='span_loss'> "+ earn.toFixed(2)+" </span>");
	        	input_cl10.val(new_entry);
	        } 
	    }  
	}

	return [entry, net_buy, net_sell, percentage];
}

function saveStockInfo() {
	var id = $('#input_stock').val();
	var bias = $('#textarea_stock').val();
	var shares = $('#input_shares').val();// == null ? $('#input_shares').val() : 0;
	var entry = $('#input_entry').val(); //== null ? $('#input_entry').val() : 0;
	var exit = $('#input_exit').val(); //== null ? $('#input_exit').val() : 0;
	var be = $('#input_be').val(); //== null ? $('#input_be').val() : 0;
	var p1 = $('#input_1').val(); //== null ? $('#input_1').val() : 0;
	var p2 = $('#input_2').val(); //== null ? $('#input_2').val() : 0;
	var p5 = $('#input_5').val(); //== null ? $('#input_10').val() : 0;
	var p10 = $('#input_10').val(); //== null ? $('#input_10').val() : 0;
	var alert = $('#input_alert').val();

	if(id != '') {
		$.ajax({  
		    type: 'POST',  
		    url: 'handlers/add_stock_info.php', 
		    data: { stock_id: id, 
		    		bias: bias,
		    		shares: shares,
		    		entry: entry,
		    		exit: exit,
		    		be: be,
		    		p1: p1,
		    		p2: p2,
		    		p5: p5,
		    		p10: p10, 
		    		alert: alert, 
		    },
		    success: function(response) {
		    	if(response == 7001) {
		    		console.log(response);
		    	} else {
		    		console.log(response);
		    	}
		    }
		});		
	}

}

function refreshStockListItem(stock_list) {
	var stock_list = JSON.parse(stock_list);
	var pagination = $('.pagination');
	//var stock_list_item_ul = $('.stock_list_item').not(':first').remove();
	$('.stock_list_item').slice(1).remove();
	var stock_list_item = $('.stock_list_item');

	if(stock_list.length == 0) return;

	for(var i = stock_list.length-1;i>=0;i--) {
		var stock_id = stock_list[i][0];
		var stock_name = stock_list[i][1];

		var ul_item = "<ul class ='stock_list_item'> \
						<li id='' class='stock_item' name='"+stock_name+"'> \
							<a id='"+stock_id+"' href='' class='select_stock' data_name='"+stock_name+"' data_id='"+stock_id+"' name='"+stock_name+"'>"+stock_name+"</a> \
						</li> \
					 	<li id='stock_item_last_"+stock_name+"' class='stock_item' data_name='last' data_id='"+stock_id+"'> \
					 		0 \
					 	</li> \
					 	<li id='stock_item_change_"+stock_name+"' class='stock_item' data_name='change' data_id='"+stock_id+"'> \
					 		0 \
					 	</li> \
						<li id='' class='stock_item'> \
							<a id='"+stock_id+"' class='delete_stock'  href='' name='"+stock_name+"' '>DEL</a> \
					 	</li> \
	 			  </ul>";
	 			  

		stock_list_item.after(ul_item);
	}
	/*
	var ul_item_first = "<ul class ='stock_list_item'> \
					  		<li class='stock_item'> \
					  			CODE \
					  		</li> \
					  	 	<li class='stock_item'> \
					  	 		LAST \
					  	 	</li> \
					  	 	<li class='stock_item'> \
					  	 		CHNG \
					  	 	</li> \
		 				</ul>";

	pagination.after(ul_item_first); */
}


var us_stock = {
  stock_name: "",
  stock_code : "",
  buy: true,
  units: 0,
  amount_invested: 0,
  portfolio_amt: 0,
  risk_pct: 0,
  entry: 0,
  exit: 0,
  rate_position_opened: 0,
  rate_position_closed: 0,
  computedPL: 0,

  computeUnits : function() {
  	if(this.amount_invested == 0 || this.rate_position_opened == 0)
  		console.log("NULL FIELDS");

    var units = this.amount_invested/this.rate_position_opened;
    this.units = units;
  },

  computePL : function() {
  	console.log(this.rate_position_closed);
  	console.log(this.rate_position_opened);
  	console.log(this.buy);
  	var buy_sell_diff = this.rate_position_closed - this.rate_position_opened;
  	
  	if(!this.buy)
  		 buy_sell_diff = this.rate_position_opened - this.rate_position_closed;

  	this.computedPL = buy_sell_diff * this.units;
  },

  computeRiskAmt : function() {
  	var input_risk_perc = this.risk_pct/100;
  	var risk = this.portfolio_amt * input_risk_perc;
  	var entry_exit = this.exit - this.entry; //sell short

  	if(this.buy)
  		entry_exit = this.entry - this.exit;

  	var buy_shares = risk/entry_exit;


  	return [buy_shares, buy_shares * this.entry];
  }
};