var express = require("express")
var fs = require('fs')
var request = require('request')
var cheerio = require('cheerio')
var app = express();
var phantom = require('phantom');
var all_players = [];
app.get('/scrape', function(req, res) {
	url = "https://play.esea.net/users/1073447?tab=stats";
	// urls = ["https://play.esea.net/users/1073447?tab=stats", "https://play.esea.net/users/682531?tab=stats", "https://play.esea.net/users/839003?tab=stats", "https://play.esea.net/users/1005656?tab=stats", "https://play.esea.net/users/1007220?tab=stats", "https://play.esea.net/users/525204?tab=stats"]

	// for(var i = 0; i < urls.length; i++) {
		phantom.create(function (ph) {
		  ph.createPage(function (page) {
		    page.open(url, function (status) {
		    	setTimeout(function() {
			      console.log("opened website? ", status);
			      page.injectJs("https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js")
				      setTimeout(function(){
				      	return page.evaluate(function(){
				      		console.log(document.title);
				      		var name, record, adr, rws;
				        	var json = {name:"", record:"", adr:"", rws:""}
					      		$('#profile-header').filter(function() {
					      			console.log('hi')
					      			var data = $(this);
					      			name = data.children().text()
					      			name = $.trim(name);
					      			splitname = name.split("\t")
					      			console.log(splitname);
					      			json.name = $.trim(splitname[0]);
					      		})
					      		
					      		$('tr.header').filter(function() {
					      			var data = $(this);
					      			record = data.children().text();
					      			record = $.trim(record);
					      			splitrecord = record.split("\t")
					      			json.record = splitrecord[splitrecord.length-1];
					      		})
					      		$('table.box tbody tr:nth-child(3) td:nth-child(13)').filter(function() {
					      			var data = $(this);
					      			adr = data.text();
					      			json.adr = adr;
					      		})
					      		$('table.box tbody tr:nth-child(3)').filter(function() {
					      			var data = $(this);
					      			rws = data.text();
					      			splitrws = rws.split("\t");
					      			json.rws = $.trim(splitrws[splitrws.length-5])
					      		})

					      		
				      		return json;
				      		}, function(result) {
				      			console.log("RESULTS", result)
				      			// console.log(all_players)
				      			// all_players.push(result)
				      			res.json(result)
				      			ph.exit();
				      	})
				      }, 1000)		
		    	}, 5000);
		    });
		  });
		});
	
	// }
	
	// res.json(all_players)
		// for () {
			
	// 			request({
	// 					uri: url[0],
	// 					waitSeconds: 5000
	// 				}, function(error, response, html){
	// 			if(!error) {
	// 				// console.log('sdf');
	// 				var $ = cheerio.load(html);
	// 				var name, record, adr, rws;
	// 				var json = {name: "", record: "", adr: "", rws: ""};

	// 				// $('.tabArea').filter(function() {
	// 				// 	console.log('hi');
	// 				// 	// var data = $(this);
	// 				// 	// name = data.children().text()
	// 				// 	// json.name = name
	// 				// 	// console.log(json);
	// 				// 	// console.log(name);
	// 				// })

	// 				// console.log(html);

	// 				$('#profile-header').filter(function(){
	// 					console.log('hi');
	// 					// var data = $(this);
	// 					// title = data.children().first().text();
	// 					// release = data.children().last().children().text();
	// 					// json.title = title
	// 					// json.release = release
	// 				})

	// 				// $('.header').filter(function(){
	// 				// 	var data = $(this);
	// 				// 	title = data.children().first().text();
	// 				// 	release = data.children().last().children().text();
	// 				// 	json.title = title
	// 				// 	json.release = release
	// 				// })
	// 				// $('.star-box-giga-star').filter(function(){
	// 				// 	var data = $(this);
	// 				// 	rating = data.text()
	// 				// 	json.rating = rating;
	// 				// })
	// 			}
	// 			else{
	// 				console.log(error);
	// 			}
	// 			// fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err) {
	// 			// 	console.log('File successfully wirrtin!')
	// 			// })
	// 			res.json(json);
			


	// parse_websites(url);
})

app.listen('8000', function(){
	console.log('on 8000')
})

// exports = module.exports = app;

