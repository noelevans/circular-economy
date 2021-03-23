var circleArray = new Array()    //Contains slider values input by user in it's internal arrays
var quesLenArray = new Array(7,3,6,3,10,2,2)
var getValue = 0
var getAvg
var getAvg2
var totalQues = 33

var oppArray = new Array()
var userInfoArray = new Array()
var ansArray = new Array()
var quesArray = new Array(
"No material is used in excess, product is totally dematerialised","High waste of material, could be reduced through redesign",
"100% Biodegradable","High percentage of technical, non-biodegradable materials",
"100% Recycled materials used","High percentage of virgin, non-recycled materials",
"No scarce materials used in product","Scarce materials in product, e.g. Antinomy, Cobalt, Gallium, Geranium, Indium, Platinum, Palladium, Niobium, Neodymium and Tantalum",
"Materials are highly eco-efficent (low energy and carbon emissions to produce)","Materials used have poor eco-efficiency",
"No toxic materials in product","Excess toxic materials in product",
"Zero waste factory; all waste is used as input to another process/factory","Significant waste sent to landfill from factory",

"Product failures rarely occur","Product failures are frequent",
"Product has a very long lifetime","Product has a short lifetime",
"Product uses no, or close to theoretical minimum power","Product is energy and resource wasteful",

"Cost of repair far outweighs cost of product","Cost to repair is small in comparison to the product cost",
"Suitable maintenance/repair service already offered (could include repair, servicing, spare parts, diagnostics, technical support, installation and warranty)","No maintenance/repair service offered",
"Difficult to get access to internal workings","Easy to get access to internal workings",
"Complex workings, difficult to understand","Simple workings, easy to understand",
"No components, connectors, modules or leads are standardised","All components, connectors, modules and leads are standardised",
"Difficult to find fault","Easy to find fault",

"No market for second hand sales","Good market for second hand sales",
"Comprehensive second hand sales already offered","No second hand sales offered currently",
"Product has a very long lifetime","Product has a short lifetime",

"Expensive refurbishment/ remanufacturing costs","Cheap refurbishment/ remanufacturing costs",
"Expensive collection costs to return product to factory","Cheap collection costs to return product to factory",
"All products are returned and refurbished/remanufactured","No refurbishing or remanufacturing currently undertaken",
"Difficult to disassemble","Easy to disassemble",
"Significant damage caused to product or part when disassembling","No damage caused to product or part when disassembling",
"Impossible to identify parts once disassembled","Easy to identify parts once disassembled",
"No parts are modular, preventing switch in-switch out","Many parts are modular, allowing switch in-switch out",
"Impossible to upgrade parts","Possible to upgrade to parts",
"Many mechanical connections, e.g. welds, screws, rivets, etc.","Few mechanical connections",
"Many tools required to disassemble","Few tools required to disassemble",

"No market to sell products as a service","Good market to sell products as a service",
"All products already sold as a service","No products currently sold as a service",

"Few material combinations used in the product","High number of material combinations used in the product",
"No encased materials(e.g. if materials are easy to separate at recycling)","Many encased materials"

)

var dataSentArray = new Array()

function alignSliders()
{
	for(var i = 1; i<34; i++)
	{
		//Align sliders
		var getQuesDivHeight = $("#ques"+i).height();
		var getSliderHeight = $("#ansSlider"+i).height();
		var margin = (getQuesDivHeight - getSliderHeight)/2;
		
		$("#ansSlider"+i).css({
		'margin-top': margin
		});
		
		//Align left text
		var getLeftTextHeight = $("#left"+i).height();
		var leftMargin = (getQuesDivHeight - getLeftTextHeight)/2
		
		$("#left"+i).css({
		'margin-top': leftMargin
		});
		
		//Align right text
		var getRightTextHeight = $("#right"+i).height();
		var rightMargin = (getQuesDivHeight - getRightTextHeight)/2
		
		$("#right"+i).css({
		'margin-top': rightMargin
		});
	}
}

$(document).ready(function() {
	//alignSliders()
});

function prepData()
{
	var count = -1
	
	for(var j=0; j<circleArray.length; j++)
	{
		for(var k=0; k<circleArray[j].length; k++)
		{
			ansArray.push(circleArray[j][k])
		}
	}
	
	
	for(var i = 0; i<totalQues; i++)
	{
		dataSentArray[i] = []
		dataSentArray[i][0] = quesArray[count+1]
		if(ansArray[i] == 1)
		{
			dataSentArray[i][1] = "X"
			dataSentArray[i][2] = ""
			dataSentArray[i][3] = ""
		}
		else if(ansArray[i] == 2)
		{
			dataSentArray[i][1] = ""
			dataSentArray[i][2] = "X"
			dataSentArray[i][3] = ""
		}
		else if(ansArray[i] == 3)
		{
			dataSentArray[i][1] = ""
			dataSentArray[i][2] = ""
			dataSentArray[i][3] = "X"
		}
		
		dataSentArray[i][4] = quesArray[count+2]
		count += 2
	}
	
}

function activateSlider()
{	
	
	//Creating blank arrays
	for(var i = 0; i<7; i++)
	{
		circleArray[i] = new Array()
		
		for(var m=0; m<quesLenArray[i]; m++)
		{
			circleArray[i][m] = 1
		}
	}
	
	for(var j = 0; j<totalQues; j++)
	{
		$("#text"+j).bind("slider:changed", function (event, data) {
			
			var splitOutput = this.name.split("_");
			var getType = splitOutput[0]
			var getPlaceinArray = splitOutput[1]
			
			circleArray[getType][getPlaceinArray] = data.value;
		});
	}

}

function validateForm()
{	
	var warningText = document.getElementById("warning");
	var company  =  document.forms.assessment.companyList.value;
	var product  =  document.forms.assessment.productType.value;
	var use  =  $('input[name=use]:checked').val();
	
	if(product == "")
	{
		warningText.innerHTML = "*Please fill the Product type.";
	}
	else
	{
		userInfoArray[0] = company
		userInfoArray[1] = product
		userInfoArray[2] = use
		warningText.innerHTML = "";
		sendData()
	}
}


function checkAns()
{
	//Check if all the 3 input boxes are filled
	validateForm()
}
	
function sendData()	
{	
	//Show save button
	$("#email_btn").show()
	
	/*----------------------- For rectangle 1, 0th value -----------------------*/
	
		//First value of array
		getValue = circleArray[0][0]
		
		changeImage(getValue, "rect1", 1)
		
	/*----------------------- For rectangle 2, 1-5 values -----------------------*/
		for(var i = 1; i<6; i++)
		{
			getValue += circleArray[0][i]
		}
		
		getAvg = getValue/5
		changeImage(getAvg, "rect2", 2)
	
	/*----------------------- For rectangle 3, 6th value -----------------------*/
		getValue = circleArray[0][6]
		
		changeImage(getValue, "rect3", 3)
	
	
	
	/*---------------------------------------------------------------------------------------------------------------------------*/
	
	/*----------------------- For CIRCLE 2 i.e. USAGE -----------------------*/
		//Get average of 3 values
		for(var j = 0; j<3; j++)
		{
			getValue += circleArray[1][j];
		}
		
		getAvg = getValue/3
		changeImage(getAvg, "circle2", 4)
		
		
	/*----------------------- For CIRCLE 3 i.e. REPAIR/MAINTAIN -----------------------*/
	
		//Get average of first 2 values
		getAvg = (circleArray[2][0] + circleArray[2][1])/2
		//Get avg of next 4 values
		for(var k = 2; k<6; k++)
		{
			getValue += circleArray[2][k];
			//alert(getValue)
		}
		getAvg2 = getValue/4
		changeImage2(getAvg, getAvg2, "circle3", 5)
		
	/*----------------------- For CIRCLE 4 i.e. REUSE/REDISTRIBUTE -----------------------*/
	
		//Get average of first 2 values
		getAvg = (circleArray[3][0] + circleArray[3][1])/2
		
		//Get next 1 value
		getAvg2 = circleArray[3][2]
		
		changeImage2(getAvg, getAvg2, "circle4", 6)
		
		
	/*----------------------- For CIRCLE 5 i.e. REFURBISH/REMANUFACTURE -----------------------*/
	
		//Get average of first 3 values
		getAvg = (circleArray[4][0] + circleArray[4][1] + circleArray[4][2])/3
		
		//Get avg of next 7 values
		for(var l = 3; l<10; l++)
		{
			getValue += circleArray[4][l];
		}
		getAvg2 = getValue/7
		
		changeImage2(getAvg, getAvg2, "circle5", 7)
		
		
	/*----------------------- For CIRCLE 6 i.e. RECYCLE -----------------------*/
		
		//Sum of 2 values + 0,2 and 5th values of array[0]
		getValue = circleArray[6][0] + circleArray[6][1]
		getValue += circleArray[0][0] + circleArray[0][2] + circleArray[0][5]
		
		getAvg = getValue/5
		changeImage(getAvg, "circle6", 8)
	
	
	/*----------------------- For CIRCLE 7 i.e. PRODUCT as a Service -----------------------*/
		
		//Get avg of 2 values
		getAvg = (circleArray[5][0] + circleArray[5][1])/2
		changeImage(getAvg, "circle7", 9)
	
	prepData()
	$.post('Mail/sendResultCE.php', { dataArray: dataSentArray, infoArray: userInfoArray })
	
}

function changeImage(_getValue, imgId, arrayId)
{
	
	if(_getValue == 1)
	{  //Grey  
	   $("#"+imgId).attr("src","images/tool/"+imgId+"_grey.png");
	   	oppArray[arrayId-1] = "Low opportunity"
	}
	else if(_getValue > 1 && _getValue <= 2)	
	{
		//Amber
		$("#"+imgId).attr("src","images/tool/"+imgId+"_amber.png");
		oppArray[arrayId-1] = "Medium opportunity"
	}
	else if(_getValue > 2)	
	{
		//Green
		$("#"+imgId).attr("src","images/tool/"+imgId+"_green.png");
	   	oppArray[arrayId-1] = "High opportunity"		
	}

	getValue = 0
}

function changeImage2(_getValue, _getValue2, imgId, arrayId)
{
	//alert("imgId :"+imgId+"   value 1 :"+_getValue)
	//alert("value 2 :"+_getValue2)
	
	if(_getValue == 1 && _getValue2 == 1)
	{  //Grey  
	   $("#"+imgId).attr("src","images/tool/"+imgId+"_grey.png");
	   oppArray[arrayId-1] = "Low opportunity"
	}
	else if((_getValue > 2 && _getValue2 > 1) || (_getValue > 1 && _getValue2 > 2))
	{
		//Green
		$("#"+imgId).attr("src","images/tool/"+imgId+"_green.png");
		oppArray[arrayId-1] = "High opportunity"	
	}
	else	
	{
		//Amber
		$("#"+imgId).attr("src","images/tool/"+imgId+"_amber.png");
		oppArray[arrayId-1] = "Medium opportunity"
	}
	getValue = 0
}

function sendEmailToUser()
{
		
		var _emailval = $("#email").val();
		var _mailvalid = validateEmail(_emailval);
		
		if(_mailvalid)
		{
		   $("#send_user").replaceWith("<em>sending...</em>");
		
			$.post('Mail/sendResultToUser.php', { email: _emailval, dataArray: dataSentArray, infoArray: userInfoArray, oppArray: oppArray },
			function(data,status)
			 {
				if(data == "true") {
						$("#contact").fadeOut("fast", function(){
							$(this).before("<p><strong>Thank you!<br/>You will recieve the results in an e-mail shortly.</strong></p>");
							setTimeout("$.fancybox.close()", 2000);
						});
					}
			 });
		}
}		

function validateEmail(email) { 
	var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return reg.test(email);
}
