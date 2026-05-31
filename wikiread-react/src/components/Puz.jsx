
function Puz() {


    const lefthandStyle = {
        position:"relative",
        top:"-50px",
        left:"60px",
        height:"50px", 
        width:"50px"
    };

    const righthandStyle = {
        position:"relative",
        top:"-50px",
        left:"-70px",
        height:"50px", 
        width:"50px"
    }


    const handStyleDown = {
        position:"relative",
        top:"-80px",
        left:"60px",
        height:"50px", 
        width:"50px"
    }


    return (
        <div id="puzbox">
            <img id="leftpuzhand" style={lefthandStyle} src="/wikiread-react/puz/handrightdown.png"/>
            <img style={{height:"200px", width:"200px"}} src="/wikiread-react/puz/puz3d.webp"/>
            <img id="rightpuzhand" style={righthandStyle} src="/wikiread-react/puz/handleftdown.png"/>
        </div>
    )
}

export default Puz;