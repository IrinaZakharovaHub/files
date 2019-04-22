function FillRightdata(name, val) {
    var prop = localStorage.getItem(name);
    var arr = prop.split(' $ ');
    var value = val;
    arr[arr.length - 1] = value;
    var newData = arr.join(' $ ');
    localStorage.setItem(name, newData);
    CommunicateEmbedded.fillQuestionary(name, newData);
}