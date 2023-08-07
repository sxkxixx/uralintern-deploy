const ctx = document.getElementById('myChart');
const commontx = document.getElementById('commonChart');
const commandtx = document.getElementById('commandChart');
const labels=[{text:'Вовлеченность', fillStyle:'rgba(245, 124, 0, 1)'},
{text:'Организованность', fillStyle:'rgba(245, 124, 0, 1)'},
{text:'Обучаемость', fillStyle:'rgba(245, 124, 0, 1)'},
{text:'Командность', fillStyle:'rgba(245, 124, 0, 1)'}]
const data={
    labels: ['Вовлеченность','Обучаемость','Организованность','Командность'],
    datasets: [{
        data: [2, 1, -1, 0],
        fill: false,
        backgroundColor: 'rgb(245, 245, 245)',
        borderColor: 'rgba(245, 124, 0, 1)',
        pointBackgroundColor: 'rgba(245, 124, 0, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: 'rgb(245, 245, 245)',
        pointHoverBorderColor: 'rgb(245, 245, 245)',
        hoverBackgroundColor:'rgb(245, 245, 245)'
    }]
};

/*new Chart(ctx, {
    type: 'radar',
    data: data,
    options:{
      responsive: true,
      scales: {
          reverse: false,
                    scaleLabel: {
                                          display  : true,
                                          fontSize : 8,
                                          fontColor: "#4a4a4a"
                                      }
      }
    }
  });*/

    new Chart(ctx, {
    type: 'radar',
    data:data,
    options : {
        scales: {
            r: {
                angleLines: {
                    display: false
                },
                suggestedMin: -1,
                suggestedMax: 3,
                color: 'rgba(0, 0, 0, 1)',
                fontSize: 24
            }
            
        },
        plugins:{
            legend:false,
            labels:{
                fontSize:20,
                fontColor:'red'
            }
        },
    }
});


  new Chart(commontx, {
    type: 'radar',
    data:data,
    options : {
        scales: {
            r: {
                angleLines: {
                    display: false
                },
                suggestedMin: 0,
                suggestedMax: 3,
                color: 'rgba(0, 0, 0, 1)',
                fontSize: 24
            },
            
        },
        plugins:{
            legend:false,
            labels:{
                fontSize:20,
                fontColor:'black'
            }
        }
        
    }
  });


  new Chart(commandtx, {
    type: 'radar',
    data:data,
    options : {
        scales: {
            r: {
                angleLines: {
                    display: false
                },
                suggestedMin: 0,
                suggestedMax: 3,
                color: 'rgba(0, 0, 0, 1)',
                fontSize: 24
            }
            
        },
        plugins:{
            legend:false,
            labels:{
                fontSize:20,
                fontColor:'black'
            }
        }
        
    }
  });

 /*const g= new Chart(ctx, {
    type: 'radar',
    data: {
        labels: ['Вовлеченность', 'Организованность', 'Обучаемость', 'Командность'],
        datasets: [
            {
                data: [
                    0, 2,
                ],
            }
        ]
    },
    options: {
        responsive: true,
        legend: {
            position: 'left'
        },
        title: {
            display: true,
            text: "It work's"
        },
        animation: {
            animateScale: true,
            animateRotate: true
        },
        scale: {
            // ticks: {
            //     backdropColor: 'red',
            //     // Include a dollar sign in the ticks
            //     callback: function(value, index, values) {
            //         return '$' + value;
            //     }
            // }
            pointLabels: {
                // callback: function(value, index, values) {
                //     return '$' + value;
                // }
                fontColor: '#FFFFFF',
            },
        },
    }
});

ctx.fillStyle = "orange";*/