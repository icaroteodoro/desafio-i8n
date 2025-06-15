


export async function getAllProducts () {
    try {
        const res = await fetch('http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider');
        return res.json();
    }catch(err) {
        console.log(err);
    }
}