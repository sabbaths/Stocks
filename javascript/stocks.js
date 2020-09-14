$(document).ready(function () {
	var page_id_global = 1;

	$('#login_modal').css("display","block");

	$( "#textarea_stock").keyup(function(event) {
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


	$('#btn_login').click(function (e) {
		//check database username and password
		var username = $('#input_login_un').val();
		var password = $('#input_login_pw').val();

		$.ajax({  
		    type: 'POST',  
		    url: 'handlers/login_handler.php', 
		    data: { username: username, 
		    		password: password,
		    },
		    success: function(response) {
		    	console.log(response);
		    	var response_json = JSON.parse(response);	    	
		    	var status_code = response_json[0]; 
		    	var user_id = response_json[1];

		    	if(status_code == '1001' && user_id != '0') {
					$.ajax({  
					    type: 'POST',  
					    url: 'stocks.php', 
					    data: { username: username, 
					    },
					    success: function(response) {
					    },
						error: function (xhr, ajaxOptions, thrownError) {
							console.log("SESSION ERROR");
						}
					});

		    		//login_modal.css("display","none");
		    		post('stocks.php', {username: 'username'});


		    	} else if(status_code == '1001' && user_id == '0') {
		    		alert("Invalid Username OR Password")
		    	} else {
		    		alert("Server Error")
		    	}
		    }
		});

		
	});	

	function post(path, params, method='post') {

	  // The rest of this code assumes you are not using a library.
	  // It can be made less wordy if you use one.
	  const form = document.createElement('form');
	  form.method = method;
	  form.action = path;

	  for (const key in params) {
	    if (params.hasOwnProperty(key)) {
	      const hiddenField = document.createElement('input');
	      hiddenField.type = 'hidden';
	      hiddenField.name = key;
	      hiddenField.value = params[key];

	      form.appendChild(hiddenField);
	    }
	  }

	  document.body.appendChild(form);
	  form.submit();
	}

	$('.stock_list_item_page').click( function(e) {
	  var page_id = $(this).text();
	  var input_hidden = $('#input_hidden').val(page_id);
	  page_id_global = page_id;
	  
	  //call handler get stock by user and page
		$.ajax({  
		    type: 'POST',  
		    url: 'handlers/stock_list_item_page_handler.php', 
		    data: { 
	    		user_id: 1,
	    		page_id: page_id,
		    },
		    success: function(response) {
		    	refreshStockListItem(response);
		    },
			error: function (xhr, ajaxOptions, thrownError) {
				console.log("ERROR");
			}
		});
	});	
	
	//REFRESH EVERY SECOND WATCH LIST
	/*
	var timeout = setInterval(refreshStocks, 60000); 
	function refreshStocks(){
		updateStockWatchList();
		console.log("UPDATE STOCK LIST EVERY 5 Sec");

		var today = new Date();
		var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

		var time_updated = $('#time_updated');
		time_updated.html("Updated: "+ time);
	} */

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
	

	$('#refresh_stock_list').click( function(e) {
	  e.preventDefault();
	  updateStockWatchList();
	  //updateStockWatchListDatabase();
	  //checkAlertPriceStockList();
	  //doSomething(1);
	  //getAlertPrice(22);
	});

	$('#refresh_stock_list_update').click( function(e) {
	  e.preventDefault();
	  //updateStockWatchList();
	  updateStockWatchListDatabase();
	  //checkAlertPriceStockList();
	  //doSomething(1);
	  //getAlertPrice(22);
	});

	function checkAlertPriceStockList() {
		console.log("CHECK ALERT PRICE");
		$('.stock_list_item li').each(function(index, value) {
			var li_id = value.id;
	  		var li_stock_id = $( "li[id='"+li_id+"']" ).attr("data_id");
	  		var li_stock_name = $( "li[id='"+li_id+"']" ).attr("id");

	  		if(typeof li_stock_id !== "undefined") {
	  			//console.log("STOCK ID:" +li_stock_id +" stock name:" + li_stock_name);
	  			//console.log("GET ALERT PRICE OF " + li_stock_id);
	  			doSomething(li_stock_id);
	  		}
		});
	} 

	function doSomething(stock_id)
	{
	  doAjax(function(result){
	  	/*
	    if (result == true ) {
	       console.log('success');
	    }
	    else {
	       console.log('failed');
	    } */
	    console.log("STOCK ID " +stock_id + " ALERT PRICE " + result);
	    //return result;

	    
	  }, stock_id);
	}
	/*
	function doAjax()
	{
	  var result = false;
	  $.ajax('handlers/get_alert_price.php', 
		    {stock_id:0}
		   	)
	    .done(function(){
	       // Do a bunch
	       console.log("HERE");
	       // of computation
	       // blah blah blah
	       result = true;
	    }).fail(function(){
	       result = false;
	    });
	  return result;
	} */

	function doAjax(callback, stock_id)
	{
	  $.ajax('handlers/get_alert_price.php?stock_id='+stock_id, 
		   	)
	    .done(function(response){
	       // Do a bunch
	       // of computation
	       // blah blah blah
	       
	       callback(response);
	    }).fail(function(){
	    console.log(response);
	       callback(false);
	    });
	}

	function getAlertPrice(stock_id) {
		$.ajax({  
		    type: 'POST',  
		    url: 'handlers/get_alert_price.php', 
		    data: { stock_id: stock_id, 
		    },
		    success: function(response) {
		    	console.log("STOCK " +stock_id + " RESPONSE GET ALERT PRICE "+ response);
		    	return response;
		    },
			error: function (xhr, ajaxOptions, thrownError) {
				console.log("ERROR");
			}
		});
	}

	function updateStockWatchList() {
		$('.stock_list_item li').each(function(index, value) {
			var t0 = performance.now()
			var li_id = value.id;
	  		
	  		var test_0 = $( "li[id='"+li_id+"']" );
	  		var test_1 = $( "li[id='"+li_id+"']" ).attr("id");
	  		var test_2 = $( "li[id='"+li_id+"']" ).attr("data_name");
	  		var li_stock_id = $( "li[id='"+li_id+"']" ).attr("data_id");

	  		
	  		if(typeof test_1 !== "undefined") {
	  			var stock_name = test_1.split('_')[3];
	  			var what_price = 0;
	  			test_0.html("0");	
	  			if(test_2 != 'last') {
	  				what_price = 1;
	  			}

	  			//GET CURRENT PRICE VIA AJAX AND FROM DATABASE
				$.ajax({  
				    type: 'POST',  
				    url: 'handlers/get_stock_current_price.php', 

				    data: { 
						stock_id: li_stock_id, 
				    	stock_name: stock_name, 
				    	what_price: what_price, 
				    },
				    success: function(response) {
			  			if(test_2 == 'last') {
			  				//console.log("GET LAST PRICE OF " + stock_name);
			  				if (response != null || undefined) {
			  					test_0.html(response);
			  				} else {
			  					test_0.html(0);	
			  				}
			  			} else {
			  				//console.log("GET LAST PRICE OF " + stock_name);
			  				if (response != null || undefined) {
			  					test_0.html(response);	
			  				} else {
			  					test_0.html(0);	
			  				}
			  				
			  			}
				    },
				      error: function (xhr, ajaxOptions, thrownError) {
				      	console.log("ERROR");
				      	test_0.html(0);
				      }
				});

	  			//SET CURRENT PRICE, CHANGE PERC IN DATABASE	
				/*
				$.ajax({  
				    type: 'POST',  
				    url: 'handlers/update_stock_current_perc_handler.php', 
				    data: { 
						stock_id: li_stock_id, 
				    	stock_name: stock_name, 
				    	what_price: what_price, 
				    },
				    success: function(response) {
				    	//console.log("RESPONSE WEB SCRAPE " + response + "INDEX: " + index);
				    	//header_stock_price.html(response);

			  			if(test_2 == 'last') {
			  				//test_0.html(response);
			  				//console.log("UPDATED LAST PRICE OF " + stock_name);
			  			} else {
			  				//test_0.html(response);
			  				//console.log("UPDATED LAST PERC OF " + stock_name);
			  			}
						//var t1 = performance.now()
						//console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")
				    },
				      error: function (xhr, ajaxOptions, thrownError) {
				      	console.log("ERROR");
				      }
				}); */
	  		}
	  		
		});
	}

	function updateStockWatchListDatabase() {
		console.log("UPDATE PROCESSING PRICE, PERC of DATABASE");

		$.ajax({  
		    type: 'POST',  
		    url: 'handlers/update_stock_current_perc_handler.php', 
		    data: { 
				stock_id: 0, 
		    	stock_name: 0, 
		    	what_price: 0, 
		    },
		    success: function(response) {
				console.log("UPDATED PRICE, PERC of DATABASE");
		    },
		      error: function (xhr, ajaxOptions, thrownError) {
		      	console.log("ERROR");
		      }
		});

		/*
		$('.stock_list_item li').each(function(index, value) {
			var t0 = performance.now()
			var li_id = value.id;
	  		
	  		var test_0 = $( "li[id='"+li_id+"']" );
	  		var test_1 = $( "li[id='"+li_id+"']" ).attr("id");
	  		var test_2 = $( "li[id='"+li_id+"']" ).attr("data_name");
	  		var li_stock_id = $( "li[id='"+li_id+"']" ).attr("data_id");

	  		
	  		if(typeof test_1 !== "undefined") {
	  			var stock_name = test_1.split('_')[3];
	  			var what_price = 0;
	  			
	  			if(test_2 != 'last') {
	  				what_price = 1;
	  			}

	  			//GET CURRENT PRICE VIA AJAX AND FROM DATABASE
				/*
				$.ajax({  
				    type: 'POST',  
				    url: 'handlers/get_stock_current_price.php', 
				    data: { 
						stock_id: li_stock_id, 
				    	stock_name: stock_name, 
				    	what_price: what_price, 
				    },
				    success: function(response) {
			  			if(test_2 == 'last') {
			  				//console.log("GET LAST PRICE OF " + stock_name);
			  				test_0.html(response);
			  			} else {
			  				//console.log("GET LAST PRICE OF " + stock_name);
			  				test_0.html(response);
			  			}
				    },
				      error: function (xhr, ajaxOptions, thrownError) {
				      	console.log("ERROR");
				      }
				}); 

	  			//SET CURRENT PRICE, CHANGE PERC IN DATABASE	
				$.ajax({  
				    type: 'POST',  
				    url: 'handlers/update_stock_current_perc_handler.php', 
				    data: { 
						stock_id: li_stock_id, 
				    	stock_name: stock_name, 
				    	what_price: what_price, 
				    },
				    success: function(response) {
				    	//console.log("RESPONSE WEB SCRAPE " + response + "INDEX: " + index);
				    	//header_stock_price.html(response);

			  			if(test_2 == 'last') {
			  				//test_0.html(response);
			  				console.log("UPDATED LAST PRICE OF " + stock_name);
			  			} else {
			  				//test_0.html(response);
			  				console.log("UPDATED LAST PERC OF " + stock_name);
			  			}
						//var t1 = performance.now()
						//console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")
				    },
				      error: function (xhr, ajaxOptions, thrownError) {
				      	console.log("ERROR");
				      }
				});
	  		}
	  		
		}); */
	}
	/*
	function deleteStock() {
		alert('delete stock');
		e.preventDefault();
		console.log('delete');
		var stock_id = $(this).attr('id');
		var stock_name = $(this).attr('name');		

		if (confirm('Delete Stock? ' + stock_name)) {

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
	}

	$('.delete_stock').click(function (e) {
		alert("DELETE");
		e.preventDefault();
		console.log('delete');
		var stock_id = $(this).attr('id');
		var stock_name = $(this).attr('name');		

		if (confirm('Delete Stock? ' + stock_name)) {

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
	});	*/
	/*
	$('.select_stock').click(function (e) {
		console.log("select stock");
		e.preventDefault();
		
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

		$.ajax({  
		    type: 'POST',  
		    url: 'handlers/stock_info_handler.php', 
		    data: { stock_id: stock_id, 
		    },
		    success: function(response) {
		    	console.log(response);
		    	
		    	var stock_info_array = JSON.parse(response);
		    	
		    	textarea_bias.val(stock_info_array[0][3])
		    	input_shares.val(stock_info_array[0][4]);
		    	input_entry.val(stock_info_array[0][5]);
		    	input_exit.val(stock_info_array[0][6]);
		    	input_alert.val(stock_info_array[0][12]);

		    	if(parseFloat(input_shares) != 0 && parseFloat(input_entry) != 0) {
		    		compute();
		    		computeExit()
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
		    	header_stock_price.html(response);
		    },
		      error: function (xhr, ajaxOptions, thrownError) {
		      	console.log("ERROR");
		      }
		}); 

	}); */



	$('#add_stock').click(function (e) {
		e.preventDefault();
		var textarea_stock = $('#textarea_stock');
		
		textarea_stock.val(" ");
		$("#refresh_stock_list").before("<li class='dataListItem' id='li_add_stock_input'><input id='input_add_stock' value='' size='6'><button id='a_add_stock_done' onclick='saveAddedStock()'>DONE</button></li>");
	});
});

$(document).on("click",".delete_stock",function(e) {
	e.preventDefault();

	var anchor = $(e.target).parent().parent().remove();
	
	var stock_id = $(this).attr('id');
	var stock_name = $(this).attr('name');		

	if (confirm('Delete Stock? ' + stock_name)) {
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

$(document).on("click",".select_stock",function(e){
		console.log("select stock");
		e.preventDefault();

		$(".select_stock").css("font-weight", "normal");
		$(this).css("font-weight", "bold");
		
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

		$.ajax({  
		    type: 'POST',  
		    url: 'handlers/stock_info_handler.php', 
		    data: { stock_id: stock_id, 
		    },
		    success: function(response) {
		    	console.log(response);
		    	
		    	var stock_info_array = JSON.parse(response);
		    	
		    	textarea_bias.val(stock_info_array[0][3])
		    	input_shares.val(stock_info_array[0][4]);
		    	input_entry.val(stock_info_array[0][5]);
		    	input_exit.val(stock_info_array[0][6]);
		    	input_alert.val(stock_info_array[0][12]);

		    	if(parseFloat(input_shares) != 0 && parseFloat(input_entry) != 0) {
		    		compute();
		    		computeExit()
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
		    	header_stock_price.html(response);
		    },
		      error: function (xhr, ajaxOptions, thrownError) {
		      	console.log("ERROR");
		      }
		}); 
});

function saveAddedStock() {

	var page_id = $('#input_hidden').val();
	var user_id = 1;
	var stock_name = $('#input_add_stock').val().toUpperCase();
	var stock_list_item = $('.stock_list_item');
	var input_stock = $('#li_add_stock_input');
	var a_add_stock_done = $('#a_add_stock_done');


	if(!page_id) page_id = 1;

	if(stock_name == '') return;
	//if(stock_name <> '') {
		$.ajax({  
		    type: 'POST',  
		    url: 'handlers/add_stock.php', 
		    data: { stock_name: stock_name, 
		    		stock_text: stock_name,
		    		page_id: page_id,
		    		user_id: user_id,
		    },
		    success: function(response) {
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
		    		input_stock.remove();
		    		a_add_stock_done.remove();

		    	} else {
		    		console.log("error saving added stock");
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

function saveAlertPrice() {
	var alert_price = $('#input_alert').val();
	var stock_id = $('#input_stock').val();

	if(alert_price > 0) {
		$.ajax({  
		    type: 'POST',  
		    url: 'handlers/save_alert_price.php', 
		    data: { stock_id: stock_id, 
		    		alert_price: alert_price,
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

function refreshAllStocks(id) {


}

function refreshStock() {

}

function alertPrice() {

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

function logout() {
	$.ajax({  
	    type: 'POST',  
	    url: 'handlers/logout_handler.php', 
	    success: function(response) {
	    },
	  	error: function(response) {
	  		alert('logout error');	
	    },
	});
}

function testFetch() {
	fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits')
	  .then(response => response.json())
	  .then(commits => alert(commits[0].author.login));
}

function loginModal(e) {
	var login_modal = $('#login_modal');
	var username = $('#login_modal_username').val();
	var password = $('#login_modal_password').val();

	console.log(username);
	console.log(password);

	$.ajax({  
	    type: 'POST',  
	    url: 'handlers/login_handler.php', 
	    data: { username: username, 
	    		password: password,
	    },
	    success: function(response) {
	    	console.log(response);
	    	var response_json = JSON.parse(response);	    	
	    	var status_code = response_json[0]; 
	    	var user_id = response_json[1];

	    	if(status_code == '1001' && user_id != '0') {
				$.ajax({  
				    type: 'POST',  
				    url: 'stocks.php', 
				    data: { username: username, 
				    },
				    success: function(response) {
				    },
					error: function (xhr, ajaxOptions, thrownError) {
						console.log("SESSION ERROR");
					}
				});

	    		login_modal.css("display","none");



	    	} else if(status_code == '1001' && user_id == '0') {
	    		alert("Invalid Username OR Password")
	    	} else {
	    		alert("Server Error")
	    	}
	    }
	});
}






