function update (data) {
	
		//Creating an SVG element

		var w = 500;
		var h = 200;
		var barPadding = 1;

		var svg = d3.select("body")
					.append("svg")
					.attr("width", w)
					.attr("height", h);
		

		svg.selectAll("rect")
			.data(dataset)
			.enter()
			.append("rect")
			.attr("x", 0)
			.attr("y", 0)
			.attr("width", 20)
			.attr("height", 100)
			.attr("x", function(d,i) {
				return i * (w / dataset.length);
			})
			.attr ("y", function (d){
				return h - (d * 4);
			})
			.attr ("width", w / dataset.length - barPadding)
			.attr ("height", function(d) {
				return d * 4;
			})
			.attr ("fill", function(d) {
				return "rgb(20, 240, " + (d * 10) + ")";
			});

		svg.selectAll("text")
			.data(dataset)
			.enter()
			.append("text")

		.text(function(d){
			return d;
		})

		.attr("x", function(d, i) {
			return i * (w /dataset.length) + 5;
		})
		.attr("y", function(d) {
			return h - (d * 4) + 15;
		})
		.attr("font-family", "sans-serif")
	   	.attr("font-size", "11px")
	   	.attr("fill", "white");


}
var dataset = []; 
 d3.json("https://negativepostdata.firebaseio.com/#", update (d)); 


 var myDataRef = new Firebase("https://negativepostdata.firebaseio.com/#")

 myDataRef.set({"count":data});


myDataRef.on('child_added', function(snapshot) {
  var datapoint = snapshot.val();
	displayDataPoint(datapoint.count, datapoint.data);
});


selectALL("body")
	.append(
	<input type="checkbox" name="post" id="LikesOnPost" value="LikesOnPost"> <label for="LikesOnPost">LikesOnPost</label>
	<input type="checkbox" name="post" id="LikesOnComments" value="LikesOnComments"> <label for="LikesOnComments">LikesOnComments</label>
	<input type="checkbox" name="post" id="PositiveComment"  value="PositiveComment" > <label for="PositiveComment" >PositiveComment</label>
	<input type="checkbox" name="post" id="NegativeComments"  value="NegativeComments" > <label for="NegativeComments" >NegativeComment</label>
	)


$("#LikesOnPost").on("checked", function(){
	data=d.val()* 4
	return (d)
});

$("#LikesOnComments").on("checked", function(){
	data=d.val()* 4
	return (d)
});

$("#PositiveComment").on("checked", function(){
	data=d.val()* 4
	return (d)
});

$("#NegativeComments").on("checked", function(){
	data=d.val()* 4
	return (d)
});
