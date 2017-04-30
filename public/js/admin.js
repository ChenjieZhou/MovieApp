// $(function(){
//   $('.del').click(function(e){
//     var target = $(e.target);
//     var id = target.data('id');
//     var tr = $('.item-id' + id);
//
//     $ajax({
//       type: 'DELETE',
//       url: '/admin/list?id' + id;
//     }).done(function(results) {
//       if (results.success === 1) {
//         if (tr.length > 0) {
//           tr.remove();
//         }
//       }
//     })
//   })
// })

$(function() {
    // body...
    $('.del').click(function(e) {
        var target = $(e.target);
        var id = target.data('id');
        var tr = $('.item-id-' + id);

        $.ajax({
            type: 'DELETE',
            url: '/admin/movie/list?id=' + id
        }).done(function(results) {
            if (results.success === 1) {
                if (tr.length > 0) {
                    tr.remove();
                };
            };
        });
    });

    $('#douban').blur(function() {
        var douban = $(this)
				console.log(douban);
        var id = douban.val()


				if (id){
					$.ajax({
							url: 'https://api.themoviedb.org/3/movie/'+id +'/videos?api_key=50f5bf470407f34dbf7c67c165eff65b&language=en-US',
							cache: true,
							type: 'get',
							dataType: 'json',
							success: function(data) {
								var trailerKey = data.results[0].key;
								var trailer = 'http://www.youtube.com/embed/'+trailerKey;
								$('#inputFlash').val(trailer);

							}
					});
				}

        if (id) {
            $.ajax({
                url: 'http://www.omdbapi.com/?i=' + id,
                cache: true,
                type: 'get',
                dataType: 'json',
                success: function(data) {
										console.log(data+"this is ceshi");
                    $('#inputTitle').val(data.Title);
										  $('#inputLanguage').val(data.Language);
                    $('#inputDoctor').val(data.Director);
                    $('#inputCountry').val(data.Country);
                    $('#inputPoster').val(data.Poster);
                    $('#inputYear').val(data.Year);
                    $('#inputSummary').val(data.Plot);

                    $('#inputTime').val(data.Runtime);
                    $('#inputGenre').val(data.Genre);
                    $('#inputActors').val(data.Actors);
                    $('#inputRate').val(data.imdbRating);
                    $('#inputImdb').val(data.imdbID);
                }
            });
        }
    });

});
