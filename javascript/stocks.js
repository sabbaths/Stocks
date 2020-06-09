$(document).ready(function () {

	$('.delete_stock').click(function (e) {
		e.preventDefault();
		var stock_id = $(this).attr('id');
		var stock_name = $(this).attr('name');		

		if (confirm('Delete Stock? ' + stock_name)) {
			

			$.ajax({  
			    type: 'POST',  
			    url: 'handlers/delete_stock.php', 
			    data: { stock_id: stock_id, 
			    },
			    success: function(response) {
			    	location.reload();
			    }
			});

		}
	});	

	$('.select_stock').click(function (e) {
		e.preventDefault();
		
		var stock_id = $(this).attr('id');
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
		textarea_bias.val('');
		input_stock.val(stock_id);
		$.ajax({  
		    type: 'POST',  
		    url: 'handlers/stock_info_handler.php', 
		    data: { stock_id: stock_id, 
		    },
		    success: function(response) {
		    	var stock_info_array = JSON.parse(response);
		    	
		    	
		    	//input_stock.val(stock_info_array[0][1]);
		    	textarea_bias.val(stock_info_array[0][3])
		    	input_shares.val(stock_info_array[0][4]);
		    	input_entry.val(stock_info_array[0][5]);
		    	input_exit.val(stock_info_array[0][6]);
		    	/*input_exit.val(stock_info_array[0][6]);
		    	input_be.val(stock_info_array[0][7]);
		    	input_1.val(stock_info_array[0][8]);
		    	input_2.val(stock_info_array[0][9]);
		    	input_5.val(stock_info_array[0][10]);
		    	input_10.val(stock_info_array[0][11]); */
		    	if(parseFloat(input_shares) != 0 && parseFloat(input_entry) != 0) {
		    		compute();
		    	}
		    }
		});

	});

	$('#add_stock').click(function (e) {
		e.preventDefault();
		$("#stock_list").append("<li id='li_add_stock_input'><input id='input_add_stock' value='' onfocusout='saveAddedStock()'></li>");
	});
	
});

function saveAddedStock() {
	var stock_name = $('#input_add_stock').val()

	if(stock_name == '') return;
	//if(stock_name <> '') {
		$.ajax({  
		    type: 'POST',  
		    url: 'handlers/add_stock.php', 
		    data: { stock_name: stock_name, 
		    		stock_text: stock_name, 
		    },
		    success: function(response) {
		    	if(response == 7001) {
		    		location.reload();
		    	}
		    }
		});		
	//}
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

	//alert(shares);
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
		    },
		    success: function(response) {
		    	if(response == 7001) {
		    		//alert("SAVED");
		    		console.log(response);
		    	} else {
		    		console.log(response);
		    	}
		    }
		});		
	}

}

function compute() {
	var input_shares = $('#input_shares').val();
	var input_entry = $('#input_entry').val();


	if(input_shares > 0 && input_entry > 0) {
		console.log("shares:"+input_entry+"entry:"+input_entry);
		computeStocks(parseFloat(input_shares),parseFloat(input_entry),33.6,false);
		saveStockInfo();
	}
}

function computeExit() {
	var input_shares = $('#input_shares').val();
	var input_entry = $('#input_entry').val();
	var input_exit = $('#input_exit').val();
	var p_exit = $('#p_exit');

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


