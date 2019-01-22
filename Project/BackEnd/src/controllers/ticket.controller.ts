import {NextFunction, Request, Response} from "express";
import TicketModel from "../models/ticket.model";

export async function getTicket(req: Request, res: Response, next: NextFunction) {
    const ticketId = req.params.id;
    const ticket = await TicketModel.findOne({ticketId});
    res.json({ticket, success: true, status: 200});
}

export async function getAllTickets(req: Request, res: Response, next: NextFunction) {
    const tickets = await TicketModel.find();
    res.json({tickets, success: true, status: 200});
}

export async function deleteTicket(req: Request, res: Response, next: NextFunction) {
    const ticketId = req.params.id;
    await TicketModel.deleteOne({ticketId});
    res.json({success: true, status: 200});
}
