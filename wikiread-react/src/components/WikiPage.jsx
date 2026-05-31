import { useState, useEffect } from 'react';
import { useRef } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { motion } from "motion/react"

import WikiAlert from './WikiAlert';

function WikiPage({ setEnding }) {

    const [skills, setSkills] = useState([false, false, false]);
    const skillsRef = useRef({});
    skillsRef.current = skills;
    const [leftpuzhandStyle, setleftpuzhandStyle] = useState({
        position: "relative",
        top: "-50px",
        left: "65px",
        height: "50px",
        width: "50px",
    });
    const [rightpuzhandStyle, setrightpuzhandStyle] = useState(({
        position: "relative",
        top: "-50px",
        left: "-80px",
        height: "50px",
        width: "50px"
    }));
    const [puzboxstyle, setpuzboxstyle] = useState({});
    const [quescooldown, setquescooldown] = useState(false);
    const [puzboxtransition, setpuzboxtransition] = useState({});
    const [puzboxanimate, setpuzboxanimate] = useState({});
    const [leftpuzhandSrc, setleftpuzhandSrx] = useState("/wikiread-react/puz/handrightdown.png");
    const [rightpuzhandSrc, setrightpuzhandSrx] = useState("/wikiread-react/puz/handleftdown.png");
    const [puztext, setpuztext] = useState("");
    const [puznewtalk, setpuznewtalk] = useState(0);
    const puznewtalkRef = useRef({});
    puznewtalkRef.current = puznewtalk;
    const [puztextstyle, setpuztextstyle] = useState({});
    const [xp, setxp] = useState(0);
    const xpRef = useRef({});
    xpRef.current = xp;
    let updateFirstPage = false;
    const [allPages, setAllPages] = useState([]);
    const allPagesRef = useRef({});
    allPagesRef.current = allPages;
    const [currentpage, setCurrentPage] = useState("");
    const [abnormQuest, setAbnormQuest] = useState(false);
    const [foundpages, setFoundpages] = useState([]);
    const [wikiAlert, setwikiAlert] = useState(false);

    const [puzmovecount, setpuzmovecount] = useState(0);
    const puzmoveRef = useRef({});
    puzmoveRef.current = puzmovecount;
    const [allowclear, setallowclear] = useState(false);

    const [questsdone, setquestsdone] = useState(0);
    const [sawend, setsawend] = useState(false);

    const [clearquest, setclearquest] = useState(0);
    const [questLists, setQuestLists] = useState([["Boids", "Stochastic parrot", "Astrochicken"], ["Gray goo", "Primordial soup", "AI slop"],
    ["Ouroboros", "Roko's basilisk", "Medusa"], ["Finchley Central (game)", "Leibniz's gap", "Explanatory gap"], ["Gaareth's virtual robots", "The Shaman, the Outsider, and the Diet of Worms", "MMAcevedo", "Silent Smooth", "Bilateral observation theory"]]);

    const bigpages = ["Superorganism", "Wikipedia", "Information hazard", "Observer effect (physics)", "Abiogenesis"];


    useEffect(() => {
        const t = setTimeout(() => {
            console.log('wiping message');
            puzx();
        }, 4000);

        return () => {
            clearTimeout(t)
        }
    }, [puztext]);

    useEffect(() => {
        if (wikiAlert) {
            const t = setTimeout(() => {
                console.log('alert can clear');
                setallowclear(true)
            }, 1000);

            const t2 = setTimeout(() => {
                console.log("auto clear alert");
                setwikiAlert(false);
                setallowclear(false);
            }, 10000);
            return () => {
                clearTimeout(t);
                clearTimeout(t2);
            }
        }

    }, [wikiAlert]);


    function puzWave() {
        setleftpuzhandStyle({
            position: "relative",
            top: "-90px",
            left: "45px",
            height: "50px",
            width: "50px",
            transform: "rotate(135deg)"
        });
        setrightpuzhandStyle({
            position: "relative",
            top: "-50px",
            left: "-20px",
            height: "50px",
            width: "50px"
        });
        setpuztext("Hi! Ready to explore?");
        setpuztextstyle({
            height: "50px",
            width: "200px",
            top: "-50px"
        })
        setleftpuzhandSrx("/wikiread-react/puz/handleftwave.png");
        setrightpuzhandSrx("/wikiread-react/puz/handleftdown.png");
    }

    function puzwander() {
        console.log("wander1 " + puznewtalkRef.current);
        if (puznewtalkRef.current < 2) {
            let willwander = Math.floor(Math.random() * 5);
            console.log("wander2" + willwander);
            if (willwander == 4) {
                console.log("here");
                let newx = Math.floor(Math.random() * 100);
                let newy = Math.floor(Math.random() * -60);
                let wandertime = Math.floor((Math.random() * 7)) + 3;
                setpuzboxanimate({ x: newx + "vh", y: newy + "vh" });
                setpuzboxtransition({ type: "tween", duration: wandertime });
                setpuztextstyle({
                    display: "none"
                });
                let wandersay = Math.floor(Math.random() * 2);
                if (wandersay == 0) {
                    puztalk("Don't mind me...");
                } else {
                    puztalk("Whee!")
                }
            }
        }
    }




    function puztalk(say) {
        setleftpuzhandSrx("/wikiread-react/puz/handrightdown.png");
        setleftpuzhandStyle({
            position: "relative",
            top: "-50px",
            left: "65px",
            height: "50px",
            width: "50px",
        });
        setrightpuzhandStyle({
            position: "relative",
            top: "-50px",
            left: "-20px",
            height: "50px",
            width: "50px"
        });

        setpuztext(say);
        setpuztextstyle({
            height: "75px",
            width: "200px",
            top: "-50px"
        })
    }

    function puzQuest(list) {
        setclearquest(clearquest + 1);
        setleftpuzhandSrx("/wikiread-react/puz/handrightdown.png");
        setleftpuzhandStyle({
            position: "relative",
            top: "-50px",
            left: "65px",
            height: "50px",
            width: "50px",
        });
        setrightpuzhandStyle({
            position: "relative",
            top: "-50px",
            left: "-20px",
            height: "50px",
            width: "50px"
        });

        if (list > -1) {

            setquestsdone(questsdone + 1);
            console.log("got list " + list);
            if (list == 0) {
                puztalk("Polly want a prize? Sike! Knowledge is its own reward!")
            } else if (list == 1) {
                puztalk("Yum! Drink up!");
            } else if (list == 2) {
                puztalk("Remember: do not look directly at any reptile!");
            } else if (list == 3) {
                puztalk("All aboard the train of thought!");
            } else if (list == 4) {
                puztalk("Aww man, you found all my lies!");
            } else {
                puztalk("hey something fucked up");
            }
        } else {
            if (clearquest < 2) {
                puztalk("You're off to a great start!")
            } else if (clearquest < 12) {
                let randsay = Math.floor(Math.random() * 3);
                if (randsay === 0) {
                    puztalk(":)");
                } else if (randsay === 1) {
                    puztalk("Quests, quests, quests...");
                } else if (randsay === 2) {
                    puztalk("Oh boy! Another page found!")
                } else {
                    puztalk("Wow! You're a natural!");
                }
            }
        }
    }

    function puzx() {
        //console.log("puz x");
        setpuznewtalk(0);
        setleftpuzhandSrx("/wikiread-react/puz/handrightdown.png");
        setleftpuzhandStyle({
            position: "relative",
            top: "-50px",
            left: "65px",
            height: "50px",
            width: "50px",
        });
        setrightpuzhandStyle({
            position: "relative",
            top: "-50px",
            left: "-20px",
            height: "50px",
            width: "50px"
        });

        setpuztext("");
        setpuztextstyle({
            display: "none"
        })

        if (puzmoveRef.current % 2 == 1) {
            setpuzmovecount(puzmoveRef.current - 1);
        }
    }

    function endingScene() {
        setsawend(true);
        setEnding(true);
        setNewPage("End");
    }

    function puzmove() {
        if (puzmoveRef.current % 2 === 0) {
            setpuznewtalk(puznewtalkRef.current + 1);
            setleftpuzhandSrx("/wikiread-react/puz/handrightdown.png");
            setrightpuzhandSrx("/wikiread-react/puz/handleftdown.png");
            setleftpuzhandStyle({
                position: "relative",
                top: "-50px",
                left: "65px",
                height: "50px",
                width: "50px",
            });
            if (puzmoveRef.current > 11) {
                setpuztext("Ok asshole, knock it off.");

                setpuztextstyle({
                    height: "50px",
                    width: "200px",
                    top: "-50px"
                });
            } else if (puzmoveRef.current > 7) {
                setpuztext("This is a little excessive, don't you think?");
                setpuztextstyle({
                    height: "70px",
                    width: "200px",
                    top: "-50px"
                });
            } else {
                setpuztext("Oops, am I in your way?");
                setpuztextstyle({
                    height: "50px",
                    width: "200px",
                    top: "-50px"
                });
            }

        } else {
            if (puzmoveRef.current > 12) {
                setleftpuzhandSrx("/wikiread-react/puz/flip.png");
                setleftpuzhandStyle({
                    position: "relative",
                    top: "-70px",
                    left: "65px",
                    height: "50px",
                    width: "50px",
                    zIndex: 1
                });
                setpuztext("");
                setpuztextstyle({
                    display: "none"
                })
            } else {
                let newx = Math.floor(Math.random() * 100);
                let newy = Math.floor(Math.random() * -60);
                setpuzboxanimate({ x: newx + "vh", y: newy + "vh" });
                setpuzboxtransition({ type: "spring", duration: 2 });
                setpuztextstyle({
                    display: "none"
                });
            }

        }
        setpuzmovecount(puzmoveRef.current + 1);


    }



    const questRef = useRef({});
    questRef.current = questLists;

    useEffect(() => {

        window.addEventListener("message", e => {
            //console.log("receive message " + e.data)
            if (checkValidPage(e.data)) {
                setNewPage(e.data + "");
                //puzx();
            } else {
                //console.log("Page invalid: " + e.data + "");
            }
        });

        fetch('wikidata.json'
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(function (response) {
                return response.json();
            }).then(function (myjson) {
                setAllPages(myjson.wikipages);
                //console.log(myjson.wikipages);
                let toneg = 0;
                let randpage;
                while (toneg < 2) {
                    randpage = myjson.wikipages[Math.floor(Math.random() * myjson.wikipages.length)];
                    if (questLists[4].indexOf(randpage.title) == -1 && bigpages.indexOf(randpage.title) == -1) {
                        toneg = randpage.toneighbors.length;
                    } else {
                        //console.log("invalid start page " + randpage.title);
                    }

                }
                //console.log("set new page " + randpage.title);
                setNewPage(randpage.title);
                //setNewPage("Astrochicken");
            });

        puzWave();
    }, []);

    function clearAlert() {
        if (allowclear) {
            setwikiAlert(false);
            setallowclear(false);
        }
    }

    function questionmarkCooldown() {
        setquescooldown(false);
    }

    function questionmarkClick(newpage) {
        if (!quescooldown) {
            setquescooldown(true);
            setNewPage(newpage);
            setTimeout(questionmarkCooldown, 5000)
        } else {
            let randtalk = Math.floor(Math.random() * 3);
            console.log(randtalk);
            if (randtalk === 1) {
                puztalk("Hold your horses, buddy!");
            } else if (randtalk === 0) {
                puztalk("Hey pal, how bout'cha slow down?");
            } else {
                puztalk("C'mon, you can't wait 5 seconds?");
            }

        }
    }

    function setNewPage(newPage) {
        console.log("called " + newPage);
        if (allPagesRef.current.length === 0) {
            //console.log("set wait");
            setTimeout(setNewPage, 20, newPage);
        } else if (allPagesRef.current.find(({ title }) => title === newPage)) {
            setCurrentPage(newPage);
            //printneighbors(newPage);
            if (allPagesRef.current.find(({ title }) => title === newPage).visited === 0) {
                setxp(xpRef.current + 1);
                //console.log("new xp " + xpRef.current + " , " + skillsRef.current);
                if (!skillsRef.current[0] && xpRef.current > 23) {
                    setSkills([true, false, false]);
                } else if (!skillsRef.current[1] && xpRef.current > 48) {
                    setSkills([true, true, false]);
                } else if (!skillsRef.current[2] && xpRef.current > 73) {
                    setSkills([true, true, true]);
                }

                if (bigpages.indexOf(newPage) > -1) {
                    console.log("bigpage");
                    setwikiAlert(true);
                }


                if (questRef.current[4].indexOf(newPage) > -1 && questRef.current[4].length == 5 && !abnormQuest) {
                    //console.log("here");
                    setAbnormQuest(true);
                    //setTimeout(puztalk, 1000, "Huh? What are you reading?");
                } else if (newPage === "Artificial intelligence") {
                    setTimeout(puztalk, 1000, "Hey! That's me!");
                } else if (newPage === "Computer worm") {
                    setTimeout(puztalk, 1000, "A dead internet is fertile soil for computer worms!");
                } else if (newPage === "Dead Internet theory") {
                    setTimeout(puztalk, 1000, "But isn't decay a form of life?");
                } else if (newPage === "Astrochicken") {
                    setTimeout(puztalk, 1000, "Bawk bawk bawk!");
                } else if (newPage === "BLIT (short story)") {
                    setTimeout(puztalk, 1000, "Can you imagine the Parrot? No, really, try it!");
                } else if (newPage === "Stochastic parrot") {
                    setTimeout(puztalk, 1000, "Aaaah! It's the Parrot!!");
                } else if (newPage === "Sentience") {
                    setTimeout(puztalk, 1000, "...");
                } else if (newPage === "The Game (mind game)") {
                    setTimeout(puztalk, 1000, "Aw darn, I just lost The Game!");
                } else if (xpRef.current > 5) {
                    puzwander();
                }

            }
            allPagesRef.current.find(({ title }) => title === newPage).visited++;
            //console.log("neighbors " + allPagesRef.current.find(({ title }) => title === newPage).toneighbors);
            setpuzmovecount(0);


        }
        else {
            console.log("ERRIRRRR");

        }

    }

    function printneighbors(pagename) {
        let wikipage = allPagesRef.current.find(({ title }) => title === pagename);
        console.log("MNMEIGHBROS");
        for (var i = 0; i < wikipage.toneighbors.length; i++) {
            console.log(wikipage.toneighbors[i]);
        }
    }

    function hasNewNeighbors(wikipage) {
        for (var i = 0; i < wikipage.toneighbors.length; i++) {

            if ((allPagesRef.current.find(({ title }) => title === wikipage.toneighbors[i]))) {
                if ((allPagesRef.current.find(({ title }) => title === wikipage.toneighbors[i])).visited === 0) {
                    return true;
                }
            } else {
                console.log("NEIGHBOR ERROR " + wikipage.toneighbors[i]);
            }

        }
        return false;
    }

    function teleportRandPage(isnew) {
        console.log(allPagesRef.current.length);
        let newpage = "";
        while (newpage == "") {
            let i = Math.floor(Math.random() * allPagesRef.current.length);
            let p = allPagesRef.current[i];
            if (!isnew || p.visited == 0) {
                newpage = p.title;
            }
        }
        setNewPage(newpage);
    }

    function checkList(listnum) {
        console.log(questLists[0].length);
        let ix = questRef.current[listnum].indexOf(currentpage);
        console.log(questRef.current);
        if (ix > -1) {
            //console.log("right");
            setFoundpages([...foundpages, currentpage]);
            console.log(questRef.current.slice(listnum + 1));
            const newlist = [
                ...questRef.current.slice(0, listnum),
                [...questRef.current[listnum].filter(a => a !== currentpage)],
                ...questRef.current.slice(listnum + 1)
            ];
            console.log(newlist);
            setQuestLists(newlist);
            if (newlist[listnum].length == 0) {
                puzQuest(listnum);
            } else {
                puzQuest(-1);
            }

        } else if (foundpages.indexOf(currentpage) > -1) {
            puztalk("You already found this one!");
        } else {
            puztalk("Sorry, that's not it!");
            //console.log("wrong");
        }
    }

    function checkValidPage(p) {
        p = p + "";
        return (allPagesRef.current.find(({ title }) => title === p))
    }

    //if (!updateFirstPage) {
    //    if (allPagesRef.current.length > 0) {
    //        allPagesRef.current.find(({ title }) => title === pagename).visited++;
    //    }
    //}

    function isCurrentPage(page) {
        //console.log("testing " + page.title + " against " + currentpage);
        return page.title === currentpage;
    }

    return (

        <Container className="contain2 container-fluid container">

            <Row className="row2">
                <Col id="leftcol">
                    <div>
                        <Tabs>
                            <TabList id="tablist">
                                <Tab>Links</Tab>
                                <Tab>Quests</Tab>
                                <Tab>Skills</Tab>
                                {skills[0] &&
                                    <Tab>Pages</Tab>
                                }
                            </TabList>

                            <TabPanel>
                                <div id="mapsidebar">
                                    {skills[1] && quescooldown &&
                                        <p>[??? click is on 5 sec cooldown...]</p>
                                    }
                                    <div id="fromholder">
                                        <span className="mapheader">Pages linking here:</span>
                                        <ul>

                                            {allPagesRef.current.length > 0 && allPagesRef.current.find(isCurrentPage) && allPagesRef.current.find(isCurrentPage).fromneighbors &&
                                                allPagesRef.current.find(isCurrentPage).fromneighbors.map((element, i) => (
                                                    <>
                                                        {allPagesRef.current.find(({ title }) => title === element) && allPagesRef.current.find(({ title }) => title === element).visited > 0 &&
                                                            <li><a className="validList" onClick={(e) => setNewPage(element, e)}>{element}</a></li>
                                                        }
                                                    </>
                                                ))}
                                            {allPagesRef.current.length > 0 && allPagesRef.current.find(isCurrentPage) && allPagesRef.current.find(isCurrentPage).fromneighbors &&
                                                allPagesRef.current.find(isCurrentPage).fromneighbors.length > 0 && allPagesRef.current.find(isCurrentPage).fromneighbors.map((element, i) => (
                                                    <>

                                                        {allPagesRef.current.find(({ title }) => title === element) && allPagesRef.current.find(({ title }) => title === element).visited === 0 &&
                                                            !skillsRef.current[1] &&
                                                            <li className="unknown">???</li>
                                                        }
                                                        {allPagesRef.current.find(({ title }) => title === element) && allPagesRef.current.find(({ title }) => title === element).visited === 0 &&
                                                            skillsRef.current[1] &&
                                                            <li className="unknown" onClick={(e) => questionmarkClick(element)}>???</li>
                                                        }
                                                    </>
                                                ))}
                                        </ul>
                                    </div>


                                    <div id="toholder">
                                        <span className="mapheader">Links on this page:</span>
                                        <ul>
                                            {allPagesRef.current.length > 0 && allPagesRef.current.find(isCurrentPage) && allPagesRef.current.find(isCurrentPage).toneighbors &&
                                                allPagesRef.current.find(isCurrentPage).toneighbors.length > 0 && allPagesRef.current.find(isCurrentPage).toneighbors.map((element, i) => (
                                                    <>
                                                        {allPagesRef.current.find(({ title }) => title === element) && allPagesRef.current.find(({ title }) => title === element).visited > 0 &&
                                                            <li><a className="validList" onClick={(e) => setNewPage(element, e)}>{element}</a></li>
                                                        }
                                                    </>
                                                ))}
                                            {allPagesRef.current.length > 0 && allPagesRef.current.find(isCurrentPage) && allPagesRef.current.find(isCurrentPage).toneighbors &&
                                                allPagesRef.current.find(isCurrentPage).toneighbors.length > 0 && allPagesRef.current.find(isCurrentPage).toneighbors.map((element, i) => (
                                                    <>

                                                        {allPagesRef.current.find(({ title }) => title === element) && allPagesRef.current.find(({ title }) => title === element).visited === 0 &&
                                                            !skillsRef.current[1] &&
                                                            <li className="unknown">???</li>
                                                        }
                                                        {allPagesRef.current.find(({ title }) => title === element) && allPagesRef.current.find(({ title }) => title === element).visited === 0 &&
                                                            skillsRef.current[1] &&
                                                            <li className="unknown" onClick={(e) => questionmarkClick(element)}>???</li>
                                                        }
                                                    </>
                                                ))}
                                        </ul>
                                    </div>
                                </div>
                            </TabPanel>

                            <TabPanel>
                                <div id="questHolder">
                                    <div className="questBox" onClick={() => checkList(0)}>

                                        <span className="questName">Birds</span><br />
                                        {questRef.current[0].length > 2 ? '\u2610 \u00A0' : '\u2611 \u00A0'}
                                        {questLists[0].length > 1 ? "\u2610 \u00A0" : "\u2611 \u00A0"}
                                        {questLists[0].length > 0 ? "\u2610" : "\u2611"}
                                    </div>
                                    <div className="questBox" onClick={() => checkList(1)}>

                                        <span className="questName">Dubious Liquids</span><br />
                                        {questRef.current[1].length > 2 ? '\u2610 \u00A0' : '\u2611 \u00A0'}
                                        {questLists[1].length > 1 ? "\u2610 \u00A0" : "\u2611 \u00A0"}
                                        {questLists[1].length > 0 ? "\u2610" : "\u2611"}
                                    </div>
                                    <div className="questBox" onClick={() => checkList(2)}>


                                        <span className="questName">Reptiles</span><br />
                                        {questRef.current[2].length > 2 ? '\u2610 \u00A0' : '\u2611 \u00A0'}
                                        {questLists[2].length > 1 ? "\u2610 \u00A0" : "\u2611 \u00A0"}
                                        {questLists[2].length > 0 ? "\u2610" : "\u2611"}
                                    </div>
                                    <div className="questBox" onClick={() => checkList(3)}>

                                        <span className="questName">Mind the Gap</span><br />
                                        {questLists[3].length > 2 ? "\u2610 \u00A0" : "\u2611 \u00A0"}
                                        {questLists[3].length > 1 ? "\u2610 \u00A0" : "\u2611 \u00A0"}
                                        {questLists[3].length > 0 ? "\u2610" : "\u2611"}
                                    </div>
                                    {abnormQuest && <div className="questBox" onClick={() => checkList(4)}>
                                        <span className="questName">Anomalies</span><br />
                                        {questLists[4].length > 4 ? "\u2610 \u00A0" : "\u2611 \u00A0"}
                                        {questLists[4].length > 3 ? "\u2610 \u00A0" : "\u2611 \u00A0"}
                                        {questLists[4].length > 2 ? "\u2610 \u00A0" : "\u2611 \u00A0"}
                                        {questLists[4].length > 1 ? "\u2610 \u00A0" : "\u2611 \u00A0"}
                                        {questLists[4].length > 0 ? "\u2610" : "\u2611"}

                                    </div>
                                    }
                                    <p>If you think you've found a quest page, click the category you think it belongs to!</p>
                                </div>

                            </TabPanel>

                            <TabPanel>
                                <div id="skill">
                                    <div id="topQuests">
                                        <h2>{xpRef.current} XP</h2>
                                        <p>(unique pages visited)</p>
                                    </div>

                                    <div><p>Unlock "Pages" Tab</p>
                                        <div className="skillbarHolder">
                                            <div className="skillbar" style={{ width: Math.min(((xp / 25) * 100), 100) + '%' }}>
                                            </div>
                                        </div>

                                        <div><p>Clickable "???"</p>
                                            <div className="skillbarHolder">
                                                <div className="skillbar" style={{ width: Math.min(((Math.max((xp - 25), 0) / 25) * 100), 100) + '%' }}></div>
                                            </div>
                                        </div>

                                        <div><p>Teleporter</p>
                                            {!skills[2] &&
                                                <div className="skillbarHolder">

                                                    <div className="skillbar" style={{ width: Math.min(((Math.max(0, (xp - 50)) / 25) * 100), 100) + '%' }}>
                                                    </div>

                                                </div>}
                                            {skills[2] &&
                                                <div class="skillbutton" onClick={() => { teleportRandPage(false) }}>Random page</div>

                                            }
                                            
                                                <div>
                                                    <div class="skillbutton" onClick={() => { teleportRandPage(true) }}>Random new page</div>
                                                </div>
                                            
                                            {skills[2] && !sawend &&
                                                <div>
                                                    {questsdone < 2 ? <p>Complete 2 quests to unlock</p> : <div class="skillbutton" onClick={() => { endingScene() }}>Singularity</div>}
                                                </div>
                                            }
                                        </div>

                                    </div>

                                </div>

                            </TabPanel>

                            {skills[0] && <TabPanel>
                                <div id="pagesidebar">
                                    <ul>
                                        {allPagesRef.current.sort((a, b) => a.title.localeCompare(b.title)).map((element, i) => (
                                            <>
                                                {element.visited > 0 &&
                                                    <li className={!hasNewNeighbors(element) ? "empty" : ""}><a className="validList" onClick={(e) => setNewPage(element.title, e)}>{element.title}</a></li>
                                                }
                                            </>
                                        ))}
                                    </ul>
                                </div>

                            </TabPanel>

                            }

                        </Tabs>
                    </div>

                </Col>
                <Col id="wikicol">
                    <div id="wikih1">{currentpage}</div>
                    {wikiAlert &&
                        <div id="wikialertdiv" onMouseOver={clearAlert}><WikiAlert pagename={currentpage}></WikiAlert></div>
                    }
                    <iframe id="pageframe" src={currentpage === "" ? "/wikiread-react/altpages/loading.html" : "/wikiread-react/pages/" + currentpage + '.html'} />
                </Col>
                <motion.div transition={puzboxtransition} animate={puzboxanimate} id="puzbox" style={puzboxstyle}>
                    <div id="puztext" style={puztextstyle}>
                        <img onClick={puzx} id="puzxx" src="/wikiread-react/puz/winx.png" />
                        <p>{puztext}</p>
                    </div>
                    <img id="leftpuzhand" style={leftpuzhandStyle} src={leftpuzhandSrc} />
                    <img onClick={puzmove} style={{ height: "120px", width: "120px", position: "relative", top: "-40px", left: "30px" }} src="/wikiread-react/puz/puz3dthick.webp" />
                    <img id="rightpuzhand" style={rightpuzhandStyle} src={rightpuzhandSrc} />
                </motion.div>
            </Row>
        </Container>
    )
}

export default WikiPage;