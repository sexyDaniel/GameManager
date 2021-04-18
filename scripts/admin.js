var jsonUsers

$(".link").on("input",()=>{
    $("img").attr('src', $(".link").val());
})


$(document).ready(function(){
    $.getJSON("/admin/jsonUsers",function(users){
        var link = null
        for(var i = 0; i<users.length;i++){
            var $li = $("<li>")
            $li.append(`<div class="user center"> <div class="description"> <h4 >Информация:</h4> <span >Username: ${users[i].username}</span> <span >FirstName:  ${users[i]?.firtsName}</span> <span >LastName:  ${users[i].lastName}</span> <span >Email:  ${users[i].email}</span>  </div>   </div>`)
            var $deleteButton = $("<button>")
            $deleteButton.text("Удалить")
            $deleteButton.addClass("btn btn-danger")
            const link= "/admin/deleteUser/"+users[i]._id
            console.log(link)
            $deleteButton.on("click", function () {
                if(confirm("Вы точно хотите удалить этого пользователя?"))
                {
                    $.ajax({
                        "url": link,
                        "type": "POST"
                    }).done(function (response) {
                        console.log("OK");
                        document.location.href = "/admin/users/";
                    }).fail(function (err) {
                        console.log("error on delete 'user'!");
                    });
                }
            });
            $li.append($deleteButton)
            $(".user_list").append($li)
        }
        console.log(users)
    })
});