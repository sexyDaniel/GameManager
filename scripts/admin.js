var testArr = [
    {
        "id" : "0",
        "gameName" : "Battlefront 2",
        "developerName":"EA Games",
        "imgSrc":"https://cdn1.epicgames.com/b156c3365a5b4cb9a01a5e1108b4e3f4/offer/EGS_STARWARSBattlefrontIICelebrationEdition_DICE_S2-1200x1600-11d040719a8457bbf36cabbe89b200db.jpg?h=854&resize=1&w=640"
    },
    {
        "id" : "1",
        "gameName" : "Cyberpunck",
        "developerName":"CDPR",
        "imgSrc":"https://cdn1.epicgames.com/77f2b98e2cef40c8a7437518bf420e47/offer/EGS_CDPROJEKTRED_CYBERPUNK2077_S3_DESCRIPTION-1280x1440-58949bccc0886694cf24d8c0f153d250-1280x1440-58949bccc0886694cf24d8c0f153d250.jpg?h=854&resize=1&w=640"
    },
    {
        "id" : "2",
        "gameName" : "Watch Dogs Legion",
        "developerName":"Ubisoft",
        "imgSrc":"https://cdn1.epicgames.com/0a84818055e740a7be21a2e5b6162703/offer/WatchDogs_Legion_Store_Portrait_1200x1600-1200x1600-a6b2d4cce489aeeb87bad4a6db168bed.jpg?h=854&resize=1&w=640"
    },
    {
        "id" : "3",
        "gameName" : "Amnesia",
        "developerName":"Frictional Games",
        "imgSrc":"https://cdn1.epicgames.com/b2df9b20c72446d690718965da41c7ad/offer/EGS_AmnesiaRebirth_FrictionalGames_S2-1200x1600-06261861317a4d878f0391cbcf127a5a.jpg?h=854&resize=1&w=640"
    },
    {
        "id" : "4",
        "gameName" : "Assasin Creed Valhalla",
        "developerName":"Ubisoft",
        "imgSrc":"https://cdn1.epicgames.com/400347196e674de89c23cc2a7f2121db/offer/AC%20KINGDOM%20PREORDER_STANDARD%20EDITION_EPIC_Key_Art_Portrait_640x854-640x854-288120c5573756cb988b6c1968cebd86.png?h=854&resize=1&w=640"
    },
    {
        "id" : "5",
        "gameName" : "Medium",
        "developerName":"Blood Team",
        "imgSrc":"https://cdn1.epicgames.com/e192c537dd6d47ce9a9b00b643c3cdb9/offer/EGS_TheMedium_BlooberTeam_S2-1200x1600-ae6bf4c64b365f9d90dba125c562f59a.jpg?h=854&resize=1&w=640"
    },
    {
        "id" : "6",
        "gameName" : "WoT",
        "developerName":"CDPR",
        "imgSrc":"https://cdn1.epicgames.com/2736ab9fec9c4a93a7a2872ed5154d4b/offer/egs-rage2-idsoftware-s2-1200x1600-ee8fcbffe5b0-1200x1600-d692008156cef0c206454ef84c987499.jpg?h=854&resize=1&w=640"
    },
    {
        "id" : "7",
        "gameName" : "WoT",
        "developerName":"CDPR",
        "imgSrc":"https://cdn1.epicgames.com/2736ab9fec9c4a93a7a2872ed5154d4b/offer/egs-rage2-idsoftware-s2-1200x1600-ee8fcbffe5b0-1200x1600-d692008156cef0c206454ef84c987499.jpg?h=854&resize=1&w=640"
    },
    {
        "id" : "7",
        "gameName" : "WoT",
        "developerName":"CDPR",
        "imgSrc":"https://cdn1.epicgames.com/2736ab9fec9c4a93a7a2872ed5154d4b/offer/egs-rage2-idsoftware-s2-1200x1600-ee8fcbffe5b0-1200x1600-d692008156cef0c206454ef84c987499.jpg?h=854&resize=1&w=640"
    },
    {
        "id" : "7",
        "gameName" : "WoT",
        "developerName":"CDPR",
        "imgSrc":"https://cdn1.epicgames.com/2736ab9fec9c4a93a7a2872ed5154d4b/offer/egs-rage2-idsoftware-s2-1200x1600-ee8fcbffe5b0-1200x1600-d692008156cef0c206454ef84c987499.jpg?h=854&resize=1&w=640"
    },
    {
        "id" : "7",
        "gameName" : "WoT",
        "developerName":"CDPR",
        "imgSrc":"https://cdn1.epicgames.com/2736ab9fec9c4a93a7a2872ed5154d4b/offer/egs-rage2-idsoftware-s2-1200x1600-ee8fcbffe5b0-1200x1600-d692008156cef0c206454ef84c987499.jpg?h=854&resize=1&w=640"
    },
    {
        "id" : "7",
        "gameName" : "WoT",
        "developerName":"CDPR",
        "imgSrc":"https://cdn1.epicgames.com/2736ab9fec9c4a93a7a2872ed5154d4b/offer/egs-rage2-idsoftware-s2-1200x1600-ee8fcbffe5b0-1200x1600-d692008156cef0c206454ef84c987499.jpg?h=854&resize=1&w=640"
    },
]
var main = function () {
    $(".active").on("click",function(){
        var $element = $(element)
        $(".navigation ul li a").removeClass("active");
        $element.addClass("active");
        $(".list").empty();
        if($element.parent().is(":nth-child(1)")){
            download(testArr)
        }
        return false;
    })

};
$(document).ready(main);
download(testArr)

function download(arr){
    arr.forEach(function(element){
        var newLi = document.createElement('li');
        var newLink = document.createElement('a');
        newLink.href="moreInfo.html"
        newLink.innerHTML='<div class="picture center"><img alt='+element.gameName+' src="'+element.imgSrc+'"></div><div class="description"><span class="game-name">'+element.gameName+'<button class="btn btn-danger">Удалить</button></span><span class="developer-name">'+element.developerName+'</span></div>'
        newLi.append(newLink)
        $(".list").append(newLi)
    })
}