

 <input type="text" id="password" value="asdsa">
  
  <br><br>







<script type="text/javascript">

    (function ($) {
        $.fn.passwordValidation = function (options) {
            
            var element = this;
            var settings = $.extend({
                MinLength: 6,
                isUnderline: "true"
            }, options);
          
          //Loading CSS at runtime
          function loadCSS() {
              var cssText = ".pv_popup{background-color:#fff;padding:10px 25px;width:90px;font-size:12px;box-shadow:0 4px 8px 0 rgba(0,0,0,.2),0 6px 20px 0 rgba(0,0,0,.19);z-index:500;position:absolute;display:none;font-family:sans-serif;line-height:1.7}";
              var css = document.createElement("style");
              css.type = "text/css";
              if ("textContent" in css) css.textContent = cssText;
              else css.innerText = cssText;
              document.body.appendChild(css);
          }
          
          function loadUI(){
              loadCSS();
              var htmlText = '<div class="pv_popup" > <div id="pv_isLowerCase"><span class="pv_isValid"></span> Lower Case</div><div id="pv_isUpperCase"><span class="pv_isValid"></span> Upper Case</div><div id="pv_isNumber"><span class="pv_isValid"></span> Number</div><div id="pv_isSymbol"><span class="pv_isValid"></span> Symbol</div><div id="pv_isMinLength"><span class="pv_isValid"></span> Min Length</div><div id="pv_isValid"><span class="pv_isValid"></span> Valid Password</div><div id="pv_isStrong"><span class="pv_isValid"></span> Strength( <span id="pv_isStrong_value">0</span>% )</div></div>';
              $(element).parent().append(htmlText);

              var divToPop = ".pv_popup";
              var pos=$(element).offset();
              var h=$(element).height();
              var w=$(element).width();

              $(divToPop).css({ left: pos.left + w + 10, top: pos.top});

              $(element).focus(function(e) {
               $(divToPop).show();
              });

               $(element).blur(function(e) {
                $(divToPop).hide();
              });
          }
          
          var validations = {
            isLowerCase : false,
            isUpperCase : false,
            isNumber : false,
            isAlphabet : false,
            isSymbol : false,
            isMinLength:false,
            isValid:false,
            isStrong:false,
            isStrongValue:0
          }
          
          var regexValid = {
            isLowerCase : new RegExp("[a-z]"),
            isUpperCase : new RegExp("[A-Z]"),
            isNumber : new RegExp("[0-9]"),
            isAlphabet : new RegExp("[A-z]"),
            isSymbol : new RegExp("[!@$&\^\*\(\)]"),
            isMinLength : new RegExp(".{"+settings.MinLength+"}")
          }
         
          loadUI();
          
          this.keyup("click", function(){
            var temp =  $(this).val();
            validations.isLowerCase = regexValid.isLowerCase.test(temp);
            validations.isUpperCase = regexValid.isUpperCase.test(temp);
            validations.isNumber = regexValid.isNumber.test(temp);
            validations.isAlphabet = regexValid.isAlphabet.test(temp);
            validations.isSymbol = regexValid.isSymbol.test(temp);
            validations.isMinLength = regexValid.isMinLength.test(temp);
            
            validations.isValid = (validations.isLowerCase && validations.isUpperCase && validations.isNumber && validations.isAlphabet && validations.isSymbol && validations.isMinLength )
            
            validations.isStrongValue = scorePassword(temp);
            validations.isStrong = false;
            updateDisplay();
            //console.log(validations);
        });
          
          function scorePasswordValue(){
            
          }
          
          function scorePassword(pass) {
              var score = 0;
              if (!pass)
                  return score;

              // award every unique letter until 5 repetitions
              var letters = new Object();
              for (var i=0; i<pass.length; i++) {
                  letters[pass[i]] = (letters[pass[i]] || 0) + 1;
                  score += 5.0 / letters[pass[i]];
              }

              // bonus points for mixing it up
              var variations = {
                  digits: /\d/.test(pass),
                  lower: /[a-z]/.test(pass),
                  upper: /[A-Z]/.test(pass),
                  nonWords: /\W/.test(pass),
              }

              variationCount = 0;
              for (var check in variations) {
                  variationCount += (variations[check] == true) ? 1 : 0;
              }
              score += (variationCount - 1) * 10;

              return parseInt(score);
          }

          function getColor(isValid){
              if(isValid){
                return "green";
              }
            else{
              return "red";
            }
          }
            function updateDisplay(){
              $(".pv_popup #pv_isLowerCase").css("color",getColor(validations.isLowerCase));
              $(".pv_popup #pv_isUpperCase").css("color",getColor(validations.isUpperCase));
              $(".pv_popup #pv_isNumber").css("color",getColor(validations.isNumber));
              //$(".pv_popup #pv_isAlphabet").css("color",getColor(validations.isAlphabet));
              $(".pv_popup #pv_isSymbol").css("color",getColor(validations.isSymbol));
              $(".pv_popup #pv_isMinLength").css("color",getColor(validations.isMinLength));
              $(".pv_popup #pv_isValid").css("color",getColor(validations.isValid));
              $(".pv_popup #pv_isStrong #pv_isStrong_value").text(validations.isStrongValue);
            }
            updateDisplay();
          
            return this;
        }
    } (jQuery));

    $("#password").passwordValidation({MinLength:10});
  
    </script>
