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
        var content = $('#edit').html();
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
        var $currentHighlight = $('.highlight.current');
        if ($currentHighlight.length > 0) {
            $currentHighlight.text(replaceText);
            $currentHighlight.removeClass('highlight current');
            $('#searchCount').text('1 match replaced');
        }
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
        var div = document.getElementById("edit");
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
  const contentElement = document.querySelector('#edit');
    const range = document.createRange();
    range.selectNodeContents(contentElement);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  showMessage("selected All");
});

var copybtn = document.getElementById("copy");
copybtn.addEventListener("click", copySelectedText);
var pastebtn = document.getElementById("paste");
pastebtn.addEventListener("click",pasteText);
var cutbtn = document.getElementById("cut");
cutbtn.addEventListener("click", cutSelectedText);
// Get the buttons and the div elements
function selectAllText() {
    
  }

  function copySelectedText() {
    const contentElement = document.querySelector('#edit');
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const clonedRange = range.cloneRange();
    clonedRange.selectNodeContents(contentElement);
    selection.removeAllRanges();
    selection.addRange(clonedRange);

    try {
      document.execCommand('copy');
      console.log('Text copied to clipboard');
    } catch (err) {
      console.error('Failed to copy text to clipboard', err);
    }

    selection.removeAllRanges();
    selection.addRange(range);
  }

  function pasteText(e) {
    e.preventDefault();
    navigator.clipboard.readText()
        .then(text => {
          const selection = window.getSelection();
          const range = selection.getRangeAt(0);
          range.deleteContents();
          range.insertNode(document.createTextNode(text));
          selection.removeAllRanges();
        //   selection.addRange(range);
        })
        .catch(err => {
          console.error('Failed to read text from clipboard', err);
        });
  }

  function cutSelectedText() {
    const contentElement = document.querySelector('.content');
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const clonedRange = range.cloneRange();
      clonedRange.selectNodeContents(contentElement);
      const selectedText = clonedRange.toString();
      const textToStore = selectedText;

      if (selectedText.length > 0) {
        try {
          document.execCommand('copy');
          console.log('Text copied to clipboard:', selectedText);
          range.deleteContents();
          selection.removeAllRanges();
        } catch (err) {
          console.error('Failed to copy text to clipboard', err);
        }
      }
  }