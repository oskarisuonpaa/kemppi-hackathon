import { Router, Request, Response } from "express";
import { WeldingData } from "../models/weldingData";
import { totalWeldsLastWeek, mostUsedWeldingMachine, totalWireConsumed, averageWeldDuration } from "../utils/dataHelper";

export const visitorRouter = Router();

visitorRouter.get("/", async (_req: Request, res: Response) => {
    try {
        const results = await WeldingData.find({});
        const lastWeeksWelds = {title: 'Welds during last week' ,value: totalWeldsLastWeek(results), image: 'https://img.icons8.com/?size=100&id=85102&format=png&color=000000'}
        const mostUsedMachine = {title: 'Most popular welder', value: mostUsedWeldingMachine(results), image: 'https://img.icons8.com/?size=100&id=e9LeYCA04w0s&format=png&color=000000'}
        const totalWire = {title: 'Total wire consumed', value: totalWireConsumed(results), image: 'https://img.icons8.com/?size=100&id=t7thwLfV7zi3&format=png&color=000000'}
        const avgDuration = {title: 'Average weld duration', value: averageWeldDuration(results), image: 'https://img.icons8.com/?size=100&id=19099&format=png&color=000000'}
        const totalWelds = {title: 'Total welds completed', value: results.length, image: 'https://img.icons8.com/?size=100&id=en7Egm2CxKg3&format=png&color=000000'}

        res.json([
            lastWeeksWelds,
            mostUsedMachine,
            totalWire,
            avgDuration,
            totalWelds
        ]);
    } catch (error) {
        console.error("Error fetching welding data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    
    
});
