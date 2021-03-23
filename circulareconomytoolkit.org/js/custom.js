function validateEmail(email) { 
	var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return reg.test(email);
}

$(document).ready(function() {
	$(".modalbox").fancybox();
	$("#contact").submit(function() {
		return false;
	});
	
	$("#send").on("click", function(){
		var cnval = $("#cname").val();
		var wlink = $("#wlink").val();
		var wlinkval = wlink.length;
		var emailval = $("#email").val();
		
		var msgval = $("#msg").val();
		var msglen = msgval.length;
		var mailvalid = validateEmail(emailval);
		if (cnval == ""){
			$("#cname").addClass("error");
		}
		 $("#cname").change(function() {
            $("#cname").removeClass("error");
        });
		 $("#wlink").change(function() {
            $("#wlink").removeClass("error");
        });
		if (wlink == "" && wlinkval <= 50 ) {
			$("#wlink").addClass("error");
		}
		
		
		
		if (msglen < 4) {
			$("#msg").addClass("error");
		}
        $("#msg").change(function() {
            $("#msg").removeClass("error");
        });
		
		if (msglen >= 4 ) {
			$("#send").replaceWith("<em>sending...</em>");
			
			$.ajax({
				type: 'POST',
				url: 'sendmessage.php',
				data: $("#contact").serialize(),
				success: function(data) {
					if(data == "true") {
						$("#contact").fadeOut("fast", function(){
							$(this).before("<p ><strong> Thank you for your case study, it <br/> will be reviewed and added</strong></p>");
							setTimeout("$.fancybox.close()", 2000);
						});
					}
				}
			});
			
		}
	});
});