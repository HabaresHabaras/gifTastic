var topics = ["The office", "Michael Scott", "Pam and Jim", "Dwight Shrute", "Jim Halpert", "Pam Beesly", "Kevin the office", "Ryan Howard", "Andy Bernard", "Robert California", "Jan Levinson", "Darryl Philbin", "Toby Flenderson", "Meredith The Office"];
$(function(){
      function gifTastic() {

        var gifName = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=FkqWQP7XipR2YoX40wSHI1RrO97ZMujT&q=" + gifName + "&limit=10&offset=0&lang=en";

        // Creating an AJAX call for the specific character button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
          for (var a = 0; a < response.data.length; a++) {

          var gifs = $("<div class='gifSDiv'><div class='row'>");
          var gifsColumn = $("<div class='col-sm-9 col-md-5 col-lg-3 columna'>");


          var rating = response.data[a].rating;
 
          var pOne = $("<p class='paragraph'>").text("Rated: " + rating);

          gifsColumn.append(pOne);

          var imgURLMoving = response.data[a].images.fixed_width.url;
          var imageMoving = $("<img class='hide image'>").attr( "src", imgURLMoving);

          var imgURL = response.data[a].images.fixed_width_still.url


var image = $("<img class='show image'>").attr( "src", imgURL);
        
          $(".show").show();
          
    $(".show").on("click", function(){
      $(".show").hide();
      $(".hide").show();
    })
    $(".hide").on("click", function(){
      $(".hide").hide();
      $(".show").show();
    })
    
    
          gifsColumn.append(imageMoving, image);
          console.log(gifsColumn)
          var gifsWhole = gifs && gifsColumn;

          $("#gifsDiv").prepend(gifsWhole);
          var slug = response.slug;
          console.log(queryURL);
        }
         });
      }

      function renderButtons() {

        $("#buttonsDiv").empty();

        for (var i = 0; i < topics.length; i++) {

          var a = $("<button>");
          a.addClass("character-btn btn btn-dark");
          a.attr("data-name", topics[i]);
          a.text(topics[i]);
          $("#buttonsDiv").append(a);
        }
      }

      $("#add-character").on("click", function(event) {
        event.preventDefault();
        var character = $("#character-input").val().trim();

        topics.push(character);

        renderButtons();
      });

      $(document).on("click", ".character-btn", gifTastic);

      renderButtons();
    

});