

function WikiAlert({ pagename }) {

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
    }

    function message() {
        window.parent.postMessage("yoyoyo")
    }

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
                            <div >The content of this article <strong>may not meet Wikipedia's <span className="fakea"
                                onClick={message} title="ERROR">human disclosure guidelines</span></strong>.<span > Please help to enforce the
                                    confidentiality of the topic by <span className="fakea" onClick={message}
                                        title="EYESEYESEYES">closing your eyes immediately</span>.</span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

        </>
    )
}
export default WikiAlert;