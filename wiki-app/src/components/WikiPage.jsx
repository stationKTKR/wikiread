import React,{useState,useEffect} from 'react';

function WikiPage({pagename}) {

    const [data, setData] = useState(null);

  useEffect(() => {
    fetch('Astrochicken.html')
        .then(response => {
            // When the page is loaded convert it to text
            return response.text()
        })
        .then(html => {
            // Initialize the DOM parser
            const parser = new DOMParser()

            // Parse the text
            const doc = parser.parseFromString(html, "text/html")
            setData(doc)
        });
  }, []);



    return (
        <div>
            <h2>{pagename}</h2>
            <div>
                {data}
            </div>
        </div>
    )
}

export default WikiPage;