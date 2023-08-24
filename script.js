$(document).ready(function() {
    $("#clearButton").hide();

    function toggleClearButton() {
        const inputText = $("#textInput").val();
        if (inputText.trim() !== "") {
            $("#clearButton").show();
        } else {
            $("#clearButton").hide();
        }
    }

    // Call the toggle function on page load
    toggleClearButton();

    // Call the toggle function whenever the input text changes
    $("#textInput").on("input", toggleClearButton);

    $(".language-buttons button").click(function() {
        // Clear previous translation output
        $("#translationOutput").html("");

        // Get the input text and selected language
        const inputText = $("#textInput").val();
        const targetLanguage = $(this).attr("id") === "englishButton" ? "en" : "es";

        // Translate the input text to the selected language
        translateText(inputText, targetLanguage);

        $("#clearButton").click(function() {
            $("#textInput").val(""); // Clear the input text
            updateTranslationOutput("Translation"); // Reset translation output
            toggleClearButton(); // Hide the clear button again
        });
    });
    $(".language-buttons button").click(function() {
        // Clear previous translation output
        $("#translationOutput").html("");

        // Get the input text and selected language
        const inputText = $("#textInput").val();
        const targetLanguage = $(this).attr("id") === "englishButton" ? "en" : "es";

        // Translate the input text to the selected language
        translateText(inputText, targetLanguage);

       $("#clearButton").click(function() {
        $("#textInput").val(""); // Clear the input text
        updateTranslationOutput("Translation"); // Reset translation output
    });
    });
});

function translateText(text, targetLanguage) {
    const apiKey = "AIzaSyDc2nXyY-JWgQfZUF0FvNC4Y3oVR1Aqh2s"; // Replace with your API key

    $.ajax({
        url: `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            q: text,
            target: targetLanguage,
            format: "text"
        }),
        success: function(response) {
            const translatedText = response.data.translations[0].translatedText;
            $("#translationOutput").html(`<p>${translatedText}</p>`);
        },
        error: function(error) {
            console.error("Translation error:", error);
        }
    });
}

// Inside your translation logic or any appropriate place in your script.js file
const translationOutput = document.getElementById("translationOutput");

// Set the initial placeholder text
translationOutput.textContent = "Translation";

// When you update the translation output, replace the placeholder
function updateTranslationOutput(translatedText) {
    translationOutput.textContent = translatedText;
}

