


export async function getAllProducts () {
    try {
        const res = await fetch('http://localhost:3001/product');
        return res.json();
    }catch(err) {
        console.log(err);
    }
}