$(document).ready(function () {
    $("#search_btn").click(function () {
        $(".findReplaceTool").toggle();
    });
    $(document).keydown(function(e) {
        if (e.ctrlKey && e.keyCode == 'F'.charCodeAt(0)) {
          e.preventDefault();
          //your saving code
          $(".findReplaceTool").toggle();
          $("#searchInput").focus();
        }
      });
    $("#findtoolclose").click(function () { 
        $(".findReplaceTool").toggle();
        
    });
    $("#edit").focus(function () {
        console.log("unfocus");
        $(".findReplaceTool").hide();
});
});
$(document).ready(function () {
    var caseSensitive = false;
    var wordWrap = false;
    var currentMatch = 0;

    $('#searchInput').on('keyup', function (event) {
        if (event.key === 'Enter') {
            performSearch();
        } else {
            var searchText = $(this).val();
            if (searchText.trim() === '') {
                // Clear previous highlights
                $('.highlight').removeClass('highlight');
                $('#searchCount').text('');
            } else {
                var count = highlightText(searchText);
                $('#searchCount').text(count + ' matches found');
            }
        }
    });

    $('#replaceButton').on('click', function () {
        var searchText = $('#searchInput').val();
        var replaceText = $('#replaceInput').val();
        replaceTextInContent(searchText, replaceText);
    });

    $('#replaceAllButton').on('click', function () {
        var searchText = $('#searchInput').val();
        var replaceText = $('#replaceInput').val();
        replaceAllTextInContent(searchText, replaceText);
    });

    $('#caseSensitiveButton').on('click', function () {
        caseSensitive = !caseSensitive;
        $(this).toggleClass('active');
    });

    function highlightText(searchText) {
        var content = $('#edit').text();
        var flags = 'gi';
        if (caseSensitive) {
            flags = 'g';
        }

        var regex = new RegExp(escapeRegExp(searchText), flags);

        var highlightedContent = content.replace(regex, function (match) {
            return '<span class="highlight">' + match + '</span>';
        });

        // $('#edit').html(highlightedContent);

        var count = (highlightedContent.match(/<span class="highlight">/g) || []).length;
        return count;
    }

    function replaceTextInContent(searchText, replaceText) {
        var content = $('#edit').html();
        var flags = 'gi';
        if (caseSensitive) {
            flags = 'g';
        }

        var regex = new RegExp(escapeRegExp(searchText), flags);

        var replacedContent = content.replace(regex, replaceText);
        $('#edit').html(replacedContent); hii

        var count = (replacedContent.match(new RegExp(escapeRegExp(replaceText), flags)) || []).length;
        $('#searchCount').text(count + ' matches replaced');
    }

    function replaceAllTextInContent(searchText, replaceText) {
        var content = $('#edit').html();
        var flags = 'gi';
        if (caseSensitive) {
            flags = 'g';
        }

        var regex = new RegExp(escapeRegExp(searchText), flags);

        var replacedContent = content.replace(regex, replaceText);
        while (replacedContent !== content) {
            content = replacedContent;
            replacedContent = content.replace(regex, replaceText);
        }
        $('#edit').html(replacedContent);

        var count = (replacedContent.match(new RegExp(escapeRegExp(replaceText), flags)) || []).length;
        $('#searchCount').text(count + ' matches replaced');
    }

    function escapeRegExp(string) {
        return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
    }

    $(document).on('keydown', function (event) {
        if (event.key === 'Enter' && $('.highlight').length > 0) {
            currentMatch = (currentMatch + 1) % $('.highlight').length;
            $('.highlight').eq(currentMatch).focus();
            event.preventDefault();
        }
    });
    $("#selectAll").click(function () { 
        var div = document.getElementById("div");
        var range = document.createRange();
        range.selectNodeContents(div);
        var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    });
});

// Get the button and the div elements
var button = document.getElementById("selectAll");
var div = document.getElementById("edit");

// Add a click event listener to the button
button.addEventListener("click", function() {
  // Create a range object that contains the text content of the div
  var range = document.createRange();
  range.selectNodeContents(div);
  // Get the current selection object
  var selection = window.getSelection();
  // Remove any existing ranges from the selection
  selection.removeAllRanges();
  // Add the new range to the selection
  selection.addRange(range);
  showMessage("selected All");
});
// Get the buttons and the div elements
var copy = document.getElementById("copy");
var paste = document.getElementById("paste");
var cut = document.getElementById("cut");

// Add a click event listener to the copy button
copy.addEventListener("click", function() {
  // Select the text content of the div
  var range = document.createRange();
  range.selectNodeContents(div);
  var selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
  // Execute the copy command
  document.execCommand("copy");
  showMessage("copy to Clipboard");
});

// Add a click event listener to the paste button
paste.addEventListener("click", function() {
  // Execute the paste command
  document.execCommand("paste");
  showMessage("paste from clipboard")
});

// Add a click event listener to the cut button
cut.addEventListener("click", function() {
  // Execute the cut command
  document.execCommand("cut");
  showMessage("text cut successfully");
});
