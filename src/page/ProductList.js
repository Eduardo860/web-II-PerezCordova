import ProductListItem from "../components/ProductListItem";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProductsList(){

    const[products, setProducts] = useState(null)
    const[productId, setProductId] = useState(null)
    const[word, setWord] = useState(null)
    const[newProduct, setNewProduct] = useState(null)

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getProducts();
            console.log("📦 Productos recibidos:", data.products);
            setProducts(data?.products ?? []);
        };
    
        fetchProducts();
    }, []);

    useEffect(()=>{
        const hasWord = word !== null && word != undefined && word.length > 3
        
        if(!hasWord) return 

        const fetchProductsByWord = async () =>{
            const data = await getProductsByWord(word)
            setProducts(data.products)
        }

        fetchProductsByWord()


    },[word])


    return (
        <div>
            <div>
                <input style={{padding:"15px", width:"90%", margin:"auto"}} onChange={(e)=> setWord(e.target.value)}/>

            </div>
            <div className="container-products">
                {products && products.map((item)=>{
                    return(
                        <ProductListItem 
                        title={item.title} 
                        id={item.id} 
                        description={item.description} 
                        images={item.images}
                      />
                    )
                })}

            </div>

        </div>

    )

}

async function getProducts() {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    console.log("🚀 Datos de la API:", data); // 👈 añade esto
    return data;
}

async function getProductsByWord(word) {
    const products = await fetch(`https://dummyjson.com/products/search?=${word}`)
    return products.json()
    
}