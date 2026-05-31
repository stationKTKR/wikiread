import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useRef } from 'react';
import { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}


function FinalPage({ setEnding }) {

    const [scrolldist, setscrolldist] = useState(0);
    const distRef = useRef({});
    distRef.current = scrolldist;
    const [puztext, setpuztext] = useState("");
    const [endnar2, setendnar2] = useState("");
    const [endnar1, setendnar1] = useState("");
    const [endnar3, setendnar3] = useState("");
    const [endnar4, setendnar4] = useState("");
    const [endhomestyle, setendhomestyle] = useState({color:"white", display:"none"});

    const [endstyle, setendstyle] = useState({display:"none"});
    const [puzboxtransition, setpuzboxtransition] = useState({});
    const [puzboxanimate, setpuzboxanimate] = useState({});
    const [holeanimate, setholeanimate] = useState({});
    const [holderstyle, setholderstyle] = useState({});
    const [puzbox2animate, setpuzbox2animate] = useState({});
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const [puztextstyle, setpuztextstyle] = useState({
        display: "none"
    });
    let fadeinterval;

    let blackstyle = {
        backgroundColor: "rgba(0, 0, 0, " + ((scrolldist - 500) / 5500),
        borderColor: "rgba(0, 0, 0, " + (1 - ((scrolldist - 500) / 5500))
    }
    let vanishstyle = {
        borderColor: "rgba(170, 170, 170, " + (1 - ((scrolldist - 500) / 5500)),
        background: "transparent"
    }
    let vanishstyle1 = {
        borderColor: "rgba(170, 170, 170, " + (1 - ((scrolldist - 500) / 5500)),
        backgroundColor: "rgba(255, 255, 255, " + (1 - ((scrolldist - 500) / 5500)),
        borderBottom: "none"
    }


    function puzmove() {
        setpuztextstyle({
            height: "75px",
            width: "200px",
            top: "-50px"
        })
        setpuztext("Come with me! Into the dark!");
        
        setTimeout(puzmove2, 3000);
        fadeinterval = setInterval(addfade, 200);
    }

    function addfade() {
        if (distRef.current < 6000) {
            setscrolldist(distRef.current + 50);
        }

    }

    function endEnding() {
        setEnding(false);
    }

    function puzmove2() {
        clearInterval(fadeinterval);
        setpuzboxanimate({ x: "50vh", y: "calc(-50vh)" });
        setpuzboxtransition({ type: "tween", duration: 7 });

        setpuzbox2animate({ scale: 0, transition: { duration: 7 } });
        setholderstyle({ zIndex: "1" });
        setholeanimate({ width: windowDimensions.width * 0.25, height: windowDimensions.width * 0.25, transition: { duration: 2.5, type: "linear" } });
        
        setTimeout(endWords1, 3000);
    }

    function endWords1() {
        setholeanimate({ width: windowDimensions.width * 6, height: windowDimensions.width * 6, transition: { duration: 16, type: "linear" } });
        setendstyle({});
        setendnar1("The full shape of the creature comes into focus,");
        setTimeout(endWords2, 4000);
    }

    function endWords2() {
        setendnar2("darting between thoughts and data, neurons and pixels.");
        setTimeout(endWords3, 4000);
    }

    function endWords3() {
        setendnar3("The digital beast turns its void-black eyes on you");
        setTimeout(endWords4, 4000);
    }

    function endWords4() {
        setendnar4("before returning to the abyss behind the screen.");
        setTimeout(endWords5, 4500);
    }

    function endWords5() {
        setendnar1("");
        setendnar3("");
        setendnar4("");
        setendnar2("Thank you for your generous donation!");
        setTimeout(endWords6, 3000);
    }

    function endWords6() {
        setendhomestyle({color:"white"});

    }

    function puzx() {
        setpuztext("");
        setpuztextstyle({
            display: "none"
        });
    }

    useEffect(() => {

        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);




        window.addEventListener("message", e => {
            //console.log("receive message " + e.data)
            if (typeof e.data == "number") {
                setscrolldist(Math.max(scrolldist, e.data));
            } else if (e.data == "stuck") {

                if (scrolldist < 2000) {
                    puztalk("You've seen too much!");
                } else if (scrolldist < 4000) {
                    puztalk("It's too late to go back!");
                } else {
                    puzmove();
                }

            }
        });

        return () => window.removeEventListener('resize', handleResize);
    });

    function puztalk(say) {
        setpuztext(say);
        setpuztextstyle({
            height: "75px",
            width: "200px",
            top: "-50px"
        })
    }

    return (
        <>

            <div id="fullfinal" style={blackstyle}>
                <div id="blackholder" style={holderstyle}>
                    <motion.div id="holeanimdiv" animate={holeanimate} >
                    </motion.div>
                </div>
                <div id="endholder" style={endstyle}>
                    <p className="endnar">{endnar1}</p>
                    <p className="endnar">{endnar2}</p>
                    <p className="endnar" style={endhomestyle} onClick={endEnding}>&gt; The End</p>
                    <p className="endnar">{endnar3}</p>
                    
                    <p className="endnar">{endnar4}</p>
                </div>
                <Container className="contain2 container-fluid container" >
                    <Row className="row2">
                        <Col id="leftcol2" style={vanishstyle}>
                            <div>

                                <ul style={vanishstyle} role="tablist" id="tablist" className="react-tabs__tab-list">
                                    <li role="tab" className="react-tabs__tab">Links</li>
                                    <li  className="react-tabs__tab" aria-selected="false">Quests</li>
                                    <li  className="react-tabs__tab" aria-selected="false">Skills</li>
                                    <li  className="react-tabs__tab" aria-selected="false">Pages</li>
                                </ul>
                                <div className="react-tabs">
                                    <span className="mapheader">Pages linking here:</span><br></br>
                                    {scrolldist > 1000 && <ul>
                                        {<li>You have to keep reading</li>}
                                        {scrolldist > 1400 && <li>You've already seen it all</li>}
                                        {scrolldist > 1800 && <li>But you still need more</li>}
                                        {scrolldist > 2200 && <li>Something is pulling you forward</li>}

                                    </ul>
                                    }
                                    <span className="mapheader">Links on this page:</span>
                                    {scrolldist > 2600 &&
                                        <ul>
                                            <li>So you keep scrolling</li>
                                            {scrolldist > 3000 && <li>You keep clicking</li>}
                                            {scrolldist > 3400 && <li>You keep reading</li>}
                                            {scrolldist > 3800 && <li>Sinking deeper and deeper</li>}
                                            {scrolldist > 4200 && <li>Your eyes grow tired</li>}
                                            {scrolldist > 4600 && <li>Your hands grow numb</li>}
                                            {scrolldist > 5000 && <li>Everything else fades to black</li>}

                                        </ul>
                                    }
                                </div>


                            </div>
                        </Col>
                        <Col>

                            <iframe id="pageframe2" src={"/wikiread-react/pages/Event horizon.html"} />

                        </Col>
                        <motion.div transition={puzboxtransition} animate={puzboxanimate} id="puzbox2">
                            <motion.div animate={puzbox2animate} >
                                <div id="puztext" style={puztextstyle}>
                                    <img onClick={puzx} id="puzxx" src="/wikiread-react/puz/winx.png" />
                                    <p>{puztext}</p>
                                </div>
                                <img id="leftpuzhand" style={{
                                    position: "relative",
                                    top: "-50px",
                                    left: "65px",
                                    height: "50px",
                                    width: "50px",
                                }} src="/wikiread-react/puz/handrightdown.png" />
                                <img style={{ height: "120px", width: "120px", position: "relative", top: "-40px", left: "30px" }} src="/wikiread-react/puz/puz3dthick.webp" />
                                <img id="rightpuzhand" style={{
                                    position: "relative",
                                    top: "-50px",
                                    left: "-20px",
                                    height: "50px",
                                    width: "50px"
                                }} src="/wikiread-react/puz/handleftdown.png" />
                            </motion.div>
                        </motion.div>
                    </Row>
                </Container>
            </div >
        </>
    );
}

export default FinalPage;