var election = {};

election.dom = {}

election.dom.signup = function(){
  if(window.location.pathname !== '/signup') return false;
  $('#signup-form button').click(function(){
    var data = $('#signup-form').serializeArray();
    for (var i = 0; i < data.length; i++) {
      if(data[i].value.length==0) return;
    }
    $.post('/api/electors', $('#signup-form').serialize()).done(function(r){
      alert("You signed up for the Election 2017. \n You will now be redirect to the vote page.");
      window.location.replace(window.location.origin+'/vote');
    });
  });
};

election.dom.vote = function(){
  if(window.location.pathname !== '/vote') return false;
  $.get('/api/electors', function(response){
    for (var i=0; i<response.data.length; i++) {
      var e = response.data[i];
      $('#vote-form select[name=elector_id]').append('<option value="'+e.id+'">'+e.email+'</option>');
    }
  });
  $.get('/api/candidates', function(response){
    for (var i=0; i<response.data.length; i++) {
      var e = response.data[i];
      $('#vote-form select[name=candidate_id]').append('<option value="'+e.id+'">'+e.lastname.toUpperCase()+' '+e.firstname.ucfirst()+'</option>');
    }
  });
  $('#vote-form button').click(function(){
    var data = $('#vote-form').serializeArray();
    if(data[0].value === undefined || data[1].value === undefined) return;
    $.post('/api/votes', $('#vote-form').serialize()).done(function(r){
      alert("Your vote has been record. \n You will now be redirect the chart page.");
      window.location.replace(window.location.origin+'/chart');
    })
    // send the request
  });
};

election.dom.chart = function(){
  if(window.location.pathname !== '/chart') return false;
  // Basic data object for chartJs
  var dataChart = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56"
      ],
      hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56"
      ]
    }]
  };
  // Fill the dataChart object with the data returned by the API
  $.get('/api/votes', function(response){
    for (var i=0; i<response.data.length; i++) {
      var e = response.data[i];
      dataChart.labels.push(e.firstname.ucfirst() + ' ' + e.lastname.ucfirst());
      dataChart.datasets[0].data.push(e.votes);
    }
  }).done(function(r){
    var voteChart = new Chart($("#voteChart"), {
      type: 'doughnut',
      data: dataChart,
      options: {}
    });
  });
};

election.dom.signup();
election.dom.vote();
election.dom.chart();
