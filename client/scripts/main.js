$(function () {

    hljs.initHighlightingOnLoad();



    $('p a').attr('target', '_blank')

    
    var INDEX = 0;
    var ME = 'Bob';


    //
    //  nav width
    //

    var pageHeights = $('article').height();
    var sectionHeights = [];

    $('section').each(function () {
        sectionHeights.push($(this).outerHeight(true))
    });


    $(window).resize(function () {
        var navWidth = $('nav').width() - 1;

        $('nav li').each(function (i) {

            $(this).width(sectionHeights[i] * navWidth / pageHeights);
        })
    }).resize();


    //
    //  nav jump
    //

    var anchorPositions = [];

    $('section').each(function () {
        anchorPositions.push($(this).position().top);
    })

    $(window).scroll(function (event) {
        var offset = $(this).scrollTop() + 60;
        var index = 0;
        for (var i = 0, len = anchorPositions.length; i < len; i++) {
            if (offset < anchorPositions[i]) {
                index = i - 1;
                if (index < 0) index = 0;
                break;
            }
        }
        console.log(index)
        if (index != INDEX) {
            INDEX = index;
            $('nav li').removeClass();
            $('nav li').eq(INDEX).addClass('selected').addClass('color-' + index % 4);

        }
    })

    //
    //  nav select
    //

    $('nav li').click(function () {
        var index = $(this).index();

        $('nav li').removeClass();
        $(this).addClass('selected').addClass('color-' + index % 4);


    })


    //
    //  chatroom size
    //

    var chatroomHeight = $('#chatroom').height();
    var chatroomWidth = $('#chatroom').width();

    $('#textbox').width(chatroomWidth - 6)
    $('#log').height(chatroomHeight - 50)

    //
    //  socket.io
    //


    var socket = io.connect();

    socket.on('message', function (data) {
        console.log(data);

        $('#log ol').append('<li><span>' + data.name + '</span>: ' + data.message + '</li>');

        $('#log').scrollTop(999999);

    });


    socket.on('online', function (data) {

        $('#log ol').append('<li><span>' + data + ' 上線了</span></li>');

        $('#log').scrollTop(999999);

    });

    socket.on('offline', function (data) {
        $('#log ol').append('<li><span>' + data + ' 下線了</span></li>');

        $('#log').scrollTop(999999);

    });

    $('#form').submit(function () {
        var message = $('#textbox').val();
        $('#textbox').val('');

        $('#log ol').append('<li><span>' + ME + '</span>: ' + message + '</li>')

        socket.emit('message', {
            name: 'bob',
            message: message
        });

        $('#log').scrollTop(999999);

        return false;
    })





    //
    //  name
    //


    $('#iam').show()
        .width($(window).width())
        .height($(window).height());

    $('#iam input').focus();

    $('#iam form').submit(function () {
        ME = $('#iam input').val();


        socket.emit('online', ME);
        $('#log ol').append('<li><span>' + ME + '</span> 上線了</li>')

        
        $('#iam').hide();

        return false;
    });

})