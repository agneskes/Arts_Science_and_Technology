var data = {
    students : [
		{ name : "Agnes", ID : "10076867" },
		{ name : "Thomas", ID : "1337" },
		{ name : "Roos", ID : "76867001" },
		{ name : "Lotte", ID : "0123456789" },
		{ name : "Anna", ID : "601253" },
		{ name : "Jeffrey", ID : "44444" },
		{ name : "Isabel", ID : "0987654321" }
	],
	assignments : [
		{ number : "1", description : "Do something" },
		{ number : "2", description : "Do something else" },
		{ number : "3", description : "Do Re Mi Fa Sol"}
	]
};

var rawHtml = "<h4>Students</h4><ul> {{#students}} <li>{{name}} - {{ID}}</li>
    {{/students}} </ul> <h4>Assignments</h4><ul> {{#assignments}}
    <li>{{number}} - {{description}}</li> {{/assignments}} </ul>”;

var template = Handlebars.compile(rawHtml);
var html = template(data);
$(".session3").append(html);