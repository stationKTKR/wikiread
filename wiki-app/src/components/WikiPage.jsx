import {useState,useEffect} from 'react';
import { useRef } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

function WikiPage({pagename}) {

    const [skills, setSkills] = useState([false,false,false])
    const [xp, setxp] = useState(0);
    const xpRef= useRef({});
    xpRef.current = xp;
    let updateFirstPage = false;
    const [allPages,setAllPages]=useState([]);
    const allPagesRef= useRef({});
    allPagesRef.current = allPages;
    const [currentpage, setCurrentPage] = useState("");
    const [abnorm, setAbnorm] = useState(true);
    const [abnormQuest, setAbnormQuest] = useState(false);

    const [questLists, setQuestLists] = useState([["Boids", "Stochastic parrot", "Astrochicken"],["Gray goo", "Primordial soup", "AI slop"],
        ["Ouroboros", "Roko's basilisk", "Medusa"],["Finchley Central (game)","Leibniz's gap", "Explanatory gap"], ["MMAcevedo"]]);

    const puz1 = {title:"Superorganism",found:false};
    const puz2 = {title:"DWikipedia",found:false};


    const questRef = useRef({});
    questRef.current = questLists;

    useEffect(() => {
        window.addEventListener("message", e => {
            console.log("receive message " + e.data)
            if (checkValidPage(e.data)) {
                setNewPage(e.data + "");
            } else {
                //console.log("Page invalid: " + e.data + "");
            }
        });

        fetch('wikidata.json'
        ,{
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        }
        )
        .then(function(response){
            return response.json();
        }).then(function (myjson) {
            setAllPages(myjson.wikipages);
            
            let toneg = 0;
            let randpage;
            while (toneg < 2) {
                randpage = myjson.wikipages[Math.floor(Math.random() * myjson.wikipages.length)];
                toneg = randpage.toneighbors.length;
            }
           //console.log("set new page " + randpage.title);
            setNewPage(randpage.title);
        });
        
        
    },[]);

    const clearAnom = () => {
        console.log('Clear anom');
        setAbnorm(false);
      };

    function setNewPage(newPage) {
        //console.log("called " + newPage);
        if (allPagesRef.current.length == 0) {
            //console.log("set wait");
            setTimeout(setNewPage, 20, newPage);
        } else if (allPagesRef.current.find(({ title }) => title === newPage)) {
            setCurrentPage(newPage);
            if (allPagesRef.current.find(({ title }) => title === newPage).visited == 0) {
                setxp(xpRef.current + 1);
                console.log("new xp " + xpRef.current + " , " + skills);
                if (!skills[0] && xpRef.current > 24) {
                    setSkills([true,false,false]);
                } else if (!skills[1] && xpRef.current > 49) {
                    setSkills([true,true,false]);
                } else if (!skills[2] && xpRef.current > 74) {
                    setSkills([true,true,true]);
                }
            }
            allPagesRef.current.find(({ title }) => title === newPage).visited++;
            //console.log("neighbors " + allPagesRef.current.find(({ title }) => title === newPage).toneighbors);
        }
        else {
            console.log("ERRIRRRR");
            
        }
        
    }

    function hasNewNeighbors(wikipage) {
        for (var i = 0; i < wikipage.toneighbors.length; i++) {
            if ((allPagesRef.current.find(({ title }) => title === wikipage.toneighbors[i])).visited == 0) {
                return true;
            }
        }
        return false;
    }

    function checkList(listnum) {
        console.log(questLists[0].length);
        let ix = questRef.current[listnum].indexOf(currentpage);
        console.log(questRef.current);
        if (ix > -1) {
            console.log("right");
            console.log(questRef.current.slice(listnum + 1));
            const newlist = [
                ...questRef.current.slice(0, listnum),
                [...questRef.current[listnum].filter(a => a !== currentpage)],
                ...questRef.current.slice(listnum + 1)
            ];
            console.log(newlist);
            setQuestLists(newlist);
        } else {
            console.log("wrong");
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
        
        <div className="container">
            
            <div className="row">
                <div id="leftcol">
                    <div id="tabdiv">
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
                                                !skills[1] &&
                                                <li className="unknown">???</li>
                                            }
                                            {allPagesRef.current.find(({ title }) => title === element) && allPagesRef.current.find(({ title }) => title === element).visited === 0 &&
                                                skills[1] &&
                                                <li className="unknown" onClick={(e) => setNewPage(element, e)}>???</li>
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
                                                !skills[1] &&
                                                <li className="unknown">???</li>
                                            }
                                            {allPagesRef.current.find(({ title }) => title === element) && allPagesRef.current.find(({ title }) => title === element).visited === 0 &&
                                                skills[1] &&
                                                <li className="unknown" onClick={(e) => setNewPage(element, e)}>???</li>
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
                                <h5>Birds</h5>
                                <p>{questRef.current[0].length > 2 ? '\u2610 \u00A0' : '\u2611 \u00A0'}  
                                {questLists[0].length > 1 ? "\u2610 \u00A0" : "\u2611 \u00A0"}  
                                {questLists[0].length > 0 ? "\u2610" : "\u2611"}</p>
                            </div>
                            <div className="questBox" onClick={() => checkList(1)}>
                                <h5>Dubious Liquids</h5>
                                <p>{questRef.current[1].length > 2 ? '\u2610 \u00A0' : '\u2611 \u00A0'}  
                                {questLists[1].length > 1 ? "\u2610 \u00A0" : "\u2611 \u00A0"}  
                                {questLists[1].length > 0 ? "\u2610" : "\u2611"}</p>
                            </div>
                            <div className="questBox" onClick={() => checkList(2)}>
                                <h5>Reptiles</h5>
                                <p> 
                                {questRef.current[2].length > 2 ? '\u2610 \u00A0' : '\u2611 \u00A0'}  
                                {questLists[2].length > 1 ? "\u2610 \u00A0" : "\u2611 \u00A0"}  
                                {questLists[2].length > 0 ? "\u2610" : "\u2611"}</p>
                            </div>
                            <div className="questBox" onClick={() => checkList(3)}>
                                <h5>Mind the Gap</h5>
                                <p> {questLists[3].length > 2 ? "\u2610 \u00A0" : "\u2611 \u00A0"}  
                                {questLists[3].length > 1 ? "\u2610 \u00A0" : "\u2611 \u00A0"}  
                                {questLists[3].length > 0 ? "\u2610" : "\u2611"}</p>
                            </div>
                            {abnormQuest && <div className="questBox" onClick={() => checkList(4)}>
                                <h5>Anomalies</h5>
                                <p>
                                {questLists[1].length > 0 ? "\u2610" : "\u2611"}</p>
                            </div>
                            }
                        <p>If you think you've found a quest page, click the category you think it belongs to!</p>
                        </div>
                        
                    </TabPanel>

                    <TabPanel>
                        <div id="skill">
                            <div id="topQuests">
                            <h2>{xp} XP</h2>
                            <p>(unique pages visited)</p>
                            </div>

                            <div><p>Unlock "Pages" Tab</p>
                                <div className="skillbarHolder">
                                    <div className="skillbar" style={{width: Math.min(((xp / 25) * 100), 100) + '%'}}>
                                </div>
                            </div>

                            <div><p>Clickable "???"</p>
                                <div className="skillbarHolder">
                                    <div className="skillbar" style={{width: Math.min(((Math.max((xp - 25), 0) / 25) * 100), 100) + '%'}}></div>
                                </div>
                            </div>

                            <div><p>Teleporter (WIP)</p>
                                <div className="skillbarHolder">
                                    <div className="skillbar" style={{width: Math.min(((Math.max(0,(xp - 50)) / 25) * 100), 100) + '%'}}></div>
                                </div>
                            </div>

                            </div>
                            
                        </div>
                        
                    </TabPanel>

                    {skills[0] && <TabPanel>
                        <ul>
                        {allPagesRef.current.sort((a, b) => a.title.localeCompare(b.title)).map((element, i) => (
                            <>
                                {element.visited > 0 &&
                                    <li className={!hasNewNeighbors(element) ? "empty" : ""}><a className="validList" onClick={(e) => setNewPage(element.title, e)}>{element.title}</a></li>
                                }
                            </>
                        ))}
                        </ul>

                    </TabPanel>
                    
                    }

                    </Tabs>
                </div>
                    
                </div>
                <div className="col-sm-8">
                    <div id="wikih1">{currentpage}</div>
                    

                    <iframe id="pageframe" src={currentpage == "" ? "altpages/loading.html" : "pages/" + currentpage + '.html'}/>
                </div>
            </div>
        </div>
    )
}

export default WikiPage;