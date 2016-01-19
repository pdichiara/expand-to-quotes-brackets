// base from: https://github.com/itbaby/brackets-expand-selection-to-quotes
define(function(require,exports,module){

   var AppInit = brackets.getModule('utils/AppInit'),
       KeyBindingManager = brackets.getModule('command/KeyBindingManager'),
       CommandManager = brackets.getModule('command/CommandManager'),
       EditorManager = brackets.getModule('editor/EditorManager');
    
    var EXPAND_SELECTION_TO_QUOTES = 'Expand selection to quotes',
        CMD_SELECT_TO_QUOTES = 'quotes.select';
    
    function selectBetweenQutoes(){
        var editor = EditorManager.getFocusedEditor();
        
        var cursorPosition  = editor.getCursorPos(),
            currentLine     = editor.document.getLine(cursorPosition.line);
        
        var beforeCursor = currentLine.substr(0,cursorPosition.ch),
        afterCursor      = currentLine.substr(cursorPosition.ch),
        firstQuote       = beforeCursor.lastIndexOf("'") > -1 ? beforeCursor.lastIndexOf("'") : (beforeCursor.lastIndexOf('"') > -1 ? beforeCursor.lastIndexOf('"') : -1),
        firstQuoteType   = currentLine[firstQuote],
        lastQuote        = afterCursor.indexOf(firstQuoteType) > -1 ? afterCursor.indexOf(firstQuoteType) : (afterCursor.indexOf(firstQuoteType == "'" ? "'" : '"') > -1 ? afterCursor.indexOf(firstQuoteType == "'" ? "'" : '"') : -1);
        
        //beforeCursor = firstQuote > lastQuote ? firstQuote : lastQuote;
        //afterCursor = beforeCursor > -1 ? firstQuote + lastQuote : currentLine[currentLine.length-1];
        lastQuote = cursorPosition.ch - firstQuote + lastQuote;
        
        editor.setSelection({
            line:cursorPosition.line,
            ch: firstQuote + 1

        },
        {
            line:cursorPosition.line,
            ch: firstQuote + lastQuote
        });


    }
    CommandManager.register(
        EXPAND_SELECTION_TO_QUOTES,
        CMD_SELECT_TO_QUOTES,
        selectBetweenQutoes
    );
    windowsCommand = {
        key: "Ctrl-Shift-'",
        platform: 'win'
    },
    macCommand = {
        key: "Cmd-Shift-'",
        platform: 'mac'
    },
    command = [windowsCommand, macCommand];
    KeyBindingManager.addBinding(CMD_SELECT_TO_QUOTES,command);
});