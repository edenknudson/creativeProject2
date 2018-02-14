//API key: d30032dc58a7c22e3f471a74999361eb

// All search requests should be made to the base search API URL. http://food2fork.com/api/search
// All recipe requests should be made to this URL: http://food2fork.com/api/get
//ex:http://food2fork.com/api/search?key={API_KEY}&q=shredded%20chicken


$(document).ready(function() {

  $("#ratingButton").click(function(e) {
    if($("#ratingButton").checked == true){
        $("#ratingButton").checked = false;
        $("#trendinessButton").checked = true;
    }else{
      $("#ratingButton").checked = true;
      $("#trendinessButton").checked = false;
    }
  }

  $("#trendinessButton").click(function(e) {
    if($("#trendinessButton").checked == false){
        $("#ratingButton").checked = false;
        $("#trendinessButton").checked = true;
    }else{
      $("#ratingButton").checked = true;
      $("#trendinessButton").checked = false;
    }
  }

  $("#foodSubmit").click(function(e) {
   e.preventDefault();
   var value = $("#foodInput").val();
       console.log(value);

       var count = 1;
       findResults(count);


        $("#NextButton").click(function(e) {
            count++;
            findResults(count);
        }
        $("#PrevButton").click(function(e) {
          if(count > 1){
            count--;
            findResults(count);
          }

        }
   });
});

function findResults(var count){

  var sort = $("#ratingButton").checked;
  var sortLetter;
  if(sort == true){
    sortLetter = "r";
  }else{
    sortLetter = "t";
  }

  var myurl= "http://food2fork.com/api/search?key={d30032dc58a7c22e3f471a74999361eb}&q=" + value + "sort=" + sortLetter + "page=" + count;
   $.ajax({
       url : myurl,
       dataType : "json",
       success : function(json) {
           console.log(json);
           var results = "";
           results += '<h2>Number of recipes: ' + json.count + "</h2>";

           for (var i=0; i<json.recipes.length; i++) {
               results += '<h3>' + json.recipes[i].title + "</h3>";
               results += '<p>Rank: ' + json.recipes[i].social_rank + "</p>";
               results += '<img src="' + json.recipes[i].image_url + '"/>';
               results += '<a href="' + json.recipes[i].source_url + '"/>';
               if( i < json.recipes.length -1){
                 results += "<hr>";
               }
           }

           results += '<button type="button" id="NextButton">Next</button>';
           results += '<button type="button" id="PrevButton">Previous</button>';

           $("#foodDisplay").html(results);

       }
   });

}
