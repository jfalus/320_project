import React, { useEffect, useState } from "react";

function TestApp() {
    const[data, setData] = useState("");

    fetch('http://localhost:5000/api/testAPI')
    .then(response => response.json())
    .then(val => setData(val.string));

    return(
        <div>
        <p>{data}</p>
        </div>
    )
}

export default TestApp;
