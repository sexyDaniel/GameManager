var main = function () {
    $(".navigation ul li a").toArray().forEach(function(element){
        $(element).on("click",function(){
            var $element = $(element)
            $(".navigation ul li a").removeClass("active");
            $element.addClass("active");
            if($element.parent().is(":nth-child(1)")){
                $("#0 h5").text("Регистрация")
                $("form").removeClass("autentification-form")
                $("form").addClass("registration-form")
            } else if ($element.parent().is(":nth-child(2)")){
                $("#0 h5").text("Аутентификация")
                $("form").removeClass("registration-form")
                $("form").addClass("autentification-form")
            }
            return false;
        })
    })
};
$(document).ready(main);