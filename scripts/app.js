var main = function () {
    $(".navigation ul li a").toArray().forEach(function(element){
        $(element).on("click",function(){
            var $element = $(element)
            $(".navigation ul li a").removeClass("active");
            $element.addClass("active");
            $(".list").empty();
            if($element.parent().is(":nth-child(1)")){
                $("h5").text("Игры для скачивания")
                download(testArr,false)
            } else if ($element.parent().is(":nth-child(2)")){
                $("h5").text("Установленные игры")
                download(testDounloadGames,true)
            }
            return false;
        })
    })
};
$(document).ready(main);
download(testArr)

function download(arr,downloaded){
    arr.forEach(function(element){
        var newLi = document.createElement('li');
        var newLink = document.createElement('a');
        newLink.href="moreInfo.html"
        if(downloaded)
            newLink.innerHTML='<div class="picture center"><img alt='+element.gameName+' src="'+element.imgSrc+'"></div><div class="description"><span class="game-name">'+element.gameName+'<button class="btn btn-danger">Удалить</button></span><span class="developer-name">'+element.developerName+'</span></div>'
        else
            newLink.innerHTML='<div class="picture center"><img alt='+element.gameName+' src="'+element.imgSrc+'"></div><div class="description"><span class="game-name">'+element.gameName+'</span><span class="developer-name">'+element.developerName+'</span></div>'
        newLi.append(newLink)
        $(".list").append(newLi)
    })
}