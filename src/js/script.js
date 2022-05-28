$(document).on("keypress", "input", function(e){
    if(e.which == 13) {
        var inputVal = $(this).val();
        $("#foods").append(
            "<span>" + inputVal + "<button id=" + inputVal + " class='btn btn-sm btn-outline-light' onclick='remove(" + inputVal + ")'>X</button></span>"
        )
        $(this).val("");
    }
});

function remove(food){
    console.log(food);
}

function search(){
    let foods = "";
    const apiKey = "1e203d1d59c645928e493f2d029b2d6f";
    $("#foods span").each(function(element){
        foods += ($(this).text().substring(0, $(this).text().length - 1) + ",+");
    });

    let url = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=" + apiKey + "&ingredients=" + foods;

    $.ajax({
        url: url,
        success: function(response){
            response.forEach(res => {
                $("#result_modal_body").append(
                    "<div>" +
                    "<span class='d-flex justify-content-center'><img src=" + res.image + " width=212 height=131/></span>" +
                    "<span class='d-flex justify-content-center mt-3'><p>" + res.title + "<p></span>" +
                    "</div>" +
                    "<hr />"
                );
            })
            $("#result_modal").modal('show');
        },
        error: function(response){
            console.log("erreur");
        }
    });

}