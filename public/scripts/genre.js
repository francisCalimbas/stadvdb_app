$(document).ready(function () {
    $('#example').DataTable();
    $('#formsumbit').submit(function()
    {
        $("#numofroleschoice").val("")
        $("#numofrolesint").val("")
        $("#releasedonschoice").val("")
        $("#releasedonint").val("")
        $("#genre").val("")
    })
})