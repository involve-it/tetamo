/**
 * Created by douson on 01.07.15.
 */
$( function()
{
    // ACTIVITY INDICATOR

    var activityIndicatorOn = function()
        {
            $( '<div id="imagelightbox-loading"><div></div></div>' ).appendTo( 'body' );
        },
        activityIndicatorOff = function()
        {
            $( '#imagelightbox-loading' ).remove();
        },


    // OVERLAY

        overlayOn = function()
        {
            $( '<div id="imagelightbox-overlay"></div>' ).appendTo( 'body' );
        },
        overlayOff = function()
        {
            $( '#imagelightbox-overlay' ).remove();
        };


    $( 'a[data-imagelightbox="a"]' ).imageLightbox(
        {
            allowedTypes:   'jpg\\?store=images|png\\?store=images|jpeg\\?store=images|gif\\?store=images|png|jpg|jpeg|gif',
            onStart: 	 function() { overlayOn(); },
            onEnd:	 	 function() { overlayOff(); activityIndicatorOff(); },
            onLoadStart: function() { activityIndicatorOn(); },
            onLoadEnd:	 function() { activityIndicatorOff(); }
        });

    /* $( 'a.super' ).imageLightbox({
        selector:       'id="imagelightbox"',   // string;
        allowedTypes:   'png|jpg|jpeg|gif',     // string;
        animationSpeed: 250,                    // integer;
        preloadNext:    true,                   // bool;            silently preload the next image
        enableKeyboard: true,                   // bool;            enable keyboard shortcuts (arrows Left/Right and Esc)
        quitOnEnd:      false,                  // bool;            quit after viewing the last image
        quitOnImgClick: false,                  // bool;            quit when the viewed image is clicked
        quitOnDocClick: true,                   // bool;            quit when anything but the viewed image is clicked
        onStart:        false,                  // function/bool;   calls function when the lightbox starts
        onEnd:          false,                  // function/bool;   calls function when the lightbox quits
        onLoadStart:    false,                  // function/bool;   calls function when the image load begins
        onLoadEnd:      false                   // function/bool;   calls function when the image finishes loading
    });*/
});