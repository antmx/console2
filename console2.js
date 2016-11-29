/*jslint
    this: true, for: true, white: true
*/

//"use strict";

/**** Start console2 ****/
var showConsole2 = true;

$(function () {

	var consoleWindow;
	var toggleButton;
	var clearButton;
	var ioArea;
	var outputArea;
	var outputList;
	var commandInput;
	var commandButton;

	// Define console2 'class'
	window.console2 = {};

	window.console2.error = function (obj) {
		window.console2.log(obj, true);
	};

	window.console2.log = function (obj, isError) {

		if (!showConsole2) {
			return;
		}

		var itemText;

		if (obj === null) {
			itemText = "null";
		} else if (obj === undefined) {
			itemText = "undefined";
		} else if (typeof obj !== "string" && isNaN(obj) && typeof obj !== "function") {
			itemText = JSON.stringify(obj);

			if (itemText.length > 1 && itemText[0] === '"' && itemText[itemText.length - 1] === '"') {
				itemText = itemText.substr(1, itemText.length - 2);
			}
		} else {
			itemText = obj;
		}

		var newItem = $("<li>" + itemText + "</li>");

		if (isError === true) {
			newItem.addClass("error");
		}

		outputList.append(newItem);

		outputArea[0].scrollTop = outputArea[0].scrollHeight;
	};

	if (showConsole2) {

		// Build console2 DOM
		var html =
			 $('<div id="console-window">'
			 + ' <button id="toggle-button">Show console2</button>'
			 + ' <button id="clear-button">Clear</button>'
			 + ' <div id="io-area">'
			 + '     <div id="output-area">'
			 + '         <ul></ul>'
			 + '     </div>'
			 + '     <div id="input-area">'
			 + '         <textarea id="command-input" placeholder="Enter command" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"></textarea>'
			 + '         <button id="command-button">Run</button>'
			 + '     </div>'
			 + ' </div>'
			 + '</div>');

		$("body").append(html);

		// Get references to console2 DOM elements
		consoleWindow = $("#console-window");
		toggleButton = consoleWindow.find("#toggle-button");
		clearButton = consoleWindow.find("#clear-button");
		ioArea = consoleWindow.find("#io-area");
		outputArea = ioArea.find("#output-area");
		outputList = ioArea.find("ul");
		commandInput = ioArea.find("#command-input");
		commandButton = ioArea.find("#command-button");

		consoleWindow.addClass("visible");

		// Wire up console2 DOM events
		toggleButton.on("click", function () {
			if (ioArea.hasClass("expanded")) {
				ioArea.removeClass("expanded");
				consoleWindow.removeClass("expanded");
				toggleButton.text("Show console2");
			} else {
				ioArea.addClass("expanded");
				consoleWindow.addClass("expanded");
				toggleButton.text("Hide console2");
				commandInput.focus();
			}
		});

		clearButton.on("click", function () {
			outputList.find("li").remove();
			commandInput.focus();
		});

		commandButton.on("click", function () {
			if (commandInput.val().length > 0) {
				try {
					var result = eval(commandInput.val());
					console2.log(result);
				}
				catch (ex) {
					console2.log(ex.message, true);
				}

				outputArea.scrollTop(outputArea[0].scrollHeight);

				commandInput.val("");
			}

			commandInput.focus();
		});
	}

	//var obj = { a: 1, b: { c: 3 } };
	//console2.log(obj);
	//console2.log("");
	//console2.log("foo");
	//console2.log(new Date());
	//console2.log(null);
	//console2.log([1, 2, 3]);
	console2.log("console2 ready");
});
/**** End console2 ****/
