(function (window, $) {
    "use strict";

    if($('#code').length) {
        CodeMirror.modeURL = "/bower_components/codemirror/mode/%N/%N.js";
        var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
            lineNumbers: true,
            styleActiveLine: true,
            matchBrackets: true,
            lineWrapping: true
        });
        var themeInput = document.getElementById("theme");

        window.selectTheme = function (theme) {
            theme = theme || $(themeInput).val();
            $(themeInput).val(theme);
            editor.setOption("theme", theme);
            window.storePreferences("theme", theme);
        };

        var modeInput = document.getElementById("mode");

        window.selectMode = function (label) {
            label = label || $(modeInput).find(':selected').attr('data-label');
            var mode = $(modeInput).find('[data-label="' + label + '"]').val();
            editor.setOption("mode", mode);
            CodeMirror.autoLoadMode(editor, mode);
            $(modeInput).find('[data-label="' + label + '"]').prop('selected', true);
            window.storePreferences("mode", label);
        };

        window.loadCMPreferences = function () {
            var theme = window.getPreferences('theme');
            if (theme) {
                window.selectTheme(window.getPreferences('theme'));
            }

            var mode = window.getPreferences('mode');
            if (mode) {
                window.selectMode(mode);
            }
        };


        window.storePreferences = function (key, value) {
            if (typeof(Storage) !== "undefined") {
                localStorage.setItem(key, value);
            }
        };

        window.getPreferences = function (key) {
            if (typeof(Storage) !== "undefined") {
                return localStorage.getItem(key);
            }
        };

        window.bindModeLabelGrab = function () {
            $('form').submit(function () {
                $('#mode_label').val($('#mode').find('option:selected').text());
            });
        };

        window.bindCopyButton = function () {
            if($('.copy').length > 0) {
                $('form').submit(function(e){
                    e.preventDefault();
                });
                var clipboard = new Clipboard('.copy');
                clipboard.on('success', function(e) {
                    var originalText = $(e.trigger).find('.label').text();
                    $(e.trigger).find('.label').text('Copied!');
                    setTimeout(function(){
                        $(e.trigger).find('.label').text(originalText);
                    }.bind(e), 1000);
                });
            }
        }

        window.loadCMPreferences();
        window.bindModeLabelGrab();
        window.bindCopyButton();
    }

    window.initDatatables = function() {
        $('#browse_snippets').DataTable();
    };
    window.initDatatables();


})(window, jQuery);