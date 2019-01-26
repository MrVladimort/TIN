import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator/check";
import HttpError from "../errors/http.error";
import EventModel from "../models/event.model";
import OrderModel from "../models/order.model";
import TicketModel from "../models/ticket.model";

export async function getOrder(req: Request, res: Response, next: NextFunction) {
    const orderId = req.params.id;
    const order = await OrderModel.findOne({orderId, User: req.user.id});

    if (order) {
        const tickets = await TicketModel.find({Order: order.id});
        res.json({order: {...order.toJSON(), tickets}, success: true, status: 200});
    } else {
        throw new HttpError(404, "Order not found");
    }
}

export async function getAllOrders(req: Request, res: Response, next: NextFunction) {
    const orders = await OrderModel.findAllByUser(req.user.id);

    const orderWithTickets = await Promise.all(orders.map(async (order) => {
        const tickets = await TicketModel.find({Order: order.id});
        return {...order.toJSON(), tickets};
    }));

    res.json({orders: orderWithTickets, success: true, status: 200});
}

export async function createOrder(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError(422, "Not valid data");
    }

    const {ticketsData, eventId} = req.body;

    const event = await EventModel.findOne({eventId});
    const order = new OrderModel({User: req.user.id});
    await order.save();

    const tickets = await Promise.all(ticketsData.map(async (ticketData: any) => {
        const ticket = new TicketModel({
            ...ticketData,
            price: event.price,
            number: event.getFreePlace(),
            Order: order.id,
            Event: event.id,
        });

        return await ticket.save();
    }));

    event.save();
    res.json({order: {...order.toJSON(), tickets}, success: true, status: 200});
}

export async function deleteOrder(req: Request, res: Response, next: NextFunction) {
    const orderId = req.params.id;
    const order = await OrderModel.findOneAndDelete({orderId});
    await TicketModel.deleteMany({Order: order.id});
    res.json({success: true, status: 200});
}
