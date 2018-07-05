
$('#submit').click(function(e){
	e.preventDefault();
	OMDBRequest();
});

function OMDBRequest(){
	$('#submit').click(function(){
		$.getJSON('https://www.omdbapi.com/?t='+$('#search').val()+'&y='+$('#year').val()+'&plot=full&apikey=eefeda9a',function(data){
			console.log(data);
			showResults(data);
		})
	})

}

function showResults(data){
	$('#output').html(`
		<div class="col-4">
			<h2>${data.Title}</h2>
			<img src="${data.Poster}">
		</div>
		<div class="col-4">
			<p>Plot: ${data.Plot}</p>
			<p>Release Date: ${data.Released}</p>
			<p>Runtime: ${data.Runtime}</p>
			<p>Director: ${data.Director}</p>
			<p>Writers: ${data.Writers}</p>
			<p>Actors: ${data.Actors}</p>
			<p>Awards: ${data.Awards}</p>
			<p>${data.Ratings[0].Source}:<span>${data.Ratings[0].Value}</span></p>
			<p>${data.Ratings[1].Source}<span>${data.Ratings[1].Value}</span></p>
			<p>${data.Ratings[2].Source}<span>${data.Ratings[2].Value}</span></p>
		</div>`)

}
	
	


