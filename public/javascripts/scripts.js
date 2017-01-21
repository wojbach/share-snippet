(function (window, $) {
    "use strict";

    if ($('#code').length) {
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
            var mode = $(modeInput).find('[data-label="' + label + '"]').val();
            editor.setOption("mode", mode);
            CodeMirror.autoLoadMode(editor, mode);
            $(modeInput).find('[data-label="' + label + '"]').prop('selected', true);
            window.storePreferences("mode", label);
        };

        window.selectModeByValue = function (label) {
            label = label || $(modeInput).find(':selected').attr('data-label');
            window.selectMode(label);
        };

        window.loadCMPreferences = function () {
            var theme = $('#code').data('theme') || window.getPreferences('theme');
            if (theme) {
                window.selectTheme(theme);
            }

            var mode = $('#mode').data('value') || window.getPreferences('mode');
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
            if ($('.copy').length > 0) {
                $('form').submit(function (e) {
                    e.preventDefault();
                });
                var clipboard = new Clipboard('.copy');
                clipboard.on('success', function (e) {
                    var originalText = $(e.trigger).find('.label').text();
                    $(e.trigger).find('.label').text('Copied!');
                    setTimeout(function () {
                        $(e.trigger).find('.label').text(originalText);
                    }.bind(e), 1000);
                });
            }
        };

        window.bindForkButton = function () {
            if ($('.fork').length > 0) {
                $('form').submit(function (e) {
                    e.preventDefault();
                });
                $('.fork').click(function () {
                    window.location.assign($(this).data('url'));
                });
            }
        };

        window.loadCMPreferences();
        window.bindModeLabelGrab();
        window.bindCopyButton();
        window.bindForkButton();
    }

    if ($('#browse_snippets').length > 0) {
        window.initDatatables = function () {
            $('#browse_snippets').DataTable({
                "order": [[ 0, "desc" ]]
            });
        };
        window.initDatatables();
    }

})(window, jQuery);