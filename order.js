$(document).ready(function(){

/*function to data on form submition*/
	$('#btn_order').click(function(){

		/*check for empty order*/
		if(arr_order.length==0){
			alert('You haven\'t ordered anything yet.');
			return false;
		}

	    
	    /*Check for future time selection*/
	    var date_sel=$('#date_sel').val();
	    if(date_sel==0){
	    	var time_sel=$('#time_sel').val();
	    //	console.log(time_sel);
	    	var d=new Date();
	    	var time_now=d.getHours()*60+d.getMinutes();
	    //	console.log(time_now);
	    	if(time_sel<time_now){
	    		alert('Please select present/future time');
	    		$('#time_sel').focus();
	    		return false;
	    	}
	    }
		
		
	});
	


/*function to hide/show categories of menu*/
	
	$('[class^="cat_"]').hide();
	$('.item_heading').on('click',function(){
		var $cat=$(this).next('[class^="cat_"]');
		$cat.slideToggle('slow');
		$('[class^="cat_"]').not($cat).slideUp();
	});
		
	
	

/*function to hide/show date-time selection*/	
	$('.time_setting').hide();
	$('input:radio[name="order_time"]').change(function(){
        if ($(this).val() == 'later') {
            $('.time_setting').show();
        
        }
        if ($(this).val() == 'now') {
            $('.time_setting').hide();
        }
    });

/*Function to add all the time intervals to order_tim*/
	populate_time('#time_sel');
	function populate_time(selector) {
	    var select = $(selector);
	    var hours, minutes, ampm,c=0,h;
	    for(var i = 690; i <= 1320; i += 15){
	        hours = Math.floor(i / 60);
	        minutes = i % 60;
	        if (minutes < 10){
	            minutes = '0' + minutes; // adding leading zero
	        }
	        ampm = hours % 24 < 12 ? 'AM' : 'PM';
	        hours = hours % 12;
	        if (hours === 0){
	            hours = 12;
	        }

	        if(hours>=2 && hours<=5 ){
	        	if(c==0){
	        	select.append($('<option></option>')
	            .attr({'value': i,'disabled':'disabled'})
	            .text('02:30 PM - 06:00 PM (Closed)'));	
	            c=1;
	        	}
	        }
	        else{
	        	if(hours<10){
	        		hours='0'+hours;
	        	}
	        select.append($('<option></option>')
	            .attr('value', i)
	            .text(hours + ':' + minutes + ' ' + ampm)); 
	        }
	    }
	}

	/*Function to get dates of 5 days*/
	populate_date('#date_sel');
	function populate_date(selector){
		var select=$(selector);
		for(i=0;i<5;i++){
			var d=new Date()
			d.setDate(d.getDate()+i);
			
		//	console.log(d);
			select.append($('<option></option>')
	            .attr('value', i)
	            .text(d.toLocaleDateString()));
		
		}
	}

	


	/*function to add items to order table*/
	var arr_order=[];
	var item,qty,price,subTotal,remove,total=0,index=0;
	$('.btn_add').click(function(){
		
		item=$(this).parent().siblings('.item_name').text();
		price=$(this).parent().siblings('.item_price').text().replace('$','');
		qty="<td>"+"<select id='qty_"+index+"'><option >1</option> <option >2</option> <option >3</option> </select>"+"</td>";
		subTotal=price;
		remove="<button type='button' class='btn btn-xs btn_remove'>REMOVE</button>";

		
		arr_order.push({'index':index,'item':item,'qty':1,'price':price,'subTotal':subTotal});


		var data="<tr data-index="+index+">"+"<td class='item_order'>"+item+"</td>"+qty+"<td class='price_order'>$"+price+"</td>"+"<td class='subtotal_order'>$"+subTotal+"</td>"+"<td>"+remove+"</td>"+"</tr>";
			$('#order_table').append(data);
			index++;
		

		
		console.log(arr_order);	
		
		//update total amount
		total=0;
		for(j=0;j<arr_order.length;j++){
			total+=Number(arr_order[j].subTotal);
		}
		total=total.toFixed(2);
		$('#total_amount').text(' $ '+total);
	});


	/*function to delete row from order table*/
	$('#order_table').on('click','.btn_remove',function(){
		var index=$(this).parents('tr').attr('data-index');
		console.log('index:'+index);
		arr_order.splice(index,1);
		$(this).parents('tr').remove();
		var total=0;
		for(j=0;j<arr_order.length;j++){
			total+=Number(arr_order[j].subTotal);
		}
		total=total.toFixed(2);
		$('#total_amount').text(' $ '+total);
		
		
		console.log(arr_order);

		
	});

	/*function to update subTotal&Total amount when quantity changes*/
	$('#order_table').on('change','[id^="qty_"]',function(){
		
		var qtySel=$(this).val();
		var index=$(this).parents('tr').attr('data-index');
		subTotal=(Number(qtySel)*Number(price)).toFixed(2);

		for(i=0;i<arr_order.length;i++){
			var obj=arr_order[i];
			if(obj.index == index){
				var subTotal=(Number(qtySel)*Number(obj.price));
				obj.subTotal=subTotal;
				obj.qty=qtySel;
			}
		}
		$(this).parent().nextAll('.subtotal_order').text('$'+subTotal);

		var total=0;
		for(j=0;j<arr_order.length;j++){
			var obj=arr_order[j];
			total+=Number(obj.subTotal);
		}
		total=total.toFixed(2);
		$('#total_amount').text(' $ '+total);

	});
	
	


	/*Get Json data
	getJsonData();
    
	function getJsonData(){
        $.getJSON("https://api.myjson.com/bins/24tb1", function(result){
            console.log(123);
        	console.log(result);
        });
    
	}*/

	

});


