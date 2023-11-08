let user = [
    {
        id: "00001",
        login: "MDK91",
        password: "12345",
        username: "Fazilat",
    }
]
let payArray = [];
$("#editBtn").click(function (){
    let id = $(this).attr("id");
    payArray.forEach(function (item,i){
        if (id == item.id){
            payArray[i].payUser = $('#payEditUser').val();
            payArray[i].payUserId = $('#payEditUserId').val();
            payArray[i].payOrder = $('#payEditOrder').val();
            payArray[i].paySum = $('#payEditSum').val();
            payArray[i].payTarget = $('#payEditTarget').val();
            payArray[i].payType = $('#payEditType').val();
            payArray[i].payDate = $('#payEditDate').val();
        }
    });
    $("#editModal").modal("hide");
    draw();
})
function edit(id){
    payArray.forEach(function (item){
        if(id == item.id){
            $("#payEditUser").val(item.payUser);
            $("#payEditUserId").val(item.payUserId);
            $("#payEditOrder").val(item.payOrder);
            $("#payEditSum").val(item.paySum);
            $("#payEditTarget").val(item.payTarget);
            $("#payEditType").val(item.payType);
            $("#payEditDate").val(item.payDate);
            $("#payEditBtn").attr("id",item.id);
        }
    })
}
function remove(id){
    payArray.forEach(function (item,i){
        if (id == item.id){
            payArray.splice(i,1);
        }
    });
    draw();
}
function draw(){
    let list = '';
    payArray.forEach(function (item){
        list +='<tr>' +
            '<td>'+ item.id +'</td>' +
            '<td>'+ item.payUser+'</td>' +
            '<td>'+ item.paySum +'</td>' +
            '<td>'+ item.payOrder +'</td>' +
            '<td>' +
            '<span class="badge badge-info">'+ item.payTarget +'</span>' +
            '</td>' +
            '<td>'+ item.payDate +'</td>' +
            '<td>' +
            '<button type="button" class="btn btn-info" data-toggle="modal" data-taget="#editModal" onclick="edit('+item.id+')">Edit</button>' +
            '<button type="button" class="btn btn-danger" onclick="remove('+item.id+')"">Remove</button>' +
            '</td>' +
            '</tr>'
    })
    $("#tbody").html(list);
}
$(document).ready(function (){
    let kirishSoni = 0;
    let payId = 0;
    let kassirId = '';
    $('#startModal').modal("show");
    $('#startBtn').click(function (){
        let login = $('#login').val();
        let password = $ ("#password").val();
        if (login !="" && password !=""){
            let topildi = false;
            user.forEach(function (item){
                if (login == item.login){
                    topildi = true;
                    if (password == item.password){
                        $("#workingBlock").toggleClass("d-none")
                        $("#kassir").html(item.username);
                        $("#startModal").modal("hide");
                        topildi = true;
                        kassirId = item.id
                    }
                }
            });
            if (!topildi){
                if (kirishSoni >=2){
                    $("#startModal").modal("hide");
                    alert("Tizim bloklandi!");
                }
                alert("Login yoki parol xato!")
                kirishSoni++;
            }
        }
        else {
            alert("login va parol qatorlarni to'ldiring")
        }
    })
    $("#addPay").click(function (){
        let payUser = $("#payUser").val();
        let payUserId = $("#payUserId").val();
        let payOrder = $("#payOrder").val();
        let paySum = $("#paySum").val();
        let payType = $("#payType").val();
        let payTarget = $("#payTarget").val();
        let payDate= $("#payDate").val();
        payId++;

        payArray.push(
            {
                id:payId,
                userId: kassirId,
                payUserId: payUserId,
                payUser: payUser,
                payOrder: payOrder,
                paySum: paySum,
                payType:payType,
                payTarget: payTarget,
                payDate:payDate
            }
        )
        draw();
    })
});

let todoList = [];
let tr = 1;
let allTask = 0;
let completeTask = 0;

function addTask() {
    let taskName = document.getElementById('taskInput').value;
    if (taskName !=''){
        let obj = {
            tartib: tr++,
            name: taskName,
            complete: false
        };
        todoList.push(obj);
        chizish()
        allTask = todoList.length
        document.getElementById('allTask').innerText = allTask
    }
}

function chizish() {
    let list = '';
    todoList.forEach(function (item) {
        list +=  '<li class="list-group-item">'+
            ' <input '+ (item.complete ? "checked" : "") + ' onchange="completed(this)" type="checkbox" class="mr-2" id="'+ item.tartib +'">' +
            '<label for="'+item.tartib+'">'+item.name+'</label>'+
            ' </li>'
    });
    document.getElementById('list').innerHTML = list;
    document.getElementById('completeTask').innerText = completeTask;
    let progressW = (completeTask * 100) / allTask;
    document.getElementById("progress").style.width = progressW + "%";
}
function completed(input) {
    let searchId = input.getAttribute("id");
    let checked = input.getAttribute("checked");

    todoList.forEach(function (item,i){
        if (item.tartib == searchId){
            todoList[i].complete = item.complete ? false : true;
        }
    });

    console.log(checked);
    if (checked == null){
        completeTask++
    }else{
        completeTask--
    } chizish();
}



