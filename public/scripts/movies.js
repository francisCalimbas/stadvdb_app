$(document).ready(function () {
    $("#formsumbit").click(function (evt) {
        // evt.preventDefault()
        formdata = $('#form').serializeArray()
        let data =
        {
            numofroleschoice: formdata[0].value,
            numofrolesint: formdata[1].value,
            releasedonschoice: formdata[2].value,
            releasedonint: formdata[3].value,
            genre:formdata[4].value
        }
        console.log(data)
    })
})