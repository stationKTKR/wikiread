import SamJs from 'sam-js';

function Talkie() {
    const opts = {debug: 1, pitch: 49, speed: 59, mouth: 188, throat: 220};
    let sam = new SamJs(opts);

    function speak() {
        sam.speak('yum yum information!');
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