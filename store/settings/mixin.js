export const arrayOfObjectsToObject = (array = []) => array.reduce((obj, item) => {
    let value;

    switch (true) {
    // case item.value === 'true' || item.value === true:
    //     value = true;
    //     break;
    // case item.value === 'false' || item.value === false:
    //     value = false;
    //     break;
    default:
        value = item.value;
        break;
    }
    return Object.assign(obj, { [item.key]: value });
},
{});
