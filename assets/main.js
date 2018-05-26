var summe = 0;

$(document).ready(function () {
   $("#result").text(summe.toString());
});

$(".align-img-left").on('click',function () {
    var i = 0;
    var info = $(this).nextUntil(".align-img-right");
    var length = info.length;
    var type = $(this).parent().parent().attr('id');

        while(i <= length){

            if(type === 'eins')
            {
                summe += 1;
            }
            else if(type === 'zehn'){
                summe += 10;
            }
            else if(type === 'hundert'){
                summe += 100;
            }
            else if(type === 'tausend'){
                summe += 1000;
            }
            else if(type === 'zehntausend'){
                summe += 10000;
            }

            i++;
        }

        $(this).addClass("align-img-right").removeClass("align-img-left");
        $(this).nextUntil(".align-img-right").addClass("align-img-right").removeClass("align-img-left");

        if(summe%10 == 0)
        {
            $(this).parent().children().removeClass("align-img-right").addClass("align-img-left");
            $(this).parent().parent().children(".stange").children().last().addClass("align-img-right");
            var rows = $(this).parent().parent().siblings();

            rows.each(function () {
                var count = $(this).children(".stange").children().hasClass("align-img-right");
                if(count == 9)
                {
                    $(this).children(".stange").children().removeClass("align-img-right");
                }
            });
        }

    $("#result").text(summe.toString());
});

$(".align-img-right").on('click',function () {
    var i = 0;
    var info = $(this).nextAll();
    var length = info.length;
    var type = $(this).parent().parent().attr('id');

    while(i <= length){

        if(type === 'eins')
        {
            summe -= 1;
        }
        else if(type === 'zehn'){
            summe -= 10;
        }
        else if(type === 'hundert'){
            summe -= 100;
        }
        else if(type === 'tausend'){
            summe -= 1000;
        }
        else if(type === 'zehntausend'){
            summe -= 10000;
        }

        i++;
    }

    $(this).addClass("align-img-left");
    $(this).removeClass("align-img-right");
    $(this).nextAll().addClass("align-img-left");
    $(this).nextAll().removeClass("align-img-right");
    $("#result").text(summe.toString());
});
