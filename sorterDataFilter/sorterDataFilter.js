window.onload = function () {

    const mainButton = document.getElementById("sortButton");
    const dataField = document.getElementById("dataField");

    let fullTotal = 0;
    let jamsTotal = 0;
    let nightCodeOnes = 0;
    let nightCodeThrees = 0;
    let dayCodeOnes = 0;
    let dayCodeThrees = 0;

    let fullTallies = [];
    let neededData = [];
    let objectForFulls = [];

    $('#clearButton').click(function () {
        $("#dataField").val("");
        neededData.length = 0;
        fullTotal = 0;
        jamsTotal = 0;
        nightCodeOnes = 0;
        nightCodeThrees = 0;
        dayCodeOnes = 0;
        dayCodeThrees = 0;
        $("#table tr").remove();
        $("#jamTotal").text(jamsTotal);
        $("#fullTotal").text(fullTotal);
        $("#nightCodeOnes").text(nightCodeOnes);
        $("#dayCodeOnes").text(dayCodeOnes);
        $("#nightCodeThrees").text(nightCodeThrees);
        $("#dayCodeThrees").text(dayCodeThrees);
    });

    mainButton.onclick = function () {
        let split = dataField.value.split(" ");
        split.map((item, index, arr) => {
            if (item.includes("FULL") && item !== "FULL") {
                let timeFinder = item.split("")
                let hour = parseInt(timeFinder[0] + timeFinder[1]);
                let linenumber = parseInt(arr[index + 4]);
                linenumber > 0 ? fullTallies.push(linenumber) : "";
                //adjust to differentiate between current night shift and previous night shift
                hour < 6 || hour > 16 ? nightCodeOnes++ : dayCodeOnes++;
                neededData.push(item + " " + arr[index + 1] + " " + arr[index + 2] + " " + arr[index + 3] + " " + arr[index + 4]);
                fullTotal = nightCodeOnes + dayCodeOnes;
            }
            else if (item.includes("JAM") && item !== "JAM") {
                let timeFinder = item.split("")
                let hour = parseInt(timeFinder[0] + timeFinder[1]);
                hour < 6 || hour > 16 ? nightCodeThrees++ : dayCodeThrees++;
                neededData.push(item + " " + arr[index + 1] + " " + arr[index + 2] + " " + arr[index + 3]);
                jamsTotal = nightCodeThrees + dayCodeThrees
            }
        })
        if (dataField.value === "") {
            alert("There is no data to sort :(")
        }
        neededData.map((item, index) => {
            $("#table").append("<tr><td>" + (index + 1) + ") " + item + "</td></tr>");
        })

        fullTallies.sort().map((item, index, arr) => {
            if (item !== arr[index - 1]) {
                objectForFulls.push({ item })
            }
        })

        $("#nightCodeOnes").text(nightCodeOnes);
        $("#dayCodeOnes").text(dayCodeOnes);
        $("#nightCodeThrees").text(nightCodeThrees);
        $("#dayCodeThrees").text(dayCodeThrees);
        $("#jamTotal").text(jamsTotal);
        $("#fullTotal").text(fullTotal);
    }
};
