import { Order, OrderProduct, OrderModel } from '../../models/order'

const ordersModel = new OrderModel();
const initActiveOrder: Order = {
    user_id : 1,
    status: "active"
}
const initCompletedOrder: Order = {
    user_id : 1,
    status: "completed"
}
const initOrderProduct: OrderProduct = {
    order_id: 1,
    product_id: 1,
    product_quantity: 5
}
let activeOrder: Order;
let completedOrder: Order;
let order_id: number;

describe("Testing : Order Model", () => {
    beforeAll(async () => {
        activeOrder = await ordersModel.create(initActiveOrder);
        completedOrder = await ordersModel.create(initCompletedOrder);
    })
    it("should have a create method", () => {
        expect(ordersModel.create).toBeDefined();
    });
    it("testing create method with order sample", async () => {
        activeOrder = await ordersModel.create(initActiveOrder);
        expect({
            user_id : activeOrder.user_id,
            status: activeOrder.status
        }).toEqual({
            user_id : initActiveOrder.user_id,
            status: initActiveOrder.status
        });
        order_id = activeOrder.id!;
    });
    it("should have an index method", () => {
        expect(ordersModel.index).toBeDefined();
    });
    it("index method should return list of orders", async () => {
        const orders = await ordersModel.index();
        expect(orders).toContain(activeOrder);
    })
    it("should have a show method", () => {
        expect(ordersModel.show).toBeDefined();
    });
    it("show method should return the requested order", async () => {
        const requestedOrder = await ordersModel.show(order_id);
        expect(requestedOrder).toEqual(activeOrder);
    })
    it("should have an addProductToOrder method", () => {
        expect(ordersModel.addProductToOrder).toBeDefined();
    });
    it("addProduct method should return the products added to the specified order", async () => {
        const requestedOrder = await ordersModel.addProductToOrder(initOrderProduct);
        expect({
            order_id: requestedOrder.order_id,
            product_id: requestedOrder.product_id,
            product_quantity: requestedOrder.product_quantity
        }).toEqual({
            order_id: initOrderProduct.order_id,
            product_id: initOrderProduct.product_id,
            product_quantity: initOrderProduct.product_quantity
        });
    })
    it("should have a currentOrderByUser method", () => {
        expect(ordersModel.currentOrderByUser).toBeDefined();
    });
    it("show method should return the requested active order", async () => {
        const requestedOrder = await ordersModel.currentOrderByUser(initActiveOrder.user_id!);
        expect({
            user_id : activeOrder.user_id,
            status: activeOrder.status
        }).toEqual({
            user_id : initActiveOrder.user_id,
            status: initActiveOrder.status
        });
    })
    it("should have a completedOrderByUser method", () => {
        expect(ordersModel.completedOrdersByUser).toBeDefined();
    });
    it("show method should return the requested completed order", async () => {
        const requestedOrder = await ordersModel.completedOrdersByUser(initCompletedOrder.id!);
        expect({
            user_id : completedOrder.user_id,
            status: completedOrder.status
        }).toEqual({
            user_id : initCompletedOrder.user_id,
            status: initCompletedOrder.status
        });
    })
})