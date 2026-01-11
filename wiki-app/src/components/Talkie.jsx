import SamJs from 'sam-js';

function Talkie({pagename}) {
    const opts = {debug: 1, pitch: 49, speed: 80, mouth: 188, throat: 220};
    let sam = new SamJs(opts);

    function speak() {
        //sam.speak("test test");
        let name = pagename.replace("pages/", "");
        name = name.replace(".html", "");
        const regex = "\([^\)]*\)";
        name = name.replace("([^)]*)", "");

        console.log(name);
        let utterance = new SpeechSynthesisUtterance(name);
        speechSynthesis.speak(utterance);
    }

    return (
        <div>
            <button onClick={speak}>
                Talk
            </button>
        </div>
    )
}

export default Talkie;