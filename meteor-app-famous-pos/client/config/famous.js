/**
 * Created by douson on 02.07.15.
 */

Transform = null;

FView.ready(function() {
    Transform = famous.core.Transform;

    if (Package['raix:famono']) {
        // load famous shims and CSS
        famous.polyfills;
        famous.core.famous;
    }
});