const reFormatTitle = (task) => {
    var strs = task.split(' ');

    for (let i in strs) {
        strs[i] = strs[i].charAt(0).toUpperCase() + strs[i].slice(1);
    }

    return strs.join(' ');
}

export default reFormatTitle;
