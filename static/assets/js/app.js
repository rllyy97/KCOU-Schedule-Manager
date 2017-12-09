var app = new Vue({
  el: '#showApp',
  data: {
    shows: []
  },
  mounted: function(){
    var showHolder = this;
    $.get("/getShows", function(data){
      showHolder.shows = data;
      showHolder.shows.forEach(function(show){
        var starting = show.start_time.slice(0,2);
        switch(starting){
          case "00":
            show.starts = "midnight";
            break;
          case "01":
            show.starts = "oneAM";
            break;
          case "02":
            show.starts = "twoAM";
            break;
          case "03":
            show.starts = "threeAM";
            break;
          case "04":
            show.starts = "fourAM";
            break;
          case "05":
            show.starts = "fiveAM";
            break;
          case "06":
            show.starts = "sixAM";
            break;
          case "07":
            show.starts = "sevenAM";
            break;
          case "08":
            show.starts = "eightAM";
            break;
          case "09":
            show.starts = "nineAM";
            break;
          case "10":
            show.starts = "tenAM";
            break;
          case "11":
            show.starts = "elevenAM";
            break;
          case "12":
            show.starts = "twelve";
            break;
          case "13":
            show.starts = "onePM";
            break;
          case "14":
            show.starts = "twoPM";
            break;
          case "15":
            show.starts = "threePM";
            break;
          case "16":
            show.starts = "fourPM";
            break;
          case "17":
            show.starts = "fivePM";
            break;
          case "18":
            show.starts = "sixPM";
            break;
          case "19":
            show.starts = "sevenPM";
            break;
          case "20":
            show.starts = "eightPM";
            break;
          case "21":
            show.starts = "ninePM";
            break;
          case "22":
            show.starts = "tenPM";
            break;
          case "23":
            show.starts = "elevenPM";
            break;
        }
      })
    });
  },
  computed: {
    classObject: function(x) {
      console.log(x);
      console.log("Ok");
      return {special: true}
    }
  },
  methods: {
    showIndex: function(x){
      console.log(this.shows[x].category);
      category=this.shows[x].category;
      if(category == "specialty"){
        spec = true;
        console.log("Yoooo")
        return
        {special: true }
      }
    }
  }
});
