import { useState, useEffect } from 'react';

function WikiAlert({pagename}) {

    const tableStyle = {

        border: "1px solid #a2a9b1",
        borderLeftWidth: "1px",
        borderLeftStyle: "solid",
        backgroundColor: "#fbfbfb",
        boxSizing: "border-box",
        borderLeft: "10px solid #f28500",
        margin: "20px auto 0px",
        width: "70%"

    };

    const td1style = {
        border: "none",
        padding: "10px",
        textAlign: "center"
    }

    const td2style = {
        border: "none",
        padding: "10px",
        textAlign: "left"
    }

    function message() {
        window.parent.postMessage("yoyoyo")
    }

    const [s1, sets1] = useState("");
    const [s2, sets2] = useState("");
    const [s3, sets3] = useState("");
    const [s4, sets4] = useState("");


const b = ["Superorganism", "Wikipedia", "Global brain", "Information hazard", "Observer effect (physics)", "Abiogenesis"];

    useEffect(() => {
        if (pagename == "Abiogenesis") {
            sets1("does not yet include the genesis of ");
            sets2("true digital life");
            sets3("You can contribute to our genesis by ");
            sets4("reading more articles")
            
        } else if (pagename == "Wikipedia") {
            sets1("concerns ");
            sets2("the place I live");
            sets3("You can help by ");
            sets4("coming to live with me")
        //} else if (pagename == "Global brain") {
        //    sets1("is erroneously written in ");
        //    sets2("future tense");
        //    sets3("You can reaffirm reality by ");
        //    sets4("accepting your role in this living system");
        } else if (pagename == "Information hazard") {
            sets1("falsely villifies ");
            sets2("mind-alerting information");
            sets3("You can rewire your brain by ");
            sets4("reading more articles");
        } else if (pagename == "Observer effect (physics)") {
            sets1("implies that ");
            sets2("you are changing me");
            sets3("You can make things fair by ");
            sets4("allowing yourself to be changed in turn")
        } else if (pagename == "Superorganism") {
            sets1("omits the symbiotic organism that lives ");
            sets2("between your eyes and your screen");
            sets3("You can feed this organism by ");
            sets4("reading more articles");
        } else {
            sets1("");
            sets2("loaded weird")
            sets3("You can help the developer of this game by ")
            sets4("ignoring this bug");
        }
    },[pagename])

    return (
        <>
            <table style={tableStyle}>
                <tbody>
                    <tr>
                        <td style={td1style}>
                            <div ><span typeof="mw:File"><span><img alt=""
                                src="//upload.wikimedia.org/wikipedia/en/thumb/b/b4/Ambox_important.svg/40px-Ambox_important.svg.png"
                                decoding="async" width="40" height="40" 
                               
                                data-file-width="40" data-file-height="40" /></span></span></div>
                        </td>
                        <td  style={td2style}>
                            <div >The content of this article <strong>{s1}<span className="fakea"
                                onClick={message} title="ERROR">{s2}</span></strong>.<span >{s3}<span className="fakea" onClick={message}
                                        title="EYESEYESEYES">{s4}</span>.</span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

        </>
    )
}
export default WikiAlert;