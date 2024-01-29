import AddProduct from "./addProduct";
import DeleteProduct from "./deleteProduct";
import UpdateProduct from "./updateProduct";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function getProducts() {
    const res = await prisma.product.findMany({
        select: {
            id: true,
            title: true,
            price: true,
            brandId: true,
            brand: true,
        }
    });
    return res;
}

async function getBrands() {
    const res = await prisma.brand.findMany();
    return res;
}

export default async function ProductList() {
    const [products, brands] = await Promise.all([
        getProducts(),
        getBrands(),
    ]);
    return (
        <div>
            <div>
                <AddProduct brands={brands} />
            </div>
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Brand</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={product.id}>
                            <td>{index + 1}</td>
                            <td>{product.title}</td>
                            <td>{product.price}</td>
                            <td>{product.brand.name}</td>
                            <td className="flex">
                                <UpdateProduct product={product} brands={brands} />
                                <DeleteProduct product={product} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
