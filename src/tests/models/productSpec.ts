import { Product, ProductModel } from '../../models/product'

const productsModel = new ProductModel();
const initProduct: Product = {
    name: "Shirt",
    price: 10,
    category: "Clothes"
}
let product: Product;
let product_id: number;

describe("Testing : Product Model", () => {
    it("should have a create method", () => {
        expect(productsModel.create).toBeDefined();
    });
    it("testing create method with product sample", async () => {
        product = await productsModel.create(initProduct);
        expect({
            name: product.name,
            price: product.price,
            category: product.category
        }).toEqual({
            name: initProduct.name,
            price: initProduct.price,
            category: initProduct.category
        });
        product_id = product.id!;
    });
    it("should have an index method", () => {
        expect(productsModel.index).toBeDefined();
    });
    it("index method should return list of products", async () => {
        const products = await productsModel.index();
        expect(products).toContain(product);
    })
    it("should have a show method", () => {
        expect(productsModel.show).toBeDefined();
    });
    it("show method should return the requested product", async () => {
        const requestedProduct = await productsModel.show(product_id);
        expect(requestedProduct).toEqual(product);
    })
})