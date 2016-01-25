// base from: https://github.com/itbaby/brackets-expand-selection-to-quotes
define(function(require,exports,module){

   var AppInit = brackets.getModule('utils/AppInit'),
       KeyBindingManager = brackets.getModule('command/KeyBindingManager'),
       CommandManager = brackets.getModule('command/CommandManager'),
       EditorManager = brackets.getModule('editor/EditorManager');
    
    var EXPAND_SELECTION_TO_QUOTES = 'Expand selection to quotes',
        CMD_SELECT_TO_QUOTES = 'quotes.select';
    
    function selectBetweenQutoes(){
        var currentSelection = EditorManager.getFocusedEditor().getSelection();
        if((currentSelection.start.line == currentSelection.end.line) && (currentSelection.start.ch != currentSelection.end.ch)) {
            expandFurther(currentSelection);
        }
        else {
            expand(currentSelection);
        }
        
    }
    function expandFurther(currentSelection) {
        var quoteSelection = {
            start:{
                line: currentSelection.start.line,
                ch: currentSelection.start.ch-1
            },
            end:{
                line: currentSelection.end.line,
                ch: currentSelection.end.ch+1
            }
        };
        expand(quoteSelection);
    }
    function expand(currentSelection) {
        var currentLine      = EditorManager.getFocusedEditor().document.getLine(currentSelection.start.line),
            beforeCursor     = currentLine.substr(0,currentSelection.start.ch),
            afterCursor      = currentLine.substr(currentSelection.end.ch),
            firstQuote       = beforeCursor.lastIndexOf("'") > -1 ? beforeCursor.lastIndexOf("'") : (beforeCursor.lastIndexOf('"') > -1 ? beforeCursor.lastIndexOf('"') : -1),
            firstQuoteType   = currentLine[firstQuote],
            lastQuote        = afterCursor.indexOf(firstQuoteType) > -1 ? afterCursor.indexOf(firstQuoteType) : (afterCursor.indexOf(firstQuoteType == "'" ? "'" : '"') > -1 ? afterCursor.indexOf(firstQuoteType == "'" ? "'" : '"') : -1);
        
        if(firstQuote == -1) {
            return false;
        } else {
            lastQuote = currentSelection.start.ch + (currentSelection.end.ch - currentSelection.start.ch) - firstQuote + lastQuote;
        
            EditorManager.getFocusedEditor().setSelection({
                line:currentSelection.start.line,
                ch: firstQuote + 1

            },
            {
                line:currentSelection.start.line,
                ch: firstQuote + lastQuote
            });
        }
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