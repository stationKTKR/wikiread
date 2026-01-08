import React,{useState,useEffect} from 'react';

import Talkie from './Talkie'
function WikiPage({pagename}) {

    let pagenames = "";

    fetch('w1_infohazard.txt')
    .then(function(response){
        return response.text();
    }).then(function (data) {
        //console.log(data);
        pagenames = data;
    })
    const [pageloc, setPageloc] = useState(pagename + '.html');

    //const pagestring = pagename.toString();
    //setPageloc('./pages/Medusa.html');
    useEffect(() => {
        window.addEventListener("message", e => {
            console.log("receive message " + e.data)
            if (checkValidPage(e.data)) {
                setPageloc("pages/" + e.data.replaceAll(" ", "_") + '.html');
                console.log("changing page " + e.data.replaceAll(" ", "_"));
            }
            //setPageloc(e.data + '.html');
            //setPageloc('./pages/' + e.data + '.html');
        });
    },[]);

    function checkValidPage(p) {
        return pagenames.includes(p);
    }

    function speak() {
        //console.log("HIIII")
    }

    return (
        <div class="container">
            <div class="row">
                <div class="col-sm-2">
                    <Talkie/>
                </div>
                <div class="col-sm-8">
                    <iframe id="pageframe" src={pageloc}/>

                </div>
                <div class="col-sm-2">
                    One of three columns
                </div>
            </div>
        </div>


        
    )
}

export default WikiPage;