$(function() {
    var easy_words = ['home','sun','toy','cat','pencil','rain','eye','hat','dress','window'];
    var easy_words_translate = ['дім','сонце','іграшка','кіт','олівець','дощ','око','капелюх','сукня','вікно'];
    var medium_words = ['joke','attempt','citizen','crowd','influence','leak','issue','jungle','arrow','soil'];
    var medium_words_translate = ['жарт','спроба','громадянин','натовп','вплив','витік','проблема','джунглі','стріла','грунт'];
    var hard_words = ['arcane','bizarre','hypocrisy','colander','drought','martial','waver','static','recant','noxious'];
    var hard_words_translate = ['таємничий','химерний','лицемірство','друшляк','посуха','бойовий','коливатися','статичний','відректися','шкідливий'];
    var source_arr = [];
    var translate_arr = [];
    var arr_used_idx = [];
    var bool1 = false;
    var bool2 = true;
    var points=0;
    var misses = 0;
    var attempt = 0;
        $("#play").click(function(){
        if(!bool1){
            if( $("input.check").is(":checked")){
                $("input.check").attr("disabled", true);
                $("#guess").prop("disabled", false);
                if( $("#easy").prop('checked')){
                    source_arr = [].concat(easy_words);
                    translate_arr = [].concat(easy_words_translate);
                }
                if( $("#medium").prop('checked')){
                    if(source_arr.length==0){
                        source_arr = [].concat(medium_words);
                        translate_arr = [].concat(medium_words_translate);
                    } else{
                        source_arr = easy_words.concat(medium_words);
                        translate_arr = easy_words_translate.concat(medium_words_translate);
                    }
                }
                if( $("#hard").prop('checked')){
                    if(source_arr.length==0){
                        source_arr = [].concat(hard_words);
                        translate_arr = [].concat(hard_words_translate);
                    } else{
                        source_arr = source_arr.concat(hard_words);
                        translate_arr = translate_arr.concat(hard_words_translate);
                    }
                }
                arr_used_idx[0] = Math.floor(Math.random()*(source_arr.length));
                $("#button_text").text('Continue');
                $("#words span").text(source_arr[arr_used_idx[0]]);
                bool1 = true;
                attempt = 1;
                $("#progress_bar span").text(attempt);
            }
        } else {    
        if(!$("#guess").val()){
            alert("Input your answer!");
        } else{
            if(attempt<=10){
            var str = $("#guess").val();
            var res = str.toLowerCase();
            $("#words span").text(translate_arr[arr_used_idx[attempt-1]]);
            if(res!=translate_arr[arr_used_idx[attempt-1]]){
                $("#word_container").css({'background-color':'#DE5E5B','font-family': 'Roboto Condensed, sans-serif'});
                misses++;
                $("#misses").text(misses);
            } else{
                $("#word_container").css({'background-color':'#85D181','font-family': 'Roboto Condensed, sans-serif'});
                points++;
                $("#points").text(points);
            }
            $("#guess").val('');
            if(attempt!=10){
            setTimeout(function() {
                attempt++;
                $("#word_container").css({'background-color':'#F3F0EC','font-family': 'Bebas Neue, cursive'});
                while(bool2){
                    var i = Math.floor(Math.random()*(source_arr.length));
                    if(arr_used_idx.indexOf(i)==-1){
                        arr_used_idx[attempt-1] = i;
                        bool2 = false;
                    }
                }
                $("#words span").text(source_arr[arr_used_idx[attempt-1]]);
                $("#progress_bar span").text(attempt);
                bool2 = true;
              }, 1000);
            } else {
                setTimeout(function() {alert('You have '+points+' points! Restart?');
                location.reload();
            }, 1500);
            }
            }
        }
        }

    });


});