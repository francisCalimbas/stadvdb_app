$(document).ready(function () {
    
    $('#example').DataTable({
        "order": [[ 1, "desc" ]]
    });
let myChart = $("#myChart")[0].getContext('2d');

let directorNamesDiv = $('#datanames')
let directorValueDiv = $('#datavalue')

console.log(directorNamesDiv.children())

let directorNames = []
let directorValue = []


$('#datanames').children().each(function () {
    directorNames.push(this.innerHTML);
});
$('#datavalue').children().each(function () {
    directorValue.push(parseFloat(this.innerHTML));
});



console.log(directorNames)
console.log(directorValue)



let chart = new Chart(myChart, {
    type: 'bar',
    data:{
        labels: directorNames,
        datasets:[{
            label:'Movie Scores',
            data:directorValue,
            backgroundColor:['#34aeeb',
            '#3499eb',
            '#3483eb',
            '#345feb',
            '#344feb',
            '#343aeb',
            '#4634eb',
            '#6234eb',
            '#8334eb',
            '#9634eb'],
            borderWidth: 4,
            borderColor:'#777',
            hoverBorderWidth:3,
            hoverBorderColor:"black"
        }]
       
    }
})

})