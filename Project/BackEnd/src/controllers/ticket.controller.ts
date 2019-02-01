import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator/check";
import HttpError from "../errors/http.error";
import TicketModel, {Ticket} from "../models/ticket.model";

export async function getTicket(req: Request, res: Response, next: NextFunction) {
    const ticketId = req.params.id;
    const ticket = await TicketModel.findOne({ticketId});
    res.json({ticket, success: true, status: 200});
}

export async function getAllTickets(req: Request, res: Response, next: NextFunction) {
    const tickets = await TicketModel.find();
    res.json({tickets, success: true, status: 200});
}

export async function editTicket(req: Request, res: Response, next: NextFunction) {
    const ticketId = req.params.id;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError(422, "Not valid data");
    }

    const ticketData: Ticket = req.body;
    await TicketModel.findOneAndUpdate({ticketId}, ticketData);

    res.json({success: true, status: 200});
}

export async function deleteTicket(req: Request, res: Response, next: NextFunction) {
    const ticketId = req.params.id;
    await TicketModel.deleteOne({ticketId});
    res.json({success: true, status: 200});
}
