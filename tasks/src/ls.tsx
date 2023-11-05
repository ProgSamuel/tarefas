// function DbLocalStorage() {
//     const itemsLocal = localStorage.length;
//     const items = [];

//     for (let task = 0; task < itemsLocal; task++) {
//         const keyLS = localStorage.key(task);
//         const value = localStorage.getItem(keyLS||''); 
//         // console.log(`key: ${keyLS}, value: ${value}`);
        
//         items.push(<li key={keyLS}>{`Task: ${value}`}</li>);
//     }

//     return (
//         <ul>
//             {items}
//         </ul>
//     );
// }

// export default DbLocalStorage;