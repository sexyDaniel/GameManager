var testArr = [
    {
        "id" : "0",
        "gameName" : "Final Fantasy",
        "developerName":"CDPR",
        "imgSrc":"https://cdn1.epicgames.com/bf333e6236914222a95a536389c05813/offer/EGS_PHANTASYSTARONLINE2_SEGACorporation_S2-1200x1600-08cb584274b92255c62f60a996deef0e.jpg?h=854&amp;resize=1&amp;w=640"
    },
    {
        "id" : "1",
        "gameName" : "Cyberpunck",
        "developerName":"CDPR",
        "imgSrc":"https://cdn1.epicgames.com/bf333e6236914222a95a536389c05813/offer/EGS_PHANTASYSTARONLINE2_SEGACorporation_S2-1200x1600-08cb584274b92255c62f60a996deef0e.jpg?h=854&amp;resize=1&amp;w=640"
    },
    {
        "id" : "2",
        "gameName" : "WoT",
        "developerName":"CDPR",
        "imgSrc":"https://cdn1.epicgames.com/2736ab9fec9c4a93a7a2872ed5154d4b/offer/egs-rage2-idsoftware-s2-1200x1600-ee8fcbffe5b0-1200x1600-d692008156cef0c206454ef84c987499.jpg?h=854&resize=1&w=640"
    },
    {
        "id" : "3",
        "gameName" : "GTA 6",
        "developerName":"CDPR",
        "imgSrc":"https://cdn1.epicgames.com/bf333e6236914222a95a536389c05813/offer/EGS_PHANTASYSTARONLINE2_SEGACorporation_S2-1200x1600-08cb584274b92255c62f60a996deef0e.jpg?h=854&amp;resize=1&amp;w=640"
    },
    {
        "id" : "4",
        "gameName" : "Sword art online",
        "developerName":"CDPR",
        "imgSrc":"https://cdn1.epicgames.com/bf333e6236914222a95a536389c05813/offer/EGS_PHANTASYSTARONLINE2_SEGACorporation_S2-1200x1600-08cb584274b92255c62f60a996deef0e.jpg?h=854&amp;resize=1&amp;w=640"
    },
    {
        "id" : "5",
        "gameName" : "Final Fantasy 7",
        "developerName":"CDPR",
        "imgSrc":"https://cdn1.epicgames.com/bf333e6236914222a95a536389c05813/offer/EGS_PHANTASYSTARONLINE2_SEGACorporation_S2-1200x1600-08cb584274b92255c62f60a996deef0e.jpg?h=854&amp;resize=1&amp;w=640"
    }
]
var main = function () {
    testArr.forEach(function(element){
        var newLi = document.createElement('li');
        var newLink = document.createElement('a');
        newLink.href="moreInfo.html"
        newLink.innerHTML='<div class="picture center"><img alt='+element.gameName+' src="'+element.imgSrc+'"></div><div class="description"><span class="game-name">'+element.gameName+'</span><span class="developer-name">'+element.developerName+'</span></div>'
        newLi.append(newLink)
        $(".list").append(newLi)
    })
    $("nav a").toArray().forEach(function(element){
        $(element).on("click",function(){
            var $element = $(element)
            $("nav a").removeClass("active");
            $element.addClass("active");
            return false;
        })
    })
};
$(document).ready(main);