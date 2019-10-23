// Demo: Load from JSON
function init() {

    let grammar = new RiGrammar();
    grammar.loadFrom("./src/rita-4/grammar.json", () => {
        let output = document.querySelector("#text-output");
        let button = document.querySelector("button");
        button.onclick = doClick;

        // Expand story upon click.
        function doClick() {
            let story = grammar.expand();
            output.innerHTML = story;
        }

        button.dispatchEvent(new Event("click"));
    });

}

window.addEventListener('load', init);
