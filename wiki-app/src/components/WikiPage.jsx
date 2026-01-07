import React,{useState,useEffect} from 'react';


function WikiPage({pagename}) {

    const pagestring = pagename.toString();
    const pageloc = './' + pagestring + '.html'

    return (
        <div class="container">
            <div class="row">
                <div class="col-sm-2">
                    One of three columns
                </div>
                <div class="col-sm-8">
                    <iframe src={pageloc}/>
                </div>
                <div class="col-sm-2">
                    One of three columns
                </div>
            </div>
        </div>


        
    )
}

export default WikiPage;