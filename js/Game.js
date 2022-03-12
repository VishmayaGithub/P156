AFRAME.registerComponent("game-play", {
    schema: {
      elementId: { type: "string", default: "#coin1" },      
    },
    
    update: function() {
      this.isCollided(this.data.elementId);
    },

    init: function () {
      var duration = 120;
      const timerEl = document.querySelector("#timer");
      this.startTimer(duration, timerEl);
    },

    updateTarget : function(){
      var target = document.querySelector("#targetRemaining")
      var count = target.getAttribute("text").value
      var convert = parseInt(count)
      convert -= 1
      target.setAttribute("text",{value : convert})
    },
  
    updateScore : function(){
      var target = document.querySelector("#score")
      var count = target.getAttribute("text").value
      var convert = parseInt(count)
      convert += 1
      target.setAttribute("text",{value : convert})
  
    },

    startTimer: function (duration, timerEl) {
      var minutes;
      var seconds;
  
      setInterval(()=>{
        if (duration >= 0) {
          minutes = parseInt(duration / 60);
          seconds = parseInt(duration % 60);
  
          if (minutes < 10) {
            minutes = "0" + minutes;
          }
          if (seconds < 10) {
            seconds = "0" + seconds;
          }
  
          timerEl.setAttribute("text", {
            value: minutes + ":" + seconds,
          });
  
          duration -= 1;
        }      
        else {          
          this.gameOver()  
          
        }
      }, 1000);
  
     
    },
  
    gameOver : function(){
      var plane = document.querySelector("#scuba_driver")
      var element = document.querySelector("#gameOver") 
      plane.setAttribute("dynamic-body",{mass : 3})
      
      element.setAttribute("visible",true)
     
  
    },
  
    isCollided: function (elemntId) {
      const element = document.querySelector(elemntId);
      element.addEventListener("collide", (e) => {
        if (elemntId.includes("#coin")) {
          console.log("coin collision")
          this.updateScore()
          this.updateTarget()
          
        } else {
              this.gameOver()            
        }
      });
    },
    
  });
  