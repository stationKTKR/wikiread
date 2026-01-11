import React,{useState,useEffect} from 'react';
import { useRef } from 'react';
import Xarrow from "react-xarrows";

import Talkie from './Talkie'
function WikiPage({pagename}) {

    let backtrace = [];
    let pagenames = "";
    let visitedpages = pagename;
    let updateFirstPage = false;
    const [allPages,setAllPages]=useState([]);
    const allPagesRef= useRef({});
    allPagesRef.current = allPages;
    const [currentpage, setCurrentPage] = useState(pagename);
    const fromBoxRef = useRef(null);
    const currentBoxRef = useRef(null);
    const toBoxRef = useRef(null);

    useEffect(() => {
        window.addEventListener("message", e => {
            //console.log("receive message " + e.data)
            if (checkValidPage(e.data)) {
                setNewPage(e.data + "");
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
            console.log("setting pages");
            setAllPages(myjson.wikipages);
        });

        fetch('w1_infohazard.txt')
        .then(function(response){
            return response.text();
        }).then(function (data) {
            //console.log(data);
            pagenames = data;
        });
        
    },[]);


    function setNewPage(newPage) {
        setCurrentPage(newPage);
        console.log("new page " + newPage);
        console.log(allPagesRef.current);
        allPagesRef.current.find(({ title }) => title === newPage).visited++;
    }

    function checkValidPage(p) {
        p = p + "";
        return pagenames.includes(p);
    }

    if (!updateFirstPage) {
        if (allPages.length > 0) {
            allPagesRef.current.find(({ title }) => title === pagename).visited++;
        }
    }

    //function matchPage(p1, p2) {
    //    console.log("testing " + p1.title + ", " + p2);
     //   return p1.title === p2;
    //}

    function isCurrentPage(page) {
        console.log("testing " + page.title + " against " + currentpage);
        return page.title === currentpage;
    }

    return (
        <div class="container">
            <div class="row">
                <div class="col-sm-3" id="leftcol">
                    <Talkie pagename={pagename}/>
                    <div id="mapsidebar">
                        <div id="fromholder" ref={fromBoxRef}>
                        {allPages.length > 0 && allPages.find(isCurrentPage) && allPages.find(isCurrentPage).fromneighbors &&
                            allPages.find(isCurrentPage).fromneighbors.map((element, i) => (
                                <>
                                    {allPagesRef.current.find(({ title }) => title === element).visited === 0 &&
                                        <div className="mapnode unknown"><span>???</span></div>
                                    }
                                    {allPagesRef.current.find(({ title }) => title === element).visited > 0 &&
                                        <div className="mapnode seen"><a onClick={(e) => setNewPage(element, e)}>{element}</a></div>
                                    }
                                </>
                            ))}
                        </div>

                        <div id="currentholder" ref={currentBoxRef}>
                            <div className="mapnode current">
                                {currentpage}
                            </div>
                        </div>
                        
                        <div id="toholder" ref={toBoxRef}>
                        {allPages.length > 0 && allPages.find(isCurrentPage) && allPages.find(isCurrentPage).toneighbors &&
                            allPages.find(isCurrentPage).toneighbors.map((element, i) => (
                                <>
                                    {allPagesRef.current.find(({ title }) => title === element).visited === 0 &&
                                        <div className="mapnode unknown"><span>???</span></div>
                                    }
                                    {allPagesRef.current.find(({ title }) => title === element).visited > 0 &&
                                        <div className="mapnode seen"><a onClick={(e) => setNewPage(element, e)}>{element}</a></div>
                                    }
                                </>
                            ))}
                        </div>
                    </div>
                </div>
                <div class="col-sm-9">
                    <iframe id="pageframe" src={"pages/" + currentpage + '.html'}/>

                </div>
            </div>
        </div>


        
    )
}

export default WikiPage;