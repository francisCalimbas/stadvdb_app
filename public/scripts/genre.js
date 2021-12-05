$(document).ready(function () {
    $("#formsumbit").click(function (evt) {
        evt.preventDefault()
        formdata = $('#form').serializeArray()
        let data =
        {
            rankchoice: formdata[0].value,
            rankint: formdata[1].value,
            releasedonschoice: formdata[2].value,
            releasedonint: formdata[3].value,
            genre:formdata[4].value
        }

        alert("remove this in the future")
    })
    
})