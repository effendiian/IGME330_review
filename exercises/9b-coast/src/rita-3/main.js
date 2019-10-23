// Starter Code
function original() {

    let output = document.querySelector("#text-output");
    document.querySelector("button").onclick = doClick;

    function doClick() {
        let grammar = new RiGrammar();
        grammar.addRule("<start>", "It was a <adj1> and <adj2> <noun>.");
        grammar.addRule("<adj1>", "bright | cold | cloudy | dark | overcast | sunny");
        grammar.addRule("<adj2>", "dry | frigid | hot | rainy | wet");
        grammar.addRule("<adj2>", "stormy", 2);
        grammar.addRule("<noun>", "afternoon | day | mid-day | morning | night | twilight");

        let story = grammar.expand();
        output.innerHTML = story;
    }

}

window.addEventListener('load', original);
